import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Contrôleur pour l'inscription (ajout d'un utilisateur)
export const register = async (req, res) => {
    try {
        console.log("Données reçues :", req.body);
        const { firstname, lastname, email, password,role } = req.body;
        const user = await User.create({ firstname, lastname, email, password,role: role || 'user' });
        res.status(201).json({ message: "Utilisateur créé avec succès", user });
    } catch (error) {
        console.error("Erreur serveur :", error);  
        res.status(500).json({ error: error.message });
    }
};

// Contrôleur pour la connexion
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Renvoyer le token et les informations de l'utilisateur
        res.json({ 
            message: "Connexion réussie", 
            token,
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Contrôleur pour récupérer la liste des utilisateurs
export const userList = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs sans le mot de passe
        const user = await User.findAll({
            attributes: { exclude: ['password'] },  // Utiliser 'password' au lieu de 'mot_de_passe'
        });
        
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
/**
 * Récupérer la liste des utilisateurs (🔒 réservé aux admins)
 */
// Contrôleur pour récupérer la liste des utilisateurs



export const deleteUser = async (req, res) => {
    //Il faut l'Id ou le parametre de selection
    const { id } = req.params

    try {
        const result = await User.destroy({ where: { id } })
        res.status(200).json({ message: result })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
export const userById = async (req, res) => {
    const { id } = req.params
    // console.log("id", id)
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['mot_de_passe'] }, // Ne pas retourner le mot de passe
            include: [
                "Department", // On pourra utiliser le model ici egalement
                {
                    model: Role,
                    through: {  // Table intermediaire requis meme sans valeur 
                        attributes: []  //Aucun champ de la table intermediaire retourne
                    }
                }
            ]
        })
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, role, password } = req.body;

    try {
        // Find existing user
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // If there's a new password, hash it
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Update other fields if provided
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save();

        return res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error updating user.", error: error.message });
    }
};