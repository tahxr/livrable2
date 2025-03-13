"use client";                    // 1. Declare this as a client component
import Link from "next/link";
import styles from "@/components/Footer.module.css";
import Image from "next/image";
import insta from "@/public/insta.png";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3>AU PLAISIR DE VOUS VOIR !</h3>
                    <p><strong>SALLE À MANGER</strong><br />
                        Lundi : 7h - 21h<br />
                        Mardi à mercredi : 11h30 à 21h<br />
                        Jeudi et vendredi : 11h30 à 22h<br />
                        Samedi : 17h - 22h<br />
                        Dimanche : Fermé
                    </p>
                    <p><strong>Bar Lounge</strong><br />
                        Lundi : Fermé<br />
                        Mardi à samedi : 15h - 22h<br />
                        Dimanche : Fermé
                    </p>
                    {/* 2. Wrap the button in a <Link> */}
                    <Link href="/reservation">
                        <button className={styles.button}>RÉSERVER UNE TABLE</button>
                    </Link>
                </div>

                <div className={styles.section}>
                    <h3>NOUS JOINDRE</h3>
                    <p><strong>Téléphone :</strong> 819-242-0001</p>
                    <p><strong>Courriel :</strong> contact@restobongout.ca</p>
                    <p><strong>Adresse :</strong><br />
                        585, boulevard de la Gappe<br />
                        Gatineau, Québec, Canada, J8T 8N7
                    </p>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>© 2025 Resto BonGout | Tous droits réservés</p>
                <div className={styles.socials}>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        instagram
                        <Image src={insta} alt="Instagram" height={20} width={15} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
