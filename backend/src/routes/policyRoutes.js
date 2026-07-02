import express from "express";

import {
  createPolicy,
  askPolicyQuestion,
  getPolicies,
  deletePolicy,
  updatePolicy,
} from "../controllers/policyController.js";

const router = express.Router();

router.post("/", createPolicy);
router.post("/ask", askPolicyQuestion);
router.get("/", getPolicies);
router.delete("/:id", deletePolicy);
router.put("/:id", updatePolicy);

export default router;
