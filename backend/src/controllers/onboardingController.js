import Employee from "../models/Employee.js";
import { extractText } from "../services/pdfService.js";
import { askAI } from "../services/groqService.js";

export const onboardEmployee = async (req, res) => {
  try {
    const { name, email, department } = req.body;

    if (!req.file) {
      return res.status(400).json({
        error: "Resume file is required",
      });
    }

    const resumeText = await extractText(req.file.buffer);

    const prompt = `
Extract skills and experience summary from the resume.

Return ONLY valid JSON.

{
  "skills": ["skill1", "skill2"],
  "experienceSummary": "summary"
}

Resume:
${resumeText}
`;

    const aiResponse = await askAI(prompt, true);

    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error(
        `Invalid AI response: ${aiResponse}`
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);

    const employee = await Employee.create({
      name,
      email,
      department,
      skills: parsed.skills || [],
      experienceSummary:
        parsed.experienceSummary || "",
      resumeText,
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error("Onboarding Error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({
      createdAt: -1,
    });

    res.json(employees);
  } catch (error) {
    console.error("Get Employees Error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};