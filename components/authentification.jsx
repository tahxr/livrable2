"use client";

import { useState } from "react";
import styles from "./authentification.module.css"; // Assurez-vous que les styles sont bien importés

export default function AuthForm() {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "", // Nouveau champ Prénom
        lastName: "",  // Nouveau champ Nom
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (isRegister) {
            if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis.";
            if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "L'adresse e-mail est requise.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "L'adresse e-mail n'est pas valide.";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Le mot de passe est requis.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!validateForm()) return;
        
        const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
        
        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.message || "Une erreur s'est produite");
            
            alert(isRegister ? "Inscription réussie !" : "Connexion réussie !");
        } catch (err) {
            setErrors({ general: err.message });
        }
    };

    return (
        <div className={styles.authFormContainer}>
            <h2>{isRegister ? "Inscription" : "Connexion"}</h2>
            {errors.general && <p className={styles.errorMessage}>{errors.general}</p>}
            <form onSubmit={handleSubmit} className={styles.authForm}>
                {isRegister && (
                    <>
                        <label>
                            <span>Prénom :</span>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Prénom"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
                        </label>
                        <label>
                            <span>Nom :</span>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Nom"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
                        </label>
                    </>
                )}
                <label>
                    <span>Email :</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <div className={styles.error}>{errors.email}</div>}
                </label>
                <label>
                    <span>Mot de passe :</span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <div className={styles.error}>{errors.password}</div>}
                </label>
                <button type="submit">
                    {isRegister ? "S'inscrire" : "Se connecter"}
                </button>
            </form>
            <p className={styles.toggleText}>
                {isRegister ? "Déjà un compte ?" : "Pas encore de compte ?"}
                <a
                    href="#"
                    onClick={() => setIsRegister(!isRegister)}
                    className={styles.toggleLink}
                >
                    {isRegister ? "Se connecter" : "S'inscrire"}
                </a>
            </p>
        </div>
    );
}
