import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

// @desc Get all orders
// @route GET '/api/orders'
// @access Private
const getOrders = async (req, res) => {
  try {
    // Fetching all orders from the database
    const orders = await Order.find({})
      .populate('user', 'email')
      .populate('products.product', 'name price');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// @desc Get a single order
// @route GET '/api/orders/:orderId'
// @access Private
const getOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Validating order Id
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    // Fetching the order from the database
    const order = await Order.findById(orderId)
      .populate('user', 'email')
      .populate('products.product', 'name price');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// @desc Create a new order
// @route POST '/api/orders'
// @access Private
const createOrder = async (req, res) => {
  const { user, products, totalPrice, status } = req.body;

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

    // Creating the order
    const order = new Order({ user, products, totalPrice, status });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// @desc Update an order
// @route PUT '/api/orders/:orderId'
// @access Private
const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    // Validating order Id
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    // Finding the order from the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Updating order status
    if (status) {
      order.status = status;
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order', error);
    res.status(500).json({ message: 'Error updating order' });
  }
};

// @desc Delete an order
// @route DELETE '/api/orders/:orderId'
// @access Private
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Validating order Id
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    // Finding and deleting the order from the database
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting order', error);
    res.status(500).json({ message: 'Error deleting order' });
  }
};

export { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
