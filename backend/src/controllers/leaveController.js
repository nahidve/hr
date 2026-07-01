import Employee from "../models/Employee.js";
import LeaveRequest from "../models/LeaveRequest.js";
import { askAI } from "../services/groqService.js";

export const recommendLeave = async (req, res) => {
  try {
    const {
      employeeId,
      startDate,
      endDate,
      reason,
    } = req.body;

    const employee = await Employee.findById(
      employeeId
    );

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const days =
      Math.ceil(
        (end - start) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    const prompt = `
You are an HR leave recommendation assistant.

Company Policies:

- Employees receive 20 annual leave days.
- Employees receive 10 sick leave days.

Employee:
${employee.name}

Leave Duration:
${days} days

Reason:
${reason}

Return ONLY valid JSON.

{
  "recommendation":"Approve",
  "reason":"short explanation"
}
`;

    const aiResponse = await askAI(
      prompt,
      true
    );

    const parsed = JSON.parse(aiResponse);

    const leave =
      await LeaveRequest.create({
        employeeId,

        startDate,

        endDate,

        reason,

        recommendation:
          parsed.recommendation,

        aiReason: parsed.reason,
      });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};