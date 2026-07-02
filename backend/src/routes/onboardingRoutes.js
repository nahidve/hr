import express from "express";
import multer from "multer";
import {
  onboardEmployee,
  getEmployees,
  getEmployeeById,
} from "../controllers/onboardingController.js";

const router = express.Router();

const upload = multer();

router.post("/", upload.single("resume"), onboardEmployee);
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);

export default router;
