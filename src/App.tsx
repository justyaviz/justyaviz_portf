/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
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
  X
} from "lucide-react";
import { useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-purple-500/30 selection:text-purple-200 text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-accent/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-accent-pink/15 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-accent/5 blur-[100px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-10 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-bold tracking-tight"
          >
            JUST <span className="text-accent">YAVIZ</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {["Xizmatlar", "Loyihalar", "SMM", "Bog‘lanish"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-[12px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 left-0 w-full bg-[#050505] border-b border-white/10 px-6 py-8 flex flex-col gap-6"
          >
            {["Bosh sahifa", "Loyihalar", "Xizmatlar", "Biz haqimizda"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      <main className="relative pt-32 px-10 max-w-7xl mx-auto z-10">
        {/* HERO SECTION */}
        <section id="bosh-sahifa" className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 pb-20">
          <div className="flex flex-col justify-center">
            <motion.span 
              {...fadeIn}
              className="section-label"
            >
              SMM & Brandface
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-[52px] font-bold tracking-tighter mb-6 leading-[1.1]"
            >
              Mijozlarni xaridorga aylantiradigan kontent
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-md text-base text-white/60 mb-8 leading-relaxed"
            >
              Men — Just Yaviz, digital ijodkor va marketing mutaxassisiman. Men yaratgan kontentlar nafaqat ko‘rinadi — balki sotadi.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a 
                href="#bog-lanish" 
                className="btn-immersive btn-immersive-primary"
              >
                Bog‘lanish
              </a>
              <a 
                href="#loyihalar" 
                className="btn-immersive btn-immersive-secondary"
              >
                Loyihalar
              </a>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="flex gap-10 pt-4"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight">50+</span>
                <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Loyihalar</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight">10M+</span>
                <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Ko‘rilishlar</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight">100%</span>
                <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Natija</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE PANEL */}
          <div className="flex flex-col gap-6">
            <motion.div 
              {...fadeIn}
              className="glass-card p-6"
            >
              <span className="section-label">Men haqimda</span>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-white/10 to-white/5 border-2 border-accent overflow-hidden">
                  <img src="https://picsum.photos/seed/yaviz-portrait/200/200" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Yahyobek Tohirjonov</h4>
                  <p className="text-[12px] text-white/60">SMM mutaxassisi & Digital Content Creator. AlooSMM asoschisi.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="glass-card p-6"
            >
              <span className="section-label">Xizmatlar</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: "SMM Yuritish", subtitle: "Tizimli marketing" },
                  { title: "Video Content", subtitle: "Reels & Shorts" },
                  { title: "Brandface", subtitle: "Shaxsiy brending" },
                  { title: "Targeting", subtitle: "Aniq reklama" },
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl">
                    <h3 className="text-[13px] font-bold mb-1 tracking-tight">{s.title}</h3>
                    <p className="text-[11px] text-white/50">{s.subtitle}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="glass-card p-6"
            >
              <span className="section-label">Loyihalar</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-24 rounded-xl overflow-hidden group">
                  <img src="https://picsum.photos/seed/tech/400/300" alt="Tech" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-3">
                    <span className="text-[10px] font-bold">Honor Tech Review</span>
                  </div>
                </div>
                <div className="relative h-24 rounded-xl overflow-hidden group">
                  <img src="https://picsum.photos/seed/aloosmm/400/300" alt="Aloo" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-3">
                    <span className="text-[10px] font-bold">AlooSMM Platform</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FULL CONTENT (Sections from original content but styled with Immersive theme) */}
        <div className="space-y-40 pb-20">
          {/* SERVICES FULL GRID */}
          <section id="xizmatlar" className="space-y-12">
            <div className="flex items-center gap-4">
               <span className="h-[1px] flex-1 bg-white/10" />
               <h2 className="section-label mb-0">Bizning xizmatlar</h2>
               <span className="h-[1px] flex-1 bg-white/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                { icon: <Megaphone className="w-5 h-5 text-accent" />, title: "SMM yuritish", desc: "Brendingizni to‘liq boshqarish va o‘stirish." },
                { icon: <Video className="w-5 h-5 text-accent" />, title: "Reels / Shorts", desc: "Millionlab ko‘rishlar olib keladigan dinamik videolar." },
                { icon: <Award className="w-5 h-5 text-accent" />, title: "Brandface", desc: "Bloggerlar uchun shaxsiy brend yaratish." },
                { icon: <Palette className="w-5 h-5 text-accent" />, title: "Grafik dizayn", desc: "Premium darajadagi vizuallar va brending." },
                { icon: <Target className="w-5 h-5 text-accent" />, title: "Target reklama", desc: "Minimal budjet bilan maksimal sotuv." },
                { icon: <Smartphone className="w-5 h-5 text-accent" />, title: "Mobilografiya", desc: "Professional darajadagi mobil surat va video." },
              ].map((service, i) => (
                <motion.div key={i} {...fadeIn} className="glass-card p-8 border-white/5 hover:border-accent/30 transition-all">
                  <div className="mb-4">{service.icon}</div>
                  <h4 className="text-lg font-bold mb-2 tracking-tight">{service.title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* PROJECTS FULL GRID */}
          <section id="loyihalar" className="space-y-12">
            <div className="flex items-center gap-4">
               <span className="h-[1px] flex-1 bg-white/10" />
               <h2 className="section-label mb-0">Portfoliomiz</h2>
               <span className="h-[1px] flex-1 bg-white/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Texnika kontentlari", category: "Honor & Redmi", image: "https://picsum.photos/seed/p1/1200/800" },
                { title: "Savdo loyihalari", category: "E-commerce Strategy", image: "https://picsum.photos/seed/p2/1200/800" },
                { title: "Shaxsiy brendlar", category: "Personal Branding Kit", image: "https://picsum.photos/seed/p3/1200/800" },
                { title: "AlooSMM platforma", category: "Digital Product Design", image: "https://picsum.photos/seed/p4/1200/800" },
              ].map((project, i) => (
                <motion.div key={i} {...fadeIn} className="glass-card overflow-hidden group">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={project.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/90 to-transparent">
                       <h4 className="text-xl font-bold mb-1 tracking-tight">{project.title}</h4>
                       <p className="text-white/50 text-[10px] tracking-widest uppercase font-bold">{project.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CONTACT CTA */}
          <section id="bog-lanish" className="py-20">
             <div className="glass-card p-12 text-center space-y-8 relative overflow-hidden group">
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-700" />
               <h2 className="text-4xl md:text-5xl font-bold tracking-tighter max-w-2xl mx-auto">Biznesingizni keyingi bosqichga olib chiqamiz</h2>
               <div className="space-y-2">
                  <div className="text-3xl font-bold text-accent">+998 99 893 90 00</div>
                  <p className="text-sm text-white/50">Loyihangizni muhokama qilish uchun tayyormisiz?</p>
               </div>
               <div className="flex flex-wrap items-center justify-center gap-4">
                  <a href="tel:+998998939000" className="btn-immersive btn-immersive-primary">Bog‘lanish</a>
                  <a href="https://t.me/justyaviz_life" target="_blank" className="btn-immersive btn-immersive-secondary flex items-center gap-2" rel="noreferrer">
                    <Send size={16} /> Telegram
                  </a>
               </div>
             </div>
          </section>
        </div>
      </main>

      <footer className="mt-20 py-10 px-10 border-t border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-10">
            <span className="text-accent font-bold text-xl tracking-tight leading-none">+998 99 893 90 00</span>
            <span className="text-[11px] text-white/40 uppercase tracking-widest font-bold hidden md:block">Biznesingizni keyingi bosqichga olib chiqamiz</span>
          </div>

          <div className="flex items-center gap-8 text-[11px] text-white/50 uppercase tracking-widest font-bold">
            <a href="https://instagram.com/just_yaviz" target="_blank" className="hover:text-accent transition-colors" rel="noreferrer">Instagram</a>
            <a href="https://t.me/justyaviz_life" target="_blank" className="hover:text-accent transition-colors" rel="noreferrer">Telegram</a>
            <span className="text-white/20">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
