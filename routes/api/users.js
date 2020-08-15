const express = require("express"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  dotenv = require("dotenv").config(),
  router = express.Router({ mergeParams: true });

// User Model
const User = require("../../models/User"),
  Booking = require("../../models/Booking"),
  Campground = require("../../models/Campground");

// @route POST api/users
// @desc Register new user
// @access Public
router.post("/", function (req, res) {
  const { first_name, last_name, email, password } = req.body;

  // Simple Validation
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user)
      return res
        .status(400)
        .json({ msg: "A user with that email already exists" });

    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 1800 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
