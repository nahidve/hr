import express from "express";
import { getStats, getAnalytics } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", getStats);
router.get("/analytics", getAnalytics);

export default router;
