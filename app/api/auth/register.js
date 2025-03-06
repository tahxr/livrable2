// pages/api/auth/register.js
import db from "@/lib/mysql";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Méthode non autorisée" });
    }

    const {email, password,firstName, lastName } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        db.query("SELECT * FROM user WHERE email = ?", [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Erreur de la base de données" });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: "L'utilisateur existe déjà" });
            }

            // Hachage du mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insérer l'utilisateur dans la base de données
            db.query(
                "INSERT INTO user (email, password,firstName,lastName) VALUES (?, ?, ?, ?)",
                [email, hashedPassword,firstName, lastName, ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
                    }
                    res.status(201).json({ message: "Inscription réussie" });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export default handler;
