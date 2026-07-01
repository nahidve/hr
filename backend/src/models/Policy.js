import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Policy",
  policySchema
);