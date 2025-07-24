import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * PUBLIC_INTERFACE
 * sendPromptToOpenAI - Sends a prompt to OpenAI's ChatGPT (gpt-3.5-turbo) and returns the completion
 * @param {string} prompt - The prompt/question to send to OpenAI
 * @returns {Promise<string>} - The response from OpenAI
 */
export async function sendPromptToOpenAI(prompt) {
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing. Please set REACT_APP_OPENAI_API_KEY in your environment.");
  }
  try {
    const response = await axios.post(OPENAI_API_URL, {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
    });
    return response?.data?.choices?.[0]?.message?.content?.trim() || "No response from OpenAI.";
  } catch (error) {
    const errMsg = (error.response && error.response.data && error.response.data.error && error.response.data.error.message)
      ? error.response.data.error.message
      : "Unknown error occurred while contacting OpenAI.";
    throw new Error(`OpenAI API Error: ${errMsg}`);
  }
}
