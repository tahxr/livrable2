import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token"); // 🔥 Vérifie si le token est stocké en cookie

    // Si l'utilisateur n'a pas de token, le rediriger vers la page d'authentification
    if (!token) {
        return NextResponse.redirect(new URL("/authentification", req.url)); // 🔄 Redirige vers la page login
    }

    return NextResponse.next(); // ✅ Continue vers la page demandée si token présent
}

// 🔥 Spécifie les routes protégées
export const config = {
    matcher: ["/reservation/:path*"], // Protège toutes les pages sous /reservation
};
