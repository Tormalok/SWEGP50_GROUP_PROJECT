import express from 'express';
import {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
} from '../controller/cartController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for cart management
router
  .route('/')
  .get(authenticateToken, getCarts)
  .post(authenticateToken, createCart);

router
  .route('/:cartId')
  .get(authenticateToken, getCart)
  .put(authenticateToken, updateCart)
  .delete(authenticateToken, deleteCart);

export default router;
