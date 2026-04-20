import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, 
  Search, 
  FileText, 
  Download, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertCircle,
  Layout,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";

export default function Portal() {
  const { t } = useAppContext();
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [projects, setProjects] = useState<any[] | null>(null);
  const [error, setError] = useState("");

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSearching(true);
    setError("");
    setProjects(null);

    try {
      const q = query(
        collection(db, "clientProjects"), 
        where("clientEmail", "==", email.toLowerCase().trim()),
        orderBy("updatedAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError("Ushbu email bilan bog'liq loyihalar topilmadi. Iltimos, Yahyobek bilan bog'laning.");
      } else {
        setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    } catch (err) {
      console.error("Portal Access Error:", err);
      setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        {!projects ? (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="max-w-xl mx-auto space-y-12 text-center"
           >
              <div className="space-y-4">
                 <div className="w-20 h-20 bg-accent text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl relative">
                    <Lock size={32} />
                    <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full -z-10" />
                 </div>
                 <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Client Portal</h1>
                 <p className="text-[var(--text-secondary)] font-medium leading-relaxed italic opacity-80">
                    Loyiha holatini, fayllarni va progressni ko'rish uchun email manzilingizni kiriting.
                 </p>
              </div>

              <form onSubmit={handleAccess} className="space-y-6">
                 <div className="relative">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.com"
                      className="w-full bg-[var(--text-primary)]/5 border border-[var(--border-primary)] rounded-full px-10 py-6 text-sm font-medium focus:outline-none focus:border-accent transition-all pl-16 text-center"
                    />
                    <User className="absolute left-8 top-1/2 -translate-y-1/2 text-accent" size={24} />
                 </div>

                 {error && (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-bold italic"
                   >
                      <AlertCircle size={18} />
                      {error}
                   </motion.div>
                 )}

                 <button 
                   disabled={isSearching}
                   className="w-full ui-btn-galaxy group h-20"
                 >
                    <div className="ui-btn-galaxy-inner px-12 justify-center gap-3 w-full text-base font-black italic tracking-tighter uppercase">
                       {isSearching ? "QIDIRILMOQDA..." : "KIRISH"} 
                       <ChevronRight size={24} />
                    </div>
                 </button>
              </form>

              <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60">
                 Faqat Yahyobek'ning amaldagi mijozlari uchun.
              </p>
           </motion.div>
        ) : (
          <div className="space-y-16">
             {/* Portal Header */}
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[var(--border-primary)] pb-12">
                <div className="space-y-4">
                   <div className="flex items-center gap-4 text-accent font-black uppercase tracking-[0.4em] text-[10px]">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      LOYIHALARINGIZ
                   </div>
                   <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter">{projects[0].clientEmail}</h2>
                </div>
                <button 
                  onClick={() => setProjects(null)}
                  className="px-8 py-4 border border-[var(--border-primary)] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[var(--text-primary)]/5 transition-colors"
                >
                   Chiqish
                </button>
             </div>

             {/* Projects List */}
             <div className="grid grid-cols-1 gap-12">
                {projects.map((proj, i) => (
                   <motion.div 
                     key={proj.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="glass p-8 md:p-14 rounded-[4rem] border-[var(--border-primary)] shadow-2xl relative overflow-hidden group"
                   >
                      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent -z-10" />
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                         <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-4">
                               <div className="flex items-center gap-4">
                                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    proj.status === 'Active' ? 'bg-green-500 text-white' : 'bg-accent text-white'
                                  }`}>
                                     {proj.status}
                                  </span>
                                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                                     <Clock size={14} />
                                     Oxirgi yangilanish: {proj.updatedAt ? new Date(proj.updatedAt.toDate()).toLocaleDateString() : 'Yaqinda'}
                                  </div>
                               </div>
                               <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                                  {proj.projectName}
                               </h3>
                            </div>

                            <div className="space-y-4">
                               <div className="flex items-center justify-between font-black uppercase tracking-widest text-[10px] text-accent">
                                  <span>Progress</span>
                                  <span>{proj.progress}%</span>
                               </div>
                               <div className="w-full h-3 bg-[var(--text-primary)]/5 rounded-full overflow-hidden border border-[var(--border-primary)]">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${proj.progress}%` }}
                                    transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                                    className="h-full bg-accent shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]"
                                  />
                               </div>
                            </div>
                         </div>

                         <div className="space-y-6">
                            <div className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] space-y-6">
                               <h4 className="text-sm font-black uppercase tracking-widest text-accent flex items-center gap-2">
                                  <FileText size={18} />
                                  Loyihaviy Fayllar
                               </h4>
                               <div className="space-y-4">
                                  {proj.files && proj.files.length > 0 ? proj.files.map((file: any, index: number) => (
                                    <a 
                                      key={index} 
                                      href={file.url} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="flex items-center justify-between p-4 bg-[var(--text-primary)]/5 rounded-2xl border border-[var(--border-primary)] hover:border-accent hover:bg-accent/5 transition-all group/file"
                                    >
                                       <span className="text-xs font-bold text-[var(--text-secondary)] group-hover/file:text-accent transition-colors">{file.name}</span>
                                       <Download size={16} className="text-accent opacity-0 group-hover/file:opacity-100 transition-opacity" />
                                    </a>
                                  )) : (
                                    <p className="text-[10px] uppercase font-bold text-[var(--text-secondary)] opacity-50 italic">Hozircha fayllar yuklanmagan.</p>
                                  )}
                                </div>
                            </div>
                            <button className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-[var(--text-primary)]/5 rounded-[2rem] border border-[var(--border-primary)] text-[10px] font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all">
                               Menejer bilan suhbat <ExternalLink size={14} />
                            </button>
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
