const Workout = require("../models/Workout");
const { errorHandler } = require("../auth");

// Add a new workout
module.exports.addWorkout = async (req, res) => {
  try {
    const { name, duration, status = "pending" } = req.body;

    if (!name || !duration) {
      return res.status(400).json({ message: "Name and duration are required" });
    }

    const workout = await Workout.create({
      userId: req.user.id,
      name,
      duration,
      status
    });

    res.status(201).json(workout);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Get all workouts of the logged-in user
module.exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    res.status(200).json({ workouts });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Update a workout
module.exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, status } = req.body;

    const workout = await Workout.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { name, duration, status },
      { new: true }
    );

    if (!workout)
      return res.status(404).json({ message: "Workout not found" });

    res.status(200).json({
      message: "Workout updated successfully",
      updatedWorkout: workout
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Delete a workout
module.exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workout.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    if (!workout)
      return res.status(404).json({ message: "Workout not found" });

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports.completeWorkoutStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workout.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { status: "completed" },
      { new: true }
    );

    if (!workout)
      return res.status(404).json({ message: "Workout not found" });

    res.status(200).json({
      message: "Workout status updated successfully",
      updatedWorkout: workout
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
