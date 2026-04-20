import { motion } from "motion/react";
import { Download, ExternalLink, Palette, Type, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Logo } from "../components/Logo";

export default function BrandSpace() {
  const { t } = useAppContext();

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto space-y-32">
      {/* HERO SECTION */}
      <div className="text-center space-y-12">
        <div className="badge-it mx-auto">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" /> OFFICIAL BRANDING
        </div>
        <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tighter leading-none uppercase italic">
          Brand <span className="text-accent">Space</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          Welcome to the official repository of the <b>JUST YAVIZ</b> visual identity. These assets are provided for partners, media, and collaborators to ensure consistent brand representation across all platforms.
        </p>
      </div>

      {/* CORE ASSETS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LOGO SYSTEM */}
        <div className="p-12 glass border border-white/5 rounded-[3.5rem] space-y-12 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Logo className="w-40 h-40" />
           </div>
           
           <div className="space-y-4">
              <h3 className="text-4xl font-black italic tracking-tighter uppercase">Logo System</h3>
              <p className="text-sm text-[var(--text-secondary)]">Primary and secondary logos in vector and raster formats.</p>
           </div>

           <div className="space-y-4">
              {[
                { name: "Primary Logo (SVG/PNG)", format: "Vector/HD", size: "1.2 MB" },
                { name: "Monochrome Icon", format: "SVG", size: "450 KB" },
                { name: "Wordmark Only", format: "PNG", size: "890 KB" }
              ].map((asset, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl flex items-center justify-between group/item hover:bg-accent hover:text-black transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover/item:bg-white group-hover/item:text-black transition-colors">
                        <Download size={18} />
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-xs font-black uppercase tracking-widest">{asset.name}</p>
                         <p className="text-[10px] opacity-40">{asset.format} • {asset.size}</p>
                      </div>
                   </div>
                   <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover/item:opacity-100">
                      <CheckCircle2 size={14} />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* COLOR PALETTE */}
        <div className="p-12 glass border border-white/5 rounded-[3.5rem] space-y-12">
           <div className="space-y-4">
              <h3 className="text-4xl font-black italic tracking-tighter uppercase">Color Palette</h3>
              <p className="text-sm text-[var(--text-secondary)]">The official shades defining the visual energy of Just Yaviz.</p>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {[
                { name: "Yaviz Orange", hex: "#FF6321", label: "Primary - Action & Energy", rgb: "255, 99, 33" },
                { name: "Pitch Black", hex: "#000000", label: "Secondary - Stability", rgb: "0, 0, 0" },
                { name: "Cloud White", hex: "#FFFFFF", label: "Accent - Clarity", rgb: "255, 255, 255" }
              ].map((color, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl flex items-center gap-6 group hover:translate-x-2 transition-transform">
                   <div className="w-16 h-16 rounded-2xl shadow-2xl border border-white/10" style={{backgroundColor: color.hex}} />
                   <div className="flex-1 space-y-1">
                      <h5 className="text-sm font-black uppercase tracking-widest">{color.name}</h5>
                      <p className="text-[10px] text-white/40 font-medium">{color.label}</p>
                      <div className="flex items-center gap-4 pt-2">
                         <code className="text-[10px] text-accent font-black tracking-widest">{color.hex}</code>
                         <code className="text-[10px] text-white/20 font-mono tracking-widest">{color.rgb}</code>
                      </div>
                   </div>
                   <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity">Copy</button>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* TYPOGRAPHY SECTION */}
      <div className="p-12 md:p-24 glass border border-white/5 rounded-[4rem] relative overflow-hidden space-y-16">
         <div className="absolute bottom-0 right-0 p-12 opacity-5">
            <Type size={300} />
         </div>
         
         <div className="max-w-xl space-y-4 relative z-10">
            <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">Typography <br/> Guidelines</h3>
            <p className="text-[var(--text-secondary)] font-medium">We use a high-contrast pairing of modern geometric sans-serifs and bold display fonts to communicate authority and precision.</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent">Display / Headlines</p>
                <div className="space-y-4">
                   <h1 className="text-6xl font-display italic tracking-tighter leading-none">Satoshi Black Italic</h1>
                   <div className="flex gap-2">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase">Aa Bb Cc</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase">01 02 03</span>
                   </div>
                </div>
                <p className="text-xs text-white/40 leading-relaxed font-hanken">Used for main titles and impact statements. This font represents our innovative and dynamic core.</p>
            </div>

            <div className="space-y-8 p-12 bg-white/5 rounded-[3rem] border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent">Body / Technical</p>
                <div className="space-y-4">
                   <h1 className="text-4xl font-hanken font-bold uppercase tracking-tight italic">Hanken Grotesk</h1>
                   <div className="flex gap-2 text-white/40">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase">Aa Bb Cc</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase">01 02 03</span>
                   </div>
                </div>
                <p className="text-xs text-white/40 leading-relaxed font-hanken">Used for UI elements, micro-labels, and long-form reading. Engineered for high legibility and professional clarity.</p>
            </div>
         </div>
      </div>

      {/* BOTTOM ACTION */}
      <div className="text-center space-y-12 py-20">
         <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent shadow-[0_0_50px_rgba(255,99,33,0.2)]">
            <FileText size={32} />
         </div>
         <div className="space-y-4">
            <h2 className="text-4xl md:text-7xl font-display font-medium tracking-tighter italic uppercase">Full Brand Guidelines</h2>
            <p className="text-[var(--text-secondary)] font-medium max-w-lg mx-auto">Download the comprehensive PDF containing all rules for spacing, usage, and brand philosophy.</p>
         </div>
         <button className="ui-btn-galaxy mx-auto">
            <div className="ui-btn-galaxy-inner px-16 py-6 text-xs font-black tracking-[0.3em] uppercase flex items-center gap-4">
               Download PDF (24MB) <Download size={14} />
            </div>
         </button>
      </div>

      {/* FOOTER BADGE */}
      <div className="flex items-center justify-center gap-3 py-12 border-t border-white/5 opacity-20 hover:opacity-100 transition-opacity">
         <ShieldCheck size={16} />
         <span className="text-[9px] font-black uppercase tracking-widest">© 2026 JUST YAVIZ OFFICIAL DIGITAL ASSETS</span>
      </div>
    </div>
  );
}
