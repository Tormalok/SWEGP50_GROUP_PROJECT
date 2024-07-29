import express from 'express';
import {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
} from '../controller/cartController.js';
const router = express.Router();

router.route('/').get(getCarts).post(createCart);

router.route('/:cartId').get(getCart).put(updateCart).delete(deleteCart);

export default router;
