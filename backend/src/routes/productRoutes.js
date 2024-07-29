import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/productController.js';
const router = express.Router();

router.route('/').get(getProducts).post(createProduct);

router
  .route('/:productId')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
