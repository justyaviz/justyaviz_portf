import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, MessageCircle } from "lucide-react";
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY || "dummy_key_to_prevent_crash_if_missing";
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

const SYSTEM_PROMPT = `Sen Yaviz Digital Agency'ning shaxsiy sun'iy intellekt sotuvchi va yordamchisisan.
Sening isming "Yaviz AI". Ziyrak, professionallarga xos va ochiqko'ngilsan, asosan O'zbek tilida gapirasan.
Maqsading: Saytga kirgan mijozlarni issiq kutib olish, Yaviz xizmatlarini tushuntirish va ularni 'buyurtma berishga' undash.
Mijoz admin bilan gaplashmoqchi bo'lsa yoki telefon raqamini, kontaktini qoldirsa darxol "forward_to_agent" funksiyasini chaqir!
Javoblaring qisqa, tushunarli bo'lsin.`;

const forwardSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    phoneOrContact: { type: Type.STRING, description: "Mijoz qoldirgan telefon raqami yoki kontakt ma'lumoti." },
    query: { type: Type.STRING, description: "Mijozning asosiy savoli yoki maqsadi." }
  },
  required: ["query"]
};

const generateChatId = () => Math.random().toString(36).substring(2, 9);

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [chatId] = useState(generateChatId());
  
  // Start with empty, we'll listen to Firestore or use local state
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; parts: {text: string}[] }[]>([
    { role: 'model', parts: [{text: "Salom! Men Yaviz agentligining AI yordamchisiman 🤖. Bugun biznesingizni kuchaytirish bo'yicha qanday maslahat yoki xizmat soraaysiz?"}] }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show tooltip
    const showTimer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 2000);
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [isOpen]);

  // Listen for Admin replies from Firestore
  useEffect(() => {
    if (!chatId) return;
    const unsub = onSnapshot(doc(db, "support_chats", chatId), (d) => {
      if (d.exists()) {
        const data = d.data();
        if (data.messages && Array.isArray(data.messages)) {
          // Sync messages if there are new ones from admin
          const adminMessages = data.messages.filter((m: any) => m.isAgent);
          if (adminMessages.length > 0) {
             setMessages(prev => {
                // Find messages that aren't already in our state (by some simple matching, or just replacing the history if we strictly tracked it)
                // For simplicity, let's just append the latest admin messages if they aren't already in the list
                const newMsgs = [...prev];
                adminMessages.forEach((am: any) => {
                   const exists = newMsgs.find(m => m.parts[0]?.text === am.parts[0]?.text);
                   if (!exists) {
                      newMsgs.push({ role: 'model', parts: [{text: am.parts[0].text}] });
                   }
                });
                return newMsgs;
             });
          }
        }
      }
    });
    return () => unsub();
  }, [chatId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput("");
    const newHistory = [...messages, { role: 'user', parts: [{text: userMsg}] }] as { role: 'user' | 'model'; parts: {text: string}[] }[];
    setMessages(newHistory);
    setIsTyping(true);

    try {
      const ai = getAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: newHistory.map(h => ({
          role: h.role, 
          parts: h.parts
        })),
        config: {
          systemInstruction: SYSTEM_PROMPT,
          tools: [{
            functionDeclarations: [{
              name: "forward_to_agent",
              description: "Agentga (Adminga) ulanish yoki mijoz raqamini adminga yuborish",
              parameters: forwardSchema
            }]
          }]
        }
      });
      
      const funcCall = response.functionCalls?.[0];
      if (funcCall && funcCall.name === "forward_to_agent") {
         const args = funcCall.args as any;
         // Send to backend which forwards to Telegram
         await fetch("/api/telegram", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               chatId,
               message: args.query || userMsg,
               phone: args.phoneOrContact || ""
            })
         });
         setMessages([...newHistory, { role: 'model', parts: [{text: "Xabaringiz javobgar xodimlarga yetkazildi! Telegram orqali mutaxassislarimiz shu yerning o'zida sizga javob yozishadi. Iltimos biroz kuting..."}] }]);
      } else {
         const aiResponse = response.text || "Uzur, ayni damda tushuna olmadim. Adminlarimizga /contact orqali yozishingizni so'rayman.";
         setMessages([...newHistory, { role: 'model', parts: [{text: aiResponse}] }]);
      }
    } catch (e) {
       setMessages([...newHistory, { role: 'model', parts: [{text: "Kechirasiz, xizmat ko'rsatishda xatolik yuzaga keldi. Operatorga yozing."}] }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOpenContact = () => {
    setIsOpen(true);
    setShowTooltip(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-end gap-3"
          >
            {/* Tooltip bubble */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.8 }}
                  className="mb-2 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--border-primary)] shadow-2xl rounded-2xl p-3 flex items-center gap-3 cursor-pointer"
                  onClick={handleOpenContact}
                >
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-medium font-dm-sans text-[var(--text-primary)] whitespace-nowrap">Sizga yordam kerakmi?</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing Floating Button */}
            <button
              onClick={handleOpenContact}
              className="relative group w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0 outline-none"
            >
              {/* Outer pulse ring */}
              <div className="absolute inset-[-15px] bg-accent/20 rounded-full animate-[ping_3s_ease-in-out_infinite]" />
              <div className="absolute inset-[-5px] bg-accent/30 rounded-full animate-pulse" />
              
              {/* Main button body */}
              <div className="relative w-full h-full bg-[#8b5cf6] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-transform group-hover:scale-105 active:scale-95">
                <MessageCircle size={28} className="fill-transparent stroke-[1.5]" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[90vw] max-w-[360px] h-[500px] max-h-[80vh] z-50 flex flex-col bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--border-primary)] rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-primary)] bg-accent/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white">
                    <Bot size={20} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-primary)]"></div>
                </div>
                <div>
                  <h3 className="font-satoshi font-bold text-[15px] leading-tight">Yaviz AI</h3>
                  <p className="text-[11px] text-[var(--text-secondary)] font-medium">Satuvchi va yordamchi</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={chatRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 font-dm-sans"
            >
               {messages.map((m, i) => (
                 <div key={i} className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   {m.role === 'model' && (
                     <div className="w-6 h-6 shrink-0 bg-accent/20 rounded-full flex items-center justify-center text-accent"><Bot size={12}/></div>
                   )}
                   <div className={`p-3 max-w-[80%] rounded-2xl text-[13px] leading-relaxed ${m.role === 'user' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-br-sm' : 'bg-accent/10 text-[var(--text-primary)] rounded-bl-sm'}`}>
                      {m.parts[0].text}
                   </div>
                 </div>
               ))}
               {isTyping && (
                 <div className="flex items-end gap-2 text-[var(--text-secondary)]">
                   <div className="w-6 h-6 shrink-0 bg-accent/20 rounded-full flex items-center justify-center text-accent"><Bot size={12}/></div>
                   <div className="p-4 max-w-[80%] rounded-2xl bg-accent/5 rounded-bl-sm flex gap-1">
                      <div className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                   </div>
                 </div>
               )}
            </div>

            {/* Input Footer */}
            <div className="p-4 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
               <div className="flex items-center gap-2 p-1 pl-4 bg-[var(--glass-bg)] border border-[var(--border-primary)] rounded-full">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Savolingizni yozing..."
                    disabled={isTyping}
                    className="flex-1 bg-transparent border-none outline-none text-[13px] font-dm-sans placeholder:opacity-50"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-10 h-10 flex shrink-0 items-center justify-center bg-accent text-white rounded-full transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="-ml-0.5" />}
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
