"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/app/dashboard/dashboard.module.css';  // Optional CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  // NEW: State for editing a user
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: ""
  });

  // NEW: State for editing a reservation
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [editReservationForm, setEditReservationForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: ""
  });

  // Use effect to fetch users and reservations on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        // Fetch users with token in headers
        const usersResponse = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(usersResponse.data);  // Log the user response
        setUsers(usersResponse.data.data || []);

        // Fetch reservations (if this endpoint doesn't require a token, no header is needed)
        const reservationsResponse = await axios.get('http://localhost:5000/api/reservations/getreservation');
        console.log(reservationsResponse.data);
        setReservations(reservationsResponse.data);
      } catch (err) {
        setError("Une erreur est survenue lors de la récupération des données.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Function to handle deletion of a user with token (delete user is working)
  const handleDelete = (userId) => {
    console.log("Supprimer l'utilisateur avec l'ID :", userId);
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:5000/api/auth/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUsers(users.filter(user => user.id !== userId)); // Update the state
        console.log('Utilisateur supprimé', response);
      })
      .catch(err => {
        console.error('Erreur lors de la suppression', err);
        setError('Une erreur est survenue lors de la suppression.');
      });
  };

  // NEW: Function to begin editing a user
  const handleEditUser = (user) => {
    console.log("Modifier l'utilisateur avec l'ID :", user.id);
    setEditingUserId(user.id);
    setEditUserForm({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role
    });
  };

  // NEW: Function to save edited user data
  const handleSaveUserEdit = (userId) => {
    const token = localStorage.getItem("token");
    axios.put(`http://localhost:5000/api/auth/users/${userId}`, editUserForm, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Update local state for the edited user
        setUsers(users.map(user => user.id === userId ? { ...user, ...editUserForm } : user));
        setEditingUserId(null);
      })
      .catch(err => {
        console.error("Erreur lors de la modification de l'utilisateur", err);
        setError("Erreur lors de la modification de l'utilisateur.");
      });
  };

  // NEW: Function to cancel user editing
  const handleCancelUserEdit = () => {
    setEditingUserId(null);
    setEditUserForm({ firstname: "", lastname: "", email: "", role: "" });
  };

  // NEW: Function to begin editing a reservation
  const handleEditReservation = (reservation) => {
    console.log("Modifier la réservation avec l'ID :", reservation.id);
    setEditingReservationId(reservation.id);
    setEditReservationForm({
      name: reservation.name,
      email: reservation.email,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests
    });
  };

  // NEW: Function to save edited reservation data
  const handleSaveReservationEdit = (reservationId) => {
    const token = localStorage.getItem("token");
    axios.put(`http://localhost:5000/api/reservations/${reservationId}`, editReservationForm, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Update local state for the edited reservation
        setReservations(reservations.map(reservation => reservation.id === reservationId ? { ...reservation, ...editReservationForm } : reservation));
        setEditingReservationId(null);
      })
      .catch(err => {
        console.error("Erreur lors de la modification de la réservation", err);
        setError("Erreur lors de la modification de la réservation.");
      });
  };

  // NEW: Function to cancel reservation editing
  const handleCancelReservationEdit = () => {
    setEditingReservationId(null);
    setEditReservationForm({ name: "", email: "", date: "", time: "", guests: "" });
  };

  // NEW: Function to handle deletion of a reservation
  const handleDeleteReservation = (reservationId) => {
    console.log("Supprimer la réservation avec l'ID :", reservationId);
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:5000/api/reservations/${reservationId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setReservations(reservations.filter(reservation => reservation.id !== reservationId));
        console.log('Réservation supprimée', response);
      })
      .catch(err => {
        console.error('Erreur lors de la suppression de la réservation', err);
        setError('Une erreur est survenue lors de la suppression de la réservation.');
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
            users.map(user =>
              editingUserId === user.id ? (
                // Inline editing row for user
                <tr key={user.id}>
                  <td>
                    <input
                      type="text"
                      value={editUserForm.firstname}
                      onChange={(e) => setEditUserForm({ ...editUserForm, firstname: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editUserForm.lastname}
                      onChange={(e) => setEditUserForm({ ...editUserForm, lastname: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editUserForm.email}
                      onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      value={editUserForm.role}
                      onChange={(e) => setEditUserForm({ ...editUserForm, role: e.target.value })}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSaveUserEdit(user.id)} className="btn btn-success btn-sm">Sauvegarder</button>
                    <button onClick={handleCancelUserEdit} className="btn btn-secondary btn-sm">Annuler</button>
                  </td>
                </tr>
              ) : (
                // Normal display row for user
                <tr key={user.id}>
                  <td>{user.firstname} {user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleEditUser(user)} type="button" className="btn btn-warning">Modifier</button>
                    <button onClick={() => handleDelete(user.id)} type="button" className="btn btn-danger">Supprimer</button>
                  </td>
                </tr>
              )
            )
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
            reservations.map(reservation =>
              editingReservationId === reservation.id ? (
                // Inline editing row for reservation
                <tr key={reservation.id}>
                  <td>
                    <input
                      type="text"
                      value={editReservationForm.name}
                      onChange={(e) => setEditReservationForm({ ...editReservationForm, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editReservationForm.email}
                      onChange={(e) => setEditReservationForm({ ...editReservationForm, email: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editReservationForm.date}
                      onChange={(e) => setEditReservationForm({ ...editReservationForm, date: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editReservationForm.time}
                      onChange={(e) => setEditReservationForm({ ...editReservationForm, time: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editReservationForm.guests}
                      onChange={(e) => setEditReservationForm({ ...editReservationForm, guests: e.target.value })}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSaveReservationEdit(reservation.id)} className="btn btn-success btn-sm">Sauvegarder</button>
                    <button onClick={handleCancelReservationEdit} className="btn btn-secondary btn-sm">Annuler</button>
                  </td>
                </tr>
              ) : (
                // Normal display row for reservation
                <tr key={reservation.id}>
                  <td>{reservation.name}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.time}</td>
                  <td>{reservation.guests}</td>
                  <td>
                    <button onClick={() => handleEditReservation(reservation)} className="btn btn-warning btn-sm">Modifier</button>
                    <button onClick={() => handleDeleteReservation(reservation.id)} className="btn btn-danger btn-sm ml-2">Supprimer</button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
