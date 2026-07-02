import Employee from "../models/Employee.js";
import InterviewQuestion from "../models/InterviewQuestion.js";
import { askAI } from "../services/groqService.js";

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const prompt = `
Generate interview questions.

Candidate:

Name:
${employee.name}

Department:
${employee.department}

Skills:
${employee.skills.join(", ")}

Experience:
${employee.experienceSummary}

Generate:

1. Technical Questions (5)

2. Behavioral Questions (3)

3. Situational Questions (3)

4. HR Questions (3)

Return plain text.
`;

    const questions = await askAI(prompt);

    res.json({
      employee: employee.name,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const saveInterviewSet = async (req, res) => {
  try {
    const interview = await InterviewQuestion.create(req.body);

    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getInterviewSets = async (req, res) => {
  try {
    const interviews = await InterviewQuestion.find()
      .populate("employeeId", "name")
      .sort({
        createdAt: -1,
      });

    res.json(interviews);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
