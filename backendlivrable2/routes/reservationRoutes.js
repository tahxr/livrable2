// routes/reservationRoutes.js
import express from 'express';
import { createReservation, getReservations,getUserReservations,deleteReservation,updateReservation } from '../controllers/reservationController.js';
import {verifyToken} from '../verifyToken.js';
const router = express.Router();

// Route pour créer une réservation
router.post('/',verifyToken, createReservation);

// Route pour obtenir toutes les réservations (optionnel)
router.get('/getreservation', getReservations);
router.get('/user/:userId', getUserReservations);

// NEW: Delete route
router.delete('/:id', verifyToken, deleteReservation);

router.put('/:id', verifyToken, updateReservation);


export default router;
