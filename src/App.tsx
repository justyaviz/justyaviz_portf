/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Instagram, 
  Send, 
  ArrowRight, 
  Smartphone, 
  Video, 
  Palette, 
  Megaphone, 
  Target, 
  Cpu, 
  Award,
  Menu,
  X,
  CheckCircle2,
  Eye,
  Briefcase,
  MousePointer2,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans selection:bg-accent/40 selection:text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[200] bg-[#000] flex items-center justify-center"
          >
             <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-display font-black tracking-tighter"
            >
              JUST <span className="text-white/20">YAVIZ</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REFINED NAVBAR - FLOATING PILL */}
      <nav className="pill-nav backdrop-blur-3xl bg-black/40">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 flex items-center justify-center font-black bg-white text-black rounded-lg text-xs">Y</div>
           <span className="hidden sm:inline font-display font-black tracking-tighter text-sm italic">just.yaviz</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/50">
          <a href="#hero" className="hover:text-white transition-colors">Home</a>
          <a href="#services" className="hover:text-white transition-colors">Brending</a>
          <a href="#projects" className="hover:text-white transition-colors">Loyihalar</a>
          <a href="#contact" className="hover:text-white transition-colors">Aloqa</a>
        </div>

        <a 
          href="#contact" 
          className="px-5 py-1.5 bg-white/10 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Hozir bog'lanish
        </a>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu size={18} />
        </button>
      </nav>

      {/* HERO SECTION - EXACT REPLICA STYLE */}
      <section id="hero" className="relative min-h-screen flex items-center pt-24 px-6 md:px-20 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30vw] h-[30vw] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 relative z-20"
          >
            <div className="badge-it">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Just Yaviz
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter flex items-center gap-4 italic leading-none">
                just.yaviz
                <motion.div 
                  whileHover={{ rotate: 45 }}
                  className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-white/20 rounded-full cursor-pointer transition-colors hover:border-white"
                >
                   <ArrowUpRight size={32} className="md:size-40" />
                </motion.div>
              </h1>
              
              <p className="max-w-md text-white/50 text-sm md:text-base leading-relaxed font-medium">
                Biz SMM va Brandface bo‘yicha ko‘p yo‘nalishli ijodkormiz. Biznesingiz uchun zamonaviy texnologiyalar va kuchli vizual identitet yaratamiz. Maqsadimiz — sotuvlarni oshirish va brendingizni unutilmas qilish.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
               <a href="#projects" className="btn-secondary-site text-xs px-10 py-4 uppercase">Barcha loyihalarni ko'rish</a>
               <a href="#contact" className="btn-primary-site text-xs px-10 py-4 uppercase">Hozir murojaat qiling</a>
            </div>
          </motion.div>

          <div className="relative hidden lg:block">
             {/* Floating Cursors */}
             <motion.div 
                animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-[40%] text-white/20"
              >
               <MousePointer2 size={32} />
             </motion.div>
             
             <motion.div 
                animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-10 right-0 text-white/20"
              >
               <MousePointer2 size={24} />
             </motion.div>

             {/* Tilted Notes */}
             <div className="relative h-[500px] flex items-center justify-center">
                <motion.div 
                  initial={{ rotate: -5, y: 100, opacity: 0 }}
                  animate={{ rotate: -8, y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  whileHover={{ rotate: -4, scale: 1.05 }}
                  className="hero-note z-20 bg-black/80 backdrop-blur-xl border-white/10"
                >
                   <p className="text-sm font-medium leading-relaxed italic">
                    Biznesingizga mos professional dizayn va aniq boshqaruv — natija kafolatli.
                   </p>
                </motion.div>

                <motion.div 
                  initial={{ rotate: 10, y: 150, opacity: 0 }}
                  animate={{ rotate: 12, y: 40, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="hero-note absolute right-10 bottom-20 z-10 bg-white/5 backdrop-blur-md border-white/10"
                >
                   <p className="text-sm font-medium leading-relaxed italic">
                    Sifatli dizayn — bu tasodif emas, tizim.
                   </p>
                </motion.div>
             </div>
          </div>
        </div>

        {/* AI SECTION - INSPIRED BY SCREENSHOT */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6"
        >
          <div className="glass p-8 rounded-[3rem] border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             <div className="space-y-4 max-w-xl relative z-10">
                <h3 className="text-3xl md:text-5xl font-display font-black tracking-tighter flex items-center gap-3">
                   Al just.yaviz <Sparkles className="text-white/40" size={24} />
                </h3>
                <p className="text-white/40 text-sm md:text-base leading-relaxed">
                   Platformamizda siz SMM sohasida ishlash, o'rganish va rivojlanish uchun zarur bo'lgan 45 ta muhim vosita hamda sun’iy intellekt xizmatlaridan foydalanishingiz mumkin.
                </p>
             </div>
             <div className="relative group-hover:scale-110 transition-transform duration-700">
                <img 
                  src="https://img.freepik.com/free-vector/cyborg-robot-head-artificial-intelligence-technology-vector_53876-173602.jpg?t=st=1713337000~exp=1713340600~hmac=62d640283c4f7be4b84a1413a26868888888888888888888888888888888" 
                  alt="AI Illustration" 
                  className="w-32 md:w-48 object-contain mix-blend-screen opacity-60"
                />
             </div>
          </div>
        </motion.div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-40 px-6 border-t border-white/5 relative bg-[#000]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { val: "50+", label: "Muvaffaqiyatli loyihalar" },
              { val: "100+", label: "Sotuv kontentlari" },
              { val: "1M+", label: "Umumiy ko‘rishlar" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <div className="text-5xl md:text-7xl font-display font-black tracking-tighter italic">{stat.val}</div>
                <div className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-12 border-y border-white/5 overflow-hidden">
        <div className="marquee-content gap-16 text-sm font-black uppercase tracking-[0.5em] text-white/20">
          <span>SMM YURITISH</span>
          <span>VIDEO CONTENT</span>
          <span>BRANDFACE MARKETING</span>
          <span>GRAFIK DIZAYN</span>
          <span>TARGET REKLAMA</span>
          <span>MOBILOGRAFIYA</span>
          <span>SMM YURITISH</span>
          <span>VIDEO CONTENT</span>
          <span>BRANDFACE MARKETING</span>
          <span>GRAFIK DIZAYN</span>
          <span>TARGET REKLAMA</span>
          <span>MOBILOGRAFIYA</span>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-40 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/30">Xizmatlarimiz</span>
            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter italic">Nimalar qilamiz?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Megaphone />, title: "SMM yuritish", desc: "Brendingizni tushunadigan va auditoriya bilan muloqot qiladigan professional boshqaruv." },
              { icon: <Video />, title: "Video kontent", desc: "Reels va Shorts orqali brendingizni millionlab odamlarga ko‘rsatish va qiziqtirish." },
              { icon: <Award />, title: "Brandface", desc: "Sizning brendingizni insoniy nuqtai nazardan ochib beradigan marketing yondashuvi." },
              { icon: <Palette />, title: "Grafik dizayn", desc: "Har bir pikselda sifat — sizning vizual imidjingizni yuqori darajaga ko‘taradi." },
              { icon: <Target />, title: "Target reklama", desc: "Minimal budjet bilan maksimal sotuv — aniq auditoriyaga yo‘naltirilgan reklama." },
              { icon: <Smartphone />, title: "Mobilografiya", desc: "Professional ko‘rinishga ega mobil foto va video materiallar yaratish." },
            ].map((s, i) => (
              <motion.div 
                key={i} 
                {...fadeIn}
                whileHover={{ y: -10 }}
                className="p-12 glass border-white/5 rounded-[4rem] group transition-all duration-500 hover:bg-white/5"
              >
                <div className="mb-10 text-white group-hover:scale-110 transition-transform">{s.icon}</div>
                <h4 className="text-2xl font-display font-bold mb-4 italic">{s.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-40 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/30">Portfolio</span>
              <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter italic">Loyihalar</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { title: "Texnika kontentlari", category: "Honor & Redmi Showcase", image: "https://picsum.photos/seed/tech13/1200/800" },
              { title: "Savdo loyihalari", category: "E-commerce Strategy", image: "https://picsum.photos/seed/sale13/1200/800" },
              { title: "Shaxsiy brendlar", category: "Brandface Transformation", image: "https://picsum.photos/seed/brand13/1200/800" },
              { title: "AlooSMM platforma", category: "Product Development", image: "https://picsum.photos/seed/saas13/1200/800" },
            ].map((p, i) => (
              <motion.div 
                key={i} 
                {...fadeIn}
                className="group relative h-[500px] md:h-[650px] bg-white/5 rounded-[4rem] overflow-hidden border border-white/5"
              >
                <img 
                  src={p.image} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-transparent p-12 flex flex-col justify-end">
                   <div className="glass backdrop-blur-3xl p-8 rounded-[2.5rem] border-white/10 space-y-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-xs font-black uppercase tracking-widest text-white/40">{p.category}</span>
                      <h4 className="text-3xl font-display font-black italic">{p.title}</h4>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-60 px-6 relative text-center">
         <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="text-[25vw] font-display font-black tracking-tighter text-white opacity-20">CONTACT</div>
         </div>
         
         <div className="max-w-5xl mx-auto space-y-16 relative z-10">
            <motion.h2 
              {...fadeIn}
              className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-[0.8] italic uppercase"
            >
              Bog'lanamiz<span className="text-white/20">?</span>
            </motion.h2>

            <motion.div {...fadeIn} className="flex flex-col items-center gap-10">
               <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-white/10 rounded-full text-white/40 mb-4 animate-bounce">
                  <ArrowRight size={32} className="rotate-90" />
               </div>
               <a 
                href="https://t.me/justyaviz_life" 
                target="_blank"
                rel="noreferrer"
                className="btn-primary-site text-xl px-20 py-8 uppercase tracking-widest"
              >
                Hozir bog'lanish
              </a>
              <p className="text-2xl font-display font-bold text-white/40">+998 99 893 90 00</p>
            </motion.div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#000]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 text-center md:flex-row md:justify-between md:text-left">
          <div className="space-y-6">
            <div className="text-3xl font-display font-black tracking-tighter italic">
              just.yaviz
            </div>
            <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.4em]">SMM | Brandface | Digital Strategy</p>
          </div>

          <div className="flex gap-16">
            <a href="https://instagram.com/just_yaviz" className="text-white/30 hover:text-white transition-colors group">
              <span className="text-[10px] font-black uppercase tracking-widest border-b border-white/10 group-hover:border-white pb-1">Instagram</span>
            </a>
            <a href="https://t.me/justyaviz_life" className="text-white/30 hover:text-white transition-colors group">
              <span className="text-[10px] font-black uppercase tracking-widest border-b border-white/10 group-hover:border-white pb-1">Telegram</span>
            </a>
          </div>

          <div className="text-[10px] text-white/10 font-black uppercase tracking-[0.5em]">
            © 2026 just yaviz
          </div>
        </div>
      </footer>
      
      {/* SCROLL PROGRESS */}
      <motion.div 
        className="fixed bottom-10 right-10 w-12 h-12 glass rounded-full flex items-center justify-center z-[100] border-white/10"
        style={{ scale: scrollYProgress }}
      >
         <ArrowUpRight size={18} />
      </motion.div>
    </div>
  );
}
