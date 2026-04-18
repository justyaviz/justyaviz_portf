import { motion } from "motion/react";
import { Sparkles, Rocket, Cpu, Brain, Zap, ArrowRight, Target } from "lucide-react";

export default function AI() {
  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto space-y-32">
       <div className="text-center space-y-12">
          <div className="badge-it mx-auto">
             <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" /> AI Ecosystem
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-none">
            Just.AI Tools
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto font-medium text-lg">
            SMM sohasida vaqtni tejash va natijani 10 barobargacha oshirish uchun 45 tadan ortiq sun’iy intellekt vositalari.
          </p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Kontent Generation", icon: <Brain />, desc: "Bir soniyada bir oylik kontent reja yarating." },
            { title: "AI Video Editing", icon: <Zap />, desc: "Videodagi shovqinni o'chirish va avtomatik subtitrlar." },
            { title: "Smart Targeting", icon: <Target />, desc: "AI orqali auditoriyani aniqlash va reklama samaradorligini oshirish." },
            { title: "Copywriting Bot", icon: <Brain />, desc: "Mijozni sotib olishga undovchi matnlar yaratish." },
            { title: "Image Upscaling", icon: <Cpu />, desc: "Past sifatli rasmlarni 4K sifatga ko'tarish." },
            { title: "Trend Analysis", icon: <Rocket />, desc: "Hozirgi trendlarni tahlil qilib, virusli g'oyalar berish." }
          ].map((tool, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-12 glass border-white/5 rounded-[3.5rem] space-y-8 hover:bg-white/[0.03] transition-all group border"
            >
               <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                  {tool.icon}
               </div>
               <h4 className="text-3xl font-display font-black">{tool.title}</h4>
               <p className="text-white/40 text-sm leading-relaxed">{tool.desc}</p>
            </motion.div>
          ))}
       </div>

       <div className="glass p-12 md:p-24 rounded-[4rem] border-white/5 text-center space-y-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter leading-tight relative z-10">
            Platformaga kirish <br /> huquqini oling.
          </h2>
          <p className="text-white/40 max-w-xl mx-auto font-medium relative z-10">45 ta vositadan foydalanish uchun ro'yxatdan o'ting.</p>
          <button className="px-16 py-6 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full relative z-10 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all">
             Ro'yxatdan o'tish
          </button>
       </div>
    </div>
  );
}
