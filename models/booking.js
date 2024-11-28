const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  dest: { type: String, required: true }, 
  checkin: { type: String, required: true },
  checkout: { type: Object, required: true }, 
  noofpeople: { type: String, default: 'Pending' }, // Pending, Confirmed, Cancelled
});

module.exports = mongoose.model('Booking', bookingSchema);
