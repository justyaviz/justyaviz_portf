import { motion } from "motion/react";
import { Sparkles, Rocket, Cpu, Brain, Zap, ArrowRight, Target } from "lucide-react";

export default function AI() {
  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto space-y-32">
       <div className="text-center space-y-12">
          <div className="badge-it mx-auto">
             <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" /> AI Ecosystem
          </div>
          <h1 className="text-6xl md:text-9xl font-satoshi font-medium tracking-tighter leading-none">
            AI Ecosystem
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto font-medium text-lg">
            Platformamizda siz IT sohasida ishlash, o'rganish va rivojlanish uchun zarur bo'lgan 45 ta muhim sayt hamda sun’iy intellekt xizmatlaridan foydalanishingiz mumkin.
          </p>
       </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { title: "Spline", desc: "Place to design and collaborate in 3D" },
             { title: "Figma", desc: "Design tool for creating and collaborating" },
             { title: "Framer", desc: "Framer is where teams design and publish stunning sites." },
             { title: "Lovable", desc: "Build software products, using only a chat interface." },
             { title: "Relume", desc: "Access the world’s largest library of Figma" },
             { title: "Webflow", desc: "Take control of HTML, CSS, and JavaScript in a visual canvas." },
             { title: "Hotjar", desc: "Behaviour analytical tool to track users" },
             { title: "Notion", desc: "Wiki, docs and projects management system" }
           ].map((tool, i) => (
             <motion.div 
               key={i}
               whileHover={{ y: -5 }}
               className="p-8 glass border-white/5 rounded-3xl space-y-4 hover:bg-white/[0.03] transition-all group border"
             >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all font-black">
                   {tool.title[0]}
                </div>
                <h4 className="text-xl font-satoshi font-bold">{tool.title}</h4>
                <p className="text-white/30 text-xs leading-relaxed">{tool.desc}</p>
             </motion.div>
           ))}
        </div>

        <div className="glass p-8 md:p-24 rounded-3xl md:rounded-[4rem] border-white/5 text-center space-y-8 md:space-y-12 relative overflow-hidden">
           <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
           <h2 className="text-3xl md:text-7xl font-satoshi font-medium tracking-tighter leading-tight relative z-10">
             Ilovani yuklab olish
           </h2>
           <p className="text-white/40 max-w-xl mx-auto font-medium relative z-10 text-sm md:text-base px-4">IT va marketing sohasidagi barcha vositalar bir joyda.</p>
           <button className="neon-btn w-full md:w-auto h-[55px] md:h-[60px] relative z-10 overflow-visible">
              <div className="neon-btn-content w-full md:w-auto px-8 md:px-16 py-4 md:py-6 text-xs md:text-sm text-center">
                 Yuklab olish
              </div>
           </button>
        </div>
    </div>
  );
}
