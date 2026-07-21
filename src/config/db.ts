import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;
    if (!mongoUri || !dbName) {
      throw new Error('MONGO_URI or DB_NAME is not defined in the environment variables');
    }

    const conn = await mongoose.connect(mongoUri, {
      dbName,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
