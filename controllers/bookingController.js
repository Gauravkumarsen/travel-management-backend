const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  try {
    const { dest, checkin, checkout, noofpeople } = req.body;
    const newBooking = new Booking({ dest, checkin, checkout, noofpeople });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};
