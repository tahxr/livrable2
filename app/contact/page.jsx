"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "@/app/contact/contact.module.css";
import Formulaire from "@/components/Formulaire";

export default function Contact() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (<>
        <div className={styles.container}>
            <h1>NOUS JOINDRE</h1>
            <p>Contactez-nous par téléphone, via notre formulaire en ligne et trouvez nos adresses.</p>

            <div className={styles.section}>
                <h2>Service à la clientèle et reservation</h2>
            </div>

            <div className={styles.accordion}>
                {["coordonnees", "horaire"].map((section) => (
                    <div key={section} className={styles.accordionItem}>
                        <button onClick={() => toggleSection(section)} className={styles.accordionButton}>
                            {section === "coordonnees" ? "COORDONNÉES" : "HORAIRE"}
                            <span className={styles.icon}>{openSection === section ? "−" : "+"}</span>
                        </button>

                        {/* Animation d'ouverture */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: openSection === section ? "auto" : 0, opacity: openSection === section ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className={styles.accordionContent}>

                            {section === "coordonnees" ? (
                                <div>
                                    <p>175 Rue Sainte-Catherine O, Montréal, QC H2X 1Y9</p>
                                    <p>Téléphone : +1 514-555-1234</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Lundi - Vendredi : 9h - 18h</p>
                                    <p>Samedi - Dimanche : 10h - 16h</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>

        <Formulaire />
    </>
    );
}
