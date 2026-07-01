import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import onboardingRoutes from "./routes/onboardingRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/onboarding", onboardingRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;