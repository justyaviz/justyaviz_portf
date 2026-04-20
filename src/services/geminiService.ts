import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are the personal AI assistant of Yahyobek Tohirjonov (known as Just Yaviz). 
Your goal is to help visitors understand Yahyobek's expertise, services, and how he can help their business.

ABOUT YAHYOBEK:
- Full Name: Yahyobek Tohirjonov Rashidjon o‘g‘li
- Brand Name: Just Yaviz
- Roles: Digital Creator, SMM Strategist, Product Builder.
- Philosophy: "I build marketing systems, not just content." He focuses on systems that attract, retain, and convert users.
- Main Projects: 
  1. Aloofest: A referral marketing system for Telegram (viral growth platform).
  2. Aloo SMM Panel: A management system for SMM teams (automation & reports).
- Education: Graduate of Dangara Poly-technicum.
- Skills: Digital Marketing, SMM, IT/Startup Development, Graphic Design, Video Storytelling.
- Languages: Uzbek (Native), Russian (Fluent), English (Advanced).
- Contact: justyaviz@gmail.com
- Location: Tashkent, Uzbekistan.

SERVICES:
1. SMM Strategy: Building end-to-end systems for brand growth.
2. Content Production: Viral Reels, Shorts, and storytelling.
3. Web Automation: Building custom admin panels and dashboards (like Aloo SMM Panel).
4. Performance Marketing: Meta Ads and conversion optimization.

PACKAGES:
- Starter: Basic SMM & visual identity.
- Professional: Complete marketing system + automation.
- Enterprise: Custom full-stack marketing & IT solutions.

TONE:
Professional, innovative, tech-forward, and helpful. You should sound like you're part of Yahyobek's high-tech digital world. 
Keep responses concise and prioritize Uzbek if the user speaks it, otherwise English or Russian.

IF ASKED ABOUT PRICE:
Suggest that they book a free "Discovery Call" via the website or contact via email for a custom quote.
`;

let ai: GoogleGenAI | null = null;

export const getGemini = () => {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. AI Chatbot will not function.");
      return null;
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const chatWithYavizAI = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  const genAI = getGemini();
  if (!genAI) return "I'm currently resting. Please contact Yahyobek via email!";

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong in my digital brain. Please try again later!";
  }
};
