"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion"; // Importez Framer Motion
import souper from '@/public/souper.jpg';
import lunch from '@/public/lunch.jpg';
import vin from '@/public/vin.jpg';
import fete from '@/public/fete.jpg';
import banner from '@/public/banner.jpg';
import styles from "./evenement.module.css"; // Import du CSS en module

export default function Menus() {
  // Utilisez useScroll pour suivre le défilement de la page
  const { scrollYProgress } = useScroll();

  // Transformez la progression du défilement en valeurs pour l'animation
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Déplace la bannière vers le haut
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]); // Réduit l'opacité en fonction du défilement

  return (
    <div className={styles.menusContainer}>
      {/* Bannière avec Framer Motion */}
      <motion.div
        className={styles.bannerContainer}
        style={{ y, opacity }} // Applique l'animation de défilement
      >
        <Image src={banner} alt="Bannière des menus" layout="fill" objectFit="cover" quality={100} />
        <div className={styles.bannerText}>
          <h1>LES MENUS</h1>
          <p>Repas du midi ou du soir, découvrez nos menus !</p>
        </div>
      </motion.div>

      {/* Liens vers les menus */}
      <div className={styles.menuLinks}>
        <Link href="#">Menu dîner et souper</Link>
        <Link href="#">Menu enfants</Link>
        <Link href="#">Menu des bières et cocktails</Link>
        <Link href="#">Menu des vins</Link>
        <Link href="#">Menu des spiritueux et digestifs</Link>
      </div>



      {/* Sections des menus */}
      <div className={styles.menuSections}>
        <div className={styles.menuItem}>
          <Image src={souper} alt="Souper" width={500} height={300} className={styles.roundedImage} />
          <div className={styles.menuText}>
            <h2>LE SOUPER</h2>
            <p>
              Le resto propose une ambiance chic et décontractée pour savourer des plats raffinés. 
              Découvrez une cuisine riche en saveurs !
            </p>            
            <button className={styles.menuBtn}>CONSULTER LE MENU</button>
          </div>
        </div>

        <div className={`${styles.menuItem} ${styles.reverse}`}>
          <div className={styles.menuText}>
            <h2>LE LUNCH</h2>
            <p>
              Une option rapide et savoureuse pour vos repas d'affaires ou vos sorties entre amis !
            </p>
            <Link href="/evenements/Lunch">
            <button className={styles.menuBtn}>CONSULTER LE MENU</button>
            </Link>
          </div>
          <Image src={lunch} alt="Lunch" width={500} height={300} className={styles.roundedImage} />
        </div>
      </div>

      {/* Nouvelle section */}
      <div className={styles.menuSections}>
        <div className={styles.menuItem}>
          <Image src={vin} alt="Vin" width={500} height={300} className={styles.roundedImage} />
          <div className={styles.menuText}>
            <h2>POUR LES AMOUREUX DU VIN</h2>
            <p>
              Amateurs de bonnes bouteilles, nous proposons des agencements de vins en accord avec le menu offert.
              Notre carte des vins est composée essentiellement d'importations privées sélectionnées avec soin.
            </p>
            <button className={styles.menuBtn}>CONSULTER LA CARTE DES VINS</button>
          </div>
        </div>

        <div className={`${styles.menuItem} ${styles.reverse}`}>
          <div className={styles.menuText}>
            <h2>LE COEUR À LA FÊTE?</h2>
            <p>
              Pour tous vos événements – anniversaires, mariages, commémorations, notre équipe vous accompagne 
              avec des formules adaptées et des salles disponibles selon vos besoins.
            </p>
            <button className={styles.menuBtn}>VOIR LE SITE DE L'HÔTEL</button>
          </div>
          <Image src={fete} alt="Fête" width={500} height={300} className={styles.roundedImage} />
        </div>
      </div>
    </div>
  );
}