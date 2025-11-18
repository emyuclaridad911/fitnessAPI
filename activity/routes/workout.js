const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workout");
const { verifyToken } = require("../auth");

// Add a new workout
router.post("/addWorkout", verifyToken, workoutController.addWorkout);

// Get all workouts of the logged-in user
router.get("/getMyWorkouts", verifyToken, workoutController.getWorkouts);

// Update a workout by ID
router.patch("/updateWorkout/:id", verifyToken, workoutController.updateWorkout);

// Delete a workout by ID
router.delete("/deleteWorkout/:id", verifyToken, workoutController.deleteWorkout);

// Mark a workout as completed by ID
router.patch("/completeWorkoutStatus/:id",verifyToken,workoutController.completeWorkoutStatus);

module.exports = router;
