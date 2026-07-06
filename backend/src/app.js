import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

import onboardingRoutes from "./routes/onboardingRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import jobDescriptionRoutes from "./routes/jobDescriptionRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

/* ---------------- DB ---------------- */
connectDB();

/* ---------------- Health Check ---------------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use(
  cors({
    origin: function (origin, callback) {
      // allow mobile apps, postman, curl
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "https://hr-five-pi.vercel.app",
      ];

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // IMPORTANT: do NOT throw error
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

/* ---------------- Middleware ---------------- */
app.use(express.json());

/* ---------------- Routes ---------------- */
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/job-descriptions", jobDescriptionRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/auth", authRoutes);

export default app;
