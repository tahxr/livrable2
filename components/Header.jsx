"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo_BonGout.png";
import styles from "@/components/Header.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUserInLocalStorage = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } catch (e) {
                    console.error("Erreur lors du parsing de l'utilisateur:", e);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        checkUserInLocalStorage();
        window.addEventListener("storage", checkUserInLocalStorage);
        return () => {
            window.removeEventListener("storage", checkUserInLocalStorage);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        redirect("/");
    };

    return (
        <header className={styles.header}>
            <div className={styles.div}>
                <Link href="/">
                    <Image src={logo} alt="Logo BonGout" className={styles.logo} />
                </Link>
                <h1>Restaurant BonGout</h1>
            </div>

            <nav className={styles.nav}>
                <ul>
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/evenements">Menus</Link></li>
                    {user && <li><Link href="/reservation/myreservation">Mes Réservations</Link></li>}
                    {user?.email === "admin@gmail.com" && (
                        <li><Link href="/dashboard">Admin Panel</Link></li>
                    )}
                    <li><Link href="/contact">Nous joindre</Link></li>
                    <li>
                        {user ? (
                            <div className={styles.userInfo}>
                                <span>{user?.firstname}</span>
                                <button className={styles.Button} onClick={handleLogout}>Déconnexion</button>
                            </div>
                        ) : (
                            <Link href="/authentification">Connexion/Inscription</Link>
                        )}
                    </li>
                </ul>
            </nav>

            {/* Menu mobile */}
            <div className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ""}`}>
                <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
                <Link href="/evenements" onClick={() => setMenuOpen(false)}>Menus</Link>
                {user && <Link href="/reservation/myreservation" onClick={() => setMenuOpen(false)}>Mes Réservations</Link>}
                <Link href="/contact" onClick={() => setMenuOpen(false)}>Nous joindre</Link>
                {user ? (
                    <span onClick={handleLogout} className={styles.logout}>Déconnexion</span>
                ) : (
                    <Link href="/authentification" onClick={() => setMenuOpen(false)}>Connexion/Inscription</Link>
                )}
            </div>
        </header>
    );
}
