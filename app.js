// backend/app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const modelRoutes = require('./routes/modelRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/models', authMiddleware, modelRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);
app.use('/api/users', authMiddleware, roleMiddleware('admin'), userRoutes)
app.use('/api/upload', uploadRoutes);

module.exports = app;
