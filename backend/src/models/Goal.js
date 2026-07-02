import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    dueDate: Date,

    progress: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Goal", goalSchema);
