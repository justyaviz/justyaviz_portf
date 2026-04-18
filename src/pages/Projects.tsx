import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { ProjectControls, AddProjectBtn } from "../components/ProjectEditor";
import { Logo } from "../components/Logo";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { 
  CheckCircle2, 
  ArrowUpRight, 
  LayoutGrid, 
  Video, 
  Palette, 
  Globe, 
  Rocket, 
  Smartphone, 
  Cpu,
  Play,
  X
} from "lucide-react";

// Helper to get YouTube ID
const getYoutubeId = (url: string | undefined) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const defaultProjects = [
  { title: "Magic City", category: "Marketing", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwrLEewH9Kw14lXc8nVXi2bIPilJXbDS1zg&s", type: "Marketing" },
  { title: "Sundecor", category: "Marketing", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLfkcYEjWfYZIpWvZ7fLMcCVxfVZQcXAZ3RQ&s", type: "Marketing" },
  { title: "Ilm Chashmalari", category: "SMM", image: "https://static4.tgstat.ru/channels/_0/58/5874f696205edf0c7aa55152da39921a.jpg", type: "Marketing" },
  { title: "e-one stores", category: "Web site", image: "https://taplink.st/a/5/1/6/f/99552c.jpg?1", type: "Web site" },
  { title: "aloo shop", category: "Yandex Maps / Marketing", image: "https://proud-cyan-whxxiapwah.edgeone.app/8586B6B0-80CD-45D5-8121-D8BB132DDF0B.jpeg", type: "Marketing", link: "https://yandex.uz/maps/org/180263652317/" },
  { title: "Yengil Taxi", category: "CRM", image: "https://assets.nicepagecdn.com/bc13c16f/6522583/images/Untitled-1.png", type: "CRM" },
  { title: "Yengil Mijoz", category: "Marketing", image: "https://play-lh.googleusercontent.com/7hUsDaIdSaYwgWXQosQZGuOpQ8RLhp8Iw-bSKzNIxocMqw5l-2ZysdbGdyllKkQIOw", type: "Marketing" },
];

const categories = [
  { name: "Hammasi", id: "all", icon: <LayoutGrid size={16} /> },
  { name: "Infografik", id: "Infografik", icon: <Palette size={16} /> },
  { name: "Banner", id: "Banner", icon: <Rocket size={16} /> },
  { name: "Web site", id: "Web site", icon: <Globe size={16} /> },
  { name: "CRM", id: "CRM", icon: <Cpu size={16} /> },
  { name: "YouTube", id: "YouTube", icon: <Video size={16} /> },
  { name: "Brend book", id: "Brend book", icon: <Smartphone size={16} /> },
  { name: "Catalog", id: "Catalog", icon: <Palette size={16} /> },
  { name: "Flayer", id: "Flayer", icon: <Palette size={16} /> },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setDbProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const projects = dbProjects.length > 0 ? dbProjects : defaultProjects;

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.type === activeCategory);

  const handleProjectClick = (p: any) => {
    if (p.type === "YouTube" && p.video) {
      const ytId = getYoutubeId(p.video);
      if (ytId) {
        setActiveVideo(ytId);
      } else if (p.video.startsWith('http')) {
        window.open(p.video, '_blank');
      }
    } else if (p.link) {
      window.open(p.link, '_blank');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
           <button 
             onClick={() => setActiveVideo(null)}
             className="absolute top-8 right-8 text-white/40 hover:text-white transition-opacity z-10"
           >
             <X size={24} className="md:size-32" />
             <span className="block text-[10px] font-bold uppercase tracking-widest mt-2">Yopish</span>
           </button>
           <div className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
           </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* SIDEBAR */}
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-32 space-y-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium text-xs uppercase tracking-widest ${
                  activeCategory === cat.id 
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-16">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-none">
              Hamkor Kompaniyalar
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto font-medium">
              Siz ham brendingizni yuqori darajalarga olib chiqing biz bunda yordam beramiz !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
                onClick={() => handleProjectClick(p)}
              >
                <div className={`relative ${p.type === "YouTube" ? "aspect-video" : "aspect-[4/5]"} rounded-[2.5rem] overflow-hidden border border-white/5 mb-6 group/card`}>
                  <ProjectControls project={p} />
                  {p.video && !getYoutubeId(p.video) ? (
                    <div className="absolute inset-0 w-full h-full">
                       <img 
                          src={p.image} 
                          alt={p.title} 
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover/card:opacity-0 transition-all duration-700" 
                          referrerPolicy="no-referrer"
                       />
                       <video 
                          src={p.video} 
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/card:opacity-100 transition-all duration-700" 
                          autoPlay 
                          muted 
                          loop 
                          playsInline
                       />
                    </div>
                  ) : (
                    <div className="absolute inset-0 w-full h-full">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                        referrerPolicy="no-referrer"
                      />
                      {p.type === "YouTube" && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                           <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                              <Play className="fill-white text-white translate-x-1" size={32} />
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-black/80 backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10 overflow-hidden p-2">
                    <Logo className="w-full h-full text-white" />
                  </div>
                </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl md:text-3xl font-display font-black tracking-tight">{p.title}</h4>
                      {(p.video || p.link) && <ArrowUpRight className="text-white/20 group-hover:text-accent transition-colors" size={20} />}
                    </div>
                    <p className="text-white/40 text-[10px] md:text-xs uppercase font-bold tracking-widest leading-relaxed">
                      {p.category}
                      {p.title === "aloo shop" && (
                        <span className="block mt-2 text-[10px] normal-case font-medium text-accent/60 italic">
                          Filiallar, mahsulotlar va narxlar Yandex Maps tizimiga professional darajada integratsiya qilingan.
                        </span>
                      )}
                    </p>
                  </div>
              </motion.div>
            ))}
            <AddProjectBtn />
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-white/20 font-display font-black text-3xl">
              Yaqinda qo'shiladi...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
