// verifyToken.js

import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Accès refusé, token manquant" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajoute l'utilisateur à la requête
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token invalide" });
    }
}

export function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Accès refusé, utilisateur non authentifié" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès refusé, permission insuffisante" });
        }

        next();
    };
}
