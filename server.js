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

// database config
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

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
