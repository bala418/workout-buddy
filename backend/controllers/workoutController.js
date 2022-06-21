const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.json({ message: err });
  }
};

// get a single workout
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    } else {
      res.status(200).json(workout);
    }
  } catch (err) {
    res.json({ message: err });
  }
};

// POST a new workout
const createWorkout = async (req, res) => {
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
};

// delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    } else {
      res.status(200).json(workout);
    }
  } catch (err) {
    res.json({ message: err });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const workout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    } else {
      res.status(200).json(workout);
    }
  } catch (err) {
    res.json({ message: err });
  }
};
module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
};
