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
// GET all workouts
router.get("/workouts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workouts = yield prisma.workout.findMany({
            include: { exercises: true }
        });
        res.json(workouts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching workouts" });
    }
}));
// GET workout by id
router.get("/workouts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const workout = yield prisma.workout.findUnique({
            where: { id: id },
            include: { exercises: true }
        });
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }
        res.json(workout);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching workout" });
    }
}));
// CREATE workout
router.post("/workouts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, duration, calories, date } = req.body;
        const workout = yield prisma.workout.create({
            data: {
                name,
                duration,
                calories,
                date: new Date(date)
            }
        });
        res.status(201).json(workout);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating workout" });
    }
}));
// UPDATE workout
router.put("/workouts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, duration, calories, date } = req.body;
        const updatedWorkout = yield prisma.workout.update({
            where: { id },
            data: {
                name,
                duration,
                calories,
                date: new Date(date)
            }
        });
        res.json(updatedWorkout);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating workout" });
    }
}));
// DELETE workout
router.delete("/workouts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.workout.delete({
            where: { id }
        });
        res.json({ message: "Workout deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting workout" });
    }
}));
module.exports = router;
