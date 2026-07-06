import express from "express";

import {
  recommendLeave,
  getLeaveRequests,
} from "../controllers/leaveController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  allowRoles,
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/recommend",
  protect,
  recommendLeave
);

router.get(
  "/recent",
  protect,
  allowRoles("HR"),
  getLeaveRequests
);

export default router;