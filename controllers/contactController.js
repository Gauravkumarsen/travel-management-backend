const Contact = require('../models/contact');

exports.submitContact = async (req, res) => {
  try {
    const { name,email,message } = req.body;
    const newContact = new Contact({ name,email,message  });
    const savedContact = await newContact.save();
    res.status(201).json({ savedContact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};
