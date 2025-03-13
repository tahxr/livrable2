"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "@/app/reservation/reservation.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchReservations = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("Token manquant");
        setLoading(false);
        return;
      }

      try {
        // Retrieve user reservations
        const response = await axios.get(
          `http://localhost:5000/api/reservations/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération :", err.response || err.message);
        setError("Une erreur interne est survenue.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  // ---- NEW: Delete reservation handler ----
  const handleDelete = async (reservationId) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // After successful deletion on backend, remove it from local state
      setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err.response || err.message);
      setError("Impossible de supprimer la réservation.");
    }
  };

  if (loading) return <p>Chargement des réservations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.reservationsContainer}>
      <h2>Mes réservations</h2>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Nombre de personnes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.phone}</td>
                <td>{new Date(reservation.date).toISOString().split("T")[0]}</td>
                <td>{reservation.time}</td>
                <td>{reservation.guests}</td>
                <td>
                  {/* NEW: A button to delete */}
                  <button onClick={() => handleDelete(reservation.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
