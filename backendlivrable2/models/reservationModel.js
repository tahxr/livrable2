import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';
import User from './user.js'; // Assurez-vous que vous importez le bon modèle

const Reservation = sequelize.define('Reservation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    time: { type: DataTypes.STRING, allowNull: false },
    guests: { type: DataTypes.INTEGER, allowNull: false },
    userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
            model: User, // Associe cette clé étrangère à la table `Users`
            key: 'id'
        }
    },
}, {
    timestamps: true
});

// Définir l'association entre `User` et `Reservation`
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

export default Reservation;
