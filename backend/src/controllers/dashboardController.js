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

export const getAnalytics = async (req, res) => {
  try {
    const employees = await Employee.find();

    const departmentMap = {};

    employees.forEach((employee) => {
      const dept = employee.department || "Unknown";

      departmentMap[dept] = (departmentMap[dept] || 0) + 1;
    });

    const departmentData = Object.entries(departmentMap).map(
      ([name, value]) => ({
        name,
        value,
      }),
    );

    const averageFitScore =
      employees.length === 0
        ? 0
        : Math.round(
            employees.reduce(
              (total, employee) => total + (employee.fitScore || 0),
              0,
            ) / employees.length,
          );

    const skillMap = {};

    employees.forEach((employee) => {
      (employee.skills || []).forEach((skill) => {
        skillMap[skill] = (skillMap[skill] || 0) + 1;
      });
    });

    const topSkills = Object.entries(skillMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([skill, count]) => ({
        skill,
        count,
      }));

    res.json({
      averageFitScore,
      departmentData,
      topSkills,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
