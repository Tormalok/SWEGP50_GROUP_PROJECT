import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// @desc Get all users
// @route GET '/api/users'
// @access Private
const getUsers = async (req, res) => {
  try {
    // Finding all users from the database
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(users);
  } catch (error) {
    // For server side
    console.error('Error fetching users', error);

    // For users
    return res.status(500).json({ message: 'Error fetching users' });
  }
};

// @desc Get a user
// @route GET '/api/users/:userId'
// @access Private
const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Validating user Id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    //  Finding user from the database
    const user = await User.findById(req.params.userId);

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    // For server side
    console.error('Error fetching user', error);

    // For client side
    return res.status(500).json({ message: 'Error fetching user' });
  }
};

// @desc Login a user
// @route POST '/api/users/login'
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and Password are required' });
    }

    // Finding the user from the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Comparing provided password with hashed stored password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    // Generating Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Successfully logged in', token });
  } catch (error) {
    // For server side
    console.error('Error logging in', error);

    // For client side
    return res.status(500).json({ message: 'Error logging in' });
  }
};

// @desc Create a user
// @route POST '/api/users'
// @access Public
const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fields validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and Password are required' });
    }

    // Checking if user exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword });

    // Saving user to database
    const createdUser = await user.save();

    const token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      _id: createdUser._id,
      email: createdUser.email,
      message: 'User created',
      token,
    });
  } catch (error) {
    // For server side
    console.error('Error creating user', error);

    // For client side
    res.status(500).json({ message: 'Error creating user' });
  }
};

// @desc Update a user
// @route PUT '/api/users/:userId'
// @access Private
const updateUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const {
      email,
      password,
      firstName = '',
      lastName = '',
      phoneNumber = '',
      address: {
        street = '',
        city = '',
        region = '',
        postalCode = '',
        country = '',
      } = {},
      dateOfBirth = null,
    } = req.body;

    // Finding user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Restricting to only authenticated user
    if (req.user.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'You can only update your own profile' });
    }

    // Updating fields
    if (email) user.email = email;
    if (password) {
      // Hashing updated password provided
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (street || city || region || postalCode || country) {
      user.address = {
        street,
        city,
        region,
        postalCode,
        country,
      };
    }
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;

    // Updating user data to database
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    // For server side
    console.error('Error updating user', error);

    // For client side
    res.status(500).json({ message: 'Error updating user' });
  }
};

// @desc Delete a user
// @route DELETE '/api/users/:userId'
// @access Private
const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Finding user from the database
    const user = await User.findById(userId);

    // Validating user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Restricting to only authenticated user
    if (req.user.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'You can only delete your profile' });
    }

    await User.findByIdAndRemove(userId);

    return res.status(204).json();
  } catch (error) {
    // For server side
    console.error('Error deleting user', error);

    // For client side
    return res.status(500).json({ message: 'Error deleting user' });
  }
};

export { getUsers, getUser, loginUser, createUser, updateUser, deleteUser };
