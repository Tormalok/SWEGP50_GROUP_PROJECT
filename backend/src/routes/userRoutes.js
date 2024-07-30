import express from 'express';
import {
  getUsers,
  getUser,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser, // Import the new function
  updateCurrentUser, // Import the new function
} from '../controller/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for user management
router.route('/').get(authenticateToken, getUsers).post(createUser);
router.route('/login').post(loginUser);

// Route for current user profile
router
  .route('/me')
  .get(authenticateToken, getCurrentUser)
  .put(authenticateToken, updateCurrentUser);

router
  .route('/:userId')
  .get(authenticateToken, getUser)
  .put(authenticateToken, updateUser)
  .delete(authenticateToken, deleteUser);

export default router;
