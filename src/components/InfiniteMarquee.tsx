import { motion } from "motion/react";
import { Star, Zap, Trophy, ShieldCheck } from "lucide-react";

export default function InfiniteMarquee() {
  const items = [
    { text: "SMM & Target", icon: <Zap size={16} /> },
    { text: "Web Development", icon: <Star size={16} /> },
    { text: "Branding & Naming", icon: <Trophy size={16} /> },
    { text: "SEO Optimization", icon: <ShieldCheck size={16} /> },
    { text: "Creative Design", icon: <Star size={16} /> },
    { text: "Performance Marketing", icon: <Zap size={16} /> },
  ];

  // We duplicate the items vector a few times to ensure seamless infinite crawl
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-accent/5 dark:bg-accent/10 border-y border-[var(--border-primary)] py-4 overflow-hidden relative flex items-center">
      {/* Left/Right fading mask */}
      <div className="absolute inset-0 pointer-events-none z-10 w-full" style={{
        background: "linear-gradient(to right, var(--bg-primary) 0%, transparent 15%, transparent 85%, var(--bg-primary) 100%)"
      }}></div>
      
      <div className="flex w-max animate-[marquee_30s_linear_infinite] hover:animate-none group">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 px-6 md:px-10 group-hover:opacity-50 hover:!opacity-100 transition-opacity duration-300">
            <span className="text-accent">{item.icon}</span>
            <h3 className="font-satoshi font-bold text-lg md:text-xl text-[var(--text-primary)] uppercase tracking-wider whitespace-nowrap">
              {item.text}
            </h3>
            <div className="w-2 h-2 rounded-full bg-accent/30 hidden md:block"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
