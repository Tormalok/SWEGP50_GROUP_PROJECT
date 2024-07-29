import mongoose from 'mongoose';

// Defining the address schema
const addressSchema = mongoose.Schema(
  {
    street: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
      trim: true,
    },
    region: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
      trim: true,
    },
    country: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { _id: false } // Prevent creation of an _id field for the address sub-document
);

// Defining the user schema
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: addressSchema,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

export default User;
