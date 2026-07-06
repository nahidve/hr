import express from "express";
import {
  protect,
  allowRoles,
} from "../middleware/authMiddleware.js";
import {
  createPolicy,
  askPolicyQuestion,
  getPolicies,
  deletePolicy,
  updatePolicy,
} from "../controllers/policyController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("HR"),
  createPolicy
);

router.put(
  "/:id",
  protect,
  allowRoles("HR"),
  updatePolicy
);

router.delete(
  "/:id",
  protect,
  allowRoles("HR"),
  deletePolicy
);

router.get(
  "/",
  protect,
  getPolicies
);

router.post(
  "/ask",
  protect,
  askPolicyQuestion
);

export default router;
