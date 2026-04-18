import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";

export default function AI() {
  const { t } = useAppContext();

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto space-y-32">
       <div className="text-center space-y-12">
          <div className="badge-it mx-auto">
             <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" /> {t("ai.hero.badge")}
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tighter leading-none">
            {t("ai.hero.title")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            {t("ai.hero.desc")}
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
               className="p-8 glass border-[var(--border-primary)] rounded-3xl space-y-4 hover:bg-accent/5 transition-all group border shadow-sm"
             >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all font-black text-xl">
                   {tool.title[0]}
                </div>
                <h4 className="text-xl font-display font-bold">{tool.title}</h4>
                <p className="text-[var(--text-secondary)] text-xs leading-relaxed opacity-60">{tool.desc}</p>
             </motion.div>
           ))}
        </div>

        <div className="glass p-8 md:p-24 rounded-3xl md:rounded-[4rem] border-[var(--border-primary)] text-center space-y-8 md:space-y-12 relative overflow-hidden shadow-xl">
           <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
           <h2 className="text-3xl md:text-7xl font-display font-medium tracking-tighter leading-tight relative z-10">
             {t("ai.download.title")}
           </h2>
           <p className="text-[var(--text-secondary)] max-w-xl mx-auto font-medium relative z-10 text-sm md:text-base px-4">
             {t("ai.download.desc")}
           </p>
           <button className="neon-btn w-full md:w-auto h-[55px] md:h-[60px] relative z-10 overflow-visible mx-auto inline-block">
              <div className="neon-btn-content w-full md:w-auto px-8 md:px-16 py-4 md:py-6 text-xs md:text-sm text-center">
                 {t("ai.download.btn")}
              </div>
           </button>
        </div>
    </div>
  );
}
