import Employee from "../models/Employee.js";
import { extractText } from "../services/pdfService.js";
import { askAI } from "../services/groqService.js";
import { DEPARTMENT_BENCHMARKS } from "../config/departmentBenchmarks.js";

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
      throw new Error(`Invalid AI response: ${aiResponse}`);
    }

    const parsed = JSON.parse(jsonMatch[0]);

    const candidateSkills = parsed.skills || [];

    const benchmark = DEPARTMENT_BENCHMARKS[department] || [];

    const matchedSkills = benchmark.filter((skill) =>
      candidateSkills.some((candidateSkill) =>
        candidateSkill.toLowerCase().includes(skill.toLowerCase()),
      ),
    );

    const missingSkills = benchmark.filter(
      (skill) => !matchedSkills.includes(skill),
    );

    const fitScore =
      benchmark.length === 0
        ? 0
        : Math.round((matchedSkills.length / benchmark.length) * 100);

    const employee = await Employee.create({
      name,
      email,
      department,

      skills: candidateSkills,

      experienceSummary: parsed.experienceSummary || "",

      resumeText,

      fitScore,

      matchedSkills,

      missingSkills,
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

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
