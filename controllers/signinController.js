const Signin = require('../models/auth.js'); // Importing the Signup model
const bcrypt = require('bcrypt'); // For password comparison
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv');
const JWT_SECRET = process.env.JWT_SECRET || "10";
const signinController = async (req, res) => {
  try {
    const { email, pass } = req.body;

    // Validate required fields
    if (!email || !pass) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if the user exists
    const user = await Signin.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not exists' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET , 
      { expiresIn: '1h' } 
    );

    res.status(200).json({
      message: 'Signin successful!',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { signinController };
