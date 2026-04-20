import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import TelegramBot from "node-telegram-bot-api";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { GoogleGenAI } from "@google/genai";

const TELEGRAM_TOKEN = "8656425083:AAG-On9SnWgfztJEMbvUEoEv9BBb4zaMFtI";
const ADMIN_ID = "7539384945";

// Gemini AI Setup
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Initialize Firebase Admin (using Client SDK in Node)
const firebaseConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './firebase-applet-config.json'), 'utf-8'));
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

// Initialize Telegram Bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Prevent Telegram polling error crashes when both AI Studio and Railway are running
bot.on('polling_error', (error: any) => {
  if (error.code === 'ETELEGRAM' && error.message.includes('409 Conflict')) {
    console.warn("Telegram warning: Multiple bot instances running (409 Conflict).");
  } else {
    console.warn("Telegram polling error:", error.message);
  }
});

bot.on('message', async (msg) => {
  // Only accept from Admin
  if (msg.chat.id.toString() !== ADMIN_ID) return;

  // Handle /reply <chatId> <message>
  if (msg.text?.startsWith('/reply')) {
    const parts = msg.text.split(' ');
    if (parts.length < 3) {
      bot.sendMessage(ADMIN_ID, 'Format: /reply <chatId> <xabar>');
      return;
    }
    const chatId = parts[1];
    const replyText = parts.slice(2).join(' ');

    try {
      const chatRef = doc(db, "support_chats", chatId);
      const chatSnap = await getDoc(chatRef);
      
      const payload = {
        role: "model",
        parts: [{ text: replyText }],
        timestamp: new Date().toISOString(),
        isAgent: true
      };

      if (chatSnap.exists()) {
        await updateDoc(chatRef, { 
          messages: arrayUnion(payload),
          lastUpdated: new Date().toISOString()
        });
      } else {
        await setDoc(chatRef, {
          messages: [payload],
          lastUpdated: new Date().toISOString()
        });
      }
      bot.sendMessage(ADMIN_ID, `Yuborildi ✅`);
    } catch (e: any) {
      bot.sendMessage(ADMIN_ID, `Xatolik! ${e.message}`);
    }
    return;
  }

  // Handle direct replies to forwarded messages
  if (msg.reply_to_message && msg.text) {
    const originalText = msg.reply_to_message.text || "";
    const match = originalText.match(/ChatID: (\w+)/);
    
    if (match && match[1]) {
      const chatId = match[1];
      try {
        const chatRef = doc(db, "support_chats", chatId);
        const chatSnap = await getDoc(chatRef);
        
        const payload = {
          role: "model",
          parts: [{ text: msg.text }],
          timestamp: new Date().toISOString(),
          isAgent: true
        };

        if (chatSnap.exists()) {
          await updateDoc(chatRef, { 
            messages: arrayUnion(payload),
            lastUpdated: new Date().toISOString()
          });
        } else {
           await setDoc(chatRef, {
            messages: [payload],
            lastUpdated: new Date().toISOString()
          });
        }
        bot.sendMessage(ADMIN_ID, `Yuborildi ✅`);
      } catch (e: any) {
        bot.sendMessage(ADMIN_ID, `Baza xatosi! ${e.message}`);
      }
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // API Route for AI Chat
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "AI logic is currently disabled. Please provide a GEMINI_API_KEY." });
    }

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

    try {
      const response = await ai.models.generateContent({
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

      res.json({ text: response.text });
    } catch (e: any) {
      console.error("Gemini Server Error:", e);
      res.status(500).json({ error: "Something went wrong in my digital brain." });
    }
  });

  // API Route to send a message to telegram
  app.post("/api/telegram", async (req, res) => {
    const { chatId, message, phone, name } = req.body;
    
    try {
      let text = `Yangi xabar! 📩\n\n`;
      if (name) text += `Mijoz: ${name}\n`;
      if (phone) text += `Tel: ${phone}\n`;
      text += `Xabar: ${message}\n\nChatID: ${chatId}\n\n*Ushbu xabarga 'Reply' (Javob) tugmasi orqali yozing*`;

      await bot.sendMessage(ADMIN_ID, text);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    bot.sendMessage(ADMIN_ID, 'Server ishga tushdi va bot aktiv holatda! 🚀 (AI API ulangan)').catch(() => {});
  });
}

startServer();
