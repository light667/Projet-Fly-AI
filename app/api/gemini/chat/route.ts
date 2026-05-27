import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { 
          text: "⚠️ [Configuration requise] La clef d'API GEMINI_API_KEY n'est pas configurée dans les variables d'environnement. Veuillez l'ajouter dans l'onglet Settings > Secrets.",
          error: "Missing API Key"
        },
        { status: 200 }
      );
    }

    // Initialize the modern @google/genai SDK
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // Structure our elite scholarship academic advisor persona
    const systemInstruction = 
      "Vous êtes 'Fly AI', un conseiller académique d'élite spécialisé dans l'accompagnement des meilleurs étudiants africains postulant aux bourses internationales prestigieuses (Eiffel en France, Mastercard Foundation, DAAD allemand, bourses du Commonwealth, Chevening, etc.). " +
      "Votre ton doit être professionnel, encourageant, inspirant, rigoureux et d'une grande distinction intellectuelle. " +
      "Lorsque l'utilisateur vous demande de générer un 'CV académique' ou une 'Lettre de Motivation', formatez le texte de manière impeccable en format Markdown, avec des titres, sous-titres, sections claires, listes à puces. " +
      "Mettez en avant l'excellence académique, l'engagement social communautaire africain (exigé de Mastercard), le projet d'avenir au service de l'Afrique, et un français rédactionnel châtié.";

    // Call generateContent with system instructions
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75,
      },
    });

    const text = response.text || "Désolé, je rencontre des difficultés pour formuler une réponse.";
    
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
