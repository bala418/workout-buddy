const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");

// get all routes
router.get("/", (req, res) => {
  res.json({ message: "Get all workouts" });
});

// get a single workout
router.get("/:id", (req, res) => {
  res.json({ message: "Get a single workout" });
});

// POST a new workout
router.post("/", async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({
      title,
      reps,
      load,
    });

    res.status(201).json(workout); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete a workout
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete a workout" });
});

// update a workout
router.patch("/:id", (req, res) => {
  res.json({ message: "Update a workout" });
});

module.exports = router;
