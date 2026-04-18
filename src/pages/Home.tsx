import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { 
  ArrowUpRight, 
  MousePointer2, 
  CheckCircle2, 
  Sparkles, 
  Video, 
  Palette, 
  Megaphone, 
  Target, 
  Smartphone, 
  Award,
  X,
  Briefcase,
  ExternalLink,
  Globe,
  Send,
  Github,
  Rocket,
  Instagram,
  Youtube
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EditableText } from "../components/EditableText";
import { ProjectControls, AddProjectBtn } from "../components/ProjectEditor";
import { db } from "../lib/firebase";
import { doc, onSnapshot, collection, query, limit } from "firebase/firestore";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const marqueeVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
  animateReverse: {
    x: [-1000, 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 25,
        ease: "linear",
      },
    },
  },
};

export default function Home() {
  const [content, setContent] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const unsubContent = onSnapshot(doc(db, "siteContent", "main"), (d) => {
      if (d.exists()) setContent(d.data());
    });

    const q = query(collection(db, "projects"), limit(4));
    const unsubProjects = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubContent();
      unsubProjects();
    };
  }, []);

  // Mouse Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
      {/* MOUSE FOLLOWING ORB */}
      <motion.div 
        style={{ 
          x: springX, 
          y: springY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen hidden md:block"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white,0_0_50px_white]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/[0.03] blur-3xl rounded-full" />
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 px-6 md:px-20 overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
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
              <motion.h1 
                {...fadeIn}
                className="text-[72px] md:text-[9vw] font-satoshi font-normal tracking-tighter flex items-center gap-4 leading-none"
              >
                <EditableText contentKey="heroTitle" defaultText="just.yaviz" as="span" />
                <motion.div 
                  whileHover={{ rotate: 135, scale: 1.2 }}
                  className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center border border-white/20 rounded-full cursor-pointer hover:border-white transition-all shrink-0"
                >
                   <ArrowUpRight className="size-6 md:size-10" />
                </motion.div>
              </motion.h1>
              <motion.p 
                {...fadeIn}
                transition={{ delay: 0.1 }}
                className="max-w-md text-white font-satoshi text-[16px] leading-relaxed font-medium tracking-tight"
              >
                <EditableText contentKey="heroDesc" defaultText="Biz SMM va Brandface bo‘yicha ko‘p yo‘nalishli ijodkormiz. Biznesingiz uchun zamonaviy texnologiyalar va kuchli vizual identitet yaratamiz." type="textarea" />
              </motion.p>
            </div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex flex-wrap items-center gap-6">
               <Link to="/projects" className="btn-download px-10 py-4 text-xs">Barcha loyihalar</Link>
               <Link to="/contact" className="px-10 py-3.5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform">Hozir boshlaymiz</Link>
            </motion.div>
          </motion.div>

          <div className="relative hidden lg:block">
             <div className="relative h-[500px] flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: [-8, -6, -8], y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ rotate: -4, scale: 1.05 }}
                  className="hero-note z-20 bg-black/95 backdrop-blur-3xl border border-white/5 shadow-[0_32px_64px_rgba(0,0,0,0.8)]"
                >
                   <p className="text-sm font-medium leading-relaxed">
                    Biznesingizga mos professional dizayn va aniq boshqaruv — natija kafolatli.
                   </p>
                </motion.div>
                <motion.div 
                  animate={{ rotate: [12, 10, 12], y: [40, 50, 40] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="hero-note absolute right-10 bottom-20 z-10 bg-black/95 backdrop-blur-3xl border border-white/5 shadow-[0_32px_64px_rgba(0,0,0,0.8)]"
                >
                   <p className="text-sm font-medium leading-relaxed">
                    Sifatli dizayn — bu tasodif emas, tizim.
                   </p>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section className="py-20 px-6 relative z-30">
        <motion.div {...fadeIn} className="max-w-7xl mx-auto">
          <div className="glass p-10 md:p-14 rounded-[4rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group">
             <div className="space-y-6 max-w-xl relative z-10">
                <h3 className="text-[35px] font-satoshi font-normal tracking-tighter leading-none">
                   <EditableText contentKey="aiTitle" defaultText="AI just.yaviz" as="span" />
                </h3>
                <div className="font-dm-sans text-[16px] text-white leading-relaxed font-medium">
                   <EditableText contentKey="aiDesc" defaultText="Platformamizda siz SMM sohasida ishlash, o'rganish va rivojlanish uchun zarur bo'lgan 45 ta muhim vosita hamda sun’iy intellekt xizmatlaridan foydalanishingiz mumkin." type="textarea" />
                </div>
                <div className="pt-4">
                   <Link to="/ai" className="px-8 py-3 bg-white/5 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                      Bo'limga o'tish
                   </Link>
                </div>
             </div>
             <div className="relative z-10">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <img src="https://picsum.photos/seed/yaviz-bot/400/400" alt="AI Bot" className="w-40 md:w-56 object-contain mix-blend-screen brightness-110" />
                </motion.div>
                <div className="absolute -inset-10 bg-accent/20 blur-[60px] rounded-full z-[-1]" />
             </div>
          </div>
        </motion.div>
      </section>

      {/* SERVICES HIGHLIGHT */}
      <section className="py-20 px-6 border-t border-white/5 overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-10">
            <motion.div {...fadeIn} className="space-y-6">
              <h2 className="text-[40px] md:text-8xl font-bricolage font-normal tracking-tighter leading-none">
                SMM va marketing <br /> xizmatlari
              </h2>
              <p className="font-dm-sans text-[16px] text-white max-w-lg">Texnologiya va marketing strategiyasini uyg'unlashtirib, sizga ishlaydigan va o'suvchi natija yaratamiz.</p>
            </motion.div>
            <Link to="/contact" className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all">
              Hozir murojaat qiling
            </Link>
         </div>

         <div className="mt-20 space-y-4">
            <div className="marquee-wrapper">
               <motion.div variants={marqueeVariants} animate="animate" className="flex gap-4">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="flex gap-4">
                      {["SMM Strategiya", "Video & Motion dizayn", "Brandface Branding", "Targeting Ads", "Mobilografiya", "Grafik Dizayn", "SEO Optimallashtirish"].map((tag, i) => (
                        <div key={i} className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/5 rounded-full whitespace-nowrap text-[14px] font-hanken font-medium uppercase tracking-widest text-[#f9f8f5] transition-all">
                           <CheckCircle2 size={14} className="text-accent" />
                           {tag}
                        </div>
                      ))}
                    </div>
                  ))}
               </motion.div>
            </div>
         </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="py-40 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Portfolio</span>
              <h2 className="text-[40px] md:text-9xl font-bricolage font-normal tracking-tighter leading-none">Loyihalar</h2>
            </div>
            <Link to="/projects" className="text-accent flex items-center gap-2 font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
              Barchasini ko'rish <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {(projects.length > 0 ? projects : [
              { title: "Texnika kontentlari", category: "Honor & Redmi Showcase", image: "https://picsum.photos/seed/tech13/1200/800" },
              { title: "Savdo loyihalari", category: "E-commerce Strategy", image: "https://picsum.photos/seed/sale13/1200/800" },
            ]).map((p, i) => (
              <motion.div key={i} {...fadeIn} className="group relative h-[500px] md:h-[650px] bg-white/5 rounded-[4rem] overflow-hidden border border-white/5 cursor-pointer">
                <ProjectControls project={p} />
                <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-transparent p-12 flex flex-col justify-end">
                   <div className="glass backdrop-blur-3xl p-8 rounded-[2.5rem] border-white/10 space-y-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-xs font-black uppercase tracking-widest text-white/40">{p.category}</span>
                      <h4 className="text-3xl font-display font-black">{p.title}</h4>
                   </div>
                </div>
              </motion.div>
            ))}
            <AddProjectBtn />
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-40 px-6 bg-white/[0.02] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <motion.div {...fadeIn} className="lg:w-1/2 relative group">
             <img src="https://picsum.photos/seed/yaviz-pro-about/1000/1200" alt="Just Yaviz" className="relative rounded-[4rem] grayscale group-hover:grayscale-0 transition-all duration-1000 border border-white/5 aspect-[4/5] object-cover" />
          </motion.div>
          <motion.div {...fadeIn} className="lg:w-1/2 space-y-12">
            <h3 className="text-[35px] font-satoshi font-normal tracking-tighter leading-[0.8]">
              <EditableText contentKey="heroTitle" defaultText="just.yaviz" as="span" />
            </h3>
            <div className="text-[18px] font-inter-display text-white leading-relaxed font-medium tracking-tight">
              <EditableText contentKey="aboutText" defaultText="Men — Just Yaviz (Yahyobek Tohirjonov), O‘zbekistonda faoliyat yurituvchi SMM mutaxassisi, brandface va kontent yaratuvchiman." type="textarea" />
            </div>
            <Link to="/contact" className="btn-primary-site inline-block px-10 py-5 uppercase">Hamkorlik qilish</Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
