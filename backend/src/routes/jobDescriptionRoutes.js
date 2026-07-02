import express from "express";
import {
  generateJobDescription,
  saveJobDescription,
  getJobDescriptions,
} from "../controllers/jobDescriptionController.js";

const router = express.Router();

router.post("/generate", generateJobDescription);
router.post("/save", saveJobDescription);
router.get("/", getJobDescriptions);

export default router;
