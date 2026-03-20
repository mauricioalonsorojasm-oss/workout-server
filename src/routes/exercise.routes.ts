import { Router, Request, Response } from "express";
import prisma from "../db";

const router = Router();

// GET all exercises
router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await prisma.exercise.findMany({
      include: { workout: true }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching exercises" });
  }
});

// CREATE exercise
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, sets, reps, weight, workoutId } = req.body;

    if (!name || !sets || !reps || !workoutId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const data = await prisma.exercise.create({
      data: {
        name,
        sets,
        reps,
        weight,
        workoutId
      }
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error creating exercise" });
  }
});

// DELETE exercise
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    await prisma.exercise.delete({
      where: { id }
    });

    res.json({ message: "Exercise deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting exercise" });
  }
});

export default router;