// controllers/dashboardController.js

import Employee from "../models/Employee.js";
import Policy from "../models/Policy.js";
import LeaveRequest from "../models/LeaveRequest.js";

export const getStats = async (req, res) => {
  try {
    const [employees, policies, leaves] = await Promise.all([
      Employee.countDocuments(),
      Policy.countDocuments(),
      LeaveRequest.countDocuments(),
    ]);

    res.json({
      employees,
      policies,
      leaves,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};