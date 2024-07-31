import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

// @desc Get all carts
// @route GET '/api/carts'
// @access Private
const getCarts = async (req, res) => {
  try {
    // Fetching all carts from the database
    const carts = await Cart.find({})
      .populate('user', 'email')
      .populate('products.product', 'name price');
    res.status(200).json(carts);
  } catch (error) {
    console.error('Error fetching carts', error);
    res.status(500).json({ message: 'Error fetching carts' });
  }
};

// @desc Get a single cart
// @route GET '/api/carts/:cartId'
// @access Private
const getCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    // Validating cart Id
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    // Fetching the cart from the database
    const cart = await Cart.findById(cartId)
      .populate('user', 'email')
      .populate('products.product', 'name price');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart', error);
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

// @desc Create a new cart
// @route POST '/api/carts'
// @access Private
const createCart = async (req, res) => {
  const { user, products, totalPrice } = req.body;

  try {
    // Validating required fields
    if (!user || !products || !totalPrice) {
      return res
        .status(400)
        .json({ message: 'User, products, and total price are required' });
    }

    // Checking if user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validating products
    for (const product of products) {
      const existingProduct = await Product.findById(product.product);
      if (!existingProduct) {
        return res
          .status(404)
          .json({ message: `Product not found: ${product.product}` });
      }
    }

    // Creating the cart
    const cart = new Cart({ user, products, totalPrice });
    const createdCart = await cart.save();

    res.status(201).json(createdCart);
  } catch (error) {
    console.error('Error creating cart', error);
    res.status(500).json({ message: 'Error creating cart' });
  }
};

// @desc Update a cart
// @route PUT '/api/carts/:cartId'
// @access Private
const updateCart = async (req, res) => {
  const { cartId } = req.params;
  const { products, totalPrice } = req.body;

  try {
    // Validating cart Id
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    // Finding the cart from the database
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Updating cart details
    if (products) {
      for (const product of products) {
        const existingProduct = await Product.findById(product.product);
        if (!existingProduct) {
          return res
            .status(404)
            .json({ message: `Product not found: ${product.product}` });
        }
      }
      cart.products = products;
    }
    if (totalPrice) {
      cart.totalPrice = totalPrice;
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating cart', error);
    res.status(500).json({ message: 'Error updating cart' });
  }
};

// @desc Delete a cart
// @route DELETE '/api/carts/:cartId'
// @access Private
const deleteCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    // Validating cart Id
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    // Finding and deleting the cart from the database
    const cart = await Cart.findByIdAndDelete(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting cart', error);
    res.status(500).json({ message: 'Error deleting cart' });
  }
};

export { getCarts, getCart, createCart, updateCart, deleteCart };
