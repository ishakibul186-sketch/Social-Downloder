
import { GoogleGenAI, Type } from "@google/genai";
import type { ApiResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    video_url: { type: Type.STRING, description: "A placeholder URL for the video file." },
    title: { type: Type.STRING, description: "The title of the video." },
    thumbnail: { type: Type.STRING, description: "A URL for the video thumbnail from picsum.photos." },
    platform: { type: Type.STRING, description: "The detected platform: Facebook, Instagram, or TikTok." },
    error: { type: Type.STRING, description: "An error message if the URL is invalid." },
  },
};

export const fetchVideoDetails = async (url: string): Promise<ApiResponse> => {
  const prompt = `
    You are a Social Media Video Downloader API.

    Task:
    - Detect if the user provides a Facebook, Instagram, or TikTok URL.
    - The user input is: "${url}"
    - Output must be JSON only.
    - If the URL is for Facebook ("facebook.com", "fb.watch"), Instagram ("instagram.com"), or TikTok ("tiktok.com"), return a JSON object with the following structure:
      {
        "video_url": "https://storage.googleapis.com/example-prod-data/video-placeholder.mp4",
        "title": "A descriptive and plausible video title related to the platform",
        "thumbnail": "https://picsum.photos/1280/720",
        "platform": "<platform>"
      }
      - Replace <platform> with "Facebook", "Instagram", or "TikTok".
      - The video_url must be the exact placeholder URL provided.
      - The thumbnail URL must be the exact placeholder URL provided.

    - If the link is invalid or from an unsupported platform, return a JSON object with this structure:
      { "error": "Invalid or unsupported URL. Please provide a valid Facebook, Instagram, or TikTok link." }

    Rules:
    - Do not add any extra text, commentary, or markdown formatting like \`\`\`json.
    - Always return a single, clean JSON object.
    - The response must strictly adhere to the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    if (!response.text) {
        throw new Error("Empty response from API");
    }
    const parsedJson = JSON.parse(response.text);
    return parsedJson as ApiResponse;
  } catch (error) {
    console.error("Gemini API call or parsing failed:", error);
    return { error: "Failed to process the request. The API may be unavailable or the response was invalid." };
  }
};
