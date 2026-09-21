import Policy from "../models/Policy.js";
import { askAI, askAIStream } from "../services/groqService.js";

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
    const { question, messages = [], stream: streamRequested } = req.body;

    const policies = await Policy.find();

    const policyText = policies.length > 0
      ? policies.map((p) => `### ${p.title}\n${p.content}`).join("\n\n")
      : "No specific policies have been uploaded yet.";

    const systemPrompt = `You are an internal HR Assistant for company employees.

Company Policies:
${policyText}

Response Style & Rules:
1. Be concise and direct: Give short, crisp, highly readable answers (typically 2–4 bullet points or 1–3 short sentences).
2. No fluff or filler: Avoid long intros, excessive pleasantries, or tables.
3. Targeted info: Only answer what was directly asked.
4. Clean text formatting: Do NOT use asterisks for bolding (do not use **). Do NOT use em-dashes or en-dashes (— or –). Use plain, simple bullet points with standard hyphens and colons (for example: "- Annual leave: 20 paid days per year.").
5. Friendly & professional: For greetings, respond in one short, warm sentence.
6. Missing policies: If a specific policy/detail isn't covered in the policies above, state in one short sentence that it is not on file and suggest contacting HR.`;

    // Construct conversation history
    let conversation = [];

    if (Array.isArray(messages) && messages.length > 0) {
      // Use existing conversation history
      conversation = messages
        .filter((m) => m && m.role && m.content)
        .map((m) => ({
          role: m.role === "user" || m.role === "assistant" ? m.role : "user",
          content: m.content,
        }));
    } else if (question) {
      conversation = [{ role: "user", content: question }];
    }

    const fullMessages = [
      { role: "system", content: systemPrompt },
      ...conversation,
    ];

    const isStream =
      streamRequested !== false &&
      (streamRequested ||
        req.query.stream === "true" ||
        req.headers.accept?.includes("text/event-stream"));

    if (isStream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await askAIStream(fullMessages);
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (delta) {
          res.write(`data: ${JSON.stringify({ content: delta })}\n\n`);
        }
      }
      res.write("data: [DONE]\n\n");
      return res.end();
    }

    const answer = await askAI(fullMessages);

    res.json({
      answer,
    });
  } catch (error) {
    console.error("Policy Chat Error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: error.message,
      });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
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
      returnDocument: "after",
    });

    res.json(policy);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
