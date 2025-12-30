import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
// console.log("Gemini api key", process.env.GEMINI_API_KEY);

export async function generateReply(
  conversationHistory: string[],
  userMessage: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are a helpful customer support agent for a small e-commerce store.

Shipping: 5–10 business days worldwide
Returns: 7-day return policy
Support Hours: Mon–Fri, 9 AM – 6 PM IST

Conversation:
${conversationHistory.join("\n")}

User: ${userMessage}
              `,
            },
          ],
        },
      ],
    });

    return response.text || "Sorry, I could not generate a response.";
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("LLM_FAILED");
  }
}
