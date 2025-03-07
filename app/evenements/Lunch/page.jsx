"use client";
import React from "react";
import Image from "next/image";
import pokeBowl from "@/public/bowl.jpg";
import burger from "@/public/burger.jpg";
import saladeCesar from "@/public/salade.jpg";
import carbonara from "@/public/patte.jpg";
import wrapVeg from "@/public/wrap.jpg";
import quiche from "@/public/Quiche.jpg";
import lunch from '@/public/lunch.jpg';
import Link from "next/link";
import styles from "./lunch.module.css"; // Import du CSS en module

export default function Lunch() {
  return (
    <div className={styles.lunchContainer}>
    {/* Bannière */}
    
    <div className={styles.banner}>
      
      <div className={styles.bannerText}>
        <h1>MENU LUNCH</h1>
        <p>Un menu varié pour une pause déjeuner savoureuse.</p>
      </div>
    </div>

      {/* Section de présentation */}
      <div className={styles.lunchIntro}>
        <p>
          Découvrez notre sélection de plats faits maison, parfaits pour un lunch rapide et équilibré. 
          Profitez de recettes gourmandes préparées avec des ingrédients frais et de saison.
        </p>
      </div>

      {/* Liste des plats */}
      <div className={styles.lunchMenu}>
        <div className={styles.menuItem}>
        <Image src={pokeBowl} alt="Bowl de Saumon Poke" width={400} height={250} className={styles.menuImage} />
          <div className={styles.menuText}>
            <h2>Bowl de Saumon Poke</h2>
            <p>
              Un délicieux bol garni de riz, saumon mariné, avocat, concombre, mangue et graines de sésame.
            </p>
          </div>
        </div>

        <div className={styles.menuItem}>
        <Image src={burger} alt="Burger Gourmet" width={400} height={250} className={styles.menuImage} />
        <div className={styles.menuText}>
            <h2>Burger Gourmet</h2>
            <p>
              Steak de bœuf Angus, cheddar vieilli, oignons caramélisés, laitue, tomate et sauce maison, servi avec frites.
            </p>
          </div>
        </div>

        <div className={styles.menuItem}>
        <Image src={saladeCesar} alt="Salade César au Poulet Grillé" width={400} height={250} className={styles.menuImage} />
        <div className={styles.menuText}>
            <h2>Salade César au Poulet Grillé</h2>
            <p>
              Laitue romaine croquante, morceaux de poulet grillé, copeaux de parmesan et croûtons maison.
            </p>
          </div>
        </div>

        <div className={styles.menuItem}>
        <Image src={carbonara} alt="Pâtes Carbonara" width={400} height={250} className={styles.menuImage} />
          <div className={styles.menuText}>
            <h2>Pâtes Carbonara</h2>
            <p>
              Spaghetti al dente, sauce crémeuse au parmesan, lardons et poivre noir concassé.
            </p>
          </div>
        </div>

        <div className={styles.menuItem}>
        <Image src={wrapVeg} alt="Wrap Végétarien" width={400} height={250} className={styles.menuImage} />
          <div className={styles.menuText}>
            <h2>Wrap Végétarien</h2>
            <p>
              Galette de blé garnie d’houmous, légumes grillés, feta et sauce au yaourt.
            </p>
          </div>
        </div>

        <div className={styles.menuItem}>
        <Image src={quiche} alt="Quiche Lorraine" width={400} height={250} className={styles.menuImage} />
          <div className={styles.menuText}>
            <h2>Quiche Lorraine</h2>
            <p>
              Pâte croustillante, lardons fumés, fromage et œufs, servie avec une salade fraîche.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
