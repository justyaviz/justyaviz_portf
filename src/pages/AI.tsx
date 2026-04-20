import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { ArrowUpRight } from "lucide-react";

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
              { title: "Spline", desc: "Place to design and collaborate in 3D", iconColor: "bg-blue-500" },
              { title: "Figma", desc: "Design tool for creating and collaborating", iconColor: "bg-purple-500" },
              { title: "Framer", desc: "Design and publish stunning sites", iconColor: "bg-black" },
              { title: "Lovable", desc: "Build software products via chat", iconColor: "bg-red-500" },
              { title: "Relume", desc: "The world’s largest Figma library", iconColor: "bg-blue-600" },
              { title: "Webflow", desc: "Visual canvas for HTML, CSS, JS", iconColor: "bg-blue-400" },
              { title: "Hotjar", desc: "Behaviour analytical tracking tool", iconColor: "bg-yellow-500" },
              { title: "Notion", desc: "Wiki, docs and project management", iconColor: "bg-white text-black border border-black/10" }
            ].map((tool, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="ui-magic-card group"
              >
                <div className="p-8 h-full space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className={`w-14 h-14 ${tool.iconColor} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-all font-black text-2xl shadow-lg`}>
                       {tool.title[0]}
                    </div>
                    <h4 className="text-xl font-display font-black tracking-tight">{tool.title}</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed opacity-70 font-medium">{tool.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-[var(--border-primary)] flex items-center justify-between">
                     <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Pro Tool</span>
                     <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={14} />
                     </div>
                  </div>
                </div>
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
           <button className="ui-btn-galaxy h-[55px] md:h-[60px] relative z-10 overflow-visible mx-auto mt-4 inline-flex items-center justify-center">
              <div className="ui-btn-galaxy-inner px-8 md:px-16 py-4 md:py-6 text-xs md:text-sm text-center w-full justify-center text-white font-bold bg-accent tracking-widest uppercase">
                 {t("ai.download.btn")}
              </div>
           </button>
        </div>
    </div>
  );
}
