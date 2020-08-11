const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: String,
  date_range: Array,
});

module.exports = mongoose.model("Booking", BookingSchema);
