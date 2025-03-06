// lib/mysql.js
import mysql from "mysql2";

const db = mysql.createPool({
    host: "localhost", // Remplacez par votre hôte
    user: "root", // Remplacez par votre utilisateur MySQL
    password: "", // Remplacez par votre mot de passe
    database: "db_bongout", // Remplacez par le nom de votre base de données
});

export default db;
