import mongoose from 'mongoose';
import Product from '../models/productModel.js';

// @desc Get all products
// @route GET '/api/products'
// @access Public
const getProducts = async (req, res) => {
  try {
    // Finding all products from the database
    const products = await Product.find({});

    if (products.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(products);
  } catch (error) {
    // For server side
    console.error('Error fetching products', error);

    // For users
    return res.status(500).json({ message: 'Error fetching products' });
  }
};

// @desc Get a product
// @route GET '/api/products/:productId'
// @access Public
const getProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    // Validating product Id
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Finding product from the database
    const product = await Product.findById(req.params.productId);

    if (product) {
      return res.status(200).json(product);
    }

    return res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    // For server side
    console.error('Error fetching product', error);

    // For client side
    return res.status(500).json({ message: 'Error fetching product' });
  }
};

// @desc Create a product
// @route POST '/api/products'
// @access Private
const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  try {
    // Fields validation
    if (!name || !description || !price || !category || !stock) {
      return res
        .status(400)
        .json({
          message: 'Name, Description, Price, Category, and Stock are required',
        });
    }

    const product = new Product({ name, description, price, category, stock });

    // Saving product to database
    const createdProduct = await product.save();

    return res.status(201).json(createdProduct);
  } catch (error) {
    // For server side
    console.error('Error creating product', error);

    // For client side
    res.status(500).json({ message: 'Error creating product' });
  }
};

// @desc Update a product
// @route PUT '/api/products/:productId'
// @access Private
const updateProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const { name, description, price, category, stock } = req.body;

    // Finding product from the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Updating fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock) product.stock = stock;

    // Updating product data to database
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    // For server side
    console.error('Error updating product', error);

    // For client side
    res.status(500).json({ message: 'Error updating product' });
  }
};

// @desc Delete a product
// @route DELETE '/api/products/:productId'
// @access Private
const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    // Finding product from the database
    const product = await Product.findById(productId);

    // Validating product
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndRemove(productId);

    return res.status(204).json();
  } catch (error) {
    // For server side
    console.error('Error deleting product', error);

    // For client side
    return res.status(500).json({ message: 'Error deleting product' });
  }
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
