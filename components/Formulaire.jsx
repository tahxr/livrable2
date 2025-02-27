'use client'

import { useActionState } from 'react';
import styles from './Formulaire.module.css';

export default function Formulaire() {
    /**
     * @param {FormData} formData 
     */
    const handleSubmit = (previousState, formData) => {
        const prenom = formData.get('prenom');
        const nom = formData.get('nom');
        const courriel = formData.get('courriel');
        const telephone = formData.get('telephone');
        const demande = formData.get('demande');
        const details = formData.get('details');

        let newState = {
            prenom: { valeur: '', erreur: null },
            nom: { valeur: '', erreur: null },
            courriel: { valeur: '', erreur: null },
            telephone: { valeur: '', erreur: null },
            demande: { valeur: '', erreur: null },
            details: { valeur: '', erreur: null }
        };

        let erreur = false;
        if (!prenom) {
            erreur = true;
            newState.prenom.erreur = 'Veuillez entrer votre prénom.';
        }
        if (!nom) {
            erreur = true;
            newState.nom.erreur = 'Veuillez entrer votre nom.';
        }
        if (!courriel) {
            erreur = true;
            newState.courriel.erreur = 'Veuillez entrer une adresse courriel.';
        } else if (!courriel.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
            erreur = true;
            newState.courriel.erreur = 'Veuillez entrer une adresse courriel valide.';
        }
        if (!telephone) {
            erreur = true;
            newState.telephone.erreur = 'Veuillez entrer votre numéro de téléphone.';
        }
        if (!demande) {
            erreur = true;
            newState.demande.erreur = 'Veuillez sélectionner la nature de la demande.';
        }
        if (!details) {
            erreur = true;
            newState.details.erreur = 'Veuillez fournir des détails sur votre demande.';
        }

        if (erreur) {
            newState.prenom.valeur = prenom;
            newState.nom.valeur = nom;
            newState.courriel.valeur = courriel;
            newState.telephone.valeur = telephone;
            newState.demande.valeur = demande;
            newState.details.valeur = details;
        }

        return newState;
    };

    const [formState, formAction] = useActionState(handleSubmit, {
        prenom: { valeur: '', erreur: null },
        nom: { valeur: '', erreur: null },
        courriel: { valeur: '', erreur: null },
        telephone: { valeur: '', erreur: null },
        demande: { valeur: '', erreur: null },
        details: { valeur: '', erreur: null }
    });

    return (
        <form action={formAction} className={styles.form} noValidate>
            <label>
                Prénom:
                <input type="text" name="prenom" className={styles.input} defaultValue={formState.prenom.valeur} />
                <div className={styles.erreur}>{formState.prenom.erreur}</div>
            </label>
            <label>
                Nom:
                <input type="text" name="nom" className={styles.input} defaultValue={formState.nom.valeur} />
                <div className={styles.erreur}>{formState.nom.erreur}</div>
            </label>
            <label>
                Courriel:
                <input type="email" name="courriel" defaultValue={formState.courriel.valeur} />
                <div className={styles.erreur}>{formState.courriel.erreur}</div>
            </label>
            <label>
                Téléphone:
                <input type="tel" name="telephone" defaultValue={formState.telephone.valeur} />
                <div className={styles.erreur}>{formState.telephone.erreur}</div>
            </label>
            <label>
                Nature de la demande:
                <select name="demande" defaultValue={formState.demande.valeur}>
                    <option value="">Sélectionner une option</option>
                    <option value="service">Service Client</option>
                    <option value="technique">Assistance Technique</option>
                </select>
                <div className={styles.erreur}>{formState.demande.erreur}</div>
            </label>
            <label>
                Détails de la demande:
                <textarea name="details" defaultValue={formState.details.valeur}></textarea>
                <div className={styles.erreur}>{formState.details.erreur}</div>
            </label>
            <button type="submit">Envoyer</button>
        </form>
    );
}
