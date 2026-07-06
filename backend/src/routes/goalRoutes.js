import express from "express";
import {
  protect,
  allowRoles,
} from "../middleware/authMiddleware.js";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getGoals
);

router.post(
  "/",
  protect,
  allowRoles("HR"),
  createGoal
);

router.put(
  "/:id",
  protect,
  allowRoles("HR"),
  updateGoal
);

router.delete(
  "/:id",
  protect,
  allowRoles("HR"),
  deleteGoal
);

export default router;
