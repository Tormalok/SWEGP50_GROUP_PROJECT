import express from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controller/orderController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for order management
router
  .route('/')
  .get(authenticateToken, getOrders)
  .post(authenticateToken, createOrder);

router
  .route('/:orderId')
  .get(authenticateToken, getOrder)
  .put(authenticateToken, updateOrder)
  .delete(authenticateToken, deleteOrder);

export default router;
