import ollama from "ollama";

/**
 * Generate AI quiz questions using local Ollama model
 * @param {string} topic
 * @param {number} numQuestions
 * @returns Array of quiz questions [{questionText, options, correctAnswer}]
 */
export const generateQuizFromAI = async (topic, numQuestions = 5) => {
  try {
    const prompt = `You are a quiz generator. Generate ${numQuestions} multiple choice questions about "${topic}".
Output ONLY a JSON array. Each item must have:
- questionText
- options (array of 4 strings)
- correctAnswer (one of the options)

Example output:
[
  {
    "questionText": "Question here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "Option 1"
  }
]

Do NOT include explanations, markdown, or any extra text.`;

    const response = await ollama.chat({
      model: "llama3.1:8b", // or "llama3.2:3b"
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600
    });

    let text = response.message?.content?.trim();

    // Strip any code blocks or extra text
    text = text.replace(/^```json/, "").replace(/```$/, "").trim();

    // Sometimes model still adds extra text before/after JSON. Try to extract JSON array
    const firstBracket = text.indexOf("[");
    const lastBracket = text.lastIndexOf("]");

    if (firstBracket === -1 || lastBracket === -1) {
      throw new Error("AI did not return a valid JSON array");
    }

    const jsonText = text.slice(firstBracket, lastBracket + 1);

    const questions = JSON.parse(jsonText);

    // Optional: validate structure
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Generated quiz is empty or invalid");
    }

    return questions;

  } catch (err) {
    console.error("Ollama Quiz Generation Error:", err.message || err);
    throw new Error("Failed to generate quiz using local AI");
  }
};
