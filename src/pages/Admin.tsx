import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db, loginWithGoogle, logout } from "../lib/firebase";
import { useAdmin } from "../components/AdminProvider";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
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
  Edit3
} from "lucide-react";

export default function Admin() {
  const { user, isAdmin, isEditMode, setEditMode, updateContent, siteContent: globalContent, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState<"projects" | "content">("projects");
  const [projects, setProjects] = useState<any[]>([]);
  
  // Form States
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", category: "", image: "", type: "Marketing" });

  useEffect(() => {
    if (!user || !isAdmin) return;

    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubProjects();
    };
  }, [user, isAdmin]);

  const handleSaveProject = async () => {
    try {
      if (isEditing) {
        await updateDoc(doc(db, "projects", isEditing), formData);
      } else {
        await addDoc(collection(db, "projects"), { ...formData, order: Date.now() });
      }
      setIsEditing(null);
      setFormData({ title: "", category: "", image: "", type: "Marketing" });
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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <div className="max-w-md w-full glass p-12 rounded-[3.5rem] text-center space-y-8">
        <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto">
          <Settings className="text-accent" size={40} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-black line-tight">
            {!user ? "Tizimga kirish" : "Kirish taqiqlangan"}
          </h1>
          <p className="text-white/40 text-sm">
            {!user 
              ? "Boshqaruv markaziga kirish uchun Google hisobingizdan foydalaning." 
              : `Siz ${user.email} hisobi bilan kirdingiz. Bu hisobda admin huquqlari yo'q.`}
          </p>
        </div>
        {!user ? (
          <button 
            onClick={async () => {
              console.log("Login button clicked");
              await loginWithGoogle();
            }}
            className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            Google orqali kirish
          </button>
        ) : (
          <div className="space-y-4">
            <button 
              onClick={loginWithGoogle}
              className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3"
            >
              Boshqa hisob bilan kirish
            </button>
            <button 
              onClick={logout}
              className="w-full py-5 bg-red-600/10 text-red-500 font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-red-600 hover:text-white transition-all border border-red-500/20"
            >
              Tizimdan chiqish
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* SIDEBAR */}
        <div className="lg:w-72 shrink-0 space-y-8">
          <div className="glass p-8 rounded-[2.5rem] space-y-6">
            <div className="flex items-center gap-4">
              <img src={user.photoURL || ""} className="w-12 h-12 rounded-2xl border border-white/10" />
              <div>
                <p className="text-sm font-bold truncate max-w-[140px]">{user.displayName}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Admin Access</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5 space-y-4">
               <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Visual Editor</p>
               <button 
                onClick={() => setEditMode(!isEditMode)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all font-bold text-[10px] uppercase tracking-widest ${
                  isEditMode 
                  ? "bg-accent text-black" 
                  : "bg-white/5 text-white/40 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  {isEditMode ? <Eye size={14} /> : <Edit3 size={14} />}
                  {isEditMode ? 'Edit ON' : 'Edit OFF'}
                </span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isEditMode ? 'bg-black/20' : 'bg-white/10'}`}>
                   <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${isEditMode ? 'right-1 bg-black' : 'left-1 bg-white/20'}`} />
                </div>
              </button>
            </div>

            <button onClick={logout} className="flex items-center gap-3 text-xs font-bold text-red-500/60 hover:text-red-500 transition-colors pt-4">
              <LogOut size={16} /> Chiqish
            </button>
          </div>

          <div className="space-y-2">
            {[
              { id: "projects", label: "Loyihalar", icon: <LayoutGrid size={18} /> },
              { id: "content", label: "Sayt Xaritasi", icon: <Edit2 size={18} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-4 px-8 py-5 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest ${
                  activeTab === tab.id 
                  ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-10">
          <AnimatePresence mode="wait">
            {activeTab === "projects" ? (
              <motion.div 
                key="projects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between font-display text-4xl font-black">
                  <h2>Loyihalarni boshqarish</h2>
                  <button 
                    onClick={() => {
                      setIsEditing(null);
                      setFormData({ title: "", category: "", image: "", type: "Marketing" });
                      (window as any).scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-4 bg-accent text-black rounded-2xl hover:scale-110 transition-transform"
                  >
                    <Plus size={24} />
                  </button>
                </div>

                {/* PROJECT FORM */}
                <div className="glass p-8 rounded-[3rem] border-white/10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4">Sarlavha</label>
                      <input 
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent/40" 
                        placeholder="Masalan: Hofmann Uz"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4">Kategoriya</label>
                      <input 
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent/40" 
                        placeholder="Masalan: Marketing"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4">Rasm URL</label>
                      <input 
                        value={formData.image}
                        onChange={e => setFormData({...formData, image: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent/40" 
                        placeholder="Rasm manzili..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-4">Turi</label>
                      <select 
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 outline-none focus:border-accent/40"
                      >
                        <option value="Marketing">Marketing</option>
                        <option value="Web site">Web site</option>
                        <option value="CRM">CRM</option>
                        <option value="Infografik">Infografik</option>
                        <option value="Banner">Banner</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={handleSaveProject} className="btn-primary-site w-full py-5">
                    {isEditing ? "Saqlash" : "Qo'shish"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map(p => (
                    <div key={p.id} className="glass p-6 rounded-[2.5rem] flex items-center gap-6 group hover:border-white/20 transition-all">
                      <img src={p.image} className="w-24 h-24 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold">{p.title}</h4>
                        <p className="text-xs text-white/40">{p.type}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => {
                          setIsEditing(p.id);
                          setFormData({ title: p.title, category: p.category, image: p.image, type: p.type });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }} className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDeleteProject(p.id)} className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="flex items-center gap-4 font-display text-4xl font-black">
                  <h2>Sayt Inventarizatsiyasi</h2>
                  <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    Site-wide Content Map
                  </div>
                </div>

                <div className="p-10 glass rounded-[3.5rem] border-white/5 space-y-4">
                   <p className="text-sm text-white/40 leading-relaxed font-medium">
                     Bu yerda siz saytdagi barcha tahrirlash imkoniyati mavjud bo'lgan matnlarni ro'yxat shaklida ko'rishingiz mumkin. 
                     Lekin qulayroq tahrirlash uchun <b>"Tahrirlash rejimi"</b>ni yoqib, saytning o'zida tahrirlashingizni tavsiya qilamiz.
                   </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { key: "heroTitle", label: "Asosiy Sarlavha", value: globalContent?.heroTitle || "just.yaviz" },
                    { key: "heroDesc", label: "Asosiy Tavsif", value: globalContent?.heroDesc || "Biz SMM va Brandface bo‘yicha ko‘p yo‘nalishli ijodkormiz...", type: "textarea" },
                    { key: "brandingTitle", label: "Brending Sarlavhasi", value: globalContent?.brandingTitle || "Mijozlarni xidorga aylantiradigan dizaynlar." },
                    { key: "brandingDesc", label: "Brending Tavsifi", value: globalContent?.brandingDesc || "Kliklarni mijozlarga...", type: "textarea" },
                    { key: "aboutText", label: "Men haqimda matni", value: globalContent?.aboutText || "Men — Just Yaviz...", type: "textarea" }
                  ].map(field => (
                    <div key={field.key} className="glass p-8 rounded-[2.5rem] group hover:border-accent/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">{field.label}</label>
                        <p className="text-sm font-medium line-clamp-2 text-white/80">{field.value}</p>
                      </div>
                      <div className="flex gap-4">
                         <Link 
                          to="/" 
                          onClick={() => {
                            setEditMode(true);
                            setTimeout(() => {
                               const el = document.querySelector(`[data-content-key="${field.key}"]`);
                               el?.scrollIntoView({ behavior: 'smooth' });
                            }, 500);
                          }}
                          className="px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                         >
                           Saytda ko'rish
                         </Link>
                         <button 
                          onClick={() => {
                            const val = prompt(`${field.label} uchun yangi matn:`, field.value);
                            if (val !== null) updateContent(field.key, val);
                          }}
                          className="px-6 py-3 bg-accent text-black rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                         >
                           Tahrirlash
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
