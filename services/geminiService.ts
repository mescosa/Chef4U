import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Recipe } from '../types';

// Initialize Gemini Client
// We assume process.env.API_KEY is available. 
// If not, the app handles the error gracefully in the UI.
const apiKey = import.meta.env.VITE_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const modelId = 'gemini-2.5-flash';

// Schema for structured recipe output
const recipeSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      time: { type: Type.STRING, description: "Tiempo estimado, ej: '15 min'" },
      difficulty: { type: Type.STRING, enum: ['Fácil', 'Medio', 'Difícil'] },
      ingredients: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      steps: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING } 
      },
      calories: { type: Type.STRING, description: "Calorías estimadas por ración" }
    },
    required: ['title', 'description', 'time', 'difficulty', 'ingredients', 'steps']
  }
};

export const generateRecipesFromIngredients = async (ingredients: string[]): Promise<Recipe[]> => {
  if (!apiKey) throw new Error("API Key faltante");

  const prompt = `
    Eres Chef4U, un experto en cocina para estudiantes y principiantes.
    Tengo los siguientes ingredientes: ${ingredients.join(', ')}.
    Sugiere 3 recetas creativas, sencillas y deliciosas que pueda hacer principalmente con estos ingredientes.
    Puedes asumir que tengo básicos como sal, aceite, pimienta y agua.
    Mantén un tono joven y divertido.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        systemInstruction: "Eres un chef útil y motivador. Responde siempre en español.",
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const recipes = JSON.parse(text) as Omit<Recipe, 'id'>[];
    return recipes.map((r, index) => ({ ...r, id: `gen-${Date.now()}-${index}` }));
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
};

export const chatWithChef = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  if (!apiKey) return "Por favor configura tu API KEY para hablar con el chef.";

  try {
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: "Eres Chef4U, un asistente de cocina amigable, joven y experto en ahorro. Ayudas a principiantes a cocinar rico y barato. Tus respuestas son breves y directas.",
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Lo siento, me quedé sin ideas. ¿Intentamos otra vez?";
  } catch (error) {
    console.error("Chat error:", error);
    return "Tuve un problema de conexión. Intenta de nuevo más tarde.";
  }
};
