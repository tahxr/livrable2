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

    // Vérification de l'utilisateur dans le localStorage au chargement de la page
    useEffect(() => {
        // Fonction pour récupérer les données utilisateur de localStorage
        const checkUserInLocalStorage = () => {
            const storedUser = localStorage.getItem("user");
            console.log("Données utilisateur dans localStorage :", storedUser);

            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    console.log("Utilisateur parsed :", parsedUser);
                    setUser(parsedUser);
                } catch (e) {
                    console.error("Erreur lors du parsing de l'utilisateur:", e);
                    setUser(null); // Réinitialiser si l'analyse échoue
                }
            } else {
                console.log("Aucun utilisateur trouvé dans localStorage.");
                setUser(null); // Réinitialiser si aucun utilisateur n'est trouvé
            }
        };

        // Vérifier au chargement de la page
        checkUserInLocalStorage();

        // Vous pouvez également ajouter un listener sur localStorage si nécessaire
        window.addEventListener("storage", checkUserInLocalStorage);

        // Nettoyer l'event listener lors de la destruction du composant
        return () => {
            window.removeEventListener("storage", checkUserInLocalStorage);
        };
    }, []);  // Effectué uniquement au montage du composant

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);  // Réinitialiser l'utilisateur après la déconnexion
        console.log("Utilisateur déconnecté.");
        redirect("/");
    };

    return (
        <header className={styles.header}>
            <div className={styles.div}>
                <Image src={logo} alt="Logo BonGout" className={styles.logo} />
                <h1>Restaurant BonGout</h1>
            </div>

            {/* Menu pour Desktop */}
            <nav className={styles.nav}>
                <ul>
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/evenements">Menus</Link></li>
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
                <Link href="/contact" onClick={() => setMenuOpen(false)}>Nous joindre</Link>
                <Link href={user ? "#" : "/authentification"} onClick={() => setMenuOpen(false)}>
                    {user ? "Déconnexion" : "Connexion/Inscription"}
                </Link>
            </div>
        </header>
    );
}
