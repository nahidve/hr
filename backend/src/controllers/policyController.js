import Policy from "../models/Policy.js";
import { askAI } from "../services/groqService.js";

export const createPolicy = async (req, res) => {
  try {
    const policy = await Policy.create(req.body);

    res.status(201).json(policy);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const askPolicyQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    const policies = await Policy.find();

    const policyText = policies
      .map((p) => `${p.title}: ${p.content}`)
      .join("\n\n");

    const prompt = `
You are an HR policy assistant.

Company Policies:

${policyText}

Answer ONLY using the policies above.

If the answer does not exist in the policies, reply:

"Policy information not available."

Question:
${question}
`;

    const answer = await askAI(prompt);

    res.json({
      answer,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().sort({
      createdAt: -1,
    });

    res.json(policies);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deletePolicy = async (req, res) => {
  try {
    await Policy.findByIdAndDelete(req.params.id);

    res.json({
      message: "Policy deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(policy);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
