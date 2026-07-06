import express from "express";
import { getStats, getAnalytics } from "../controllers/dashboardController.js";
import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  allowRoles,
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/stats",
  protect,
  allowRoles("HR"),
  getStats
);

router.get(
  "/analytics",
  protect,
  allowRoles("HR"),
  getAnalytics
);

export default router;
