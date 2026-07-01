import express from "express";

import {
  createPolicy,
  askPolicyQuestion,
} from "../controllers/policyController.js";

const router = express.Router();

router.post("/", createPolicy);

router.post("/ask", askPolicyQuestion);

export default router;