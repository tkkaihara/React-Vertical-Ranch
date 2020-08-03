const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  app = express(),
  campgrounds = require("./routes/api/campgrounds");

// bodyParser Middleware
app.use(bodyParser.json());

// Database config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/campgrounds", campgrounds);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
