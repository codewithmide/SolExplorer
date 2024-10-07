import { GoogleGenerativeAI } from "@google/generative-ai";

export const gemini = new GoogleGenerativeAI(
    String(process.env.NEXT_PUBLIC_GEMINI_API_KEY)
);