const Auth = require('../models/auth'); // Importing the model
const bcrypt = require('bcrypt'); // For password hashing

// Signup controller
const signupController = async (req, res) => {
  try {
    const { name, email, pass } = req.body;

    // Validate required fields
    if (!name || !email || !pass) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the email already exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create a new user
    const newUser = new Auth({
      name,
      email,
      pass: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { signupController };
