import { Router, Request, Response } from "express";
import prisma from "../db";

const router = Router();

// GET all workouts
router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await prisma.workout.findMany({
      include: { exercises: true }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching workouts" });
  }
});

// GET one workout
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const data = await prisma.workout.findUnique({
      where: { id },
      include: { exercises: true }
    });

    if (!data) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching workout" });
  }
});

// CREATE workout
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, duration, calories, date } = req.body;

    const data = await prisma.workout.create({
      data: {
        name,
        duration,
        calories,
        date: new Date(date)
      }
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error creating workout" });
  }
});

// UPDATE workout
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const data = await prisma.workout.update({
      where: { id },
      data: req.body
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error updating workout" });
  }
});

// DELETE workout
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    await prisma.workout.delete({
      where: { id }
    });

    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting workout" });
  }
});

export default router;