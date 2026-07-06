import express from "express";
import {
  protect,
  allowRoles,
} from "../middleware/authMiddleware.js";
import {
  generateJobDescription,
  saveJobDescription,
  getJobDescriptions,
} from "../controllers/jobDescriptionController.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  allowRoles("HR"),
  generateJobDescription
);

router.post(
  "/save",
  protect,
  allowRoles("HR"),
  saveJobDescription
);

router.get(
  "/",
  protect,
  allowRoles("HR"),
  getJobDescriptions
);

export default router;
