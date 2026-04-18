import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db, loginWithGoogle, logout } from "../lib/firebase";
import { useAdmin } from "../components/AdminProvider";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Settings, 
  LayoutGrid, 
  LogOut, 
  ChevronRight,
  Image as ImageIcon,
  Check,
  Eye,
  Edit3,
  Phone,
  ArrowLeft,
  Search,
  Bell,
  Home,
  Calendar,
  DollarSign,
  TrendingUp,
  Briefcase,
  Layers,
  FileText,
  BarChart3,
  Smartphone,
  Video,
  Globe,
  PlusCircle,
  Clock,
  Zap
} from "lucide-react";

export default function Admin() {
  const { user, isAdmin, isEditMode, setEditMode, updateContent, siteContent, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState<"dashboard" | "projects" | "content">("dashboard");
  const [projects, setProjects] = useState<any[]>([]);

  // Form States for Project Editor
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    title: "", 
    category: "", 
    image: "", 
    video: "", 
    link: "", 
    type: "Marketing" 
  });

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, "projects"), orderBy("order", "desc"));
    const unsubProjects = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubProjects();
  }, [isAdmin]);

  const handleSaveProject = async () => {
    try {
      if (isEditing) {
        await updateDoc(doc(db, "projects", isEditing), formData);
      } else {
        await addDoc(collection(db, "projects"), { ...formData, order: Date.now() });
      }
      setIsProjectModalOpen(false);
      setIsEditing(null);
      setFormData({ title: "", category: "", image: "", video: "", link: "", type: "Marketing" });
    } catch (err) {
      alert("Xatolik: " + err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
      await deleteDoc(doc(db, "projects", id));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 text-center space-y-8"
        >
          <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto text-blue-600">
             <Settings size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Kirish</h1>
            <p className="text-slate-500 text-sm">Boshqaruv paneliga kirish uchun Google hisobingizdan foydalaning.</p>
          </div>
          <button 
            onClick={loginWithGoogle}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Google orqali kirish
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* SIDEBAR - ALOO STYLE */}
      <aside className="w-72 bg-[#021431] text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8 border-b border-white/5 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">
               A
             </div>
             <div>
                <h2 className="font-bold text-lg leading-none">aloo</h2>
                <p className="text-[10px] text-white/40 font-medium">SMM jamoasi platformasi</p>
             </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input 
              type="text" 
              placeholder="Qidiruv..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-xs font-medium outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          <div className="space-y-1">
             <p className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4">ASOSIY</p>
             <SidebarItem 
               icon={<LayoutGrid size={18} />} 
               label="Bosh sahifa" 
               active={activeTab === "dashboard"} 
               onClick={() => setActiveTab("dashboard")} 
             />
             <SidebarItem 
               icon={<Layers size={18} />} 
               label="Loyihalar" 
               active={activeTab === "projects"} 
               onClick={() => setActiveTab("projects")} 
             />
             <SidebarItem 
               icon={<FileText size={18} />} 
               label="Sayt Xaritasi" 
               active={activeTab === "content"} 
               onClick={() => setActiveTab("content")} 
             />
             <SidebarItem 
               icon={<TrendingUp size={18} />} 
               label="Bonus tizimi" 
             />
          </div>

          <div className="space-y-1">
             <p className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4">JARAYONLAR</p>
             <SidebarItem icon={<Calendar size={18} />} label="Safar rejasi" />
             <SidebarItem icon={<Video size={18} />} label="Reklama kampaniyalari" />
             <SidebarItem icon={<DollarSign size={18} />} label="Harajatlar" />
             <SidebarItem icon={<BarChart3 size={18} />} label="Finance dashboard" />
             <SidebarItem icon={<Globe size={18} />} label="Kunlik filial hisobotlari" />
          </div>
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
           <button 
             onClick={() => setEditMode(!isEditMode)}
             className={`w-full flex items-center justify-between p-4 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${isEditMode ? 'bg-blue-600' : 'bg-white/5 text-white/40'}`}
           >
              <div className="flex items-center gap-2">
                {isEditMode ? <X size={14} /> : <Zap size={14} />}
                Tahrirlash: {isEditMode ? 'ON' : 'OFF'}
              </div>
              <div className={`w-8 h-4 rounded-full relative ${isEditMode ? 'bg-black/20' : 'bg-white/10'}`}>
                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${isEditMode ? 'right-0.5' : 'left-0.5'}`} />
              </div>
           </button>
           <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold text-xs">
              <LogOut size={16} /> Chiqish
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-72 flex-1 p-8 space-y-8">
        {/* HEADER */}
        <header className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                 <LayoutGrid size={20} />
              </div>
              <div className="flex flex-col">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">ALOO PLATFORMA</p>
                 <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bosh sahifa</h1>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 gap-3 min-w-[300px] shadow-sm">
                 <Search size={16} className="text-slate-400" />
                 <input type="text" placeholder="Global qidiruv..." className="bg-transparent border-none outline-none text-sm font-medium w-full" />
              </div>
              <button className="relative p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
                 <span className="ml-2 text-xs font-bold text-slate-600">38</span>
              </button>
              <button className="px-6 py-2.5 bg-sky-400 text-white font-bold rounded-xl text-xs">Install</button>
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
                 <img src={user?.photoURL || ""} className="w-8 h-8 rounded-lg" />
                 <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                   {user?.displayName?.split(' ')[0] || "USER"}
                 </span>
              </div>
           </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex gap-8">
                 <div className="flex-[2] bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] relative z-10">BOSHQARUV MARKAZI</p>
                    <h2 className="text-[56px] font-bold tracking-tighter leading-[0.9] text-slate-900 relative z-10">Admin boshqaruv paneli</h2>
                    <p className="text-slate-400 font-medium relative z-10">Kontent reja, bonus, filial hisobotlari va media boshqaruvi bitta joyda.</p>
                    
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl relative z-10">
                       <p className="text-sm font-medium text-slate-600">Bu oy 125 ta kontent, 0 ta bugungi hisobot va 14/15 vazifa bajarilishi qayd etildi.</p>
                    </div>

                    <div className="flex gap-3 relative z-10">
                       <Pill text="125 ta kontent" />
                       <Pill text="0 ta faol target" />
                       <Pill text="15 ta vazifa" />
                       <Pill text="Filial KPI tayyorlanmoqda" dim />
                    </div>
                 </div>

                 <div className="flex-1 space-y-4">
                    <div className="bg-[#1e293b] p-8 rounded-[2rem] text-white space-y-4 shadow-xl shadow-slate-900/10">
                       <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">BUGUNGI OQIM</p>
                       <h3 className="text-6xl font-bold tracking-tighter">0</h3>
                       <p className="text-white/40 text-[10px] font-medium leading-relaxed">bugun reja yoki ijroga tushgan kontentlar</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <SmallCard label="TOP FILIAL" value="—" sub="hisobot kutilmoqda" />
                       <SmallCard label="SIGNAL" value="2" sub="smart alert va reminders" highlight />
                       <SmallCard label="SAFAR" value="0" sub="tasdiqlangan safar rejasi" />
                       <SmallCard label="REKLAMA" value="0" sub="faol target kampaniyalari" glow />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <MetricCard label="KONTENT BAJARILISHI" value="0%" progress={0} color="red" />
                 <MetricCard label="JORIY OY BONUSI" value="0 UZS" sub="Aprel 2026" color="blue" />
                 <MetricCard label="OPERATSION PULSE" value="64%" color="orange" bubbles />
                 <MetricCard label="FAOL VAZIFALAR" value="15" sub="umumiy vazifalar" color="blue" dots />
              </div>
            </motion.div>
          ) : activeTab === "projects" ? (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
               <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900">Loyihalar Ro'yxati</h2>
                  <button 
                    onClick={() => {
                      setIsEditing(null);
                      setFormData({ title: "", category: "", image: "", video: "", link: "", type: "Marketing" });
                      setIsProjectModalOpen(true);
                    }}
                    className="flex items-center gap-3 px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:shadow-lg shadow-blue-500/20 transition-all"
                  >
                    <Plus size={20} /> Loyiha qo'shish
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {projects.map(p => (
                   <div key={p.id} className="bg-white border border-slate-200 p-6 rounded-[2.5rem] group hover:shadow-xl hover:shadow-blue-500/5 transition-all space-y-6">
                     <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-100">
                        <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                           <button onClick={() => {
                             setIsEditing(p.id);
                             setFormData({ title: p.title, category: p.category, image: p.image, video: p.video || "", link: p.link || "", type: p.type });
                             setIsProjectModalOpen(true);
                           }} className="p-3 bg-white rounded-xl text-blue-600 hover:scale-110 transition-transform shadow-lg">
                             <Edit2 size={20} />
                           </button>
                           <button onClick={() => handleDeleteProject(p.id)} className="p-3 bg-white rounded-xl text-red-500 hover:scale-110 transition-transform shadow-lg">
                             <Trash2 size={20} />
                           </button>
                        </div>
                     </div>
                     <div className="px-2 space-y-1">
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">{p.type}</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 truncate">{p.title}</h4>
                        <p className="text-slate-400 text-sm font-medium">{p.category}</p>
                     </div>
                   </div>
                 ))}
                 
                 {projects.length === 0 && (
                   <div className="col-span-full py-20 bg-white border border-dashed border-slate-300 rounded-[3rem] flex flex-col items-center justify-center text-slate-300 gap-4">
                      <LayoutGrid size={48} />
                      <p className="font-bold text-xl uppercase tracking-widest italic">Hozircha loyihalar yo'q</p>
                   </div>
                 )}
               </div>
            </motion.div>
          ) : activeTab === "content" ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
               <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900">Sayt Inventarizatsiyasi</h2>
                  <div className="px-4 py-2 bg-blue-100 rounded-xl text-blue-600 font-bold text-xs">
                     Tizim matnlari: 8 ta
                  </div>
               </div>

               <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
                  <p className="text-slate-500 font-medium leading-relaxed">
                     Bu yerda siz saytdagi barcha tahrirlash imkoniyati mavjud bo'lgan matnlarni ro'yxat shaklida ko'rishingiz mumkin. 
                     Lekin qulayroq tahrirlash uchun sidebar'dagi <b>"Tahrirlash rejimi"</b>ni yoqib, saytning o'zida tahrirlashingizni tavsiya qilamiz.
                  </p>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  {[
                    { key: "heroTitle", label: "Logo Name", value: siteContent?.heroTitle || "just.yaviz" },
                    { key: "heroTitleFullName", label: "Full Name (About)", value: siteContent?.heroTitleFullName || "Yahyobek Tohirjonov" },
                    { key: "heroDesc", label: "Landing Description", value: siteContent?.heroDesc || "Marketing va raqamli texnologiyalar uyg'unligida...", type: "textarea" },
                    { key: "aiTitle", label: "AI Section Title", value: siteContent?.aiTitle || "AI Ecosystem" },
                    { key: "aiDesc", label: "AI Section Desc", value: siteContent?.aiDesc || "Platformamizda siz IT sohasida ishlash...", type: "textarea" },
                    { key: "brandingTitle", label: "Branding Headline", value: siteContent?.brandingTitle || "Sifatli dizayn — bu tasodif emas, tizim." },
                    { key: "brandingDesc", label: "Branding Desc", value: siteContent?.brandingDesc || "Biznesingizga mos professional dizayn...", type: "textarea" },
                    { key: "aboutTextExtended", label: "Bio Content", value: siteContent?.aboutTextExtended || "Yahyobek Tohirjonov Rashidjon o‘g‘li — o‘zbek digital ijodkor...", type: "textarea" }
                  ].map(field => (
                    <div key={field.key} className="bg-white border border-slate-200 p-8 rounded-[2rem] hover:shadow-lg hover:shadow-blue-500/5 transition-all flex items-center justify-between gap-10">
                       <div className="space-y-2 flex-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{field.label}</label>
                          <p className="text-sm font-bold text-slate-700 line-clamp-2">{field.value}</p>
                       </div>
                       <button 
                         onClick={() => {
                           const val = prompt(`${field.label} uchun yangi matn:`, field.value);
                           if (val !== null) updateContent(field.key, val);
                         }}
                         className="px-8 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl text-xs hover:bg-blue-600 hover:text-white transition-all"
                       >
                         Tahrirlash
                       </button>
                    </div>
                  ))}
               </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* PROJECT EDITOR MODAL */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setIsProjectModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-slate-50 p-10 flex items-center justify-between border-b border-slate-200">
                 <div>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                      {isEditing ? "Loyihani tahrirlash" : "Yangi loyiha qo'shish"}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium">Barcha maydonlarni to'g'ri to'ldiring.</p>
                 </div>
                 <button onClick={() => setIsProjectModalOpen(false)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                    <X size={24} />
                 </button>
              </div>

              <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
                 <div className="grid grid-cols-2 gap-8">
                    <InputField label="SARLAVHA" value={formData.title} onChange={v => setFormData({...formData, title: v})} placeholder="Loyiha nomi..." />
                    <InputField label="KATEGORIYA" value={formData.category} onChange={v => setFormData({...formData, category: v})} placeholder="YouTube / Marketing..." />
                    
                    <div className="col-span-2 space-y-3">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">MUQOVA RASMI (THUMBNAIL)</label>
                       <input 
                         type="text" value={formData.image} onChange={v => setFormData({...formData, image: v.target.value})}
                         className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-blue-500/50 transition-all"
                         placeholder="Rasm URL manzili..."
                       />
                       {formData.image && (
                         <div className="mt-4 aspect-video rounded-3xl overflow-hidden border border-slate-200">
                            <img src={formData.image} className="w-full h-full object-cover" />
                         </div>
                       )}
                    </div>

                    <InputField label="VIDEO (IXTIYORIY - YT link)" value={formData.video} onChange={v => setFormData({...formData, video: v})} placeholder="https://youtube.com/..." />
                    
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">LOYIHA TURI</label>
                       <select 
                         value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                         className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-blue-500/50 appearance-none transition-all"
                       >
                         <option value="Marketing">Marketing</option>
                         <option value="Web site">Web site</option>
                         <option value="CRM">CRM</option>
                         <option value="YouTube">YouTube</option>
                         <option value="SMM">SMM</option>
                         <option value="Graphic">Graphic</option>
                       </select>
                    </div>
                 </div>
              </div>

              <div className="p-10 border-t border-slate-200 bg-slate-50 flex gap-4">
                 <button 
                   onClick={() => setIsProjectModalOpen(false)}
                   className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all"
                 >
                   Bekor qilish
                 </button>
                 <button 
                   onClick={handleSaveProject}
                   className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl hover:shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
                 >
                    {isEditing ? "O'zgarishlarni saqlash" : "Loyihani qo'shish"}
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// HELPER COMPONENTS
function SidebarItem({ icon, label, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-bold text-[13px] tracking-tight ${
        active 
        ? "bg-blue-600 shadow-lg shadow-blue-600/20 text-white" 
        : "text-white/40 hover:text-white hover:bg-white/5"
      }`}
    >
      <span className={active ? "text-white" : "text-blue-500/50"}>{icon}</span>
      {label}
    </button>
  );
}

