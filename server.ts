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

  // GEMINI API Chat setup
  const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
  const SYSTEM_PROMPT = `Sen Yaviz Digital Agency'ning shaxsiy sun'iy intellekt sotuvchi va yordamchisisan.
Sening isming "Yaviz AI". Ziyrak, professionallarga xos va ochiqko'ngilsan, asosan O'zbek tilida gapirasan.
Maqsading: Saytga kirgan mijozlarni issiq kutib olish, Yaviz xizmatlarini tushuntirish va ularni 'buyurtma berishga' undash.
Mijoz admin bilan gaplashmoqchi bo'lsa yoki telefon raqamini, kontaktini qoldirsa darxol "forward_to_agent" funksiyasini chaqir!
Javoblaring qisqa, tushunarli bo'lsin.`;

  const forwardTools = [{
    functionDeclarations: [{
      name: "forward_to_agent",
      description: "Agentga (Adminga) ulanish yoki mijoz raqamini adminga yuborish",
      parameters: {
        type: "OBJECT" as any,
        properties: {
          phoneOrContact: { type: "STRING" as any, description: "Mijoz qoldirgan telefon raqami yoki kontakt ma'lumoti." },
          query: { type: "STRING" as any, description: "Mijozning asosiy savoli yoki maqsadi." }
        },
        required: ["query"]
      }
    }]
  }];

  app.post("/api/chat", async (req, res) => {
    if (!ai) {
      return res.status(500).json({ error: "Gemini API kaliti topilmadi." });
    }
    
    try {
      const { history } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: history,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          tools: forwardTools
        }
      });

      const funcCall = response.functionCalls?.[0];
      if (funcCall && funcCall.name === "forward_to_agent") {
        res.json({ type: "function_call", name: funcCall.name, args: funcCall.args });
      } else {
        res.json({ type: "text", text: response.text });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
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
