import { motion } from "motion/react";
import { 
  Home, 
  User, 
  Palette, 
  Globe, 
  Terminal, 
  Brain, 
  Video, 
  Layout, 
  Layers,
  Award,
  Briefcase,
  Target,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Bio() {
  const { t } = useAppContext();

  const sidebarItems = [
    { icon: <Home size={18} />, label: t("bio.sidebar.home"), path: "/", active: false },
    { icon: <User size={18} />, label: t("bio.sidebar.who"), path: "/bio", active: true },
    { icon: <Palette size={18} />, label: t("bio.sidebar.branding"), path: "/branding", active: false },
    { type: "divider" },
    { icon: <Globe size={18} />, label: t("bio.sidebar.int"), path: "#" },
    { icon: <Terminal size={18} />, label: t("bio.sidebar.coding"), path: "#" },
    { icon: <Brain size={18} />, label: t("bio.sidebar.ai"), path: "/ai" },
    { icon: <Video size={18} />, label: t("bio.sidebar.video"), path: "#" },
    { icon: <Palette size={18} />, label: t("bio.sidebar.design"), path: "#" },
    { icon: <Layers size={18} />, label: t("bio.sidebar.extra"), path: "#" },
  ];

  const certificates = [
    { title: "Email Marketing", provider: "HubSpot Academy", image: "https://picsum.photos/seed/cert1/600/400" },
    { title: "Five Million AI Leaders", provider: "AI Education", image: "https://picsum.photos/seed/cert2/600/400" },
    { title: "YouTube kontentini boshqarish", provider: "Google", image: "https://picsum.photos/seed/cert3/600/400" },
    { title: "Xavfsizlik asoslari", provider: "Google Cloud", image: "https://picsum.photos/seed/cert4/600/400" },
    { title: "Psixologiya", provider: "Open University", image: "https://picsum.photos/seed/cert5/600/400" },
    { title: "Ta'lim", provider: "Open University", image: "https://picsum.photos/seed/cert6/600/400" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-display transition-colors duration-300">
      {/* SIDEBAR */}
      <aside className="w-64 fixed left-0 top-0 h-full border-r border-[var(--border-primary)] p-6 space-y-12 hidden lg:block bg-[var(--bg-primary)]/50 backdrop-blur-3xl z-50">
        <Link to="/" className="flex items-center gap-2 group">
           <div className="w-8 h-8 bg-black text-white dark:bg-white dark:text-black font-black flex items-center justify-center rounded-lg group-hover:rotate-12 transition-transform">M</div>
           <span className="font-bold tracking-tighter text-xl">dizayn.13</span>
        </Link>

        <nav className="space-y-1">
          {sidebarItems.map((item, i) => (
            item.type === "divider" ? (
              <div key={i} className="h-px bg-[var(--border-primary)] my-6" />
            ) : (
              <Link
                key={i}
                to={item.path || "#"}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active ? "bg-accent/10 text-accent" : "text-[var(--text-secondary)] hover:text-accent hover:bg-accent/5"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
           <div className="glass p-4 rounded-xl border-[var(--border-primary)] space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">{t("bio.sidebar.company")}</span>
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-accent text-white rounded flex items-center justify-center text-[10px] font-black">M</div>
                 <span className="text-xs font-bold">dizayn13</span>
              </div>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 p-6 md:p-12 lg:p-20 space-y-12">
        <header className="flex items-center justify-between">
           <h2 className="text-4xl md:text-5xl font-medium tracking-tighter">{t("bio.title")}</h2>
           <Link to="/" className="w-12 h-12 flex items-center justify-center border border-[var(--border-primary)] rounded-full hover:border-accent transition-all bg-accent/5">
              <ChevronRight size={20} className="rotate-180" />
           </Link>
        </header>

        {/* HERO CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 glass p-8 md:p-12 rounded-[2.5rem] border-[var(--border-primary)] relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-6">
                 <h1 className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                    {t("bio.hero.title")}
                 </h1>
                 <p className="text-[var(--text-secondary)] max-w-xl font-medium leading-relaxed">
                    {t("bio.hero.desc")}
                 </p>
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-40 h-40 bg-accent/10 blur-[60px] rounded-full" 
              />
              <div className="absolute bottom-[-10%] right-[10%] text-accent/10 group-hover:text-accent/20 transition-colors">
                 <Award size={200} />
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] flex flex-col justify-center items-center text-center space-y-4 shadow-lg hover:border-accent/30 transition-colors">
              <div className="w-20 h-20 rounded-full border border-accent/20 flex items-center justify-center bg-accent/5 text-accent">
                 <Award size={32} />
              </div>
              <h4 className="text-xl font-bold">{t("bio.cert.title")}</h4>
              <p className="text-[var(--text-secondary)] text-sm opacity-70">{t("bio.cert.desc")}</p>
           </div>
        </div>

        {/* EXPERIENCE TIMELINE */}
        <div className="space-y-12 py-10">
           <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-4">
                 <Briefcase className="text-accent" size={24} />
                 {t("bio.exp.title")}
              </h3>
              <div className="h-px w-20 bg-accent" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  company: "E-ONE ELECTRONICS", 
                  role: "SMM mutaxassisi", 
                  desc: "Ijtimoiy tarmoqlar, Meta Ads, Grafik dizayn, Video montaj, Web saytlar yaratish." 
                },
                { 
                  company: "NOVA TV", 
                  role: "Direktor", 
                  desc: "Jamoa boshqaruvi, kontent ishlab chiqarish va strategik loyiha rivojlantirish." 
                },
                { 
                  company: "SUNDECOR BLINDS", 
                  role: "SMM mutaxassisi", 
                  desc: "Reklama, kontent va brend sahifalarini ijtimoiy tarmoqlarda rivojlantirish." 
                },
                { 
                  company: "ILM CHASHMALARI", 
                  role: "Bosh menejer", 
                  desc: "SMM, sotuv va umumiy boshqaruv jarayonlarini yo'lga qo'yish." 
                }
              ].map((job, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="ui-magic-card group"
                >
                   <div className="p-8 h-full space-y-4 relative z-10 transition-all border-l-4 border-l-accent shadow-sm">
                      <div className="space-y-1">
                         <h4 className="text-accent font-black uppercase tracking-widest text-[10px]">{job.company}</h4>
                         <h5 className="text-xl font-bold">{job.role}</h5>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed opacity-80">{job.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* JUST YAVIZ & YOUTUBE */}
        <section className="space-y-16 py-20 border-t border-[var(--border-primary)]">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-[10px] font-black uppercase tracking-widest">
                    <Video size={12} />
                    {t("bio.branding.badge")}
                 </div>
                 <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter leading-none uppercase">
                   {t("bio.branding.title")}
                 </h2>
                 <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-medium">
                   {t("bio.branding.desc")}
                 </p>
                 <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: t("bio.branding.f1"), icon: <Brain size={16} /> },
                      { label: t("bio.branding.f2"), icon: <Video size={16} /> },
                      { label: t("bio.branding.f3"), icon: <User size={16} /> },
                      { label: t("bio.branding.f4"), icon: <Target size={16} /> }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-[var(--text-secondary)]">
                         <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                            {feature.icon}
                         </div>
                         <span className="text-xs font-bold uppercase tracking-wider">{feature.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-[var(--border-primary)] group shadow-2xl">
                 <img 
                   src="https://picsum.photos/seed/justyaviz/1200/800" 
                   alt="Just Yaviz YouTube" 
                   className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                       <Video size={32} />
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: t("bio.branding.card1.t"), desc: t("bio.branding.card1.d") },
                { title: t("bio.branding.card2.t"), desc: t("bio.branding.card2.d") },
                { title: t("bio.branding.card3.t"), desc: t("bio.branding.card3.d") },
                { title: t("bio.branding.card4.t"), desc: t("bio.branding.card4.d") }
              ].map((item, i) => (
                <div key={i} className="ui-magic-card group">
                   <div className="p-6 h-full space-y-3 relative z-10 transition-all">
                      <h5 className="font-bold text-sm tracking-tight">{item.title}</h5>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium opacity-70">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* CERTIFICATES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {certificates.map((cert, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="space-y-4 group"
             >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--border-primary)] shadow-lg transition-all group-hover:shadow-accent/20">
                   <img src={cert.image} alt={cert.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                   <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--bg-primary)]/80 backdrop-blur-xl border border-[var(--border-primary)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={14} className="text-accent" />
                   </div>
                </div>
                <div className="px-2 space-y-1">
                   <h5 className="font-bold flex items-center gap-2 group-hover:text-accent transition-colors">
                      {cert.title}
                      <span className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center text-[8px] font-black text-accent/40 group-hover:text-accent transition-colors">★</span>
                   </h5>
                   <p className="text-xs text-[var(--text-secondary)] tracking-widest uppercase font-bold opacity-60">{cert.provider}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </main>
    </div>
  );
}
