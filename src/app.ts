import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import indexRoutes from "./routes/index.routes";
import workoutRoutes from "./routes/workout.routes";
import exerciseRoutes from "./routes/exercise.routes";

import setupErrorHandling from "./error-handling";

const app: Application = express();

// middlewares
app.use(morgan("dev"));
app.use(cors({origin: process.env.ORIGIN || "http://localhost:5173",}));
app.use(express.json());

// routes
app.use("/api", indexRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);

// error handling
setupErrorHandling(app);

export default app;