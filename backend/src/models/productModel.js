import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
