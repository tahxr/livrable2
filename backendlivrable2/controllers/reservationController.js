// controllers/reservationController.js
import Reservation from '../models/reservationModel.js';  // Assurez-vous que c'est le bon chemin
import {verifyToken} from '../verifyToken.js';
// Créer une nouvelle réservation
export const createReservation = async (req, res) => {
  const { name, email, phone, date, time, guests } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Vous devez être authentifié pour faire une réservation." });
  }
  const userId = req.user.id;  // Suppose que vous avez authentifié l'utilisateur et que son ID est dans req.user

  try {
    // Vérifier si tous les champs sont présents
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Créer la réservation dans la base de données
    const newReservation = await Reservation.create({
      name,
      email,
      phone,
      date,
      time,
      guests,
      userId,
    });

    // Répondre avec la réservation créée
    res.status(201).json({ message: 'Réservation enregistrée avec succès', reservation: newReservation });
  } catch (err) {
    console.error('Erreur lors de la réservation:', err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Obtenir toutes les réservations
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();  // Utilisez Reservation directement
    res.status(200).json(reservations);
  } catch (err) {
    console.error('Erreur lors de la récupération des réservations:', err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Obtenir les réservations d'un utilisateur
// Exemple de code pour récupérer les réservations de l'utilisateur
export const getUserReservations = async (req, res) => {
    try {
        console.log("Headers :", req.headers);
        console.log("Params ID :", req.params);

        const userId = parseInt(req.params.userId, 10); // Convertit en entier

if (isNaN(userId)) {
    return res.status(400).json({ message: "ID utilisateur invalide !" });
}

        if (!userId) {
            console.error("ID utilisateur manquant !");
            return res.status(400).json({ message: "ID utilisateur manquant" });
        }

        const reservations = await Reservation.findAll({ where: { userId } });

        console.log("Réservations trouvées :", reservations);
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};


// reservationController.js
// ...

export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    // If you only want the "owner" to delete, then also check user ID matches reservation.userId
    const reservation = await Reservation.findOne({ where: { id } });
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await reservation.destroy();
    return res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// In reservationController.js
export const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, date, time, guests } = req.body;
  try {
    const reservation = await Reservation.findOne({ where: { id } });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    // Update reservation fields
    reservation.name = name || reservation.name;
    reservation.email = email || reservation.email;
    reservation.phone = phone || reservation.phone;
    reservation.date = date || reservation.date;
    reservation.time = time || reservation.time;
    reservation.guests = guests || reservation.guests;

    await reservation.save();

    return res.status(200).json({ message: "Reservation updated successfully.", reservation });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

