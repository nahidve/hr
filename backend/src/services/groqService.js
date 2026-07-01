import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const askAI = async (
  prompt,
  json = false
) => {
  const response =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      ...(json && {
        response_format: {
          type: "json_object",
        },
      }),

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return response.choices[0].message.content;
};