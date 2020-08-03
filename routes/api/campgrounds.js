const express = require("express"),
  router = express.Router();

// Campground Model
const Campground = require("../../models/Campground");

// @route GET api/campgrounds
// @desc Get all campgrounds
// @access Public
router.get("/", (req, res) => {
  Campground.find()
    .sort({ name: -1 })
    .then((campgrounds) => res.json(campgrounds));
});

// @route POST api/campgrounds
// @desc Create a campground
// @access Private
router.post("/", (req, res) => {
  const newCampground = new Campground({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
  });

  newCampground.save().then((campground) => res.json(campground));
});

// @route DELETE api/campgrounds/:id
// @desc Delete a campground
// @access Private
router.delete("/:id", (req, res) => {
  Campground.findById(req.params.id)
    .then((campground) => campground.remove().then(res.json({ success: true })))
    .catch((err) =>
      res.status(404).json({ success: false }).then(console.log(err))
    );
});

module.exports = router;
