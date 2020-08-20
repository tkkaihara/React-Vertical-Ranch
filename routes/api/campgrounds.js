const express = require("express"),
  auth = require("../../middleware/auth"),
  router = express.Router();

// Campground Model
const Campground = require("../../models/Campground"),
  Booking = require("../../models/Booking");

// @route GET api/campgrounds
// @desc Get all campgrounds
// @access Public
router.get("/", (req, res) => {
  Campground.find()
    .sort({ name: 1 })
    .then((campgrounds) => res.json(campgrounds))
    .catch((error) => {
      console.log("error: ", error);
    });
});

// @route POST api/campgrounds
// @desc Create a campground
// @access Private
router.post("/", auth, (req, res) => {
  const newCampground = new Campground({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
  });

  newCampground.save().then((campground) => res.json(campground));
});

// @route PUT api/campgrounds/:id
// @desc Update a campground
// @access Private
router.put("/:id", auth, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
    err,
    result
  ) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Campground updated");
  });
});

// @route DELETE api/campgrounds/:id
// @desc Delete a campground
// @access Private
router.delete("/:id", auth, (req, res, next) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (campground.bookings) {
      Booking.deleteMany(
        {
          "_id": {
            $in: campground.bookings,
          },
        },
        function (err) {
          if (err) return next(err);
          campground.remove();
        }
      );
    }
  });
});

module.exports = router;
