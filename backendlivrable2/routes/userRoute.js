import express from 'express';
import { userList,register, login,deleteUser,updateUser } from '../controllers/authController.js';
import {verifyToken,authorize} from '../verifyToken.js';

const router = express.Router();


//router.get('/users', userList);

router.post('/register', register);
router.post('/login', login);

router.get('/users', userList);

router.delete('/users/:id', verifyToken, deleteUser);

// NEW: Update a user
router.put('/users/:id', verifyToken, updateUser);

export default router;
