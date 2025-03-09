"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/app/dashboard/dashboard.module.css';  // Si tu veux utiliser un fichier CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  // Utiliser useEffect pour récupérer les utilisateurs et réservations au chargement de la page
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les utilisateurs
        const usersResponse = await axios.get('http://localhost:5000/api/auth/users');
        console.log(usersResponse.data);  // Log de la réponse utilisateurs

        // Assurer que nous accédons à la propriété `data` de la réponse
        setUsers(usersResponse.data.data || []);  // Accéder à `data` dans la réponse

        // Récupérer les réservations
        const reservationsResponse = await axios.get('http://localhost:5000/api/reservations/getreservation');
        console.log(reservationsResponse.data);  // Log de la réponse réservations
        setReservations(reservationsResponse.data);

      } catch (err) {
        setError("Une erreur est survenue lors de la récupération des données.");
        console.error(err);
      }
    };

    fetchData();
  }, []);  // Le tableau vide signifie que l'effet ne sera exécuté qu'une seule fois au montage

  // Fonction pour gérer l'édition d'un utilisateur
  const handleEdit = (userId) => {
    console.log("Modifier l'utilisateur avec l'ID :", userId);
    // Implémente la logique de modification (par exemple, ouvrir un formulaire de modification)
  };

  // Fonction pour gérer la suppression d'un utilisateur
  const handleDelete = (userId) => {
    console.log("Supprimer l'utilisateur avec l'ID :", userId);
    // Implémente la logique de suppression (par exemple, appeler une API pour supprimer)
    // Exemple d'appel API :
    axios.delete(`http://localhost:5000/api/auth/users/${userId}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== userId)); // Met à jour l'état des utilisateurs
        console.log('Utilisateur supprimé', response);
      })
      .catch(err => {
        console.error('Erreur lors de la suppression', err);
        setError('Une erreur est survenue lors de la suppression.');
      });
  };

  return (
    <div className={styles.container}>
      <h1>Tableau de bord de l'administrateur</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Liste des utilisateurs</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="4">Aucun utilisateur trouvé.</td></tr> 
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                 
                  <button onClick={() => handleEdit(user.id)} type="button" class="btn btn-warning  ">Modifier</button>
                  <button onClick={() => handleDelete(user.id)} type="button" class="btn btn-danger">Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2>Liste des réservations</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Nombre de personnes</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 ? (
            <tr><td colSpan="6">Aucune réservation trouvée.</td></tr> 
          ) : (
            reservations.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td>{reservation.guests}</td>
                <td>
                
                  <button onClick={() => handleEdit(reservation.id)} className="btn btn-warning btn-sm">Modifier</button>
                  <button onClick={() => handleDelete(reservation.id)} className="btn btn-danger btn-sm ml-2">Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
