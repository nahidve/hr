import mongoose from "mongoose";

const jobDescriptionSchema = new mongoose.Schema(
  {
    title: String,
    department: String,
    experienceLevel: String,
    skills: [String],

    content: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("JobDescription", jobDescriptionSchema);
