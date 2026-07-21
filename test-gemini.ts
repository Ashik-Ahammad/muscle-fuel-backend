import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  console.log("Testing API Key:", process.env.GEMINI_API_KEY?.slice(0, 10) + "...");
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Simulate planController
    const prompt = `You are an elite, AI-driven strength and conditioning architect...`;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });
    console.log("Plan JSON:", response.text);

    // Simulate aiController
    const systemPrompt = "System instruction here";
    const fullPrompt = "Conversation history...";
    const response2 = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'user', parts: [{ text: fullPrompt }] }
      ]
    });
    console.log("Chat response:", response2.text);

  } catch (error: any) {
    console.error("Error connecting to Gemini:", error.message || error);
    if (error.response) console.error("Response:", error.response);
  }
}

test();
