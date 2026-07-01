import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    reason: String,

    startDate: Date,

    endDate: Date,

    recommendation: String,

    aiReason: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "LeaveRequest",
  leaveSchema
);