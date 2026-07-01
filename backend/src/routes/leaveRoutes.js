import express from "express";

import {
  recommendLeave,
  getLeaveRequests,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post(
  "/recommend",
  recommendLeave
);
router.get(
  "/recent",
  getLeaveRequests
);

export default router;