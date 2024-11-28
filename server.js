const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./connection/connection.js');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const signinRoutes = require('./routes/signinRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', bookingRoutes);
app.use('/api', contactRoutes);
app.use('/api', authRoutes);
app.use('/api', signinRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
