import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// Initialize the AI client
const ai = new GoogleGenAI({
  apiKey: process.env.AI_API_KEY
});

/**
 * Generate AI quiz questions using Gemini
 * @param {string} topic - Quiz topic
 * @param {number} numQuestions - Number of questions
 * @returns Array of questions [{questionText, options, correctAnswer}]
 */
export const generateQuizFromAI = async (topic, numQuestions = 5) => {
  try {
    const prompt = `Generate ${numQuestions} multiple choice quiz questions about "${topic}".
Return ONLY a JSON array like:
[
  {
    "questionText": "Question here",
    "options": ["Option 1","Option 2","Option 3","Option 4"],
    "correctAnswer": "Option 1"
  }
]
Do NOT include any explanation or text outside the JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", text: prompt }]
    });

    // Get AI output text
    const text = response.candidates?.[0]?.content?.[0]?.text || response.text;

    // Clean backticks or whitespace
    let cleanText = text.trim();
    cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '').trim();

    // Parse JSON safely
    const questions = JSON.parse(cleanText);
    return questions;
  } catch (err) {
    // Log full error for debugging
    console.error("AI Generation Error:", err.response?.data || err.message);

    // Handle 503 overload specifically
    if (err.response?.status === 503 || err.status === 503) {
      throw new Error("AI model is currently overloaded. Please try again in a few seconds.");
    }

    // Fallback for other errors
    throw new Error("Failed to generate quiz from AI");
  }
};
