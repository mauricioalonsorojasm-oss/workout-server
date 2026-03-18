const express = require("express");
const router = express.Router();

const prisma = require("../db");


// GET all workouts
router.get("/workouts", async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      include: { exercises: true }
    });

    res.json(workouts);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching workouts" });
  }
});


// GET workout by id
router.get("/workouts/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const workout = await prisma.workout.findUnique({
      where: { id: id },
      include: { exercises: true }
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json(workout);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching workout" });
  }
});


// CREATE workout
router.post("/workouts", async (req, res) => {
  try {

    const { name, duration, calories, date } = req.body;

    const workout = await prisma.workout.create({
      data: {
        name,
        duration,
        calories,
        date: new Date(date)
      }
    });

    res.status(201).json(workout);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating workout" });
  }
});


// UPDATE workout
router.put("/workouts/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const { name, duration, calories, date } = req.body;

    const updatedWorkout = await prisma.workout.update({
      where: { id },
      data: {
        name,
        duration,
        calories,
        date: new Date(date)
      }
    });

    res.json(updatedWorkout);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating workout" });
  }
});


// DELETE workout
router.delete("/workouts/:id", async (req, res) => {
  try {

   const { id } = req.params;

    await prisma.workout.delete({
      where: { id }
    });

    res.json({ message: "Workout deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting workout" });
  }
});


module.exports = router;