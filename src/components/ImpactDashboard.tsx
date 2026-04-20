import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Globe, 
  BarChart3, 
  Zap 
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";

export const ImpactDashboard = () => {
  const { t } = useAppContext();
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "impactStats"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setStats(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const chartData = [
    { name: 'SMM', value: 85, color: '#ff3d00' },
    { name: 'Growth', value: 72, color: '#ff3d00' },
    { name: 'Systems', value: 95, color: '#ff3d00' },
    { name: 'IT', value: 68, color: '#ff3d00' },
  ];

  return (
    <section className="py-20 md:py-40 px-6 relative overflow-hidden bg-black text-white">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full [background:radial-gradient(circle_at_50%_50%,rgba(255,61,0,0.05)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
           <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em] block">{t("stats.badge") || "Impact Visualization"}</span>
           <h2 className="text-4xl md:text-7xl font-black tracking-tighter italic uppercase leading-none">
              Raqamlar gapirsin
           </h2>
           <p className="text-white/60 font-medium md:text-xl italic">
              Bitilgan har bir loyiha — bu shunchaki ish emas, balki aniq natija va o‘sish tizimidir.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.length > 0 ? stats.map((stat, i) => (
             <motion.div 
               key={stat.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="glass-dark p-10 rounded-[2.5rem] border-white/5 space-y-6 group hover:border-accent/50 transition-all shadow-2xl relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-3xl rounded-full group-hover:bg-accent/20 transition-all" />
                <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center shadow-[0_10px_30px_rgba(255,61,0,0.3)]">
                   <Zap size={28} />
                </div>
                <div className="space-y-1">
                   <h4 className="text-5xl font-black italic tracking-tighter">{stat.value}</h4>
                   <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">{stat.label}</p>
                </div>
             </motion.div>
           )) : (
             // Fallback Static Data if Firestore is empty
             [
               { label: "LOYIHALAR", value: "85+", icon: <BarChart3 /> },
               { label: "MIJOZLAR", value: "40+", icon: <Users /> },
               { label: "AUDITORIYA", value: "500k+", icon: <Globe /> },
               { label: "HOSIL DORLIK", value: "3x", icon: <TrendingUp /> }
             ].map((stat, i) => (
               <div key={i} className="glass-dark p-10 rounded-[2.5rem] border-white/5 space-y-6">
                 <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center">
                    <BarChart3 size={28} />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-5xl font-black italic tracking-tighter">{stat.value}</h4>
                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">{stat.label}</p>
                 </div>
               </div>
             ))
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 glass-dark p-10 md:p-14 rounded-[4rem] border-white/5 shadow-3xl relative overflow-hidden group">
              <div className="absolute top-6 right-10 flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-accent">Efficiency Growth</span>
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-12">System Efficiency Analysis</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.2)" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#111', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '16px',
                          color: '#fff'
                        }}
                        itemStyle={{ color: '#ff3d00' }}
                      />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                         {chartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8 + (index * 0.05)} />
                         ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="glass-dark p-10 rounded-[4rem] border-white/5 flex flex-col justify-between shadow-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute inset-0 [background:radial-gradient(circle_at_100%_0%,rgba(255,61,0,0.3)_0%,transparent_50%)]" />
              </div>
              <div className="space-y-6 relative z-10">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Target size={32} />
                 </div>
                 <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-tight">
                    Xalqaro Standartlar
                 </h3>
                 <p className="text-white/40 font-medium text-sm leading-relaxed italic">
                    Har bir harakatimiz global trendlarga va eng yangi texnologik yechimlarga tayanadi. Biz shunchaki mahalliy bozor bilan cheklanmaymiz.
                 </p>
              </div>
              <div className="pt-8 border-t border-white/5 relative z-10">
                 <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-accent">
                    <span>Targeting accuracy</span>
                    <span>99.2%</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "99.2%" }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className="h-full bg-accent shadow-[0_0_10px_rgba(255,61,0,0.5)]" 
                    />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
