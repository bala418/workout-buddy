require("dotenv").config();
const express = require("express");
const workoutRouter = require("./routes/workouts");
// express app
const app = express();

// middleware
// used to parse the body of the request
app.use(express.json());
// used to parse the url
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// use the routes only when the following path is hit
app.use("/api/workouts", workoutRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
