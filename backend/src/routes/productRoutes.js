import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/productController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for product management
router.route('/').get(getProducts).post(authenticateToken, createProduct);

router
  .route('/:productId')
  .get(getProduct)
  .put(authenticateToken, updateProduct)
  .delete(authenticateToken, deleteProduct);

export default router;
