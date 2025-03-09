import Image from "next/image";
import styles from "./page.module.css";
import background from "@/public/background_restaurant.jpg"; // Remplacez par une image de fond chic
import dish1 from '@/public/dish1.jpg'; // Image d'un plat
import dish2 from '@/public/dish2.jpg'; // Image d'un plat
import dish3 from '@/public/dish3.jpg'; // Image d'un plat
import interior from '@/public/interior.jpg'; // Image de l'intérieur du restaurant
import Link from "next/link";
export default function Home() {
  return (
    <>
      {/* Section Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImageContainer}>
          <Image
            src={background}
            alt="BonGoût"
            fill
            className={styles.heroImage}
            style={{ objectFit: "cover" }} // Remplace objectFit
          />
        </div>
        <div className={styles.heroContent}>
          <h1>Bienvenue chez BonGoût</h1>
          <p>Une expérience culinaire raffinée au cœur de la ville.</p>
          <Link href="/reservation" className={styles.ctaButton}>Réserver une table</Link>
          
        </div>
      </section>

      {/* Section À propos */}
      <section className={styles.section} id="apropos">
        <h2>À propos de BonGoût</h2>
        <p>
          BonGoût est bien plus qu'un restaurant : c'est une destination où l'art culinaire rencontre l'élégance.
          Notre équipe de chefs passionnés crée des plats inspirés des saveurs locales et internationales,
          le tout dans un cadre sophistiqué et chaleureux.
        </p>
        <div className={styles.imageContainer}>
          <Image
            src={interior}
            alt="Intérieur du restaurant"
            className={styles.interiorImage}
            width={800}
            height={500}
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
        </div>
      </section>

      {/* Section Menu */}
      <section className={styles.section} id="menu">
        <h2>Notre Menu</h2>
        <p>Découvrez une sélection de plats soigneusement élaborés pour éveiller vos papilles.</p>
        <div className={styles.menuGallery}>
          <div className={styles.menuItem}>
            <div className={styles.imageContainer}>
              <Image
                src={dish1}
                alt="Plat signature"
                className={styles.dishImage}
                width={300}
                height={200}
                style={{ objectFit: "cover", borderRadius: "10px" }}
              />
            </div>
            <h3>Plat Signature</h3>
            <p>Un mélange unique de saveurs locales et d'ingrédients d'exception.</p>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.imageContainer}>
              <Image
                src={dish2}
                alt="Dessert raffiné"
                className={styles.dishImage}
                width={300}
                height={200}
                style={{ objectFit: "cover", borderRadius: "10px" }}
              />
            </div>
            <h3>Dessert Raffiné</h3>
            <p>Une touche sucrée pour clore votre repas en beauté.</p>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.imageContainer}>
              <Image
                src={dish3}
                alt="Carte des vins"
                className={styles.dishImage}
                width={300}
                height={200}
                style={{ objectFit: "cover", borderRadius: "10px" }}
              />
            </div>
            <h3>Carte des Vins</h3>
            <p>Une sélection de vins fins pour accompagner vos plats.</p>
          </div>
        </div>
      </section>

      {/* Section Réservation */}
      <section className={styles.section} id="reservation">
        <h2>Réservez votre table</h2>
        <p>
          Offrez-vous une expérience inoubliable chez BonGoût. Réservez dès maintenant pour garantir votre place
          dans notre établissement.
        </p>
        <a href="/reservation" className={styles.ctaButton}>Réserver maintenant</a>
      </section>

      {/* Section Contact */}
      <section className={styles.section} id="contact">
        <h2>Contactez-nous</h2>
        <p>
          Pour toute question ou demande spéciale, n'hésitez pas à nous contacter. Nous sommes à votre disposition
          pour rendre votre expérience encore plus mémorable.
        </p>
        <a href="mailto:contact@bongout.com" className={styles.ctaButton}>Envoyer un email</a>
      </section>
    </>
  );
}