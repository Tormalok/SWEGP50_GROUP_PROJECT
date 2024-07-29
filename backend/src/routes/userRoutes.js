import express from 'express';
import {
  getUsers,
  getUser,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controller/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(authenticateToken, getUsers).post(createUser);

router.route('/login').post(loginUser);

router
  .route('/:userId')
  .get(authenticateToken, getUser)
  .put(authenticateToken, updateUser)
  .delete(authenticateToken, deleteUser);

export default router;
