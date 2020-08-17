const express = require("express"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  dotenv = require("dotenv").config(),
  auth = require("../../middleware/auth"),
  router = express.Router({ mergeParams: true });

// User Model
const User = require("../../models/User");

// @route POST api/auth
// @desc Auth user
// @access Public
router.post("/", function (req, res) {
  const { email, password } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user)
      return res
        .status(400)
        .json({ msg: "User does not exists, please register." });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
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

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
