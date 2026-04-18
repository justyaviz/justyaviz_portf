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
  Edit3,
  Phone,
  ArrowLeft
} from "lucide-react";

export default function Admin() {
  const { user, isAdmin, isEditMode, setEditMode, updateContent, siteContent: globalContent, loading } = useAdmin();
  
  useEffect(() => {
    console.log("Admin Dashboard Debug:", { 
      loading, 
      isAdmin, 
      userEmail: user?.email, 
      phoneVerified: localStorage.getItem('admin_phone_verified') 
    });
  }, [loading, isAdmin, user]);

  const [activeTab, setActiveTab] = useState<"projects" | "content">("projects");
  const [projects, setProjects] = useState<any[]>([]);

  // Phone Auth State
  const [phoneStep, setPhoneStep] = useState<"initial" | "phone" | "code">("initial");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Form States
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", category: "", image: "", type: "Marketing" });

  useEffect(() => {
    if (!isAdmin) return;
    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubProjects();
  }, [isAdmin]);

  useEffect(() => {
    let interval: any;
    if (phoneStep === "code" && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [phoneStep, timer]);

  const handlePhoneSubmit = () => {
    if (phoneNumber === "931949200") {
      setPhoneStep("code");
      setTimer(60);
    } else {
      alert("Noma'lum telefon raqami.");
    }
  };

  const handleCodeSubmit = () => {
    setIsVerifying(true);
    setTimeout(() => {
      if (smsCode === "9000") {
        localStorage.setItem('admin_phone_verified', 'true');
        window.location.reload();
      } else {
        alert("Kod noto'g'ri.");
        setIsVerifying(false);
      }
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_phone_verified');
    logout();
    window.location.reload();
  };

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
      <div className="max-w-md w-full glass p-10 rounded-[3.5rem] text-center space-y-8 relative overflow-hidden">
        {isVerifying && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-4">
             <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
             <p className="text-[10px] font-black uppercase tracking-widest text-accent">Tekshirilmoqda...</p>
          </div>
        )}

        <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto">
          {phoneStep === "initial" ? <Settings className="text-accent" size={40} /> : <Phone className="text-accent" size={40} />}
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-display font-black line-tight">
            {phoneStep === "initial" ? "Admin Panel" : phoneStep === "phone" ? "Telefon orqali kirish" : "Kodni kiriting"}
          </h1>
          <p className="text-white/40 text-sm">
            {phoneStep === "initial" 
              ? "Boshqaruv markaziga kirish uchun usullardan birini tanlang." 
              : phoneStep === "phone" 
                ? "Tasdiqlash kodi yuborilishi uchun telefon raqamingizni kiriting."
                : `+998 ${phoneNumber} raqamiga SMS kod yuborildi.`}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {phoneStep === "initial" ? (
            <motion.div 
              key="initial"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <button 
                onClick={loginWithGoogle}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Google orqali kirish
              </button>
              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[10px] font-bold text-white/20 uppercase">yoki</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <button 
                onClick={() => setPhoneStep("phone")}
                className="w-full py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <Phone size={16} /> Telefon raqam orqali
              </button>
            </motion.div>
          ) : phoneStep === "phone" ? (
            <motion.div 
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 font-bold">+998</div>
                <input 
                  type="text" 
                  autoFocus
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="93 194 92 00"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-20 pr-6 text-xl font-bold tracking-widest outline-none focus:border-accent/40"
                />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setPhoneStep("initial")}
                  className="flex-1 py-5 bg-white/5 text-white/60 font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-white/10 transition-all"
                >
                  <ArrowLeft size={16} className="mx-auto" />
                </button>
                <button 
                  onClick={handlePhoneSubmit}
                  disabled={phoneNumber.length < 9}
                  className="flex-[3] py-5 bg-accent text-black font-black uppercase tracking-widest text-xs rounded-full hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] transition-all disabled:opacity-20"
                >
                  Kodni olish
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="code"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <input 
                type="text" 
                maxLength={4}
                autoFocus
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, ''))}
                placeholder="0 0 0 0"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-center text-3xl font-black tracking-[0.5em] outline-none focus:border-accent/40"
              />
              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleCodeSubmit}
                  disabled={smsCode.length < 4}
                  className="w-full py-5 bg-accent text-black font-black uppercase tracking-widest text-xs rounded-full hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] transition-all disabled:opacity-20"
                >
                  Tasdiqlash
                </button>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                  {timer > 0 ? (
                    <span>Qayta yuborish: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
                  ) : (
                    <button onClick={handlePhoneSubmit} className="text-accent underline">Qayta yuborish</button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              <img src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} className="w-12 h-12 rounded-2xl border border-white/10" />
              <div>
                <p className="text-sm font-bold truncate max-w-[140px]">{user?.displayName || "Administrator"}</p>
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

            <button onClick={handleLogout} className="flex items-center gap-3 text-xs font-bold text-red-500/60 hover:text-red-500 transition-colors pt-4">
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
                    { key: "heroDesc", label: "Asosiy Tavsif", value: globalContent?.heroDesc || "👉 SMM | Target | Content | Design | Web — biznesni o‘stiradigan xizmatlar", type: "textarea" },
                    { key: "aiTitle", label: "AI Bo'limi Sarlavhasi", value: globalContent?.aiTitle || "AI Ecosystem" },
                    { key: "aiDesc", label: "AI Bo'limi Tavsifi", value: globalContent?.aiDesc || "Platformamizda siz IT sohasida ishlash...", type: "textarea" },
                    { key: "brandingTitle", label: "Brending Sarlavhasi", value: globalContent?.brandingTitle || "Sifatli dizayn — bu tasodif emas, tizim." },
                    { key: "brandingDesc", label: "Brending Tavsifi", value: globalContent?.brandingDesc || "Biznesingizga mos professional dizayn...", type: "textarea" },
                    { key: "aboutText", label: "Men haqimda matni", value: globalContent?.aboutText || "Yahyobek Tohirjonov (Just Yaviz) — zamonaviy marketing...", type: "textarea" }
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
