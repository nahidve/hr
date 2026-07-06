import express from "express";
import {
  protect,
  allowRoles,
} from "../middleware/authMiddleware.js";
import {
  generateInterviewQuestions,
  saveInterviewSet,
  getInterviewSets,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  allowRoles("HR"),
  generateInterviewQuestions
);

router.post(
  "/save",
  protect,
  allowRoles("HR"),
  saveInterviewSet
);

router.get(
  "/",
  protect,
  allowRoles("HR"),
  getInterviewSets
);

export default router;
