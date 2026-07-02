import Goal from "../models/Goal.js";

export const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create(req.body);

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find()
      .populate("employeeId", "name department")
      .sort({
        createdAt: -1,
      });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(goal);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);

    res.json({
      message: "Goal deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
