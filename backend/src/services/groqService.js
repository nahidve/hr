import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const askAI = async (
  input,
  json = false
) => {
  const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
  
  // Accept either an array of messages [{ role, content }] or a single prompt string
  const messages = Array.isArray(input)
    ? input
    : [
        {
          role: "user",
          content: input,
        },
      ];

  const response =
    await groq.chat.completions.create({
      model,

      ...(json && {
        response_format: {
          type: "json_object",
        },
      }),

      messages,
    });

  return response.choices[0].message.content;
};

export const askAIStream = async (input) => {
  const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

  const messages = Array.isArray(input)
    ? input
    : [
        {
          role: "user",
          content: input,
        },
      ];

  const stream = await groq.chat.completions.create({
    model,
    messages,
    stream: true,
  });

  return stream;
};