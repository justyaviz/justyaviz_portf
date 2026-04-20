import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useAdmin } from "../components/AdminProvider";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Trash2, Edit2, X, Settings, LayoutGrid, LogOut, Search,
  Bell, Layers, FileText, Smartphone, Zap, Rocket, Users, Target,
  Database, ChartBar, MessageSquare, Moon, Sun, Newspaper, Star,
  ChevronRight, ArrowUpRight, CheckCircle2, AlertCircle, Clock,
  MoreVertical, Filter, Download, ExternalLink, Activity
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function Admin() {
  const { 
    user, 
    isAdmin, 
    isEditMode, 
    setEditMode, 
    updateContent, 
    siteContent, 
    loading, 
    loginWithGoogle, 
    logoutAdmin 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<"dashboard" | "projects" | "content" | "leads" | "blog" | "testimonials" | "services" | "clients">("dashboard");
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [clientProjects, setClientProjects] = useState<any[]>([]);
  
  // Modals & Editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"project" | "blog" | "testimonial" | "service" | "clientProject" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (!isAdmin) return;
    
    // Subscriptions
    const unsubProjects = onSnapshot(query(collection(db, "projects"), orderBy("order", "desc")), snap => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubMessages = onSnapshot(query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(50)), snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubAnalytics = onSnapshot(query(collection(db, "analytics"), orderBy("date", "asc"), limit(30)), snap => {
      setAnalytics(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubBlogs = onSnapshot(query(collection(db, "blogPosts"), orderBy("createdAt", "desc")), snap => {
      setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubTestimonials = onSnapshot(query(collection(db, "testimonials"), orderBy("createdAt", "desc")), snap => {
      setTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubServices = onSnapshot(query(collection(db, "services"), orderBy("order", "asc")), snap => {
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubClients = onSnapshot(query(collection(db, "clientProjects"), orderBy("updatedAt", "desc")), snap => {
      setClientProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { 
      unsubProjects(); unsubMessages(); unsubAnalytics(); unsubBlogs(); unsubTestimonials(); unsubServices(); unsubClients();
    };
  }, [isAdmin]);

  const openModal = (type: "project" | "blog" | "testimonial" | "service" | "clientProject", data: any = null) => {
    setModalType(type);
    setEditingId(data?.id || null);
    if (data) {
      setFormData(data);
    } else {
      switch(type) {
        case "project": setFormData({ title: "", category: "", image: "", type: "all", link: "", video: "", problem: "", solution: "", result: "", gallery: [] }); break;
        case "blog": setFormData({ title: "", slug: "", excerpt: "", content: "", image: "", published: true }); break;
        case "testimonial": setFormData({ name: "", role: "", content: "", rating: 5 }); break;
        case "service": setFormData({ title: "", price: "", features: "", isPopular: false, bentoSize: "medium", order: 0 }); break;
        case "clientProject": setFormData({ clientEmail: "", projectName: "", status: "Boshlanmoqda", progress: 0, files: [] }); break;
      }
    }
    setIsModalOpen(true);
  };

  const getYoutubeId = (url: string | undefined) => {
    if (!url || typeof url !== 'string') return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleVideoUrlChange = (url: string) => {
    const yid = getYoutubeId(url);
    const updates: any = { video: url };
    if (yid) {
      updates.image = `https://img.youtube.com/vi/${yid}/maxresdefault.jpg`;
    }
    setFormData({ ...formData, ...updates });
  };

  const handleSave = async () => {
    try {
      const collectionName = modalType === "project" ? "projects" : 
                             modalType === "blog" ? "blogPosts" : 
                             modalType === "testimonial" ? "testimonials" :
                             modalType === "service" ? "services" : "clientProjects";
      
      const dataToSave = { ...formData };
      
      // Handle features array for service
      if (modalType === "service" && typeof dataToSave.features === "string") {
        dataToSave.features = dataToSave.features.split("\n").filter((f: string) => f.trim());
      }
      
      if (!editingId) {
        dataToSave.createdAt = new Date().toISOString();
        dataToSave.updatedAt = new Date().toISOString();
        if (modalType === "project" || modalType === "service") dataToSave.order = Date.now();
        await addDoc(collection(db, collectionName), dataToSave);
      } else {
        dataToSave.updatedAt = new Date().toISOString();
        await updateDoc(doc(db, collectionName, editingId), dataToSave);
      }
      
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({});
    } catch (e) {
      console.error("Save error:", e);
      alert("Saqlashda xatolik yuz berdi.");
    }
  };

  const handleDelete = async (col: string, id: string) => {
    if (window.confirm("Haqiqatdan ham ushbu ma'lumotni o'chirmoqchimisiz?")) {
      try {
        await deleteDoc(doc(db, col, id));
      } catch (e) {
        alert("O'chirishda xatolik!");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
        <div className="ui-loader mb-8">
          <div></div>
          <div></div>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest opacity-50 animate-pulse">Admin Panel Yuklanmoqda...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-md w-full bg-[#141414] border border-white/5 p-12 rounded-[2.5rem] shadow-2xl text-center space-y-8"
        >
          <div className="w-20 h-20 bg-accent/10 border border-accent/20 rounded-[2rem] flex items-center justify-center mx-auto text-accent">
            <Rocket size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Admin Panel</h1>
            <p className="text-white/40 text-sm font-medium">Faqat Yahyobek Tohirjonov uchun ruxsat etilgan.</p>
          </div>
          <button 
            onClick={loginWithGoogle}
            className="w-full py-5 bg-accent text-white font-black uppercase rounded-2xl shadow-xl shadow-accent/20 text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
          >
            Google orqali kirish
          </button>
          {user && !isAdmin && (
            <p className="text-rose-500 text-xs font-bold bg-rose-500/10 py-3 rounded-xl border border-rose-500/20">
              Sizning hisobingizga ruxsat yo'q: {user.email}
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-accent selection:text-white">
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/5 flex flex-col fixed inset-y-0 left-0 bg-[#0a0a0a] z-50">
        <div className="p-8 flex items-center gap-3 border-b border-white/5">
           <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-xl italic shadow-lg shadow-accent/30">J</div>
           <div>
             <h2 className="font-black text-lg leading-none uppercase italic tracking-tighter">Just Yaviz</h2>
             <p className="text-[10px] text-white/30 uppercase font-bold mt-1 tracking-widest">Master Panel v2.0</p>
           </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 py-8 scrollbar-hide">
           <div className="space-y-1">
              <p className="px-6 text-[10px] font-black uppercase text-white/20 mb-4 tracking-[0.2em]">Asosiy</p>
              <SidebarItem icon={<LayoutGrid size={18} />} label="Boshqaruv" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
              <SidebarItem icon={<Activity size={18} />} label="Analitika" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
           </div>

           <div className="space-y-1">
              <p className="px-6 text-[10px] font-black uppercase text-white/20 mb-4 tracking-[0.2em]">Kontent</p>
              <SidebarItem icon={<Layers size={18} />} label="Loyihalar" active={activeTab === "projects"} onClick={() => setActiveTab("projects")} />
              <SidebarItem icon={<Newspaper size={18} />} label="Maqolalar" active={activeTab === "blog"} onClick={() => setActiveTab("blog")} />
              <SidebarItem icon={<Star size={18} />} label="Mijozlar Fikri" active={activeTab === "testimonials"} onClick={() => setActiveTab("testimonials")} />
              <SidebarItem icon={<FileText size={18} />} label="Sayt Matnlari" active={activeTab === "content"} onClick={() => setActiveTab("content")} />
           </div>

           <div className="space-y-1">
              <p className="px-6 text-[10px] font-black uppercase text-white/20 mb-4 tracking-[0.2em]">Biznes</p>
              <SidebarItem icon={<Smartphone size={18} />} label="Xizmatlar" active={activeTab === "services"} onClick={() => setActiveTab("services")} />
              <SidebarItem icon={<Users size={18} />} label="Mijozlar Portali" active={activeTab === "clients"} onClick={() => setActiveTab("clients")} />
           </div>

           <div className="space-y-1">
              <p className="px-6 text-[10px] font-black uppercase text-white/20 mb-4 tracking-[0.2em]">Aloqa</p>
              <SidebarItem icon={<MessageSquare size={18} />} label={`Xabarlar (${messages.length})`} active={activeTab === "leads"} onClick={() => setActiveTab("leads")} />
           </div>
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4 bg-white/[0.02]">
           <button 
             onClick={() => setEditMode(!isEditMode)} 
             className={`w-full flex justify-between p-4 rounded-xl items-center transition-all ${isEditMode ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-white/5 text-white/40 border border-white/5'}`}
           >
              <span className="text-[10px] font-black uppercase tracking-widest">Live Edit</span>
              <div className="flex gap-2">
                {isEditMode ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 border-2 border-current/20 rounded-full" />}
              </div>
           </button>
           
           <div className="flex items-center gap-4 px-4 py-2">
              <img src={user.photoURL || ""} className="w-8 h-8 rounded-full border border-white/10" alt="" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black truncate uppercase">{user.displayName || "Admin"}</p>
                <button onClick={logoutAdmin} className="text-[9px] font-bold text-rose-500 uppercase hover:underline">Chiqish</button>
              </div>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-72 flex-1 p-8 md:p-12 space-y-12">
        <header className="flex items-center justify-between">
           <div className="space-y-1">
              <p className="text-[10px] uppercase font-black tracking-[0.4em] text-accent">Admin / {activeTab}</p>
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                {activeTab === "dashboard" ? "Management" : activeTab}
              </h1>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-8 px-8 py-4 bg-white/5 border border-white/5 rounded-2xl">
                 <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-white/30 tracking-widest">Online</p>
                    <p className="font-mono text-sm">24.04.2026</p>
                 </div>
                 <div className="w-px h-6 bg-white/10" />
                 <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-white/30 tracking-widest">Status</p>
                    <p className="text-green-500 text-xs font-black uppercase">Active</p>
                 </div>
              </div>
              <button className="w-12 h-12 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all">
                 <Bell size={20} />
              </button>
           </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
             <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
               {/* ANALYTICS CHART */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] space-y-8">
                     <div className="flex items-center justify-between">
                        <h3 className="font-black uppercase italic text-lg tracking-tight">Visitors Activity</h3>
                        <div className="flex gap-2">
                           <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-lg text-[10px] font-black text-accent uppercase">30 Days</div>
                        </div>
                     </div>
                     <div className="h-80 w-full font-mono text-[10px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={analytics}>
                            <defs>
                              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" axisLine={false} tickLine={false} dy={10} />
                            <YAxis stroke="rgba(255,255,255,0.2)" axisLine={false} tickLine={false} dx={-10} />
                            <Tooltip contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', fontSize: '12px' }} />
                            <Area type="monotone" dataKey="visitors" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                          </AreaChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <StatCard icon={<Rocket className="text-blue-500" />} label="Projects" value={projects.length} delta="+2 this month" />
                     <StatCard icon={<MessageSquare className="text-orange-500" />} label="Leads" value={messages.length} delta={`${messages.filter(m => !m.read).length} Unread`} />
                     <StatCard icon={<Activity className="text-green-500" />} label="Visits" value={analytics.reduce((a,b)=>a+b.visitors, 0)} delta="+12.4%" />
                     <div className="p-8 bg-accent rounded-[2.5rem] text-white space-y-4 shadow-xl shadow-accent/20">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><Zap size={24} /></div>
                        <h4 className="font-black text-xl leading-tight">Pro Admin System</h4>
                        <p className="text-white/80 text-xs font-medium leading-relaxed">Saytingizni real vaqtda boshqaring va yangilang.</p>
                     </div>
                  </div>
               </div>

               {/* RECENT MESSAGES */}
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="font-black uppercase italic text-2xl tracking-tighter">Recent Messages</h3>
                     <button onClick={() => setActiveTab("leads")} className="text-xs font-black uppercase text-accent hover:underline">View All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {messages.slice(0, 4).map(m => (
                        <div key={m.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex items-start gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-white/5 shrink-0 flex items-center justify-center font-black text-lg text-white/20">{m.name[0]}</div>
                           <div className="flex-1 space-y-1">
                              <div className="flex justify-between items-center">
                                 <h5 className="font-black text-sm uppercase">{m.name}</h5>
                                 <p className="text-[9px] font-bold text-white/20">{new Date(m.createdAt).toLocaleDateString()}</p>
                              </div>
                              <p className="text-[11px] text-white/50 line-clamp-1">{m.content}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
             </motion.div>
          ) : activeTab === "projects" ? (
             <motion.div key="proj" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
               <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black uppercase italic text-2xl tracking-tighter">Portfel Loyihalari</h3>
                    <p className="text-white/40 text-xs font-medium mt-1">Siz qo'shgan barcha loyihalar ro'yxati.</p>
                  </div>
                  <button onClick={() => openModal("project")} className="px-8 py-4 bg-accent text-white font-black uppercase rounded-2xl text-[10px] tracking-widest shadow-xl shadow-accent/20">Yangi Loyiha</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {projects.map(p => (
                   <div key={p.id} className="group ui-magic-card">
                      <div className="relative z-10 space-y-4">
                        <div className="aspect-video rounded-2xl overflow-hidden bg-white/5">
                           <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="" />
                        </div>
                        <div className="px-1 space-y-1">
                           <h4 className="font-black text-sm uppercase truncate">{p.title}</h4>
                           <p className="text-[10px] font-black uppercase text-accent tracking-widest">{p.category}</p>
                        </div>
                        <div className="flex gap-2 pt-2 pb-1">
                           <button onClick={() => openModal("project", p)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-[10px] uppercase transition-all">Edit</button>
                           <button onClick={() => handleDelete("projects", p.id)} className="w-12 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl flex items-center justify-center transition-all"><Trash2 size={16} /></button>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
             </motion.div>
          ) : activeTab === "blog" ? (
             <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="font-black uppercase italic text-2xl tracking-tighter">Maqolalar (Blog)</h3>
                  <button onClick={() => openModal("blog")} className="px-8 py-4 bg-accent text-white font-black uppercase rounded-2xl text-[10px] tracking-widest">Yangi Maqola</button>
               </div>
               
               <div className="grid grid-cols-1 gap-4">
                 {blogs.map(b => (
                   <div key={b.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
                      <img src={b.image} className="w-24 h-24 object-cover rounded-2xl" alt="" />
                      <div className="flex-1 space-y-2">
                        <h4 className="font-black text-xl uppercase italic tracking-tighter">{b.title}</h4>
                        <p className="text-xs text-white/40 line-clamp-2">{b.excerpt}</p>
                        <div className="flex gap-4 items-center">
                           <span className="text-[9px] font-black uppercase px-2 py-1 bg-white/5 rounded-md text-white/30">{new Date(b.createdAt).toLocaleDateString()}</span>
                           <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${b.published ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                             {b.published ? "Published" : "Draft"}
                           </span>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={() => openModal("blog", b)} className="flex-1 md:w-24 py-3 bg-white/5 rounded-xl font-bold text-[10px] uppercase">Edit</button>
                        <button onClick={() => handleDelete("blogPosts", b.id)} className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-xl flex items-center justify-center transition-all"><Trash2 size={16} /></button>
                      </div>
                   </div>
                 ))}
               </div>
             </motion.div>
          ) : activeTab === "leads" ? (
             <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
               <h3 className="font-black uppercase italic text-2xl tracking-tighter">Incoming Messages</h3>
               <div className="space-y-4">
                 {messages.length === 0 ? (
                   <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2.5rem]">
                      <p className="font-black uppercase text-white/20 tracking-widest italic animate-pulse">Hozircha xabarlar yo'q</p>
                   </div>
                 ) : (
                   messages.map(m => (
                     <div key={m.id} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] space-y-6 group">
                        <div className="flex justify-between items-start">
                           <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-black text-2xl text-accent">{m.name[0]}</div>
                              <div>
                                 <h4 className="font-black text-lg uppercase tracking-tight">{m.name}</h4>
                                 <p className="text-xs font-bold text-accent">{m.email}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{new Date(m.createdAt).toLocaleTimeString()}</p>
                              <p className="text-xs font-bold text-white/40">{new Date(m.createdAt).toLocaleDateString()}</p>
                           </div>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl italic font-medium text-[15px] leading-relaxed text-white/70">
                           "{m.content}"
                        </div>
                        <div className="flex justify-end gap-2 pr-2">
                           <a href={`mailto:${m.email}`} className="text-[10px] font-black uppercase text-white/40 hover:text-accent transition-colors flex items-center gap-2">Javob berish <ArrowUpRight size={14} /></a>
                           <div className="w-px h-3 bg-white/10 mx-2 self-center" />
                           <button onClick={() => handleDelete("messages", m.id)} className="text-[10px] font-black uppercase text-rose-500/50 hover:text-rose-500 transition-colors">Ma'lumotni o'chirish</button>
                        </div>
                     </div>
                   ))
                 )}
               </div>
             </motion.div>
          ) : activeTab === "content" ? (
             <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] space-y-12">
               <div className="space-y-2">
                 <h3 className="font-black uppercase italic text-2xl tracking-tighter">Global Site Content</h3>
                 <p className="text-white/40 text-xs font-medium">Saytning asosiy matnlarini shu yerdan tahrirlashingiz mumkin.</p>
               </div>
               <div className="grid grid-cols-1 gap-0 border-t border-white/5">
                 {[
                    { key: "heroTitle", label: "Hero: Asosiy Sarlavha", section: "Hero" },
                    { key: "heroDesc", label: "Hero: Ta'rif Matni", section: "Hero" },
                    { key: "heroTitleFullName", label: "About: Ism-Sharif", section: "About" },
                    { key: "aboutTextExtended", label: "About: Batafsil Ma'lumot", section: "About" },
                    { key: "brandingTitle", label: "Services: Branding Sarlavha", section: "Services" },
                    { key: "brandingDesc", label: "Services: Branding Ta'rif", section: "Services" },
                    { key: "footerDesc", label: "Footer: Qisqa Ta'rif", section: "Footer" }
                 ].map((item, idx) => (
                   <div key={item.key} className="flex flex-col md:flex-row items-start md:items-center py-8 border-b border-white/5 group hover:bg-white/[0.01] px-4 transition-all">
                      <div className="w-32 mb-2 md:mb-0"><span className="text-[11px] font-black uppercase text-accent tracking-widest">{item.section}</span></div>
                      <div className="flex-1 pr-12">
                         <p className="text-[10px] font-black uppercase text-white/20 mb-1 tracking-widest">{item.label}</p>
                         <p className="font-medium text-white/80 line-clamp-1">{siteContent?.[item.key] || "Standart matn ishlatilmoqda"}</p>
                      </div>
                      <button 
                        onClick={() => {
                          const val = prompt(`${item.label} uchun yangi qiymat:`, siteContent?.[item.key] || "");
                          if (val !== null) updateContent(item.key, val);
                        }}
                        className="text-white/40 hover:text-white transition-all"
                      >
                         <Edit2 size={20} />
                      </button>
                   </div>
                 ))}
               </div>
               <div className="p-8 bg-white/5 rounded-3xl border border-white/5 flex gap-6 items-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-[1.5rem] flex items-center justify-center text-accent"><AlertCircle size={24} /></div>
                  <div className="flex-1">
                     <h5 className="font-black text-sm uppercase">Pro Maslahat</h5>
                     <p className="text-xs text-white/40 font-medium leading-relaxed">Sidebar dagi "Live Edit" ni yoqsangiz, saytning o'zida ham matnlarni ustiga bosib tahrirlay olasiz!</p>
                  </div>
               </div>
             </motion.div>
          ) : activeTab === "testimonials" ? (
             <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="font-black uppercase italic text-2xl tracking-tighter">Client Feedback</h3>
                  <button onClick={() => openModal("testimonial")} className="px-8 py-4 bg-accent text-white font-black uppercase rounded-2xl text-[10px] tracking-widest">Yangi Fikr</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {testimonials.map(t => (
                   <div key={t.id} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] space-y-4">
                      <div className="flex justify-between items-center">
                         <h4 className="font-black text-xl uppercase italic tracking-tighter">{t.name}</h4>
                         <div className="flex gap-1 text-accent">
                            {[...Array(t.rating || 5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                         </div>
                      </div>
                      <p className="text-[11px] font-black uppercase text-accent/60 tracking-widest">{t.role}</p>
                      <p className="text-sm font-medium italic text-white/60 leading-relaxed">"{t.content}"</p>
                      <div className="flex gap-4 pt-4">
                         <button onClick={() => openModal("testimonial", t)} className="text-[10px] font-black uppercase text-white/40 hover:text-white underline">Edit</button>
                         <button onClick={() => handleDelete("testimonials", t.id)} className="text-[10px] font-black uppercase text-rose-500/50 hover:text-rose-500 underline">Delete</button>
                      </div>
                   </div>
                 ))}
               </div>
             </motion.div>
          ) : activeTab === "services" ? (
             <motion.div key="serv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="font-black uppercase italic text-2xl tracking-tighter">Xizmat Paketlari</h3>
                   <button onClick={() => openModal("service")} className="px-8 py-4 bg-accent text-white font-black uppercase rounded-2xl text-[10px] tracking-widest">Yangi Paket</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map(s => (
                    <div key={s.id} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] space-y-4">
                       <h4 className="font-black text-xl uppercase italic tracking-tighter">{s.title}</h4>
                       <p className="text-2xl font-black text-accent">{s.price}</p>
                       <div className="space-y-2">
                          {s.features.map((f: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-white/50">
                               <CheckCircle2 size={12} className="text-accent" /> {f}
                            </div>
                          ))}
                       </div>
                       <div className="flex gap-4 pt-4">
                          <button onClick={() => openModal("service", s)} className="text-[10px] font-black uppercase text-white/40 hover:text-white underline">Edit</button>
                          <button onClick={() => handleDelete("services", s.id)} className="text-[10px] font-black uppercase text-rose-500/50 hover:text-rose-500 underline">Delete</button>
                       </div>
                    </div>
                  ))}
                </div>
             </motion.div>
          ) : activeTab === "clients" ? (
             <motion.div key="clie" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="font-black uppercase italic text-2xl tracking-tighter">Mijozlar Portali</h3>
                   <button onClick={() => openModal("clientProject")} className="px-8 py-4 bg-accent text-white font-black uppercase rounded-2xl text-[10px] tracking-widest">Yangi Loyiha Holati</button>
                </div>
                <div className="space-y-4">
                  {clientProjects.map(cp => (
                    <div key={cp.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent font-black">{cp.projectName[0]}</div>
                          <div>
                             <h4 className="font-black uppercase text-sm">{cp.projectName}</h4>
                             <p className="text-xs text-white/40">{cp.clientEmail}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-8">
                          <div className="text-right">
                             <p className="text-[10px] font-black uppercase text-accent">{cp.status}</p>
                             <div className="w-24 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-accent" style={{ width: `${cp.progress}%` }} />
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <button onClick={() => openModal("clientProject", cp)} className="p-2 text-white/40 hover:text-white"><Edit2 size={18} /></button>
                             <button onClick={() => handleDelete("clientProjects", cp.id)} className="p-2 text-rose-500/50 hover:text-rose-500"><Trash2 size={18} /></button>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
             </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* GLOBAL MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="w-full max-w-2xl bg-[#0d0d0d] border border-white/10 p-12 rounded-[3.5rem] shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
               <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-all"><X size={32} /></button>
               <h2 className="text-3xl font-black uppercase italic mb-8 tracking-tighter">{editingId ? "Tahrirlash" : "Yangi qo'shish"}: {modalType}</h2>
               
               <div className="space-y-6">
                 {modalType === "project" && (
                   <>
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Loyiha Nomi</label>
                           <input className="ui-input-glow p-5" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Kategoriya (Display)</label>
                              <input className="ui-input-glow p-5" placeholder="Masalan: Web Design" value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Turi (Filter)</label>
                              <select className="ui-input-glow p-5" value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})}>
                                 <option value="all">Barchasi</option>
                                 <option value="Web site">Web site</option>
                                 <option value="SMM">SMM</option>
                                 <option value="CRM">CRM</option>
                                 <option value="YouTube">YouTube (Video)</option>
                                 <option value="Reels">Reels</option>
                                 <option value="Banner">Banner</option>
                                 <option value="Infografik">Infografik</option>
                                 <option value="Brend book">Brend book</option>
                              </select>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Rasm URL {getYoutubeId(formData.video) && <span className="text-accent">(Auto)</span>}</label>
                           <input className="ui-input-glow p-5" value={formData.image} onChange={e=>setFormData({...formData, image: e.target.value})} />
                           {formData.image && (
                             <div className="mt-2 aspect-video rounded-3xl overflow-hidden border border-white/10 max-h-40">
                               <img src={formData.image} className="w-full h-full object-cover" alt="Preview" referrerPolicy="no-referrer" />
                             </div>
                           )}
                        </div>
                        
                        <div className="p-6 bg-white/5 rounded-3xl space-y-4">
                           <p className="text-[10px] font-black uppercase text-accent tracking-widest">Case Study Tafsilotlari</p>
                           <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-white/20 tracking-widest ml-1">Muammo (Problem)</label>
                                <textarea className="ui-input-glow p-4 text-sm min-h-[80px]" value={formData.problem} onChange={e=>setFormData({...formData, problem: e.target.value})} />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-white/20 tracking-widest ml-1">Yechim (Solution)</label>
                                <textarea className="ui-input-glow p-4 text-sm min-h-[80px]" value={formData.solution} onChange={e=>setFormData({...formData, solution: e.target.value})} />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-white/20 tracking-widest ml-1">Natija (Result)</label>
                                <textarea className="ui-input-glow p-4 text-sm min-h-[80px]" value={formData.result} onChange={e=>setFormData({...formData, result: e.target.value})} />
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Video URL (YouTube)</label>
                              <input className="ui-input-glow p-5" placeholder="https://youtube.com/..." value={formData.video} onChange={e=>handleVideoUrlChange(e.target.value)} />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Havola (Link)</label>
                              <input className="ui-input-glow p-5" placeholder="https://..." value={formData.link} onChange={e=>setFormData({...formData, link: e.target.value})} />
                           </div>
                        </div>
                     </div>
                   </>
                 )}

                 {modalType === "service" && (
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Paket Nomi</label>
                        <input className="ui-input-glow p-5" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Narxi</label>
                           <input className="ui-input-glow p-5" value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Bento Hajmi</label>
                           <select className="ui-input-glow p-5" value={formData.bentoSize} onChange={e=>setFormData({...formData, bentoSize: e.target.value})}>
                              <option value="small">Small</option>
                              <option value="medium">Medium</option>
                              <option value="large">Large</option>
                           </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Funksiyalar (Har bir qatorga bitta)</label>
                        <textarea className="ui-input-glow p-5 min-h-[150px]" value={Array.isArray(formData.features) ? formData.features.join("\n") : formData.features} onChange={e=>setFormData({...formData, features: e.target.value})} />
                      </div>
                      <div className="flex items-center gap-2 px-4">
                         <input type="checkbox" checked={formData.isPopular} onChange={e=>setFormData({...formData, isPopular: e.target.checked})} className="accent-accent" />
                         <span className="text-xs font-black uppercase text-white/50">Ommabop Paket</span>
                      </div>
                   </div>
                 )}

                 {modalType === "clientProject" && (
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Mijoz Email</label>
                           <input className="ui-input-glow p-5" value={formData.clientEmail} onChange={e=>setFormData({...formData, clientEmail: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Loyiha Nomi</label>
                           <input className="ui-input-glow p-5" value={formData.projectName} onChange={e=>setFormData({...formData, projectName: e.target.value})} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Holati (Status)</label>
                           <input className="ui-input-glow p-5" value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Progress (%)</label>
                           <input type="number" className="ui-input-glow p-5" value={formData.progress} onChange={e=>setFormData({...formData, progress: Number(e.target.value)})} />
                        </div>
                      </div>
                   </div>
                 )}

                 {modalType === "blog" && (
                   <>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Maqola Sarlavhasi</label>
                        <input className="ui-input-glow p-5" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} />
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Sarlavha kodi (Slug)</label>
                           <input className="ui-input-glow p-5" value={formData.slug} onChange={e=>setFormData({...formData, slug: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Rasm URL</label>
                           <input className="ui-input-glow p-5" value={formData.image} onChange={e=>setFormData({...formData, image: e.target.value})} />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Qisqacha ta'rif</label>
                        <textarea className="ui-input-glow p-5 min-h-[100px]" value={formData.excerpt} onChange={e=>setFormData({...formData, excerpt: e.target.value})} />
                     </div>
                   </>
                 )}

                 {modalType === "testimonial" && (
                   <>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Mijoz Ismi</label>
                           <input className="ui-input-glow p-5" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Kasbi / Lavozimi</label>
                           <input className="ui-input-glow p-5" value={formData.role} onChange={e=>setFormData({...formData, role: e.target.value})} />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-4">Mijoz fikri</label>
                        <textarea className="ui-input-glow p-5 min-h-[120px]" value={formData.content} onChange={e=>setFormData({...formData, content: e.target.value})} />
                     </div>
                   </>
                 )}

                 <div className="flex gap-4 pt-8">
                    <button onClick={handleSave} className="flex-1 py-5 bg-accent text-white font-black uppercase rounded-2xl shadow-xl shadow-accent/20 tracking-widest text-[11px]">Saqlash</button>
                    <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-white/5 text-white font-black uppercase rounded-2xl tracking-widest text-[11px]">Bekor qilish</button>
                 </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] transition-all relative ${active ? "text-accent bg-accent/5" : "text-white/30 hover:text-white/80 hover:bg-white/5"}`}>
      {active && <motion.div layoutId="sb-active" className="absolute left-0 w-1 h-6 bg-accent rounded-r-full" />}
      <span className={active ? "text-accent" : "text-white/20"}>{icon}</span> {label}
    </button>
  );
}

function StatCard({ icon, label, value, delta }: any) {
  return (
    <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] flex items-center gap-6">
       <div className="w-14 h-14 bg-white/5 rounded-[1.5rem] flex items-center justify-center shrink-0">{icon}</div>
       <div>
          <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
             <h4 className="text-3xl font-black italic tracking-tighter">{value}</h4>
             <span className="text-[9px] font-bold text-green-500 uppercase">{delta}</span>
          </div>
       </div>
    </div>
  );
}
