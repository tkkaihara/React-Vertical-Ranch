const express = require("express"),
  auth = require("../../middleware/auth"),
  router = express.Router({ mergeParams: true });

// booking Model
const Booking = require("../../models/Booking"),
  Campground = require("../../models/Campground");

// @route GET api/campgrounds/:id/bookings
// @desc Get all campground bookings
// @access Public
router.get("/:booking_id", function (req, res) {
  // find campground by id
  Booking.findById(req.params.booking_id)
    .then((booking) => res.json(booking))
    .then((booking) => console.log(booking))
    .catch((error) => {
      console.log("error: ", error);
    });
});

// @route POST api/campgrounds/:id/bookings
// @desc Create a booking
// @access Public
router.post("/", auth, (req, res) => {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      res.send("Campground not found...");
    } else {
      console.log(req.body);
      const newBooking = new Booking({
        id: req.body.id,
        user: req.body.user,
        user_id: req.body.user_id,
        date_range: req.body.date_range,
      });
      console.log("newbookdoksdogsdgajsingb", newBooking);
      // save booking
      newBooking.save();
      campground.bookings.push(newBooking);
      campground.save();
      res.send("Booking Saved!");
    }
  });
});

// @route DELETE api/campgrounds/:id/bookings/:booking_id
// @desc Delete a booking
// @access Private
router.delete("/:booking_id", auth, async (req, res) => {
  Booking.findByIdAndRemove(req.params.booking_id, function (err) {
    if (err) {
      res.send("Booking not deleted from booking collection.");
    }
    Campground.updateOne(
      { _id: req.params.id },
      { $pull: { bookings: req.params.booking_id } },
      (err) => {
        if (err) {
          return res.send("Campground booking not deleted");
        }
        return res.send("Booking deleted from campground collection");
      }
    );
  });
});

module.exports = router;
