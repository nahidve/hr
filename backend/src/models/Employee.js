import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    department: String,

    skills: [String],

    experienceSummary: String,

    resumeText: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Employee",
  employeeSchema
);