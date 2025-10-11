import { GoogleGenAI } from "@google/genai";
const geminiAi = new GoogleGenAI({
  apiKey: process.env.GEMINI_API,
});

export default geminiAi;
