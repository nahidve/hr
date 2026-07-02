import JobDescription from "../models/JobDescription.js";
import { askAI } from "../services/groqService.js";

export const generateJobDescription = async (req, res) => {
  try {
    const { department, experienceLevel, skills } = req.body;

    const prompt = `
Generate a professional job description.

Department:
${department}

Experience Level:
${experienceLevel}

Required Skills:
${skills.join(", ")}

Return plain text.

Include:

1. Job Title
2. Job Summary
3. Responsibilities
4. Requirements
5. Nice To Have Skills
`;

    const content = await askAI(prompt);

    res.json({
      content,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const saveJobDescription = async (req, res) => {
  try {
    const jd = await JobDescription.create(req.body);

    res.status(201).json(jd);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getJobDescriptions = async (req, res) => {
  try {
    const jds = await JobDescription.find().sort({
      createdAt: -1,
    });

    res.json(jds);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
