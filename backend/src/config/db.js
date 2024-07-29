import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Connecting to database
    const conn = await mongoose.connect(process.env.DB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // Error found
    console.error('Error connecting to database', error);

    process.exit(1);
  }
};

export default connectDB;
