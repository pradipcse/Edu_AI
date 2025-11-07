import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

/**
 * Generate quiz questions from AI API
 * @param {string} topic - Topic of the quiz
 * @param {number} numQuestions - Number of questions to generate
 * @returns Array of questions [{questionText, options, correctAnswer}]
 */
export const generateQuizFromAI = async (topic, numQuestions = 5) => {
  try {
    const response = await axios.post(
      process.env.AI_API_URL,
      { topic, numQuestions },
      {
        headers: { Authorization: `Bearer ${process.env.AI_API_KEY}` }
      }
    );

    // Return questions array
    return response.data.questions;
  } catch (err) {
    console.error("AI Quiz Generation Failed:", err.message);
    throw new Error("Failed to generate quiz from AI");
  }
};
