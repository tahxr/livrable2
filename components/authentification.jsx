"use client";

import { useState } from "react";
import styles from "./authentification.module.css";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function AuthForm() {
    const router = useRouter();
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "", // Nouveau champ Prénom
        lastname: "",  // Nouveau champ Nom
    });
    const [errors, setErrors] = useState({});
    const API_BASE_URL = "http://localhost:5000/api/auth";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (isRegister) {
            if (!formData.firstname.trim()) newErrors.firstname = "Le prénom est requis.";
            if (!formData.lastname.trim()) newErrors.lastname = "Le nom est requis.";
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

        const endpoint = isRegister ? `${API_BASE_URL}/register` : `${API_BASE_URL}/login`;

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log("Réponse de l'API :", data); // Vérifier ce que contient la réponse

            if (!res.ok) {
                throw new Error(data.message || "Une erreur s'est produite");
            }
            // Vérification de la présence de 'user' avant de le stocker
            // Vérification de la présence de 'user' avant de le stocker
            if (data && data.user) {
                console.log("Données utilisateur à stocker :", data.user);
                localStorage.setItem("user", JSON.stringify(data.user));  // Enregistrer l'utilisateur
                localStorage.setItem("token", data.token);  // Enregistrer le token

                // Si c'est une inscription, rediriger vers la page de connexion
                if (isRegister) {
                    alert("Inscription réussie !");
                    router.push("/authentification");  // Rediriger vers la page de connexion
                } else {
                    alert("Connexion réussie !");
                    window.location.href = "/reservation";  // Rediriger vers la page de réservation après la connexion
                }
            } else {
                console.error("Les données utilisateur sont manquantes ou invalides.");
            }
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
                                name="firstname"
                                placeholder="Prénom"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                            {errors.firstname && <div className={styles.error}>{errors.firstname}</div>}
                        </label>
                        <label>
                            <span>Nom :</span>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Nom"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                            {errors.lastname && <div className={styles.error}>{errors.lastname}</div>}
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
