const express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  path = require("path"),
  app = express(),
  dotenv = require("dotenv").config(),
  campgrounds = require("./routes/api/campgrounds"),
  bookings = require("./routes/api/bookings");

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Database config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/campgrounds", campgrounds);
app.use("/api/campgrounds/:id/bookings", bookings);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function (
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
