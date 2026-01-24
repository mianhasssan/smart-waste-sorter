import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ClassificationResult, WasteCategory } from "../types";

// Schema definition for strict JSON output
const wasteSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    category: {
      type: Type.STRING,
      enum: [
        WasteCategory.HAZARD,
        WasteCategory.COMPOST,
        WasteCategory.RECYCLE,
        WasteCategory.TRASH
      ],
      description: "The classification of the waste item based on strict rules.",
    },
    itemName: {
      type: Type.STRING,
      description: "A short, descriptive name of the item identified (e.g., 'Lithium Battery', 'Greasy Pizza Box').",
    },
    reasoning: {
      type: Type.STRING,
      description: "Brief explanation of why this category was chosen based on the visual properties.",
    },
    confidence: {
      type: Type.NUMBER,
      description: "Confidence score between 0 and 1.",
    },
  },
  required: ["category", "itemName", "reasoning", "confidence"],
};

export const classifyWasteImage = async (base64Image: string): Promise<ClassificationResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is available.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Remove data URL prefix if present to get raw base64
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  const prompt = `
    Analyze the image of the waste item on the conveyor belt. 
    Classify it strictly according to these priority rules:

    1. **HAZARD (RED) - Priority #1**: 
       - Batteries (AA, Lithium, etc.)
       - Electronics (Phones, cables, circuit boards)
       - Chemicals (Cleaning bottles with warning labels, spray cans)
       - Flammables
       - Light bulbs
    
    2. **COMPOST (YELLOW) - Priority #2**:
       - Greasy cardboard (e.g., Pizza boxes with oil stains)
       - Food-soiled paper
       - Organic food waste (Peels, scraps)
    
    3. **RECYCLE (GREEN) - Priority #3**:
       - CLEAN Paper & Cardboard (No grease)
       - Rigid Plastic Bottles/Containers (Empty)
       - Metal Cans (Aluminum/Steel)
       - Glass Bottles/Jars
    
    4. **TRASH (GREY) - Default**:
       - Soft Plastics (Chip bags, wrappers, plastic film, grocery bags)
       - Styrofoam
       - Mixed materials that cannot be separated
       - Unrecognized items
       - Dirty recyclables that are not compostable

    Identify the main item. If multiple items exist, prioritize the most hazardous one.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Using Flash for speed/latency prioritization
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: cleanBase64 } },
          { text: prompt }
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: wasteSchema,
        temperature: 0.1, // Low temperature for deterministic, rule-based output
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text) as ClassificationResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to classify waste item.");
  }
};