function Pill({ text, dim = false }: any) {
  return (
    <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
      dim ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-900 border-slate-200 shadow-sm'
    }`}>
      {text}
    </div>
  );
}

function SmallCard({ label, value, sub, highlight = false, glow = false }: any) {
  return (
    <div className={`p-6 rounded-[2rem] border shadow-sm space-y-1 relative overflow-hidden group transition-all hover:scale-105 ${
      highlight ? 'bg-white border-blue-100' : 'bg-white border-slate-100'
    }`}>
      {glow && <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />}
      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</p>
      <h4 className={`text-2xl font-bold ${highlight ? 'text-blue-600' : 'text-slate-900'}`}>{value}</h4>
      <p className="text-[8px] text-slate-400 font-medium leading-relaxed max-w-[80px]">{sub}</p>
    </div>
  );
}

function MetricCard({ label, value, sub, progress, color, bubbles, dots }: any) {
  return (
    <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm space-y-6 relative overflow-hidden group">
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] relative z-10 flex items-center justify-between">
         {label}
         <span className={`w-2 h-2 rounded-full ${color === 'red' ? 'bg-red-500' : color === 'orange' ? 'bg-orange-500' : 'bg-blue-500'} animate-pulse`} />
       </p>
       <div className="space-y-4 relative z-10">
          <h3 className={`text-5xl font-bold tracking-tighter ${color === 'blue' ? 'text-blue-600' : color === 'orange' ? 'text-orange-500' : 'text-slate-900'}`}>{value}</h3>
          
          {progress !== undefined && (
            <div className="flex gap-1.5 pt-4">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-1000 ${i < (progress/20) ? (color === 'red' ? 'bg-red-500' : 'bg-blue-500') : 'bg-slate-100'}`} />
               ))}
            </div>
          )}

          {bubbles && (
            <div className="flex gap-3 justify-center pt-2">
               <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200" />
               <div className="w-14 h-14 rounded-full bg-orange-200 border border-orange-300" />
               <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100" />
            </div>
          )}

          {dots && (
            <div className="flex gap-3 pt-4">
               <div className="w-8 h-8 rounded-full bg-blue-600" />
               <div className="w-8 h-8 rounded-full bg-blue-400" />
               <div className="w-8 h-8 rounded-full bg-blue-200" />
               <div className="flex-1 h-2 bg-slate-100 rounded-full my-auto" />
            </div>
          )}

          {sub && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub}</p>}
       </div>
       <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all ${color === 'red' ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : color === 'blue' ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'bg-orange-500'}`} />
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-blue-500/50 transition-all"
        placeholder={placeholder}
      />
    </div>
  );
}
