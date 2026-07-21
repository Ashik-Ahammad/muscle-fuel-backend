import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

export const chatWithAssistant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ success: false, message: 'Messages array is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not found. Using fallback mock chat response.');
      await new Promise(resolve => setTimeout(resolve, 800));
      res.status(200).json({
        success: true,
        message: 'This is an offline mock response. To enable real AI assistance, please configure your GEMINI_API_KEY in the backend environment.',
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemPrompt = `
      You are Muscle Fuel's elite AI Assistant.
      You help athletes modify and understand their training protocols.
      
      Current Routine Context:
      Title: ${context?.title || 'Unknown'}
      Level: ${context?.experienceLevel || 'Unknown'}
      Stage: ${context?.bodybuildingStage || 'Unknown'}
      Description: ${context?.shortDescription || 'Unknown'}
      
      Keep responses concise, actionable, and focused on fitness/nutrition.
    `;

    // Convert messages to Gemini format
    const chatSession = ai.chats.create({
      model: 'gemini-1.5-flash',
      config: {
        systemInstruction: systemPrompt,
      }
    });

    // Send history to establish context
    // Actually, in the new SDK we can just send the whole history if we map it properly,
    // or send the last message if we rely on the frontend sending the history in a specific way.
    // Let's just construct a conversation string from messages for simplicity, 
    // or use the chat API properly.

    let fullPrompt = "Conversation History:\n";
    for (const msg of messages) {
      fullPrompt += `${msg.role === 'user' ? 'Athlete' : 'AI'}: ${msg.content}\n`;
    }
    fullPrompt += "AI: ";

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'user', parts: [{ text: fullPrompt }] }
      ]
    });

    res.status(200).json({
      success: true,
      message: response.text,
    });
  } catch (error: any) {
    console.error('Chat AI Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to communicate with AI',
    });
  }
};
