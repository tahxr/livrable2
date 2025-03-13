import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/connection.js';
import authRoutes from './routes/userRoute.js';
import reservationRoutes from './routes/reservationRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', authRoutes);
//app.use('/api/reservations', reservationRoutes);
// Route de réservation
app.use('/api/reservations', reservationRoutes); // Assure-toi que c'est bien utilisé

sequelize.sync().then(() => console.log("✅ Base de données synchronisée"));

app.listen(5000, () => console.log('🚀 Serveur en écoute sur le port 5000'));
