import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeClothingImage(imageData: string): Promise<AIAnalysis> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Analyze this clothing item for a global circular fashion intelligence platform.
    
    STRICT RULE: Focus ONLY on clothing items (T-shirt, Shirt, Jeans, Bottomwear, Hoodie, Tops, Kurti, Jacket).
    
    1. Clothing Type: Detect if it's a T-shirt, Shirt, Jeans, Bottomwear, Hoodie, Tops, Kurti, or Jacket.
    2. Size Detection: Estimate the size (S, M, L, XL) based on proportions or visible tags.
    3. Damage Detection: Identify visual defects (No damage, Minor stains, Torn fabric, Faded areas, Visible wear, Severely damaged, Heavy stains).
    4. Material Quality: Classify fabric quality (High quality, Medium quality, Low quality).
    5. Brand Recognition: Detect brand category (Premium brand, Mid-tier brand, Local brand, Unknown).
    6. Image Quality: Assess if the image is blurry or poorly lit (High, Low).
    7. Brand Tag: Is a brand tag or logo clearly visible? (true/false).
    
    8. Sustainability Grade:
       - Grade A: Excellent condition, no damage, high quality.
       - Grade B: Good condition, minor wear, medium/high quality.
       - Grade C: Repair recommended, minor stains or small tears, visible wear.
       - Grade D: Not suitable for resale, heavy stains, large tears, severely faded, or structurally damaged.
    
    9. Lifecycle Extension: Estimate the lifecycle extension (in months) if this item is resold instead of discarded.
    
    Provide confidence scores (0-1) for condition, brand, and quality detection.
    
    Return the analysis in JSON format.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageData.split(",")[1],
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          clothingType: { type: Type.STRING },
          size: { type: Type.STRING },
          damageStatus: { type: Type.STRING },
          qualityRating: { type: Type.STRING },
          brandClass: { type: Type.STRING },
          imageQuality: { type: Type.STRING },
          brandTagVisible: { type: Type.BOOLEAN },
          sustainabilityGrade: { type: Type.STRING },
          lifecycleExtensionScore: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          confidenceScores: {
            type: Type.OBJECT,
            properties: {
              condition: { type: Type.NUMBER },
              brand: { type: Type.NUMBER },
              quality: { type: Type.NUMBER },
            },
            required: ["condition", "brand", "quality"],
          },
        },
        required: [
          "clothingType", "damageStatus", "qualityRating", "brandClass", 
          "imageQuality", "brandTagVisible", "sustainabilityGrade", 
          "lifecycleExtensionScore", "reasoning", "confidence", "confidenceScores"
        ],
      },
    },
  });

  const result = JSON.parse(response.text || "{}");
  const isSellable = result.sustainabilityGrade === "Grade A" || result.sustainabilityGrade === "Grade B";

  return {
    ...result,
    isSellable,
  };
}
