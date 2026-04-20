import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import Counter from "../components/Counter";
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
import { Logo } from "../components/Logo";
import { Typewriter } from "../components/Typewriter";
import Lottie from "lottie-react";
import Magnetic from "../components/Magnetic";
import { RevealText, CharReveal, ImageReveal } from "../components/Reveal";
import InfiniteMarquee from "../components/InfiniteMarquee";

import jsPDF from "jspdf";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const handleDownloadProposal = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(47, 73, 224); // accent color
    doc.text("YAVIZ DIGITAL AGENCY", 20, 30);
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text("Kammertsial Taklif & Narxnoma (Commercial Proposal)", 20, 40);

    // Intro
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Biznesingizni yangi bosqichga olib chiqish uchun professional xizmatlar.", 20, 60);

    // Services & Pricing
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Xizmat Paketlari:", 20, 80);

    let yPos = 95;
    
    // Package 1
    doc.setFontSize(14);
    doc.setTextColor(47, 73, 224);
    doc.text("1. Basic SMM - Boshlang'ich $299/oy", 20, yPos);
    yPos += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text("• 12 ta Post, 24 ta Storis, 4 ta Reels", 25, yPos); yPos += 6;
    doc.text("• Target Reklama va Profil Upakovka", 25, yPos); yPos += 15;

    // Package 2
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(47, 73, 224);
    doc.text("2. Pro Marketing (Ommabop) - Boshlang'ich $599/oy", 20, yPos);
    yPos += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text("• TikTok, YouTube, Instagram uchun Premium strategiya", 25, yPos); yPos += 6;
    doc.text("• 8 ta Video/Reels (Professional montaj)", 25, yPos); yPos += 6;
    doc.text("• Influencer Marketing va Masshtabli Target", 25, yPos); yPos += 15;

    // Package 3
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(47, 73, 224);
    doc.text("3. Full Branding & Web - Boshlang'ich $899", 20, yPos);
    yPos += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text("• Logo, Identika va Brandbook", 25, yPos); yPos += 6;
    doc.text("• Zamonaviy Landing Page (Web sayt)", 25, yPos); yPos += 6;

    // Contact Footer
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let footerY = 250;
    doc.text("Bog'lanish: +998 93 194 92 00  |  Email: yahyobektohirjonov0@gmail.com", 20, footerY);
    doc.text("Sayt: www.justyaviz.uz", 20, footerY + 8);

    doc.save("YAVIZ_Commercial_Proposal.pdf");
};

const lottieAnimationUrl = "https://lottie.host/6ab4022a-0a75-47e0-90ba-068b5a0346d0/vB1KqC8k5p.json"; // Modern Abstract Digital Shape

