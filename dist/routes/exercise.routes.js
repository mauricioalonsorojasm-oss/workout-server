"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const router = express.Router();
const prisma = require("../db");
// GET all exercises
router.get("/exercises", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield prisma.exercise.findMany({
            include: { workout: true }
        });
        res.json(exercises);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// GET exercises of one workout
router.get("/workouts/:id/exercises", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const exercises = yield prisma.exercise.findMany({
            where: { workoutId: id }
        });
        res.json(exercises);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// CREATE exercise
router.post("/exercises", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, sets, reps, weight, workoutId } = req.body;
        // check workout exists
        const workout = yield prisma.workout.findUnique({
            where: { id: workoutId }
        });
        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }
        const exercise = yield prisma.exercise.create({
            data: {
                name,
                sets,
                reps,
                weight: weight ? parseFloat(weight) : null,
                workoutId
            }
        });
        res.status(201).json(exercise);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// UPDATE exercise
router.put("/exercises/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, sets, reps, weight } = req.body;
        const updatedExercise = yield prisma.exercise.update({
            where: { id },
            data: {
                name,
                sets,
                reps,
                weight: weight ? parseFloat(weight) : null
            }
        });
        res.json(updatedExercise);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// DELETE exercise
router.delete("/exercises/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.exercise.delete({
            where: { id }
        });
        res.json({ message: "Exercise deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
module.exports = router;
