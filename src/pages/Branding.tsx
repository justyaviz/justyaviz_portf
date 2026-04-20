import { motion, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { 
  Palette, 
  Type, 
  Layout, 
  Sparkles, 
  Target, 
  Rocket, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  MousePointer2
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Logo } from "../components/Logo";

export default function Branding() {
  const { t } = useAppContext();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <div ref={containerRef} className="pt-32 pb-40 space-y-40 overflow-hidden">
      
      {/* HERO SECTION - EDITORIAL STYLE */}
      <section className="px-6 relative min-h-[70vh] flex flex-col items-center justify-center text-center space-y-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
           <motion.div style={{ rotate }} className="text-[25vw] font-black italic absolute -top-20 -left-20 opacity-10 whitespace-nowrap">BRANDING SYSTEM</motion.div>
        </div>

        <div className="space-y-6 relative z-10">
           <div className="badge-it mx-auto">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" /> VISUAL IDENTITY
           </div>
           <h1 className="text-[12vw] md:text-[9vw] font-display font-medium tracking-tighter leading-[0.85] uppercase italic">
              Crafting <br /> <span className="text-accent underline decoration-white/10 underline-offset-8">Authority</span>
           </h1>
           <p className="text-[var(--text-secondary)] max-w-xl mx-auto font-medium text-lg leading-relaxed pt-8">
              We don't just design logos; we architect visual ecosystems that command attention and scale businesses into global brands.
           </p>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="pt-12 text-accent"
        >
           <MousePointer2 size={32} />
        </motion.div>
      </section>

      {/* CORE PILLARS GRID */}
      <section className="px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: "Identity Systems", 
            desc: "Complete visual frameworks including logos, typography, and color psychology engineered for your market.", 
            icon: <Palette />,
            stats: "100+ Brands Delivered"
          },
          { 
            title: "Brand Voice", 
            desc: "Tone of voice and messaging strategies that resonate deeply with your target audience's core desires.", 
            icon: <Type />,
            stats: "Global Reach Optimized"
          },
          { 
            title: "Digital Design", 
            desc: "UI/UX standards that bridge the gap between aesthetic beauty and high-conversion functional design.", 
            icon: <Layout />,
            stats: "Pixel Perfect Result"
          }
        ].map((pillar, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -15 }}
            className="p-12 glass border border-white/5 rounded-[3.5rem] space-y-8 relative overflow-hidden group"
          >
             <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(var(--accent-rgb),0.3)]">
                {pillar.icon}
             </div>
             <div className="space-y-4">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">{pillar.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                   {pillar.desc}
                </p>
             </div>
             <div className="pt-8 border-t border-white/5">
                <span className="text-[9px] font-black uppercase tracking-widest text-accent">{pillar.stats}</span>
             </div>
          </motion.div>
        ))}
      </section>

      {/* IMMERSIVE SHOWCASE */}
      <section className="px-6 max-w-7xl mx-auto">
         <div className="p-12 md:p-32 bg-accent/5 rounded-[5rem] border border-accent/10 relative overflow-hidden text-center space-y-12">
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
               <Logo className="w-80 h-80" />
            </div>
            
            <div className="space-y-8 relative z-10">
               <h2 className="text-4xl md:text-8xl font-display font-medium tracking-tighter leading-none uppercase italic">
                  Visual <br/> Standards <span className="text-accent underline decoration-white/10">2.0</span>
               </h2>
               <p className="text-[var(--text-secondary)] max-w-xl mx-auto font-medium text-lg">
                  Every asset we create is backed by data and psychological analysis to ensure it performs as well as it looks.
               </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
               {[
                 { label: "Precision", val: "100%" },
                 { label: "Scaling", val: "Vector" },
                 { label: "Format", val: "Multi" },
                 { label: "Update", val: "24/7" }
               ].map((item, i) => (
                 <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:bg-white hover:text-black transition-all group">
                    <span className="text-2xl font-black italic block mb-2">{item.val}</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100">{item.label}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* BRAND SPACE CTA */}
      <section className="px-6 max-w-7xl mx-auto space-y-16">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-accent">OPEN RESOURCE</span>
              <h3 className="text-4xl md:text-6xl font-display font-medium tracking-tighter uppercase italic leading-none">Access Our <br/> Blueprint</h3>
            </div>
            <p className="text-[var(--text-secondary)] max-w-sm font-medium">Transparency is the ultimate form of authority. Visit our brand space to see how we define our own visual language.</p>
         </div>

         <div className="group relative cursor-pointer" onClick={() => window.location.href='/brand-assets'}>
            <div className="h-[400px] md:h-[600px] bg-white/5 rounded-[4rem] border border-white/5 overflow-hidden relative">
               <motion.img 
                 style={{ scale }}
                 src="https://picsum.photos/seed/brandspace/1920/1080"
                 alt="Brand Workspace"
                 className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="ui-btn-galaxy">
                     <div className="ui-btn-galaxy-inner px-16 py-6 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-4">
                        ENTER BRAND SPACE <ArrowUpRight />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL TRUST BAR */}
      <div className="flex flex-wrap items-center justify-center gap-16 px-6 opacity-20 hover:opacity-100 transition-opacity cursor-default">
         <div className="flex items-center gap-3">
            <ShieldCheck className="text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Copyright Protected</span>
         </div>
         <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Official Identity System</span>
         </div>
         <div className="flex items-center gap-3">
            <FileText className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Media Ready Assets</span>
         </div>
      </div>
    </div>
  );
}
