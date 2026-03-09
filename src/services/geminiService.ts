import { GoogleGenAI, Type } from "@google/genai";
import { TranslationResult } from "../types";

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function translateText(text: string): Promise<TranslationResult> {
  const ai = getAIClient();
  
  const prompt = `
    You are an expert translator specializing in English, Arabic, and Urdu to Bengali translation.
    Your task is to translate the following text into Bengali and provide a detailed word-by-word breakdown.
    
    Text to translate: "${text}"
    
    Instructions:
    1. Detect the source language (English, Arabic, or Urdu).
    2. Provide the full Bengali translation.
    3. Break down the original text into individual words.
    4. For each word, provide:
       - The original word
       - The Bengali meaning
       - The Bengali pronunciation
       
    Return the result strictly as a JSON object matching this structure:
    {
      "sourceLanguage": "Detected Language (in Bengali, e.g., ইংরেজি, আরবি, উর্দু)",
      "fullTranslation": "Full Bengali Translation",
      "words": [
        {
          "word": "Original Word",
          "meaning": "Bengali Meaning",
          "pronunciation": "Bengali Pronunciation"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sourceLanguage: { type: Type.STRING },
            fullTranslation: { type: Type.STRING },
            words: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                  pronunciation: { type: Type.STRING },
                },
                required: ["word", "meaning", "pronunciation"],
              },
            },
          },
          required: ["sourceLanguage", "fullTranslation", "words"],
        },
      },
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) {
      throw new Error("Empty response from AI");
    }

    const result = JSON.parse(jsonStr) as Omit<TranslationResult, "originalText">;
    return {
      originalText: text,
      ...result,
    };
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("অনুবাদ করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
  }
}
