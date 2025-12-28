
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getVilmaCompliment = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Escreva um elogio criativo, engraçado e super exagerado para uma amiga incrível chamada Vilma. Diga por que ela é a pessoa mais magnética e brilhante do mundo. Seja curto (máximo 2 frases) e use um tom muito empolgado.",
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });
    return response.text || "A Vilma é tão incrível que o universo parou só para aplaudir!";
  } catch (error) {
    console.error("Erro ao buscar elogio:", error);
    return "A Vilma é simplesmente insuperável em todos os multiversos conhecidos!";
  }
};