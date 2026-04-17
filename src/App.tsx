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
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Eye,
  Briefcase
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

const Counter = ({ value, label, icon: Icon }: { value: string, label: string, icon: any }) => {
  return (
    <motion.div 
      variants={fadeIn}
      className="flex flex-col items-center p-6 glass rounded-2xl md:p-8"
    >
      <div className="p-3 bg-accent/10 rounded-xl mb-4 text-accent">
        <Icon size={24} />
      </div>
      <span className="text-3xl md:text-4xl font-display font-bold mb-1 tracking-tighter">{value}</span>
      <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest text-center">{label}</span>
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-ink font-sans selection:bg-accent/30 selection:text-white">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[100] bg-ink flex items-center justify-center flex-col gap-6"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl md:text-4xl font-display font-black tracking-tighter"
            >
              JUST <span className="text-accent underline underline-offset-8 decoration-4">YAVIZ</span>
            </motion.div>
            <div className="w-48 h-[1px] bg-white/10 overflow-hidden relative">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-accent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-pink/10 blur-[120px] rounded-full" />
        
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              y: [0, -500], 
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute bg-white/20 rounded-full w-[1px] h-[1px]"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100 + 100}%` 
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-x-0 border-t-0 bg-ink/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-display font-black tracking-tighter"
          >
            JUST <span className="text-accent">YAVIZ</span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            {["Services", "Projects", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="hover:text-accent transition-all duration-300"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-6 py-2.5 bg-white text-ink rounded-full hover:bg-accent hover:text-white transition-all transform hover:scale-105"
            >
              Bog‘lanish
            </a>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-ink lg:hidden pt-32 px-10 flex flex-col gap-10"
          >
            {["Services", "Projects", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-5xl font-display font-black tracking-tighter"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-20">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 text-center">
          <motion.div 
            style={{ opacity }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-accent text-[10px] font-black tracking-[0.3em] uppercase mb-12"
            >
              <Target size={14} className="animate-pulse" /> SMM & Digital Expert 2026
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="text-[12vw] md:text-[8vw] lg:text-[7.5vw] font-display font-black tracking-tighter leading-[0.85] mb-12 text-gradient"
            >
              Mijozlarni xaridorga aylantiradigan kontent va marketing
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-16 leading-relaxed font-medium"
            >
              Men — <span className="text-white">Just Yaviz</span>, SMM mutaxassisi, brandface va digital ijodkorman. Men yaratgan kontentlar nafaqat ko‘rinadi — balki sotadi.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <a 
                href="#contact" 
                className="group w-full sm:w-auto px-12 py-5 bg-white text-ink font-black rounded-full flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all transform hover:scale-105 shadow-2xl"
              >
                Bog‘lanish <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#projects" 
                className="w-full sm:w-auto px-12 py-5 glass rounded-full text-white font-black flex items-center justify-center gap-2 hover:bg-white/10 transition-all border-white/10"
              >
                Loyihalar
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* TRUST SECTION */}
        <section className="py-24 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <motion.div {...fadeIn} className="text-center mb-20 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">Biznesingiz uchun zamonaviy marketing va kontent yechimlari</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <Counter value="50+" label="Muvaffaqiyatli loyihalar" icon={Briefcase} />
              <Counter value="100+" label="Sotuv kontentlari" icon={Video} />
              <Counter value="1M+" label="Umumiy ko‘rishlar" icon={Eye} />
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="py-12 bg-white/5 overflow-hidden">
          <div className="marquee-content gap-16 text-sm font-black uppercase tracking-[0.5em] text-white/30">
            <span>SMM YURITISH</span>
            <span>VIDEO CONTENT</span>
            <span>BRANDFACE MARKETING</span>
            <span>GRAFIK DIZAYN</span>
            <span>TARGET REKLAMA</span>
            <span>MOBILOGRAFIYA</span>
            {/* Double it */}
            <span>SMM YURITISH</span>
            <span>VIDEO CONTENT</span>
            <span>BRANDFACE MARKETING</span>
            <span>GRAFIK DIZAYN</span>
            <span>TARGET REKLAMA</span>
            <span>MOBILOGRAFIYA</span>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-32 px-6">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="space-y-4">
              <motion.span {...fadeIn} className="text-accent text-xs font-black tracking-widest uppercase">Xizmatlarimiz</motion.span>
              <motion.h2 {...fadeIn} className="text-5xl md:text-7xl font-display font-black tracking-tighter">Premium yechimlar</motion.h2>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { icon: <Megaphone />, title: "SMM yuritish", desc: "Brendingizni tushunadigan va auditoriya bilan muloqot qiladigan professional boshqaruv." },
                { icon: <Video />, title: "Video kontent", desc: "Reels va Shorts orqali brendingizni millionlab odamlarga ko‘rsatish va qiziqtirish." },
                { icon: <Award />, title: "Brandface", desc: "Sizning brendingizni insoniy nuqtai nazardan ochib beradigan marketing yondashuvi." },
                { icon: <Palette />, title: "Grafik dizayn", desc: "Har bir pikselda sifat — sizning vizual imidjingizni yuqori darajaga ko‘taradi." },
                { icon: <Target />, title: "Target reklama", desc: "Aniq va samarali — har bir so‘m uchun maksimal natija va mijozlar oqimi." },
                { icon: <Smartphone />, title: "Mobilografiya", desc: "Professional ko‘rinishga ega mobil foto va video materiallar yaratish." },
              ].map((s, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                  className="p-10 glass rounded-[3rem] hover:bg-accent hover:border-accent transition-all duration-500 group"
                >
                  <div className="mb-8 text-accent group-hover:text-white transition-colors">{s.icon}</div>
                  <h4 className="text-2xl font-display font-bold mb-4 tracking-tight group-hover:text-white">{s.title}</h4>
                  <p className="text-white/40 group-hover:text-white/80 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-32 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <motion.div {...fadeIn} className="lg:w-1/2 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/20 blur-[100px] rounded-full" />
               <img src="https://picsum.photos/seed/yaviz-about/800/1000" alt="Just Yaviz" className="relative rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10" />
            </motion.div>

            <motion.div {...fadeIn} className="lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <span className="text-accent text-[10px] font-black uppercase tracking-widest">Men haqimda</span>
                <h3 className="text-6xl md:text-8xl font-display font-black tracking-tighter">Just Yaviz</h3>
              </div>
              <p className="text-xl text-white/60 leading-relaxed font-display">
                Men — Just Yaviz (Yahyobek Tohirjonov), SMM mutaxassisi, brandface va kontent yaratuvchiman. Mening asosiy maqsadim — bizneslarga sotuv olib keladigan tizim yaratish.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {["SMM", "Video editing", "Brandface", "Graphic design", "Target ads", "Mobilography"].map((item) => (
                  <div key={item} className="flex items-center gap-2 p-4 glass rounded-2xl border-white/5 font-bold">
                    <CheckCircle2 size={16} className="text-accent" />
                    <span className="text-xs uppercase tracking-tighter">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 glass rounded-[2rem] border-l-4 border-l-accent space-y-3">
                 <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest">
                    <Cpu size={16} /> Digital Evolution
                 </div>
                 <p className="text-sm text-white/50">
                    Men frontend va backend dasturlashni o‘rganayapman va o‘z SMM platformam — <span className="text-white font-bold italic">"AlooSMM"</span> ustida ishlayapman.
                 </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center space-y-4">
              <motion.span {...fadeIn} className="text-accent text-xs font-black tracking-widest uppercase">Portfolio</motion.span>
              <motion.h2 {...fadeIn} className="text-5xl md:text-7xl font-display font-black tracking-tighter">Tanlangan loyihalar</motion.h2>
            </div>

            <motion.div 
               variants={staggerContainer}
               initial="initial"
               whileInView="whileInView"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                { title: "Texnika kontentlari", category: "Honor & Redmi Showcase", image: "https://picsum.photos/seed/tech/1200/800" },
                { title: "Savdo loyihalari", category: "E-commerce Strategy", image: "https://picsum.photos/seed/sales/1200/800" },
                { title: "Shaxsiy brendlar", category: "Brandface Transformation", image: "https://picsum.photos/seed/brand/1200/800" },
                { title: "AlooSMM platforma", category: "Product Development", image: "https://picsum.photos/seed/saas/1200/800" },
              ].map((p, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeIn}
                  whileHover={{ scale: 0.98 }}
                  className="group relative h-[450px] md:h-[600px] bg-white/5 rounded-[3rem] overflow-hidden border border-white/10"
                >
                  <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/90 to-transparent p-12 flex flex-col justify-end">
                    <span className="text-accent text-[10px] font-black uppercase tracking-widest mb-3">{p.category}</span>
                    <h4 className="text-4xl font-display font-black mb-1 italic">{p.title}</h4>
                    <div className="w-12 h-1 bg-accent mt-4 group-hover:w-24 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHY ME */}
        <section className="py-32 px-6 bg-ink relative">
           <div className="max-w-7xl mx-auto space-y-20">
              <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                 <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none">Nega faqat natija?</h2>
                 <p className="max-w-xs text-white/40 text-sm leading-relaxed">Agentlik darajasidagi xizmatlar, shaxsiy brend ishonchi bilan.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  "Faqat kontent emas — natija beraman",
                  "Dizayn + video + marketing bir joyda",
                  "Kamera oldida professional darajada ishlay olaman",
                  "Trend va algoritmlarni puxta tushunaman"
                ].map((text, i) => (
                  <motion.div 
                    key={i} 
                    {...fadeIn} 
                    className="p-10 glass rounded-[2.5rem] border-white/5 hover:border-accent group"
                  >
                     <div className="text-4xl font-display font-black text-white/10 mb-8 group-hover:text-accent transition-colors">0{i+1}</div>
                     <p className="font-bold text-lg leading-snug">{text}</p>
                  </motion.div>
                ))}
              </div>
           </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-48 px-6 relative overflow-hidden bg-accent/5">
           <div className="absolute inset-0 purple-glow opacity-30" />
           <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
              <motion.h2 
                {...fadeIn}
                className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.85]"
              >
                Mijozlarni ko‘paytirishni boshlaymiz
              </motion.h2>

              <motion.div {...fadeIn} className="space-y-10 flex flex-col items-center">
                 <p className="text-3xl font-display font-bold text-accent">+998 99 893 90 00</p>
                 <a 
                  href="https://t.me/justyaviz_life" 
                  target="_blank"
                  rel="noreferrer"
                  className="px-12 py-6 bg-white text-ink font-black rounded-full text-xl hover:bg-accent hover:text-white transition-all transform hover:scale-105 shadow-2xl shadow-accent/20"
                >
                  Bog‘lanish
                </a>
              </motion.div>
           </div>
        </section>
      </main>

      <footer className="py-20 px-6 bg-ink border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 text-center md:flex-row md:justify-between md:text-left">
          <div className="space-y-4">
            <div className="text-2xl font-display font-black tracking-tighter">
              JUST <span className="text-accent">YAVIZ</span>
            </div>
            <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">SMM | Brandface | Marketing Solution</p>
          </div>

          <div className="flex gap-10">
            <a href="https://instagram.com/just_yaviz" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
              <Instagram size={20} className="group-hover:scale-110 transition-transform" /> <span className="text-[10px] font-black uppercase tracking-widest">Instagram</span>
            </a>
            <a href="https://t.me/justyaviz_life" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
              <Send size={20} className="group-hover:scale-110 transition-transform" /> <span className="text-[10px] font-black uppercase tracking-widest">Telegram</span>
            </a>
          </div>

          <div className="text-[10px] text-white/20 font-black tracking-widest uppercase">
            © 2026 Just Yaviz.
          </div>
        </div>
      </footer>
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
