import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Home, 
  User, 
  Palette, 
  Globe, 
  Terminal, 
  Brain, 
  Video, 
  Award,
  Briefcase,
  Target,
  ExternalLink,
  ChevronRight,
  Mail,
  MapPin,
  Calendar,
  Languages,
  BookOpen,
  Rocket
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Logo } from "../components/Logo";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function Bio() {
  const { t } = useAppContext();
  const [experience, setExperience] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const qExp = query(collection(db, "experience"), orderBy("order", "asc"));
    const unsubExp = onSnapshot(qExp, (snapshot) => {
      setExperience(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const qCert = query(collection(db, "certificates"), orderBy("order", "asc"));
    const unsubCert = onSnapshot(qCert, (snapshot) => {
      setCertificates(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubExp();
      unsubCert();
    };
  }, []);

  const sidebarItems = [
    { icon: <Home size={18} />, label: t("bio.sidebar.home"), path: "/", active: false },
    { icon: <User size={18} />, label: t("bio.sidebar.who"), path: "/bio", active: true },
    { icon: <Palette size={18} />, label: t("bio.sidebar.branding"), path: "/branding", active: false },
    { icon: <Rocket size={18} />, label: t("nav.projects"), path: "/projects", active: false },
    { type: "divider" },
    { icon: <Globe size={18} />, label: t("bio.sidebar.int"), path: "#" },
    { icon: <Terminal size={18} />, label: t("bio.sidebar.coding"), path: "#" },
    { icon: <Brain size={18} />, label: t("bio.sidebar.ai"), path: "/ai" },
    { icon: <Video size={18} />, label: t("bio.sidebar.video"), path: "#" },
    { icon: <Palette size={18} />, label: t("bio.sidebar.design"), path: "#" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-display transition-colors duration-300">
      {/* SIDEBAR */}
      <aside className="w-64 fixed left-0 top-0 h-full border-r border-[var(--border-primary)] p-6 space-y-12 hidden lg:block bg-[var(--bg-primary)]/50 backdrop-blur-3xl z-50">
        <Link to="/" className="flex items-center gap-2 group">
           <div className="w-8 h-8 bg-black text-white dark:bg-white dark:text-black font-black flex items-center justify-center rounded-lg group-hover:rotate-12 transition-transform shadow-lg">Y</div>
           <span className="font-bold tracking-tighter text-xl text-accent">men</span>
        </Link>

        <nav className="space-y-1">
          {sidebarItems.map((item: any, i) => (
            item.type === "divider" ? (
              <div key={i} className="h-px bg-[var(--border-primary)] my-6" />
            ) : (
              <Link
                key={i}
                to={item.path || "#"}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active ? "bg-accent/10 text-accent shadow-sm" : "text-[var(--text-secondary)] hover:text-accent hover:bg-accent/5"
                }`}
              >
                {item.icon}
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </Link>
            )
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
           <div className="glass p-4 rounded-xl border-[var(--border-primary)] space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">{t("bio.sidebar.company")}</span>
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-accent text-white rounded flex items-center justify-center text-[10px] font-black">Y</div>
                 <span className="text-xs font-bold text-accent">just.yaviz digital</span>
              </div>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 p-6 md:p-12 lg:p-16 space-y-16">
        <header className="flex items-center justify-between">
           <div className="space-y-1">
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em]">{t("about.badge")}</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase">{t("bio.title")}</h2>
           </div>
           <Link to="/" className="w-12 h-12 flex items-center justify-center border border-[var(--border-primary)] rounded-full hover:border-accent transition-all bg-accent/5 shadow-md">
              <ChevronRight size={20} className="rotate-180" />
           </Link>
        </header>

        {/* HERO CARD & STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 glass p-8 md:p-14 rounded-[3rem] border-[var(--border-primary)] relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-8">
                 <div className="space-y-4">
                    <h1 className="text-3xl md:text-6xl font-black leading-[1] tracking-tighter uppercase italic">
                       {t("bio.hero.title")}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-accent">
                       <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">Digital Creator</span>
                       <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">SMM Strategist</span>
                       <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">Product Builder</span>
                    </div>
                 </div>
                 
                 <p className="text-[var(--text-secondary)] max-w-xl font-medium leading-relaxed text-lg md:text-xl italic">
                    {t("bio.hero.desc")}
                 </p>

                 <div className="bg-white/5 border border-white/10 p-6 rounded-2xl italic text-[var(--text-primary)] relative">
                    <span className="absolute -top-4 left-6 text-4xl text-accent opacity-50 font-serif">“</span>
                    {t("bio.hero.philosophy")}
                    <span className="absolute -bottom-10 right-6 text-4xl text-accent opacity-50 font-serif rotate-180">“</span>
                 </div>
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-80 h-80 bg-accent/5 blur-[100px] rounded-full" 
              />
           </div>

           <div className="space-y-6">
              <div className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] space-y-6 shadow-xl">
                 <h4 className="text-sm font-black uppercase tracking-widest text-accent flex items-center gap-2">
                    <Target size={16} />
                    Positioning
                 </h4>
                 <div className="space-y-4 text-sm font-medium">
                    <div className="flex items-center gap-3">
                       <MapPin className="text-accent shrink-0" size={18} />
                       {t("bio.details.loc")}
                    </div>
                    <div className="flex items-center gap-3">
                       <Calendar className="text-accent shrink-0" size={18} />
                       {t("bio.details.age")}
                    </div>
                    <div className="flex items-center gap-3">
                       <Languages className="text-accent shrink-0" size={18} />
                       {t("bio.details.lang")}
                    </div>
                    <div className="flex items-center gap-3">
                       <Mail className="text-accent shrink-0" size={18} />
                       {t("bio.details.email")}
                    </div>
                 </div>
              </div>

              <div className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] space-y-4 shadow-xl">
                 <h4 className="text-sm font-black uppercase tracking-widest text-accent flex items-center gap-2">
                    <Rocket size={16} />
                    {t("bio.goals.title")}
                 </h4>
                 <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-bold">
                    {t("bio.goals.desc")}
                 </p>
              </div>
           </div>
        </div>

        {/* PROJECTS & EDUCATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="glass p-10 rounded-[3rem] border-[var(--border-primary)] space-y-8 shadow-xl">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg">
                    <BookOpen size={24} />
                 </div>
                 <h3 className="text-2xl font-black uppercase italic tracking-tighter">{t("bio.edu.title")}</h3>
              </div>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
                 {t("bio.edu.desc")}
              </p>
              <div className="space-y-4 pt-4 border-t border-[var(--border-primary)]">
                 <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-accent">
                    <span>Focus Areas</span>
                    <ChevronRight size={14} />
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {["Digital marketing", "SMM", "IT", "Startup development", "English"].map(f => (
                       <span key={f} className="px-3 py-1 bg-[var(--text-primary)]/5 rounded-full text-[10px] font-bold">{f}</span>
                    ))}
                 </div>
              </div>
           </div>

           <div className="glass p-10 rounded-[3rem] border-[var(--border-primary)] space-y-8 shadow-xl">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg">
                    <Rocket size={24} />
                 </div>
                 <h3 className="text-2xl font-black uppercase italic tracking-tighter">🚀 Key Projects</h3>
              </div>
              <div className="space-y-4">
                 <div className="p-4 bg-accent/5 rounded-2xl border border-accent/10 group cursor-pointer hover:bg-accent/10 transition-colors">
                    <h5 className="font-bold text-accent">🔥 Aloofest</h5>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">Referral Marketing System — Viral growth platform for Telegram.</p>
                 </div>
                 <div className="p-4 bg-accent/5 rounded-2xl border border-accent/10 group cursor-pointer hover:bg-accent/10 transition-colors">
                    <h5 className="font-bold text-accent">📊 Aloo SMM Panel</h5>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">Full SMM Management System for teams — Automation & Reports.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* EXPERIENCE TIMELINE */}
        <div className="space-y-10">
           <div className="space-y-4">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4">
                 <Briefcase className="text-accent" size={28} />
                 {t("bio.exp.title")}
              </h3>
              <div className="h-1 w-24 bg-accent rounded-full" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experience.map((job, i) => (
                <motion.div 
                   key={job.id}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="ui-magic-card group"
                >
                   <div className="p-8 md:p-10 h-full space-y-4 relative z-10 transition-all border-l-4 border-l-accent shadow-md">
                      <div className="space-y-2">
                         <h4 className="text-accent font-black uppercase tracking-widest text-[11px] mb-1">{job.company}</h4>
                         <h5 className="text-2xl font-black tracking-tight uppercase italic">{job.role}</h5>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-medium opacity-80">{job.description}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* PROFESSIONAL POSITIONING SECTION */}
        <section className="space-y-16 py-10 border-t border-[var(--border-primary)]">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-accent/30">
                    <Award size={14} />
                    {t("bio.branding.badge")}
                 </div>
                 <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase italic">
                   {t("bio.branding.title")}
                 </h2>
                 <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed font-medium italic opacity-80">
                   {t("bio.branding.desc")}
                 </p>
                 <div className="grid grid-cols-2 gap-8">
                    {[
                      { label: "SMM Strategy", icon: <Target size={18} /> },
                      { label: "Viral Production", icon: <Video size={18} /> },
                      { label: "Web Automation", icon: <Terminal size={18} /> },
                      { label: "Growth Systems", icon: <Rocket size={18} /> }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 text-[var(--text-secondary)] group">
                         <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                            {feature.icon}
                         </div>
                         <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">{feature.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-[var(--border-primary)] group shadow-2xl">
                 <img 
                   src="https://yt3.googleusercontent.com/7c66P3YnmaqgNiVybbisloEC64VHRMgdHJAifzqvnTsrZvuoWRnNJYsibF9eMtow3umhZeMlrA=s900-c-k-c0x00ffffff-no-rj" 
                   alt="Just Yaviz" 
                   className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-110 group-hover:scale-100" 
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                 <div className="absolute bottom-10 left-10 p-6 space-y-2">
                    <h4 className="text-2xl font-black text-white italic uppercase">{t("hero.name")}</h4>
                    <p className="text-accent text-xs font-black uppercase tracking-widest">Digital Innovator</p>
                 </div>
              </div>
           </div>
        </section>

        {/* CERTIFICATES GRID */}
        <div className="space-y-12">
           <div className="space-y-4">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4">
                 <Award className="text-accent" size={28} />
                 {t("bio.cert.title")}
              </h3>
              <div className="h-1 w-24 bg-accent rounded-full" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert, i) => (
                <motion.div 
                   key={cert.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="space-y-4 group"
                >
                   <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-[var(--border-primary)] shadow-xl transition-all group-hover:shadow-accent/40 group-hover:border-accent">
                      {cert.image ? (
                        <img src={cert.image} alt={cert.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                      ) : (
                        <div className="w-full h-full bg-accent/5 flex items-center justify-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                           <Logo className="w-12 h-12 opacity-10" />
                        </div>
                      )}
                      <div className="absolute top-6 right-6 w-10 h-10 bg-[var(--bg-primary)]/80 backdrop-blur-xl border border-[var(--border-primary)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <ExternalLink size={18} className="text-accent" />
                      </div>
                   </div>
                   <div className="px-4 space-y-2">
                      <h5 className="text-lg font-black tracking-tight uppercase italic group-hover:text-accent transition-colors">
                         {cert.title}
                      </h5>
                      <p className="text-[10px] text-[var(--text-secondary)] tracking-[0.2em] uppercase font-black opacity-60 flex items-center gap-2">
                         <Globe size={12} />
                         {cert.provider}
                      </p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}
