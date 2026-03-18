const express = require("express");
const router = express.Router();

const prisma = require("../db");


// GET all exercises
router.get("/exercises", async (req, res) => {
  try {

    const exercises = await prisma.exercise.findMany({
      include: { workout: true }
    });

    res.json(exercises);

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


// GET exercises of one workout
router.get("/workouts/:id/exercises", async (req, res) => {
  try {

    const { id } = req.params;

    const exercises = await prisma.exercise.findMany({
      where: { workoutId: id }
    });

    res.json(exercises);

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


// CREATE exercise
router.post("/exercises", async (req, res) => {
  try {

    const { name, sets, reps, weight, workoutId } = req.body;

    // check workout exists
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId }
    });

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const exercise = await prisma.exercise.create({
      data: {
        name,
        sets,
        reps,
        weight: weight ? parseFloat(weight) : null,
        workoutId
      }
    });

    res.status(201).json(exercise);

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


// UPDATE exercise
router.put("/exercises/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const { name, sets, reps, weight } = req.body;

    const updatedExercise = await prisma.exercise.update({
      where: { id },
      data: {
        name,
        sets,
        reps,
        weight: weight ? parseFloat(weight) : null
      }
    });

    res.json(updatedExercise);

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


// DELETE exercise
router.delete("/exercises/:id", async (req, res) => {
  try {

    const { id } = req.params;

    await prisma.exercise.delete({
      where: { id }
    });

    res.json({ message: "Exercise deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


module.exports = router;