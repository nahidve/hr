import express from "express";

import {
  recommendLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post(
  "/recommend",
  recommendLeave
);

export default router;