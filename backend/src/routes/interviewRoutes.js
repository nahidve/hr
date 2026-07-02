import express from "express";

import {
  generateInterviewQuestions,
  saveInterviewSet,
  getInterviewSets,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/generate", generateInterviewQuestions);

router.post("/save", saveInterviewSet);

router.get("/", getInterviewSets);

export default router;
