//AIzaSyCLK3io0Dq4JFF2aiwx91Rra9sqHX_WShE

// geminiService.js
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const apiKey = 'AIzaSyCLK3io0Dq4JFF2aiwx91Rra9sqHX_WShE'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 0.7, // Adjust this for creativity
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 500,
  responseMimeType: 'text/plain',
};

export async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    return result.response.text(); // Gemini's question generation
  } catch (error) {
    console.error('Error:', error);
    return `Error generating questions: ${error.message}`;
  }
}
