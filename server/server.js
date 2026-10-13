import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import Course from './models/Course.js';
import { defaultCourses } from './controllers/courseController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database Connection with graceful fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bytecode_trainings';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log('✅ MongoDB Connected successfully.');

    // Seed courses if collection is empty
    const count = await Course.countDocuments();
    if (count === 0) {
      await Course.insertMany(defaultCourses);
      console.log('🌱 Seeded default Bytecode courses into MongoDB.');
    }
  } catch (err) {
    console.warn('⚠️ MongoDB connection could not be established. Running with in-memory resilient fallback.');
  }
};

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/leads', leadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Bytecode Trainings MERN Backend',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'in-memory fallback mode',
    timestamp: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Bytecode Trainings Express Server running on http://localhost:${PORT}`);
});
