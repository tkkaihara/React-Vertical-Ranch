const mongoose = require("mongoose"),
  User = require("./User");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.String,
    ref: "User",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date_range: Array,
});

module.exports = mongoose.model("Booking", BookingSchema);
