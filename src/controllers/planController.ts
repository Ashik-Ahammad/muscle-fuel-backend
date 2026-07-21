import type { Request, Response } from 'express';
import UserPlan from '../models/UserPlan.js';

import { GoogleGenAI } from '@google/genai';

export const generatePlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { physicalLimitations, equipment, level } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not found. Using fallback mock generation.');
      // Simulate AI generation delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const mockJson = {
        plan_id: `MF-AI-${Math.floor(1000 + Math.random() * 9000)}-X`,
        meta: {
          duration: '4_WEEKS',
          intensity_curve: 'LINEAR_PROGRESSION',
          focus: level === 'Advanced' ? 'NEURAL_OVERRIDE' : 'STRENGTH_ENDURANCE',
        },
        week_01: {
          day_01_push: [
            {
              exercise: equipment.includes('Barbell') ? 'Barbell Bench Press' : 'Dumbbell Bench Press',
              sets: 4,
              reps: '8-10',
              rpe: 8,
              rest: '120s',
            },
            {
              exercise: 'Overhead Press',
              sets: 3,
              reps: '10-12',
              rpe: 7,
              rest: '90s',
            },
          ],
          day_02_pull: [
            {
              exercise: equipment.includes('Barbell') ? 'Barbell Rows' : 'Dumbbell Rows',
              sets: 4,
              reps: '10',
              rpe: 8,
              rest: '90s',
            },
          ],
        },
      };

      res.status(200).json({
        success: true,
        data: mockJson,
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
      You are an elite, AI-driven strength and conditioning architect.
      Generate a hyper-personalized fitness protocol in strictly valid JSON format.
      DO NOT return markdown, DO NOT return code blocks. Return ONLY the JSON object.
      
      User Profile:
      - Level: ${level}
      - Equipment Available: ${equipment.join(', ') || 'None (Bodyweight only)'}
      - Physical Limitations/Injuries: ${physicalLimitations || 'None'}
      
      The JSON object MUST match this exact schema:
      {
        "plan_id": "string (generate a unique MF-AI-... ID)",
        "meta": {
          "duration": "string (e.g. 4_WEEKS)",
          "intensity_curve": "string",
          "focus": "string"
        },
        "week_01": {
          "day_01_push": [
            {
              "exercise": "string",
              "sets": number,
              "reps": "string",
              "rpe": number,
              "rest": "string"
            }
          ],
          "day_02_pull": [
            {
              "exercise": "string",
              "sets": number,
              "reps": "string",
              "rpe": number,
              "rest": "string"
            }
          ]
        }
      }
      
      Ensure the exercises are safe for the stated physical limitations and only use the provided equipment.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    let generatedText = response.text || '';
    
    // In case the model returns markdown code blocks despite instructions
    generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let generatedJson;
    try {
      generatedJson = JSON.parse(generatedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini output:', generatedText);
      throw new Error('AI generated invalid JSON structure. Please try again.');
    }

    res.status(200).json({
      success: true,
      data: generatedJson,
    });
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate plan via AI',
    });
  }
};

export const savePlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { physicalLimitations, equipment, level, generatedJson } = req.body;
    
    if (!req.user?.id) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const newPlan = new UserPlan({
      userId: req.user.id,
      physicalLimitations,
      equipment,
      level,
      generatedJson,
    });

    await newPlan.save();

    res.status(201).json({
      success: true,
      data: newPlan,
      message: 'Plan saved to dashboard',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to save plan',
    });
  }
};

export const getUserPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }
    
    const plans = await UserPlan.find({ userId: req.user.id as any }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch user plans',
    });
  }
};
