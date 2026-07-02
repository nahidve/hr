import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    questions: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("InterviewQuestion", interviewQuestionSchema);