export default function Home() {
  const [content, setContent] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [lottieData, setLottieData] = useState<any>(null);
  const { t, lang, theme } = useAppContext();

  useEffect(() => {
    fetch(lottieAnimationUrl)
      .then(res => res.json())
      .then(data => setLottieData(data));

    const unsubContent = onSnapshot(doc(db, "siteContent", "main"), (d) => {
      if (d.exists()) setContent(d.data());
    });
    
    // ... rest of useEffect

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
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-32 md:pt-24 px-6 md:px-20 overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
        
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
              <div className="flex flex-col gap-2">
                 <h3 className="text-xl md:text-3xl font-satoshi font-medium text-[var(--text-secondary)] -mb-2 md:-mb-4">
                  <CharReveal>{t("hero.hello")}</CharReveal>
                 </h3>
                 <motion.h1 
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  className="text-[44px] sm:text-[64px] md:text-[8vw] font-satoshi font-medium tracking-tighter flex items-center gap-x-4 md:gap-x-6 leading-[0.9] md:leading-tight whitespace-nowrap text-[var(--text-primary)]"
                >
                  <EditableText contentKey="heroTitle" defaultText="YAVIZ DIGITAL" as="span" />
                  <Magnetic>
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
                            initial: { opacity: 0, y: 10, rotate: 0, scale: 0.5 },
                            animate: { opacity: 0 },
                            hover: { opacity: 1, y: 0, rotate: -5, scale: 1.2 }
                          }}
                          transition={{ type: "spring", damping: 12, stiffness: 200 }}
                          className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none z-[100]"
                        >
                          <div className="bg-accent text-white text-sm md:text-base font-black px-6 py-3 rounded-2xl shadow-[0_20px_40px_rgba(var(--accent-rgb),0.4)] whitespace-nowrap uppercase italic tracking-tighter border-2 border-white/20">
                            {t("bio.title")}
                          </div>
                          {/* Triangle pointer */}
                          <div className="w-4 h-4 bg-accent rotate-45 absolute -bottom-2 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-white/10" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </Magnetic>
                </motion.h1>
              </div>

               <div className="flex flex-col gap-2">
                 <h2 className="text-xl sm:text-2xl md:text-3xl font-satoshi font-bold text-[var(--text-primary)] flex items-center h-10">
                   <Typewriter 
                     words={[
                       t("hero.role.1"), 
                       t("hero.role.2"), 
                       t("hero.role.3"), 
                       t("hero.role.4")
                     ]} 
                     delay={3500} 
                   />
                 </h2>
               </div>
               
              <div className="max-w-lg text-[var(--text-secondary)] font-satoshi text-[15px] md:text-lg leading-relaxed font-medium tracking-tight">
                <RevealText>
                  {content?.heroDesc || t("hero.desc")}
                </RevealText>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap items-center gap-6"
            >
               <Magnetic>
                 <Link to="/projects" className="ui-btn-shine">
                   {t("hero.cta.projects")}
                 </Link>
               </Magnetic>
               <Magnetic>
                 <Link to="/contact" className="ui-btn-galaxy">
                   <div className="ui-btn-galaxy-inner">
                     {t("hero.cta.contact")}
                     <Sparkles className="w-4 h-4 text-accent" />
                   </div>
                 </Link>
               </Magnetic>
            </motion.div>
          </motion.div>

          <div className="relative h-[500px] md:h-[700px] flex items-center justify-center">
             <div className="absolute inset-0 pointer-events-none overflow-visible">
                {/* 3D LOTTIE ANIMATION */}
                {lottieData && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-full h-full"
                  >
                    <Lottie 
                      animationData={lottieData} 
                      className="w-full h-full scale-125 md:scale-150 opacity-40 dark:opacity-60"
                      loop={true}
                    />
                  </motion.div>
                )}
             </div>

             <div className="relative z-10 flex items-center justify-center w-full h-full">
                {/* THE CARDS */}
                <motion.div 
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  style={{ 
                    x: useTransform(springX, [0, 2000], [-30, 30]), 
                    y: useTransform(springY, [0, 1000], [-20, 20]),
                    rotate: -8
                  }}
                  whileHover={{ scale: 1.05, rotate: -4, zIndex: 100 }}
                  className="hero-note z-20 cursor-grab active:cursor-grabbing border-accent/20"
                >
                   <p className="text-[17px] font-dm-sans font-medium leading-relaxed pr-8 text-[var(--text-primary)]">
                    {t("hero.card1")}
                   </p>
                </motion.div>

                <motion.div 
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  style={{ 
                    x: useTransform(springX, [0, 2000], [80, -80]), 
                    y: useTransform(springY, [0, 1000], [120, 80]),
                    rotate: 6
                  }}
                  whileHover={{ scale: 1.05, rotate: 4, zIndex: 100 }}
                  className="hero-note absolute z-10 cursor-grab active:cursor-grabbing border-accent/20"
                >
                   <p className="text-[17px] font-dm-sans font-medium leading-relaxed pr-8 text-[var(--text-primary)]">
                    {t("hero.card2")}
                   </p>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* INFINITE MARQUEE */}
      <InfiniteMarquee />

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

      {/* WORKFLOW SECTION */}
      <section className="py-20 md:py-40 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="max-w-3xl space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">{t("workflow.badge")}</span>
            <h2 className="text-[32px] md:text-7xl font-satoshi font-medium tracking-tighter leading-tight italic">
              {t("workflow.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: t("flow.1.title"), desc: t("flow.1.desc") },
              { step: "02", title: t("flow.2.title"), desc: t("flow.2.desc") },
              { step: "03", title: t("flow.3.title"), desc: t("flow.3.desc") },
              { step: "04", title: t("flow.4.title"), desc: t("flow.4.desc") }
            ].map((item, i) => (
              <div key={i} className={`ui-magic-card group`}>
                <div className={`p-10 md:p-14 space-y-8 h-full relative z-10 ${theme === 'dark' ? 'bg-black/40' : 'bg-white/80'}`}>
                  <span className="text-4xl md:text-6xl font-satoshi font-black text-accent/10 group-hover:text-accent/20 transition-all leading-none">{item.step}</span>
                  <div className="space-y-4">
                    <h4 className="text-xl md:text-2xl font-satoshi font-bold leading-tight">{item.title}</h4>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.desc}</p>
                  </div>
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
               <Link to="/contact" className="ui-btn-galaxy w-full md:w-auto">
                 <div className="ui-btn-galaxy-inner text-center w-full justify-center px-12 py-5 uppercase text-xs tracking-widest">{t("hero.cta.contact")}</div>
               </Link>
            </div>

            <div className="bento-grid">
               {[
                 { 
                   title: t("skills.smm"), 
                   items: ["Instagram & Telegram", "Reels strategy", "Visual packing", "Audience management"],
                   icon: <Megaphone className="text-accent" />,
                   span: "md:col-span-2 md:row-span-2",
                   color: "bg-accent/5"
                 },
                 { 
                   title: t("skills.performance"), 
                   items: ["Ads setup", "Retargeting", "Conversion funnel"],
                   icon: <Target className="text-accent" />,
                   span: "md:col-span-1 md:row-span-1",
                   color: "bg-white/[0.02]"
                 },
                 { 
                   title: t("skills.content"), 
                   items: ["Reels & Shorts", "Photography", "Premium editing"],
                   icon: <Video className="text-accent" />,
                   span: "md:col-span-1 md:row-span-1",
                   color: "bg-white/[0.02]"
                 },
                 { 
                   title: t("skills.design"), 
                   items: ["Identity design", "Graphic UI", "Logo systems"],
                   icon: <Palette className="text-accent" />,
                   span: "md:col-span-1 md:row-span-1",
                   color: "bg-white/[0.02]"
                 },
                 { 
                   title: t("skills.web"), 
                   items: ["React & Framer", "E-commerce apps", "Custom Admin"],
                   icon: <Rocket className="text-accent" />,
                   span: "md:col-span-2 md:row-span-1",
                   color: "bg-accent/10"
                 },
                 { 
                   title: t("skills.strategy"), 
                   items: ["Market research", "Scaling plan", "System growth"],
                   icon: <Globe className="text-accent" />,
                   span: "md:col-span-1 md:row-span-1",
                   color: "bg-white/[0.02]"
                 }
               ].map((service, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1, duration: 0.5 }}
                   className={`group relative overflow-hidden rounded-[2.5rem] border border-[var(--border-primary)] ${service.color} backdrop-blur-xl transition-all duration-500 hover:border-accent/30 ${service.span}`}
                 >
                    <div className="p-8 md:p-10 h-full flex flex-col justify-between relative z-10">
                      <div className="space-y-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-black transition-all duration-500">
                           {service.icon}
                        </div>
                        <div>
                          <h4 className="text-xl md:text-2xl font-satoshi font-bold tracking-tight mb-2">{service.title}</h4>
                          <ul className="space-y-2">
                             {service.items.map((item, i) => (
                               <li key={i} className="flex items-center gap-3 text-[var(--text-secondary)] text-[12px] md:text-[13px] font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                                  <div className="w-1 h-1 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                                  {item}
                               </li>
                             ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Batafsil ma'lumot →</span>
                      </div>
                    </div>

                    {/* DECORATIVE ELEMENT */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/5 blur-3xl rounded-full group-hover:bg-accent/10 transition-all duration-700" />
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
                {p.image ? (
                  <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000" />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-accent/5 flex items-center justify-center">
                    <Logo className="w-20 h-20 opacity-10" />
                  </div>
                )}
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

      {/* SERVICES SECTION */}
      <section className="py-20 md:py-40 px-6 border-t border-[var(--border-primary)]">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="text-center space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">{t("services.badge")}</span>
              <h2 className="text-[40px] md:text-8xl font-satoshi font-normal tracking-tighter leading-[0.8]">{t("services.title")}</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
              {/* Basic Package */}
              <motion.div 
                {...fadeIn}
                className="md:col-span-3 lg:col-span-4 p-10 bg-[var(--text-primary)]/[0.03] border border-[var(--border-primary)] rounded-[3rem] space-y-8 flex flex-col justify-between"
              >
                 <div className="space-y-6">
                    <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                       <Megaphone size={24} />
                    </div>
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter">Basic SMM</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Kichik bizneslar va shaxsiy brendlar uchun ideal boshlang'ich paket.</p>
                    <ul className="space-y-3">
                       {["12 ta Post", "24 ta Storis", "4 ta Reels", "Target Reklama", "Profil Upakovka"].map(f => (
                         <li key={f} className="flex items-center gap-3 text-xs font-bold text-[var(--text-primary)]/60">
                            <CheckCircle2 size={14} className="text-accent" /> {f}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="pt-8 border-t border-[var(--border-primary)] flex items-center justify-between">
                    <div className="text-2xl font-black text-accent">$299<span className="text-[10px] text-white/20 ml-1">/oy</span></div>
                    <Link to="/contact" className="text-[10px] font-black uppercase underline tracking-widest">{t("services.order")}</Link>
                 </div>
              </motion.div>

              {/* Pro Package - BIG BENTO */}
              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.2 }}
                className="md:col-span-3 lg:col-span-8 p-12 bg-accent border border-accent rounded-[3.5rem] space-y-12 flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-accent/20"
              >
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-accent shadow-xl">
                          <Rocket size={32} />
                       </div>
                       <span className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white">{t("services.popular")}</span>
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">Pro Marketing</h3>
                       <p className="text-lg text-white/70 max-w-lg">Biznesingizni to'liq raqamlashtirish va sotuvlarni tizimli oshirish uchun mukammal yechim.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                       {["Professional SMM", "TikTok & YouTube Strategiya", "8 ta Reels (Premium)", "Professional Video Montaj", "Target Ads (Masshtablash)", "Influencer Marketing", "Oylik Tahlis (Report)"].map(f => (
                         <div key={f} className="flex items-center gap-3 text-sm font-black text-white">
                            <CheckCircle2 size={18} className="text-white" /> {f}
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="relative z-10 pt-12 border-t border-white/20 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">{t("services.start_price")}</p>
                      <div className="text-5xl font-black text-white">$599<span className="text-xs text-white/40 ml-2">/oy</span></div>
                    </div>
                    <Link to="/contact" className="px-12 py-6 bg-white text-accent font-black uppercase rounded-[2rem] text-sm tracking-widest hover:scale-105 transition-transform">{t("about.cta1")}</Link>
                 </div>

                 <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] -mr-40 -mt-40 rounded-full" />
                 <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 blur-[80px] -ml-30 -mb-30 rounded-full" />
              </motion.div>

              {/* Branding Package */}
              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.3 }}
                className="md:col-span-6 lg:col-span-6 p-10 bg-[#121212] border border-white/5 rounded-[3rem] space-y-8 flex flex-col md:flex-row gap-12"
              >
                 <div className="flex-1 space-y-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                       <Palette size={24} />
                    </div>
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">Full Branding</h3>
                    <p className="text-sm text-white/40">Noldan professional brend imidjini yaratish.</p>
                    <ul className="space-y-3">
                       {["Logo & Identika", "Brend Book", "Web Sayt (Landing)", "Social Kit"].map(f => (
                         <li key={f} className="flex items-center gap-3 text-xs font-bold text-white/60">
                            <CheckCircle2 size={14} className="text-white" /> {f}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="flex-1 flex flex-col justify-end items-end text-right space-y-6">
                    <div className="text-4xl font-black text-white">$899<span className="text-[10px] text-white/20 ml-1">START</span></div>
                    <Link to="/contact" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase rounded-2xl text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">{t("about.cta1")}</Link>
                 </div>
              </motion.div>

              {/* Custom Package */}
              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.4 }}
                className="md:col-span-6 lg:col-span-6 p-10 bg-white border border-[var(--border-primary)] rounded-[3rem] space-y-8 flex flex-col justify-center items-center text-center group active:scale-95 transition-transform"
              >
                 <div className="w-20 h-20 bg-[var(--text-primary)] rounded-[2rem] flex items-center justify-center text-white mb-4 group-hover:rotate-12 transition-transform">
                    <Users size={32} />
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter text-black">{t("services.custom_title")}</h3>
                    <p className="text-black/60 max-w-sm">{t("services.custom_desc")}</p>
                 </div>
                 <Link to="/contact" className="px-10 py-5 bg-black text-white font-black uppercase rounded-2xl text-[10px] tracking-[0.2em] hover:bg-accent transition-colors">{t("services.contact_us")}</Link>
              </motion.div>
           </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-40 px-6 bg-[var(--text-primary)]/[0.02] border-t border-[var(--border-primary)] overflow-hidden">
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
                className="ui-magic-card group"
              >
                <div className="p-10 md:p-14 h-full space-y-8 relative z-10 transition-all">
                  <div className="text-accent/20 absolute top-10 right-10 group-hover:text-accent/60 transition-all">
                    <Quote size={40} />
                  </div>
                  <p className="text-[var(--text-secondary)] text-lg md:text-xl font-dm-sans leading-relaxed italic relative z-10">"{test.text || test.content}"</p>
                  <div className="pt-6 border-t border-[var(--border-primary)] relative z-10 mt-auto">
                    <h5 className="text-lg md:text-xl font-satoshi font-bold">{test.name}</h5>
                    <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-70">{test.Role || test.role}</span>
                  </div>
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
                className="ui-magic-card overflow-hidden"
              >
                <div className="relative z-10 transition-all">
                  <details className="group">
                    <summary className="flex items-center justify-between p-8 md:p-10 cursor-pointer list-none">
                      <span className="text-lg md:text-xl font-satoshi font-bold pr-8 text-[var(--text-primary)]">{faq.q}</span>
                      <ChevronDown className="shrink-0 transition-transform group-open:rotate-180 text-accent/60" />
                    </summary>
                    <div className="px-8 md:px-10 pb-8 md:pb-10 pt-2 border-t border-[var(--border-primary)]">
                      <p className="text-[var(--text-secondary)] leading-relaxed font-dm-sans">{faq.a}</p>
                    </div>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 md:py-40 px-6 bg-[var(--text-primary)]/[0.02] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-24 items-center">
          <motion.div {...fadeIn} className="w-full lg:w-1/2 relative group">
             <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <ImageReveal className="rounded-[2.5rem] md:rounded-[5rem]">
                  <img 
                    src="https://yt3.googleusercontent.com/7c66P3YnmaqgNiVybbisloEC64VHRMgdHJAifzqvnTsrZvuoWRnNJYsibF9eMtow3umhZeMlrA=s900-c-k-c0x00ffffff-no-rj" 
                    alt="Yahyobek Tohirjonov" 
                    className="relative grayscale group-hover:grayscale-0 transition-all duration-1000 border border-[var(--border-primary)] aspect-[4/5] object-cover shadow-2xl mx-auto" 
                    referrerPolicy="no-referrer"
                  />
                </ImageReveal>
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
               <Link to="/contact" className="ui-btn-galaxy w-full sm:w-auto">
                 <div className="ui-btn-galaxy-inner px-12 py-5 uppercase text-xs tracking-widest w-full justify-center">
                    {t("about.cta1")}
                 </div>
               </Link>
               <button onClick={handleDownloadProposal} className="ui-btn-shine flex justify-center items-center w-full sm:w-auto">
                 Tijorat taklifini yuklash (PDF)
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS COUNTER */}
      <section className="py-20 md:py-32 border-b border-[var(--border-primary)] bg-[var(--text-primary)]/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {[
              { label: t("stats.projects"), value: 100, suffix: "+", icon: <Rocket size={20} /> },
              { label: t("stats.clients"), value: 50, suffix: "+", icon: <Users size={20} /> },
              { label: t("stats.campaigns"), value: 150, suffix: "+", icon: <Target size={20} /> },
              { label: t("stats.web"), value: 20, suffix: "+", icon: <Database size={20} /> }
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
                <div className="text-[32px] md:text-5xl font-satoshi font-bold tracking-tighter text-[var(--text-primary)]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="py-20 border-t border-[var(--border-primary)] overflow-hidden">
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
                        <span className="text-xl md:text-2xl font-satoshi font-black tracking-tighter uppercase text-[var(--text-secondary)] opacity-50 group-hover/logo:opacity-100 group-hover/logo:text-[var(--text-primary)] transition-all">
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
