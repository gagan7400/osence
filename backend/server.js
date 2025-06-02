const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/database');
const errorMiddleware = require('./middleware/error');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
console.log(process.env)
// Connect to database
connectDatabase(process.env.MONGO_URL);

// Import routes
const userRoutes = require('./routes/userRoutes');

// Use routes  
app.use('/api/v1', userRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 