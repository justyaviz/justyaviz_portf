import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAdmin } from '../components/AdminProvider';
import { LogIn, Rocket, Clock, CheckCircle2, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { Logo } from '../components/Logo';

const ClientPortal = () => {
  const { user, loginWithGoogle, logoutAdmin } = useAdmin();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, 'clientProjects'), where('clientEmail', '==', user.email));
    const unsubscribe = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-12 text-center">
          <div className="space-y-4">
             <div className="flex justify-center mb-8 scale-150"><Logo /></div>
             <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">Mijoz Portali</h1>
             <p className="text-white/40 text-sm">Loyihangiz holatini kuzatish va fayllarni yuklab olish uchun tizimga kiring.</p>
          </div>
          
          <button 
            onClick={loginWithGoogle}
            className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all shadow-2xl"
          >
            <LogIn size={20} /> Google orqali kirish
          </button>

          <p className="text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">
            Faqat ro'yxatdan o'tgan mijozlar uchun.<br/>Savollar bo'lsa @justyaviz_admin ga yozing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/5">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest rounded-full border border-accent/20">Client Area</div>
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20 flex items-center gap-1">
                   <ShieldCheck size={12} /> Secure
                </div>
             </div>
             <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">Xush kelibsiz,<br/>{user.displayName?.split(' ')[0]}</h1>
          </div>
          <button onClick={logoutAdmin} className="px-8 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all">Tizimdan chiqish</button>
        </div>

        {loading ? (
          <div className="py-24 flex justify-center"><div className="ui-loader"><div></div><div></div></div></div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {projects.map((p) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-10 md:p-16 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden group"
              >
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-accent tracking-[0.3em]">Loyiha Nomi</p>
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">{p.projectName}</h2>
                      </div>
                      
                      <div className="flex items-center gap-12">
                         <div>
                            <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2">Holati</p>
                            <div className="flex items-center gap-2">
                               <Clock size={16} className="text-accent animate-pulse" />
                               <span className="font-black uppercase text-sm tracking-widest">{p.status}</span>
                            </div>
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2">Progress</p>
                            <div className="flex items-center gap-3">
                               <span className="font-black text-2xl italic">{p.progress}%</span>
                               <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${p.progress}%` }}
                                    className="h-full bg-accent"
                                  />
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="p-8 bg-white/5 rounded-3xl space-y-4">
                         <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest">Oxirgi yangilanish</h4>
                         <p className="text-sm text-white/60">Biz loyihangizning {p.status} bosqichidamiz. Tez orada keyingi yangiliklarni baham ko'ramiz.</p>
                      </div>
                   </div>

                   <div className="space-y-8 lg:border-l lg:border-white/5 lg:pl-12">
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter">Biriktirilgan Fayllar</h3>
                      <div className="space-y-3">
                        {p.files && p.files.length > 0 ? p.files.map((file: any, index: number) => (
                           <a 
                             key={index} 
                             href={file.url} 
                             target="_blank" 
                             rel="noreferrer"
                             className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-accent group transition-all"
                           >
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                    <Download size={18} />
                                 </div>
                                 <span className="font-black text-xs uppercase tracking-widest">{file.name}</span>
                              </div>
                              <ExternalLink size={16} className="opacity-20 group-hover:opacity-100" />
                           </a>
                        )) : (
                          <div className="py-12 text-center text-white/20 italic border-2 border-dashed border-white/5 rounded-3xl">
                             Fayllar hali yuklanmagan
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-8">
                         <p className="text-[10px] text-white/20 mb-4">Savollar bo'lsa manager bilan bog'laning:</p>
                         <a href="https://t.me/Yahyobek_T" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                            Manager bilan bog'lanish
                         </a>
                      </div>
                   </div>
                </div>

                <div className="absolute top-0 right-0 p-8">
                   <Rocket size={120} className="text-white/5 -mr-12 -mt-12 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-6 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
             <Clock size={64} className="mx-auto text-white/10" />
             <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white/40">Hozircha faol loyihalar yo'q</h2>
                <p className="text-sm text-white/20 max-w-xs mx-auto">Sizning emailingizga biriktirilgan loyihalar topilmadi.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;
