import express from "express";
import multer from "multer";

import {
  onboardEmployee,
  getEmployees
} from "../controllers/onboardingController.js";

const router = express.Router();

const upload = multer();

router.post(
  "/",
  upload.single("resume"),
  onboardEmployee
);
router.get("/", getEmployees);

export default router;