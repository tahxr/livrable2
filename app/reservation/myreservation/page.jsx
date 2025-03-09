"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";  // N'oublie pas d'importer js-cookie pour récupérer le token
import styles from "@/app/reservation/reservation.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Récupérer l'ID de l'utilisateur connecté
  const userId = Cookies.get("userId"); // Exemple : remplacer par l'ID de l'utilisateur actuel
console.log("UserID dans React:", userId); 
  useEffect(() => {
    
    const fetchReservations = async () => {
      const token = Cookies.get("token"); // Récupère le token depuis les cookies
  
      if (!token) {
        setError("Token manquant");
        setLoading(false);
        return;
      }
  
      try {
        // Ajouter le token dans les en-têtes de la requête
        const response = await axios.get(`http://localhost:5000/api/reservations/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
          }
        });
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        // Log de l'erreur avec détails
        console.error("Erreur lors de la récupération des réservations : ", err.response || err.message);
        setError("Une erreur interne est survenue. Veuillez réessayer plus tard.");
        setLoading(false);
      }
    };
  
    fetchReservations();
  }, [userId]);
  

  if (loading) {
    return <p>Chargement des réservations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.reservationsContainer}>
      <h2>Mes réservations</h2>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Nombre de personnes</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td>{reservation.guests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
