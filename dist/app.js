"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
// middleware
app.use(express.json());
// index route
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);
// workout routes
const workoutRoutes = require("./routes/workout.routes");
app.use("/api", workoutRoutes);
// exercise routes
const exerciseRoutes = require("./routes/exercise.routes");
app.use("/api", exerciseRoutes);
// error handling
require("./error-handling")(app);
module.exports = app;
