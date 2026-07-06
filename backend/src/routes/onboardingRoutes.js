import express from "express";
import multer from "multer";

import {
  onboardEmployee,
  getEmployees,
  getEmployeeById,
} from "../controllers/onboardingController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  allowRoles,
} from "../middleware/roleMiddleware.js";

const router = express.Router();

const upload = multer();

router.post(
  "/",
  protect,
  allowRoles("HR"),
  upload.single("resume"),
  onboardEmployee
);

router.get(
  "/",
  protect,
  getEmployees
);

router.get(
  "/:id",
  protect,
  getEmployeeById
);

export default router;