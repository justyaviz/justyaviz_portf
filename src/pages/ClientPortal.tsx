import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAdmin } from '../components/AdminProvider';
import { 
  LogIn, 
  Rocket, 
  Clock, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  Users,
  FileText,
  LayoutDashboard,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Logo } from '../components/Logo';
import { useAppContext } from '../context/AppContext';

const chartData = [
  { name: 'Feb', reach: 1200000 },
  { name: 'Mar', reach: 2500000 },
  { name: 'Apr', reach: 1800000 },
  { name: 'May', reach: 4200000 },
  { name: 'Jun', reach: 6800000 },
  { name: 'Jul', reach: 8900000 },
];

const pieData = [
  { name: 'Meta Ads', value: 45 },
  { name: 'YouTube', value: 30 },
  { name: 'Organic', value: 25 },
];

const COLORS = ['#FF6321', '#FF9F00', '#222222'];

const ClientPortal = () => {
  const { user, loginWithGoogle, logoutAdmin } = useAdmin();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useAppContext();

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
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 overflow-hidden relative">
      {/* BACKGROUND ACCENT */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/5">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest rounded-full border border-accent/20">Client Workspace</div>
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20 flex items-center gap-1">
                   <ShieldCheck size={12} /> Secure
                </div>
             </div>
             <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                {t("hero.hello")},<br/>{user.displayName?.split(' ')[0]}
             </h1>
          </div>
          <div className="flex gap-4">
             <button className="px-8 py-4 glass border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-all">Report</button>
             <button onClick={logoutAdmin} className="px-8 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white hover:bg-white/5 transition-all">Logout</button>
          </div>
        </div>

        {loading ? (
          <div className="py-24 flex justify-center"><div className="ui-loader"><div></div><div></div></div></div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: ANALYTICS */}
            <div className="lg:col-span-2 space-y-8">
               {/* LIVE CAMPAIGN TRACKER */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-accent/5 border border-accent/20 rounded-[2.5rem] relative overflow-hidden group">
                     <div className="flex justify-between items-start mb-8">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-accent">LIVE CAMPAIGN</p>
                           <h4 className="text-xl font-black italic">META ADS SCALE</h4>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                     </div>
                     <div className="flex justify-between items-end">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Direct Spend</p>
                           <p className="text-3xl font-black italic">$482.40</p>
                        </div>
                        <div className="text-right space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Current ROI</p>
                           <p className="text-3xl font-black italic text-accent">5.8x</p>
                        </div>
                     </div>
                     <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ x: [-100, 400] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="w-1/2 h-full bg-accent blur-sm" 
                        />
                     </div>
                  </div>

                  <div className="p-8 glass border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                     <div className="flex justify-between items-start mb-8">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/40">ALGORITHM OPTIMIZATION</p>
                           <h4 className="text-xl font-black italic">GOOGLE SEARCH</h4>
                        </div>
                        <Activity className="text-accent animate-pulse" size={20} />
                     </div>
                     <div className="flex justify-between items-end">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Conv. Rate</p>
                           <p className="text-3xl font-black italic">4.21%</p>
                        </div>
                        <div className="text-right space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-40">CPA</p>
                           <p className="text-3xl font-black italic">$12.4</p>
                        </div>
                     </div>
                     <div className="mt-6 flex gap-1">
                        {[0.2, 0.5, 0.3, 0.8, 0.6, 0.4, 0.9].map((v, i) => (
                           <motion.div 
                             key={i}
                             animate={{ height: [`${v*100}%`, `${(v+0.2)*80}%`, `${v*100}%`] }}
                             transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                             className="flex-1 bg-accent/20 rounded-t-sm"
                             style={{ height: `${v*100}%` }}
                           />
                        ))}
                     </div>
                  </div>
               </div>

               <div className="p-8 md:p-12 glass border border-white/5 rounded-[3.5rem] space-y-12">
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <h3 className="text-2xl font-black italic">ECOSYSTEM GROWTH</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Aggregated cross-platform reach</p>
                     </div>
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent">
                        <TrendingUp size={24} />
                     </div>
                  </div>

                  <div className="h-[300px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                           <defs>
                              <linearGradient id="portalReach" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#FF6321" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="#FF6321" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <XAxis dataKey="name" hide />
                           <YAxis hide />
                           <Tooltip 
                              contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px' }}
                           />
                           <Area type="monotone" dataKey="reach" stroke="#FF6321" strokeWidth={3} fillOpacity={1} fill="url(#portalReach)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
                     <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Average CTR</p>
                        <p className="text-2xl font-black italic">4.2%</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Retention</p>
                        <p className="text-2xl font-black italic">88%</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Total ROI</p>
                        <p className="text-2xl font-black italic text-accent">5.2X</p>
                     </div>
                  </div>
               </div>

               {/* ACTIVE PROJECTS */}
               <div className="space-y-6">
                 <h4 className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">Active Projects</h4>
                 {projects.map((p) => (
                   <motion.div 
                     key={p.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden group"
                   >
                     <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                           <div className="space-y-2">
                             <p className="text-[10px] font-black uppercase text-accent tracking-[0.3em]">Project Identity</p>
                             <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">{p.projectName}</h2>
                           </div>
                           
                           <div className="flex items-center gap-8">
                              <div>
                                 <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2">Stage</p>
                                 <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-accent animate-pulse" />
                                    <span className="font-black uppercase text-xs tracking-widest">{p.status}</span>
                                 </div>
                              </div>
                              <div className="flex-1">
                                 <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-2">Progress</p>
                                 <div className="flex items-center gap-4">
                                    <span className="font-black text-xl italic leading-none">{p.progress}%</span>
                                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                       <motion.div 
                                         initial={{ width: 0 }}
                                         animate={{ width: `${p.progress}%` }}
                                         className="h-full bg-accent"
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <h3 className="text-lg font-black uppercase italic tracking-tighter">Asset Library</h3>
                           <div className="grid grid-cols-1 gap-2">
                             {p.files && p.files.length > 0 ? p.files.slice(0, 3).map((file: any, index: number) => (
                                <a 
                                  key={index} 
                                  href={file.url} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white hover:text-black group transition-all"
                                >
                                   <div className="flex items-center gap-3">
                                      <Download size={14} className="opacity-40 group-hover:opacity-100" />
                                      <span className="font-bold text-[10px] uppercase tracking-widest truncate max-w-[120px]">{file.name}</span>
                                   </div>
                                   <ExternalLink size={12} className="opacity-20" />
                                </a>
                             )) : (
                               <div className="py-8 text-center text-white/10 text-[10px] italic border border-dashed border-white/5 rounded-2xl uppercase tracking-widest">
                                  No assets shared yet
                               </div>
                             )}
                           </div>
                        </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>

            {/* RIGHT: DETAILS & ACTIONS */}
            <div className="space-y-8">
               <div className="p-8 glass border border-white/5 rounded-[3rem] space-y-8">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20">Channel Mix</h4>
                  <div className="h-[240px] flex items-center justify-center">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                              data={pieData}
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={8}
                              dataKey="value"
                           >
                              {pieData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                           </Pie>
                        </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-black italic">100%</span>
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Growth</span>
                     </div>
                  </div>
                  <div className="space-y-3">
                     {pieData.map((channel, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}} />
                              <span className="font-bold">{channel.name}</span>
                           </div>
                           <span className="font-black opacity-40">%{channel.value}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="p-8 bg-accent/5 border border-accent/20 rounded-[3rem] space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <LayoutDashboard size={100} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-black uppercase italic tracking-tighter">Support & Sync</h4>
                     <p className="text-[10px] text-white/40 leading-relaxed">Direct tunnel to your dedicated growth manager.</p>
                  </div>
                  <a 
                    href="https://t.me/Yahyobek_T" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-xl"
                  >
                     Open Telegram Tunnel
                  </a>
               </div>

               <div className="p-8 border border-white/5 rounded-[3rem] space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20">Security Badge</h4>
                  <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                     <ShieldCheck className="text-emerald-500" size={24} />
                     <div className="space-y-0.5">
                        <p className="text-[10px] font-black uppercase text-emerald-500">Encrypted Dashboard</p>
                        <p className="text-[8px] font-medium opacity-40">AES-256 Protected Session</p>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        ) : (
          <div className="py-32 text-center space-y-6 bg-white/[0.02] rounded-[4rem] border border-dashed border-white/10">
             <Clock size={64} className="mx-auto text-white/10" />
             <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white/40">Hozircha faol loyihalar yo'q</h2>
                <p className="text-sm text-white/20 max-w-xs mx-auto">Sizning emailingizga biriktirilgan loyihalar topilmadi.</p>
             </div>
             <a href="/" className="inline-block px-8 py-4 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest">LOYIHA BOSHLASH</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;
