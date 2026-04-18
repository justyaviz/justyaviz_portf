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
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Bio() {
  const sidebarItems = [
    { icon: <Home size={18} />, label: "Asosiy", path: "/", active: false },
    { icon: <User size={18} />, label: "Kim man ?", path: "/bio", active: true },
    { icon: <Palette size={18} />, label: "dizayn13", path: "/branding", active: false },
    { type: "divider" },
    { icon: <Globe size={18} />, label: "Xalqaro", path: "#" },
    { icon: <Terminal size={18} />, label: "Dasturlash", path: "#" },
    { icon: <Brain size={18} />, label: "Ai", path: "/ai" },
    { icon: <Video size={18} />, label: "Video montaj", path: "#" },
    { icon: <Palette size={18} />, label: "Dizayn", path: "#" },
    { icon: <Layers size={18} />, label: "Qo'shimcha", path: "#" },
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
    <div className="flex min-h-screen bg-[#050505] text-white font-satoshi">
      {/* SIDEBAR */}
      <aside className="w-64 fixed left-0 top-0 h-full border-r border-white/5 p-6 space-y-12 hidden lg:block bg-black/50 backdrop-blur-3xl z-50">
        <Link to="/" className="flex items-center gap-2 group">
           <div className="w-8 h-8 bg-white text-black font-black flex items-center justify-center rounded-lg group-hover:rotate-12 transition-transform">M</div>
           <span className="font-bold tracking-tighter text-xl">dizayn.13</span>
        </Link>

        <nav className="space-y-1">
          {sidebarItems.map((item, i) => (
            item.type === "divider" ? (
              <div key={i} className="h-px bg-white/5 my-6" />
            ) : (
              <Link
                key={i}
                to={item.path || "#"}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
           <div className="glass p-4 rounded-xl border-white/5 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Asosiy kompaniya</span>
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-black">M</div>
                 <span className="text-xs font-bold">dizayn13</span>
              </div>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 p-6 md:p-12 lg:p-20 space-y-12">
        <header className="flex items-center justify-between">
           <h2 className="text-4xl md:text-5xl font-medium tracking-tighter">Kim man ?</h2>
           <Link to="/" className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:border-white transition-all bg-white/5">
              <ChevronRight size={20} className="rotate-180" />
           </Link>
        </header>

        {/* HERO CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 glass p-8 md:p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-6">
                 <h1 className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight">
                   Kreativ fikrlash orqali <br /> yuqori natijalarga erishish
                 </h1>
                 <p className="text-white/40 max-w-md font-medium">Ijodiy loyihalaringiz uchun eksklyuziv ilhom va resurs manbai.</p>
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-40 h-40 bg-accent/20 blur-[60px] rounded-full" 
              />
              <div className="absolute bottom-[-10%] right-[10%] opacity-20 group-hover:opacity-40 transition-opacity">
                 <Award size={200} />
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full border border-accent/20 flex items-center justify-center bg-accent/5">
                 <Award className="text-accent" size={32} />
              </div>
              <h4 className="text-xl font-bold">Sertifikatlar</h4>
              <p className="text-white/30 text-sm">O'qish va rivojlanish davomida olingan xalqaro darajadagi yutuqlar.</p>
           </div>
        </div>

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
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5">
                   <img src={cert.image} alt={cert.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                   <div className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={14} />
                   </div>
                </div>
                <div className="px-2 space-y-1">
                   <h5 className="font-bold flex items-center gap-2">
                      {cert.title}
                      <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px] font-black text-white/40 group-hover:text-accent transition-colors">★</span>
                   </h5>
                   <p className="text-xs text-white/30 tracking-widest uppercase font-bold">{cert.provider}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </main>
    </div>
  );
}
