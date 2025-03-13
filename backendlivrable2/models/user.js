import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { 
        type: DataTypes.ENUM('user', 'admin'), 
        allowNull: false, 
        defaultValue: 'user' // Par défaut, un utilisateur normal
    }
}, {
    timestamps: false
});

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

export default User;
