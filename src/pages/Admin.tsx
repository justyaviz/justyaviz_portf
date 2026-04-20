import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAdmin } from "../components/AdminProvider";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Trash2, Edit2, X, Settings, LayoutGrid, LogOut, Search,
  Bell, Layers, FileText, Smartphone, Zap, Rocket, Users, Target,
  Database, ChartBar, MessageSquare, Moon, Sun, Newspaper, Star
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Admin() {
  const { user, isAdmin, isEditMode, setEditMode, updateContent, siteContent, loading, loginWithPhone, logoutAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState<"dashboard" | "projects" | "content" | "leads" | "blog" | "testimonials">("dashboard");
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [phone, setPhone] = useState("+998");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Form States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", category: "", image: "", video: "", link: "", type: "Marketing" });

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogData, setBlogData] = useState({ title: "", slug: "", content: "", excerpt: "", image: "", published: true });

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [testimonialData, setTestimonialData] = useState({ name: "", role: "", content: "", rating: 5 });

  useEffect(() => {
    if (!isAdmin) return;
    
    const unsubProjects = onSnapshot(query(collection(db, "projects"), orderBy("order", "desc")), snap => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubMessages = onSnapshot(query(collection(db, "messages"), orderBy("createdAt", "desc")), snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubAnalytics = onSnapshot(query(collection(db, "analytics"), orderBy("date", "asc")), snap => {
      setAnalytics(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubBlogs = onSnapshot(query(collection(db, "blogPosts"), orderBy("createdAt", "desc")), snap => {
      setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubTestimonials = onSnapshot(query(collection(db, "testimonials"), orderBy("createdAt", "desc")), snap => {
      setTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubProjects(); unsubMessages(); unsubAnalytics(); unsubBlogs(); unsubTestimonials(); };
  }, [isAdmin]);

  const handleSaveProject = async () => {
    try {
      if (isEditing) await updateDoc(doc(db, "projects", isEditing), formData);
      else await addDoc(collection(db, "projects"), { ...formData, order: Date.now() });
      setIsProjectModalOpen(false); setIsEditing(null);
    } catch (e) { alert(e); }
  };

  const handleSaveBlog = async () => {
    try {
      if (isEditing) await updateDoc(doc(db, "blogPosts", isEditing), blogData);
      else await addDoc(collection(db, "blogPosts"), { ...blogData, createdAt: new Date().toISOString() });
      setIsBlogModalOpen(false); setIsEditing(null);
    } catch (e) { alert(e); }
  };

  const handleSaveTestimonial = async () => {
    try {
      if (isEditing) await updateDoc(doc(db, "testimonials", isEditing), testimonialData);
      else await addDoc(collection(db, "testimonials"), { ...testimonialData, createdAt: new Date().toISOString() });
      setIsTestimonialModalOpen(false); setIsEditing(null);
    } catch (e) { alert(e); }
  };

  const deleter = async (col: string, id: string) => {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) await deleteDoc(doc(db, col, id));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6 font-inter">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 text-center space-y-10">
          <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-blue-600"><Smartphone size={48} /></div>
          <div className="space-y-3"><h1 className="text-3xl font-black text-slate-900 uppercase">Admin Kirish</h1><p className="text-slate-400 text-sm font-medium">Boshqaruv paneliga kiring.</p></div>
          <div className="space-y-4">
            {!showOtp ? (
              <div className="space-y-4">
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 px-6 font-bold text-lg outline-none" placeholder="+998 90 000 00 00" />
                <button onClick={() => setShowOtp(true)} className="w-full py-5 bg-blue-600 text-white font-black uppercase rounded-2xl shadow-xl shadow-blue-500/20 text-xs">Kod yuborish</button>
              </div>
            ) : (
              <div className="space-y-4">
                <input type="text" value={otp} onChange={e => setOtp(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 px-6 font-bold text-center text-3xl tracking-[1em] text-blue-600 outline-none" placeholder="0000" maxLength={4} />
                <button onClick={() => loginWithPhone(phone)} className="w-full py-5 bg-blue-600 text-white font-black uppercase rounded-2xl shadow-xl shadow-blue-500/20 text-xs">Tasdiqlash</button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  const unreadMessagesCount = messages.length; // Simplified for demo
  const themeClasses = darkMode 
    ? "bg-slate-950 text-white border-white/10" 
    : "bg-[#f8fafc] text-slate-900 border-slate-200";
  const boxClasses = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const textTitleClasses = darkMode ? "text-white" : "text-slate-800";
  const inputClasses = darkMode ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" : "bg-slate-50 border-slate-100 text-slate-700";

  return (
    <div className={`flex min-h-screen font-inter ${themeClasses} transition-colors duration-300 overflow-x-hidden`}>
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#021431] text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8 border-b border-white/5 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-600/30">J</div>
             <div><h2 className="font-black text-lg leading-none uppercase italic">Just Yaviz</h2><p className="text-[10px] text-white/40 uppercase">Boshqaruv</p></div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          <div className="space-y-1">
             <SidebarItem icon={<LayoutGrid size={18} />} label="Asosiy" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
             <SidebarItem icon={<ChartBar size={18} />} label="Analitika" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
             <SidebarItem icon={<Layers size={18} />} label="Loyihalar" active={activeTab === "projects"} onClick={() => setActiveTab("projects")} />
             <SidebarItem icon={<Newspaper size={18} />} label="Blog" active={activeTab === "blog"} onClick={() => setActiveTab("blog")} />
             <SidebarItem icon={<Star size={18} />} label="Fikrlar (Testimonials)" active={activeTab === "testimonials"} onClick={() => setActiveTab("testimonials")} />
             <SidebarItem icon={<FileText size={18} />} label="Matnlar" active={activeTab === "content"} onClick={() => setActiveTab("content")} />
             <SidebarItem icon={<MessageSquare size={18} />} label={`Xabarlar (${unreadMessagesCount})`} active={activeTab === "leads"} onClick={() => setActiveTab("leads")} />
          </div>
        </nav>
        <div className="p-6 border-t border-white/5 space-y-4">
           <button onClick={() => setDarkMode(!darkMode)} className="w-full flex justify-between p-4 bg-white/5 rounded-xl uppercase text-[10px] font-black items-center">
              Rejim <div className="flex gap-2">{darkMode ? <Moon size={14} className="text-blue-400" /> : <Sun size={14} className="text-yellow-400" />}</div>
           </button>
           <button onClick={logoutAdmin} className="w-full flex items-center gap-3 px-4 py-3 text-red-500/60 uppercase text-[10px] font-black"><LogOut size={16} /> Chiqish</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-72 flex-1 p-8 space-y-8 min-h-screen">
        <header className="flex items-center justify-between">
           <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"><LayoutGrid size={24} /></div>
              <div><p className="text-[10px] uppercase tracking-widest text-slate-400">Markaz</p><h1 className={`text-2xl font-black uppercase italic ${textTitleClasses}`}>{activeTab}</h1></div>
           </div>
           <div className="flex gap-4">
              <button className={`p-3 rounded-2xl ${boxClasses} shadow-sm relative`} onClick={() => setActiveTab("leads")}>
                 <Bell size={20} className="text-slate-400" />
                 {unreadMessagesCount > 0 && <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />}
              </button>
           </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
             <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
               <div className={`p-8 rounded-[2rem] border shadow-sm ${boxClasses}`}>
                 <h2 className={`text-xl font-black uppercase italic mb-6 ${textTitleClasses}`}>Haqiqiy Analitika (Traffic)</h2>
                 <div className="h-80 w-full font-sans text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analytics}>
                        <defs>
                          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke={darkMode ? "#475569" : "#cbd5e1"} />
                        <YAxis stroke={darkMode ? "#475569" : "#cbd5e1"} />
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#f1f5f9"} />
                        <Tooltip />
                        <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVisits)" />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
               </div>

               <div className="grid grid-cols-4 gap-6">
                 <div className={`p-8 rounded-3xl ${boxClasses}`}>
                   <p className="text-[10px] uppercase text-slate-400 font-bold mb-2">Jami Tashriflar</p>
                   <h3 className={`text-4xl font-black ${textTitleClasses}`}>{analytics.reduce((a,b)=>a+b.visitors, 0)}</h3>
                 </div>
                 <div className={`p-8 rounded-3xl ${boxClasses}`}>
                   <p className="text-[10px] uppercase text-slate-400 font-bold mb-2">Umumiy Pageview</p>
                   <h3 className={`text-4xl font-black ${textTitleClasses}`}>{analytics.reduce((a,b)=>a+b.pageviews, 0)}</h3>
                 </div>
                 <div className={`p-8 rounded-3xl ${boxClasses}`}>
                   <p className="text-[10px] uppercase text-slate-400 font-bold mb-2">Aktiv Loyihalar</p>
                   <h3 className={`text-4xl font-black ${textTitleClasses}`}>{projects.length}</h3>
                 </div>
                 <div className={`p-8 rounded-3xl ${boxClasses}`}>
                   <p className="text-[10px] uppercase text-slate-400 font-bold mb-2">O'qilmagan Xabarlar</p>
                   <h3 className={`text-4xl font-black text-rose-500`}>{unreadMessagesCount}</h3>
                 </div>
               </div>
             </motion.div>
          ) : activeTab === "projects" ? (
             <motion.div key="proj" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <button onClick={() => { setIsEditing(null); setIsProjectModalOpen(true); }} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm">Yangi loyiha</button>
               <div className="grid grid-cols-3 gap-6">
                 {projects.map(p => (
                   <div key={p.id} className={`p-6 rounded-3xl border ${boxClasses}`}>
                      <img src={p.image} className="w-full h-40 object-cover rounded-xl mb-4" />
                      <h4 className={`font-black text-lg ${textTitleClasses}`}>{p.title}</h4>
                      <p className="text-xs text-slate-400">{p.category}</p>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => { setIsEditing(p.id); setFormData(p); setIsProjectModalOpen(true); }} className="text-blue-500 font-bold text-xs bg-blue-500/10 px-3 py-1 rounded">Edit</button>
                        <button onClick={() => deleter("projects", p.id)} className="text-red-500 font-bold text-xs bg-red-500/10 px-3 py-1 rounded">Delete</button>
                      </div>
                   </div>
                 ))}
               </div>
             </motion.div>
          ) : activeTab === "blog" ? (
             <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <button onClick={() => { setIsEditing(null); setIsBlogModalOpen(true); }} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm">Yangi Maqola</button>
               <div className="grid grid-cols-2 gap-6">
                 {blogs.map(b => (
                   <div key={b.id} className={`p-6 rounded-3xl border ${boxClasses} flex gap-4`}>
                      <img src={b.image} className="w-24 h-24 object-cover rounded-xl" />
                      <div>
                        <h4 className={`font-black text-lg ${textTitleClasses}`}>{b.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2">{b.excerpt}</p>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => { setIsEditing(b.id); setBlogData(b); setIsBlogModalOpen(true); }} className="text-blue-500 text-xs font-bold">Tahrirlash</button>
                          <button onClick={() => deleter("blogPosts", b.id)} className="text-red-500 text-xs font-bold">O'chirish</button>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
             </motion.div>
          ) : activeTab === "testimonials" ? (
             <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <button onClick={() => { setIsEditing(null); setIsTestimonialModalOpen(true); }} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm">Yangi Fikr qo'shish</button>
               <div className="grid grid-cols-2 gap-6">
                 {testimonials.map(t => (
                   <div key={t.id} className={`p-6 rounded-3xl border ${boxClasses}`}>
                      <h4 className={`font-black text-lg ${textTitleClasses}`}>{t.name} <span className="text-xs font-normal text-slate-400">({t.role})</span></h4>
                      <p className="text-sm mt-2 font-medium italic opacity-80">"{t.content}"</p>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => { setIsEditing(t.id); setTestimonialData(t); setIsTestimonialModalOpen(true); }} className="text-blue-500 text-xs font-bold">Edit</button>
                        <button onClick={() => deleter("testimonials", t.id)} className="text-red-500 text-xs font-bold">Delete</button>
                      </div>
                   </div>
                 ))}
               </div>
             </motion.div>
          ) : activeTab === "leads" ? (
             <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <div className="grid grid-cols-1 gap-4">
                 {messages.map(m => (
                   <div key={m.id} className={`p-6 rounded-3xl border ${boxClasses}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-black text-lg ${textTitleClasses}`}>{m.name}</h4>
                          <p className="text-sm text-blue-500 font-bold">{m.email}</p>
                        </div>
                        <p className="text-xs text-slate-400">{new Date(m.createdAt).toLocaleString()}</p>
                      </div>
                      <p className={`mt-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{m.content}</p>
                      <button onClick={() => deleter("messages", m.id)} className="mt-4 text-xs font-bold text-red-500">O'chirish</button>
                   </div>
                 ))}
               </div>
             </motion.div>
          ) : activeTab === "content" ? (
             <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-8 rounded-[2rem] border ${boxClasses}`}>
               <h3 className={`text-2xl font-black uppercase italic mb-8 ${textTitleClasses}`}>Sayt Matnlari</h3>
               <div className="space-y-6">
                 {[
                    { key: "heroTitle", label: "Asosiy Sarlavha", val: siteContent?.heroTitle },
                    { key: "heroDesc", label: "Asosiy Ta'rif", val: siteContent?.heroDesc }
                 ].map(item => (
                   <div key={item.key} className="flex justify-between items-center pb-4 border-b border-slate-200/20">
                     <div><p className="text-xs text-slate-400 uppercase font-black">{item.label}</p><p className={`font-bold mt-1 ${textTitleClasses}`}>{item.val || "Kiritilmagan"}</p></div>
                     <button onClick={() => { const v = prompt('Yangi:', item.val); if(v) updateContent(item.key, v); }} className="text-blue-500 font-bold text-xs hover:underline">Tahrirlash</button>
                   </div>
                 ))}
                 <p className="text-xs text-slate-400">Saytdagi hamma o'zgarishlarni sidebar dagi "Tahrirlash: ON" (Live Edit) rejimi orqali to'g'ridan to'g'ri sayt o'zida ham qila olasiz!</p>
               </div>
             </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* MODALS */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md">
           <div className={`w-full max-w-2xl p-8 rounded-3xl ${boxClasses}`}>
              <h2 className={`text-2xl font-black mb-6 ${textTitleClasses}`}>Blog Qo'shish</h2>
              <div className="space-y-4">
                <input placeholder="Sarlavha" value={blogData.title} onChange={e=>setBlogData({...blogData, title: e.target.value})} className={`w-full p-4 rounded-xl outline-none ${inputClasses}`} />
                <input placeholder="Rasm URL" value={blogData.image} onChange={e=>setBlogData({...blogData, image: e.target.value})} className={`w-full p-4 rounded-xl outline-none ${inputClasses}`} />
                <input placeholder="Qisqacha (Excerpt)" value={blogData.excerpt} onChange={e=>setBlogData({...blogData, excerpt: e.target.value})} className={`w-full p-4 rounded-xl outline-none ${inputClasses}`} />
                <textarea placeholder="Maqola matni" value={blogData.content} onChange={e=>setBlogData({...blogData, content: e.target.value})} className={`w-full p-4 rounded-xl outline-none h-32 ${inputClasses}`} />
                <div className="flex gap-4 pt-4">
                  <button onClick={handleSaveBlog} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl flex-1">Saqlash</button>
                  <button onClick={()=>setIsBlogModalOpen(false)} className={`px-6 py-3 border font-bold rounded-xl flex-1 ${darkMode ? 'border-slate-700 text-white' : 'border-slate-200'}`}>Bekor qilish</button>
                </div>
              </div>
           </div>
        </div>
      )}

      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md">
           <div className={`w-full max-w-lg p-8 rounded-3xl ${boxClasses}`}>
              <h2 className={`text-2xl font-black mb-6 ${textTitleClasses}`}>Fikr Qo'shish</h2>
              <div className="space-y-4">
                <input placeholder="Ism" value={testimonialData.name} onChange={e=>setTestimonialData({...testimonialData, name: e.target.value})} className={`w-full p-4 rounded-xl outline-none ${inputClasses}`} />
                <input placeholder="Kasbi / Rol" value={testimonialData.role} onChange={e=>setTestimonialData({...testimonialData, role: e.target.value})} className={`w-full p-4 rounded-xl outline-none ${inputClasses}`} />
                <textarea placeholder="Fikr matni" value={testimonialData.content} onChange={e=>setTestimonialData({...testimonialData, content: e.target.value})} className={`w-full p-4 rounded-xl outline-none h-24 ${inputClasses}`} />
                <div className="flex gap-4 pt-4">
                  <button onClick={handleSaveTestimonial} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl flex-1">Saqlash</button>
                  <button onClick={()=>setIsTestimonialModalOpen(false)} className={`px-6 py-3 border font-bold rounded-xl flex-1 ${darkMode ? 'border-slate-700 text-white' : 'border-slate-200'}`}>Bekor qilish</button>
                </div>
              </div>
           </div>
        </div>
      )}
      
      {/* (Projects Modal logic identical but abbreviated for space or integrated into the single form) */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md">
           <div className={`w-full max-w-2xl p-8 rounded-3xl ${boxClasses}`}>
              <h2 className={`text-2xl font-black mb-6 ${textTitleClasses}`}>Loyiha Qo'shish</h2>
              <div className="space-y-4">
                <input placeholder="Nomlanishi" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className={`w-full p-4 rounded-xl outline-none ${inputClasses}`} />
                <input placeholder="Kategoriya" value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className={`w-full p-4 rounded-xl outline-none ${inputClasses}`} />
                <input placeholder="Rasm URL" value={formData.image} onChange={e=>setFormData({...formData, image: e.target.value})} className={`w-full p-4 rounded-xl outline-none ${inputClasses}`} />
                <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})} className={`w-full p-4 rounded-xl outline-none ${inputClasses}`}>
                  <option>Marketing</option><option>Web site</option><option>CRM</option><option>SMM</option>
                </select>
                <div className="flex gap-4 pt-4">
                  <button onClick={handleSaveProject} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl flex-1">Saqlash</button>
                  <button onClick={()=>setIsProjectModalOpen(false)} className={`px-6 py-3 border font-bold rounded-xl flex-1 ${darkMode ? 'border-slate-700 text-white' : 'border-slate-200'}`}>Bekor qilish</button>
                </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}

function SidebarItem({ icon, label, active = false, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${active ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" : "text-white/40 hover:text-white/80 hover:bg-white/5"}`}>
      <span className={active ? "text-white" : "text-blue-500/40"}>{icon}</span> {label}
    </button>
  );
}
