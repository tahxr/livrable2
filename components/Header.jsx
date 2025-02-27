"use client";

import { useState } from "react";

import Image from "next/image";
import logo from "@/public/logo_BonGout.png";
import styles from "@/components/Header.module.css";
import Link from "next/link";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.div}>
                <Image src={logo} alt="Logo Spectacite" className={styles.logo} />
                <h1>Restaurant BonGout</h1>
            </div>

            {/* Menu pour Desktop */}
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href="/">Accueil</Link>
                    </li>
                    <li className={styles.dropdown}>
                        <Link href="/evenements">Menus</Link>
                        <div className={styles.dropdownMenu}>
                            <Link href="/evenements/concerts">Menu dîner et souper</Link>
                            <Link href="/evenements/theatre">Menu enfants</Link>
                            <Link href="/evenements/danse">Menu des bières et cocktails</Link>
                            <Link href="/evenements/standup">Menu des vins</Link>
                            <Link href="#">Menu des spiritueux et des digestifs</Link>
                            <Link href="#">Menu groupe (11 pers. et plus)</Link>
                            <Link href="#">Menu Saint-Valentin</Link>
                        </div>
                    </li>
                    <li>
                        <Link href="/contact">Nous joindre</Link>
                    </li>
                    <li>
                        <Link href="/authentification">Connexion/Inscription</Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ""}`}>
                <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
                <Link href="/evenements" onClick={() => setMenuOpen(false)}>Événements</Link>
                <Link href="/evenements/concerts" onClick={() => setMenuOpen(false)}>Concerts</Link>
                <Link href="/evenements/theatre" onClick={() => setMenuOpen(false)}>Théâtre</Link>
                <Link href="/evenements/danse" onClick={() => setMenuOpen(false)}>Danse</Link>
                <Link href="/evenements/standup" onClick={() => setMenuOpen(false)}>Stand-up</Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>Nous joindre</Link>
                <Link href="#" onClick={() => setMenuOpen(false)}>Connexion/Inscription</Link>
            </div>
        </header>
    );
}
