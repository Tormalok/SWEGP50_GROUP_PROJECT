# E-commerce API

This is a RESTful API for an e-commerce application. It handles user authentication, product management, order management, and cart management.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Endpoints](#endpoints)
   - [User Routes](#user-routes)
   - [Product Routes](#product-routes)
   - [Order Routes](#order-routes)
   - [Cart Routes](#cart-routes)
4. [Models](#models)
   - [User Model](#user-model)
   - [Product Model](#product-model)
   - [Order Model](#order-model)
   - [Cart Model](#cart-model)
5. [Authentication Middleware](#authentication-middleware)
6. [Error Handling](#error-handling)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Tormalok/SWEGP50_GROUP_PROJECT.git
cd e-commerce-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a \`.env\` file for your environment variables:

```bash
touch .env
```

Add the following variables to your \`.env\` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Run the server:

```bash
npm start
```

## Usage

### Server Setup

```javascript
import express from 'express';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import connectDB from './config/db.js';

const port = process.env.PORT || 5000;

// Connecting to database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);

// Server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan.bold);
});
```

## Endpoints

### User Routes

- \`GET /api/users\` - Get all users (Private)
- \`POST /api/users\` - Create a new user (Public)
- \`POST /api/users/login\` - Login a user (Public)
- \`GET /api/users/me\` - Get current user's profile (Private)
- \`PUT /api/users/me\` - Update current user's profile (Private)
- \`GET /api/users/:userId\` - Get a user by ID (Private)
- \`PUT /api/users/:userId\` - Update a user by ID (Private)
- \`DELETE /api/users/:userId\` - Delete a user by ID (Private)

### Product Routes

- \`GET /api/products\` - Get all products (Public)
- \`POST /api/products\` - Create a new product (Private)
- \`GET /api/products/:productId\` - Get a product by ID (Public)
- \`PUT /api/products/:productId\` - Update a product by ID (Private)
- \`DELETE /api/products/:productId\` - Delete a product by ID (Private)

### Order Routes

- \`GET /api/orders\` - Get all orders (Private)
- \`POST /api/orders\` - Create a new order (Private)
- \`GET /api/orders/:orderId\` - Get an order by ID (Private)
- \`PUT /api/orders/:orderId\` - Update an order by ID (Private)
- \`DELETE /api/orders/:orderId\` - Delete an order by ID (Private)

### Cart Routes

- \`GET /api/carts\` - Get the current cart (Private)
- \`POST /api/carts\` - Add items to the cart (Private)
- \`PUT /api/carts\` - Update items in the cart (Private)
- \`DELETE /api/carts\` - Remove items from the cart (Private)

## Models

### User Model

```javascript
import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
street: { type: String, required: false },
city: { type: String, required: false, trim: true },
region: { type: String, required: false },
postalCode: { type: String, required: false, trim: true },
country: { type: String, required: false, trim: true },
}, { \_id: false });

const userSchema = mongoose.Schema({
email: { type: String, required: true, trim: true },
password: { type: String, required: true },
firstName: { type: String, required: false, trim: true },
lastName: { type: String, required: false, trim: true },
address: { type: addressSchema, required: false },
phoneNumber: { type: String, required: false },
dateOfBirth: { type: Date, required: false },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
```

### Product Model

```javascript
import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
```

### Order Model

```javascript
import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      region: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
```

### Cart Model

```javascript
import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
```

## Authentication Middleware

### authMiddleware.js

```javascript
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is invalid' });

    req.user = user;
    next();
  });
};

export default authenticateToken;
```

## Error Handling

Basic error handling is implemented in each controller. If an error occurs, the server logs the error and responds with a status code and message indicating the type of error.

### Example Error Handling in Controller

```javascript
// @desc Get all users
// @route GET '/api/users'
// @access Private
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users', error);

    return res.status(500).json({ message: 'Error fetching users' });
  }
};
```
