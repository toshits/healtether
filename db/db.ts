import Mongoose from 'mongoose'
import 'dotenv/config'

let MONGODB_URL = process.env.MONGO_PUBLIC_URL || 'MONGODB_URL'

export const connectDB = async () => {
    try {
        await Mongoose.connect(MONGODB_URL);
        console.log('Connected to MongoDB using Mongoose');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
