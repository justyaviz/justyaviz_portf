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
  Youtube,
  Quote,
  ChevronDown,
  Users,
  Database
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EditableText } from "../components/EditableText";
import { ProjectControls, AddProjectBtn } from "../components/ProjectEditor";
import { useAppContext } from "../context/AppContext";
import { db } from "../firebase";
import { doc, onSnapshot, collection, query, limit, orderBy } from "firebase/firestore";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Home() {
  const [content, setContent] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const { t, lang, theme } = useAppContext();

  useEffect(() => {
    const unsubContent = onSnapshot(doc(db, "siteContent", "main"), (d) => {
      if (d.exists()) setContent(d.data());
    });

    const q = query(collection(db, "projects"), limit(4));
    const unsubProjects = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const qt = query(collection(db, "testimonials"), orderBy("createdAt", "desc"), limit(3));
    const unsubTestimonials = onSnapshot(qt, (snapshot) => {
      setTestimonials(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubContent();
      unsubProjects();
      unsubTestimonials();
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
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-4 h-4 rounded-full shadow-[0_0_20px_white,0_0_50px_white] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
        />
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-32 md:pt-24 px-6 md:px-20 overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div 
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8 relative z-20"
          >
            <div className="badge-it">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" /> {t("hero.badge")}
            </div>
            <div className="space-y-6 md:space-y-8">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="text-[44px] sm:text-[64px] md:text-[8vw] font-satoshi font-medium tracking-tighter flex items-center gap-x-4 md:gap-x-6 leading-[0.9] md:leading-tight whitespace-nowrap"
              >
                <EditableText contentKey="heroTitle" defaultText="just.yaviz" as="span" />
                <Link to="/bio" className="relative shrink-0">
                  <motion.div 
                    initial="initial"
                    whileHover="hover"
                    animate="animate"
                    className="relative flex items-center"
                  >
                    <motion.div 
                      variants={{
                        initial: { rotate: -45, opacity: 0, scale: 0.8 },
                        animate: { rotate: 0, opacity: 1, scale: 1 },
                        hover: { rotate: 135, scale: 1.1, borderColor: "rgba(255,255,255,0.8)" }
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-[var(--border-primary)] rounded-full cursor-pointer bg-[var(--glass-bg)] backdrop-blur-xl transition-colors`}
                    >
                      <ArrowUpRight className="size-6 md:size-8" />
                    </motion.div>
                    <motion.div
                      variants={{
                        initial: { opacity: 0, x: -10, rotate: -15, scale: 0.8 },
                        animate: { opacity: 0 },
                        hover: { opacity: 1, x: 0, rotate: -25, scale: 1 }
                      }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                      className="absolute top-12 left-8 md:top-14 md:left-12 pointer-events-none z-[100]"
                    >
                      <div className="bg-white text-black text-[10px] md:text-sm font-bold px-3 py-1.5 rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.2)] whitespace-nowrap">
                        {t("bio.sidebar.who")}
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-lg text-[var(--text-secondary)] font-satoshi text-[15px] md:text-lg leading-relaxed font-medium tracking-tight"
              >
                <EditableText contentKey="heroDesc" defaultText={t("hero.desc")} type="textarea" />
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap items-center gap-6"
            >
               <Link to="/projects" className="btn-download">
                 {t("hero.cta.projects")}
               </Link>
               <Link to="/contact" className="neon-btn">
                 <div className="neon-btn-content">{t("hero.cta.contact")}</div>
               </Link>
            </motion.div>
          </motion.div>

          <div className="relative hidden lg:block h-[700px]">
             <div className="absolute inset-0 flex items-center justify-center">
                {/* THE CARDS */}
                <motion.div 
                  drag
                  dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                  style={{ 
                    x: useTransform(springX, [0, 2000], [-30, 30]), 
                    y: useTransform(springY, [0, 1000], [-20, 20]),
                    rotate: -8
                  }}
                  whileHover={{ scale: 1.02, rotate: -6, zIndex: 100 }}
                  className="hero-note z-20 cursor-grab active:cursor-grabbing"
                >
                   <p className="text-[17px] font-dm-sans font-medium leading-relaxed pr-8 text-[var(--text-primary)]">
                    {t("hero.card1")}
                   </p>
                   <div className="handle">just.yaviz</div>
                </motion.div>

                <motion.div 
                  drag
                  dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                  style={{ 
                    x: useTransform(springX, [0, 2000], [80, -80]), 
                    y: useTransform(springY, [0, 1000], [120, 80]),
                    rotate: 6
                  }}
                  whileHover={{ scale: 1.02, rotate: 4, zIndex: 100 }}
                  className="hero-note absolute z-10 cursor-grab active:cursor-grabbing"
                >
                   <p className="text-[17px] font-dm-sans font-medium leading-relaxed pr-8 text-[var(--text-primary)]">
                    {t("hero.card2")}
                   </p>
                   <div className="handle">just.yaviz</div>
                </motion.div>

                <motion.div 
                  drag
                  dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                  style={{ 
                    x: useTransform(springX, [0, 2000], [0, 0]), 
                    y: useTransform(springY, [0, 1000], [250, 200]),
                    rotate: -2
                  }}
                  whileHover={{ scale: 1.02, rotate: 0, zIndex: 100 }}
                  className="hero-note absolute z-0 opacity-20 blur-[2px] transition-all hover:opacity-100 hover:blur-0 cursor-grab active:cursor-grabbing hidden xl:block"
                >
                   <p className="text-[15px] font-dm-sans font-medium leading-relaxed pr-8 text-[var(--text-primary)]">
                    {t("hero.card3")}
                   </p>
                   <div className="handle">just.yaviz</div>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL DIRECTIONS */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
           <motion.div {...fadeIn} className="text-center space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">{t("skills.badge")}</span>
              <h2 className="text-[32px] md:text-7xl font-satoshi font-medium tracking-tighter">{t("skills.title")}</h2>
           </motion.div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { title: t("skills.smm"), desc: t("skills.smm.desc"), icon: <Megaphone /> },
                { title: t("skills.performance"), desc: t("skills.performance.desc"), icon: <Target /> },
                { title: t("skills.content"), desc: t("skills.content.desc"), icon: <Video /> },
                { title: t("skills.design"), desc: t("skills.design.desc"), icon: <Palette /> },
                { title: t("skills.personal"), desc: t("skills.personal.desc"), icon: <Award /> },
                { title: t("skills.web"), desc: t("skills.web.desc"), icon: <Rocket /> },
                { title: t("skills.ecom"), desc: t("skills.ecom.desc"), icon: <Briefcase /> },
                { title: t("skills.strategy"), desc: t("skills.strategy.desc"), icon: <Globe /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-8 md:p-10 glass border-[var(--border-primary)] rounded-3xl md:rounded-[3rem] space-y-4 md:space-y-6 hover:bg-accent/5 transition-all group shadow-sm"
                >
                   <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                      {item.icon}
                   </div>
                   <h4 className="text-lg md:text-xl font-satoshi font-bold leading-tight">{item.title}</h4>
                   <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section className="py-20 px-6 relative z-30">
        <motion.div {...fadeIn} className="max-w-7xl mx-auto">
          <div className="glass p-10 md:p-14 rounded-[4rem] border-[var(--border-primary)] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group shadow-sm">
             <div className="space-y-6 max-w-xl relative z-10">
                <h3 className="text-[35px] font-satoshi font-normal tracking-tighter leading-none">
                   <EditableText contentKey="aiTitle" defaultText="AI just.yaviz" as="span" />
                </h3>
                <div className="font-dm-sans text-[16px] text-[var(--text-primary)] leading-relaxed font-medium">
                   <EditableText contentKey="aiDesc" defaultText={t("hero.desc")} type="textarea" />
                </div>
                <div className="pt-4">
                   <Link to="/ai" className="px-8 py-3 bg-[var(--border-primary)] border border-[var(--border-primary)] rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all">
                      {t("ai.cta")}
                   </Link>
                </div>
             </div>
             <div className="relative z-10">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <img src="https://picsum.photos/seed/yaviz-bot/400/400" alt="AI Bot" className="w-40 md:w-56 object-contain mix-blend-difference brightness-110" />
                </motion.div>
                <div className="absolute -inset-10 bg-accent/10 blur-[60px] rounded-full z-[-1]" />
             </div>
          </div>
        </motion.div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="py-20 md:py-40 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="max-w-3xl space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">{t("workflow.badge")}</span>
            <h2 className="text-[32px] md:text-7xl font-satoshi font-medium tracking-tighter leading-tight italic">
              {t("workflow.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-primary)] border border-[var(--border-primary)] rounded-3xl md:rounded-[4rem] overflow-hidden shadow-sm">
            {[
              { step: "01", title: t("flow.1.title"), desc: t("flow.1.desc") },
              { step: "02", title: t("flow.2.title"), desc: t("flow.2.desc") },
              { step: "03", title: t("flow.3.title"), desc: t("flow.3.desc") },
              { step: "04", title: t("flow.4.title"), desc: t("flow.4.desc") }
            ].map((item, i) => (
              <div key={i} className={`p-10 md:p-14 space-y-8 backdrop-blur-xl border-[var(--border-primary)] border-r last:border-0 hover:bg-accent/5 transition-all group ${theme === 'dark' ? 'bg-black/40' : 'bg-white/80'}`}>
                <span className="text-4xl md:text-6xl font-satoshi font-black text-accent/10 group-hover:text-accent/20 transition-all leading-none">{item.step}</span>
                <div className="space-y-4">
                  <h4 className="text-xl md:text-2xl font-satoshi font-bold leading-tight">{item.title}</h4>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES */}
      <section className="py-20 px-6 border-t border-[var(--border-primary)] overflow-hidden bg-[var(--glass-bg)]">
         <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-10">
               <motion.div {...fadeIn} className="space-y-4 md:space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">{t("skills.badge")}</span>
                <h2 className="text-[32px] md:text-8xl font-satoshi font-medium tracking-tighter leading-none">
                  IT va marketing <br /> yechimlari
                </h2>
                <p className="font-dm-sans text-[15px] md:text-[16px] text-[var(--text-secondary)] max-w-lg">Sizning g'oyangizni real natijalarga aylantiruvchi kompleks xizmatlar to'plami.</p>
               </motion.div>
               <Link to="/contact" className="neon-btn w-full md:w-auto">
                 <div className="neon-btn-content text-center">{t("hero.cta.contact")}</div>
               </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
               {[
                 { 
                   title: t("skills.smm"), 
                   items: ["Instagram & Telegram", "Reels strategy", "Visual packing", "Audience management"],
                   icon: <Megaphone className="text-accent" /> 
                 },
                 { 
                   title: t("skills.performance"), 
                   items: ["Ads setup", "Retargeting", "Conversion funnel", "Analytics"],
                   icon: <Target className="text-accent" /> 
                 },
                 { 
                   title: t("skills.content"), 
                   items: ["Reels & Shorts", "Photography", "Premium editing", "Viral Hook creation"],
                   icon: <Video className="text-accent" /> 
                 },
                 { 
                   title: t("skills.design"), 
                   items: ["Identity design", "Graphic UI", "Typography", "Logo systems"],
                   icon: <Palette className="text-accent" /> 
                 },
                 { 
                   title: t("skills.web"), 
                   items: ["React & Framer", "E-commerce apps", "Custom Admin", "SEO Ready sites"],
                   icon: <Rocket className="text-accent" /> 
                 },
                 { 
                   title: t("skills.strategy"), 
                   items: ["Market research", "Scaling plan", "Profit analysis", "System growth"],
                   icon: <Globe className="text-accent" /> 
                 }
               ].map((service, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.05 }}
                   className="p-8 md:p-10 glass border-[var(--border-primary)] rounded-3xl md:rounded-[3.5rem] space-y-6 md:space-y-8 hover:border-accent transition-all shadow-sm"
                 >
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/5 rounded-2xl flex items-center justify-center">
                       {service.icon}
                    </div>
                    <h4 className="text-xl md:text-2xl font-satoshi font-bold">{service.title}</h4>
                    <ul className="space-y-3 md:space-y-4">
                       {service.items.map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-[var(--text-secondary)] text-[13px] md:text-sm font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                            {item}
                         </li>
                       ))}
                    </ul>
                 </motion.div>
               ))}
            </div>
         </div>
         
         <div className="mt-32 space-y-4 hidden md:block">
            <div className="marquee-wrapper">
               <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex gap-4">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="flex gap-4">
                      {["SEO", "Social Media", "Video", "Ads", "Design", "Code"].map((tag, i) => (
                        <div key={i} className="flex items-center gap-3 px-8 py-4 bg-[var(--glass-bg)] border border-[var(--border-primary)] rounded-full whitespace-nowrap text-[14px] font-hanken font-medium uppercase tracking-widest text-[var(--text-primary)] transition-all">
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
      <section className="py-20 md:py-40 px-6 border-t border-[var(--border-primary)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-24">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="space-y-4 md:space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--text-secondary)]">Portfolio</span>
              <h2 className="text-[32px] md:text-9xl font-satoshi font-medium tracking-tighter leading-none">{t("section.projects")}</h2>
            </div>
            <Link to="/projects" className="text-accent flex items-center gap-2 font-bold uppercase tracking-widest text-[11px] md:text-xs hover:gap-4 transition-all">
              {t("hero.cta.projects")} <ArrowUpRight size={14} className="md:size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {(projects.length > 0 ? projects : [
              { title: "Savdo loyihalari", category: "E-commerce Strategy", image: "https://picsum.photos/seed/sale13/1200/800" },
              { title: "Marketing vizuallari", category: "Brand Identity", image: "https://picsum.photos/seed/brand13/1200/800" },
            ]).map((p, i) => (
              <motion.div key={i} {...fadeIn} className="group relative h-[400px] md:h-[650px] bg-[var(--glass-bg)] rounded-3xl md:rounded-[4rem] overflow-hidden border border-[var(--border-primary)] cursor-pointer shadow-xl">
                <ProjectControls project={p} />
                <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-transparent p-8 md:p-12 flex flex-col justify-end">
                   <div className="glass backdrop-blur-3xl p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-[var(--border-primary)] shadow-2xl space-y-1 md:space-y-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">{p.category}</span>
                      <h4 className="text-xl md:text-3xl font-display font-black text-[var(--text-primary)]">{p.title}</h4>
                   </div>
                </div>
              </motion.div>
            ))}
            <AddProjectBtn />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-40 px-6 bg-white/[0.01] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="space-y-4 md:space-y-6 text-center md:text-left w-full">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">{t("testimonials.title")}</span>
              <h2 className="text-[32px] md:text-8xl font-satoshi font-medium tracking-tighter leading-none">{t("testimonials.subtitle")}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {(testimonials.length > 0 ? testimonials : [
              { name: t("testimonials.t1.name"), Role: t("testimonials.t1.role"), text: t("testimonials.t1.text") },
              { name: t("testimonials.t2.name"), Role: t("testimonials.t2.role"), text: t("testimonials.t2.text") },
              { name: t("testimonials.t3.name"), Role: t("testimonials.t3.role"), text: t("testimonials.t3.text") }
            ]).map((test, i) => (
              <motion.div 
                key={i} 
                {...fadeIn} 
                transition={{ delay: i * 0.1 }}
                className="p-10 md:p-14 glass border-white/5 rounded-3xl md:rounded-[4rem] space-y-8 relative group hover:border-white/20 transition-all"
              >
                <div className="text-accent/20 absolute top-10 right-10 group-hover:text-accent/60 transition-all">
                  <Quote size={40} />
                </div>
                <p className="text-white/60 text-lg md:text-xl font-dm-sans leading-relaxed italic">"{test.text || test.content}"</p>
                <div className="pt-6 border-t border-white/5">
                  <h5 className="text-lg md:text-xl font-satoshi font-bold">{test.name}</h5>
                  <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-white/30">{test.Role || test.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 md:py-40 px-6 border-t border-[var(--border-primary)]">
        <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
          <div className="text-center space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">FAQ</span>
            <h2 className="text-[32px] md:text-7xl font-satoshi font-medium tracking-tighter">{t("faq.title")}</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: t("faq.1.q"), a: t("faq.1.a") },
              { q: t("faq.2.q"), a: t("faq.2.a") },
              { q: t("faq.3.q"), a: t("faq.3.a") },
              { q: t("faq.4.q"), a: t("faq.4.a") }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                className="glass border-[var(--border-primary)] rounded-3xl overflow-hidden shadow-sm"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-8 md:p-10 cursor-pointer list-none">
                    <span className="text-lg md:text-xl font-satoshi font-bold pr-8 text-[var(--text-primary)]">{faq.q}</span>
                    <ChevronDown className="shrink-0 transition-transform group-open:rotate-180 text-accent/60" />
                  </summary>
                  <div className="px-8 md:px-10 pb-8 md:pb-10 pt-2 border-t border-[var(--border-primary)]">
                    <p className="text-[var(--text-secondary)] leading-relaxed font-dm-sans">{faq.a}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 md:py-40 px-6 bg-white/[0.02] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-24 items-center">
          <motion.div {...fadeIn} className="w-full lg:w-1/2 relative group">
             <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <img 
                  src="https://yt3.googleusercontent.com/7c66P3YnmaqgNiVybbisloEC64VHRMgdHJAifzqvnTsrZvuoWRnNJYsibF9eMtow3umhZeMlrA=s900-c-k-c0x00ffffff-no-rj" 
                  alt="Yahyobek Tohirjonov" 
                  className="relative rounded-[2.5rem] md:rounded-[5rem] grayscale group-hover:grayscale-0 transition-all duration-1000 border border-white/5 aspect-[4/5] object-cover shadow-2xl mx-auto" 
                  referrerPolicy="no-referrer"
                />
             </div>
          </motion.div>
          <motion.div {...fadeIn} className="w-full lg:w-1/2 space-y-8 md:space-y-12">
            <div className="space-y-3 md:space-y-4">
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">{t("about.badge")}</span>
               <h3 className="text-[32px] md:text-7xl font-satoshi font-normal tracking-tighter leading-[0.9]">
                 <EditableText contentKey="heroTitleFullName" defaultText="Yahyobek Tohirjonov" as="span" />
               </h3>
            </div>
            <div className="text-[15px] md:text-[17px] font-inter-display text-[var(--text-secondary)] leading-relaxed font-medium tracking-tight space-y-4 md:space-y-6">
              <EditableText contentKey="aboutTextExtended" defaultText="Yahyobek Tohirjonov Rashidjon o‘g‘li — o‘zbek digital ijodkor, SMM mutaxassisi, kontent yaratuvchi, grafik dizayner va web dasturchi. U zamonaviy marketing va texnologiyalar yo‘nalishida faoliyat yuritib, ijtimoiy tarmoqlar orqali brendlarni rivojlantirish, kontent yaratish va reklama strategiyalarini ishlab chiqish bilan shug‘ullanadi." type="textarea" />
              <p className="text-[var(--text-secondary)] text-sm opacity-60">
                {t("about.p2")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <Link to="/contact" className="brand-btn-skromniy text-center px-10 py-5 uppercase bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold rounded-full hover:scale-105 transition-transform">{t("about.cta1")}</Link>
               <a href="https://t.me/justyaviz_life" className="text-center px-10 py-5 uppercase border border-[var(--border-primary)] text-[var(--text-primary)] font-bold rounded-full hover:bg-accent/5 transition-all">{t("about.cta2")}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS COUNTER */}
      <section className="py-20 md:py-32 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {[
              { label: t("stats.projects"), value: "100+", icon: <Rocket size={20} /> },
              { label: t("stats.clients"), value: "50+", icon: <Users size={20} /> },
              { label: t("stats.campaigns"), value: "150+", icon: <Target size={20} /> },
              { label: t("stats.web"), value: "20+", icon: <Database size={20} /> }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                {...fadeIn} 
                transition={{ delay: i * 0.1 }}
                className="space-y-3 text-center md:text-left"
              >
                <div className="flex items-center justify-center md:justify-start gap-3 text-accent/60">
                  {stat.icon}
                </div>
                <div className="text-[32px] md:text-5xl font-satoshi font-bold tracking-tighter">{stat.value}</div>
                <p className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-white/30">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="py-20 border-t border-white/5 overflow-hidden">
         <div className="marquee-wrapper opacity-40 grayscale saturate-0 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <motion.div 
               animate={{ x: [0, -2500] }} 
               transition={{ duration: 50, repeat: Infinity, ease: "linear" }} 
               className="flex gap-16 md:gap-24 items-center whitespace-nowrap"
            >
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="flex gap-16 md:gap-24 items-center shrink-0">
                    {[
                      { name: "Ilm Chashmalari", logo: "https://static4.tgstat.ru/channels/_0/58/5874f696205edf0c7aa55152da39921a.jpg" },
                      { name: "Sundecor", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLfkcYEjWfYZIpWvZ7fLMcCVxfVZQcXAZ3RQ&s" },
                      { name: "Magic City", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwrLEewH9Kw14lXc8nVXi2bIPilJXbDS1zg&s" },
                      { name: "Yengil Mijoz", logo: "https://play-lh.googleusercontent.com/7hUsDaIdSaYwgWXQosQZGuOpQ8RLhp8Iw-bSKzNIxocMqw5l-2ZysdbGdyllKkQIOw" },
                      { name: "Yengil Taxi", logo: "https://assets.nicepagecdn.com/bc13c16f/6522583/images/Untitled-1.png" },
                      { name: "e-one", logo: "https://taplink.st/a/5/1/6/f/99552c.jpg?1" },
                      { name: "aloo", logo: "https://proud-cyan-whxxiapwah.edgeone.app/8586B6B0-80CD-45D5-8121-D8BB132DDF0B.jpeg" }
                    ].map((client, idx) => (
                      <div key={idx} className="flex items-center gap-4 group/logo">
                        <img 
                          src={client.logo} 
                          alt={client.name} 
                          className="h-8 md:h-12 w-auto object-contain rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xl md:text-2xl font-satoshi font-black tracking-tighter uppercase text-white/40 group-hover/logo:text-white transition-colors">
                          {client.name}
                        </span>
                      </div>
                    ))}
                 </div>
               ))}
            </motion.div>
         </div>
      </section>
    </>
  );
}
