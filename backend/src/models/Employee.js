import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    department: String,
    skills: [String],
    experienceSummary: String,
    resumeText: String,

    fitScore: {
      type: Number,
      default: 0,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    recommendedDepartment: {
      type: String,
      default: "",
    },

    departmentReason: {
      type: String,
      default: "",
    },
    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    suggestedRole: {
      type: String,
      default: "",
    },

    suggestedTraining: {
      type: [String],
      default: [],
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Employee", employeeSchema);
