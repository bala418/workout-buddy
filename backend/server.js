require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const workoutRouter = require("./routes/workouts");
const userRoutes = require("./routes/user");
// express app
const app = express();
const morgan = require("morgan");

// middleware
// used to parse the body of the request
app.use(express.json());
app.use(morgan("combined"));

// display a html file when the root path is hit
app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

// used to parse the url
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// use the routes only when the following path is hit
app.use("/api/workouts", workoutRouter);
app.use("/api/user", userRoutes);

// connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 4000");
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
