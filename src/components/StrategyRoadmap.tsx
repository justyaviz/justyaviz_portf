import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Lightbulb, 
  Zap, 
  BarChart3, 
  ArrowRight,
  Target,
  Rocket,
  ShieldCheck
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const steps = [
  {
    id: '01',
    title: 'Discovery & Audit',
    desc: 'Deep dive into your current ecosystem, competitor analysis, and identifying untapped growth opportunities.',
    icon: <Search />,
    color: 'bg-blue-500'
  },
  {
    id: '02',
    title: 'Strategic Blueprint',
    desc: 'Creating a custom multi-channel strategy centered on ROI, content vitality, and technical optimization.',
    icon: <Lightbulb />,
    color: 'bg-accent'
  },
  {
    id: '03',
    title: 'Creative Execution',
    desc: 'Deploying high-impact content, automated sales tunnels, and precision-targeted ad campaigns.',
    icon: <Zap />,
    color: 'bg-purple-600'
  },
  {
    id: '04',
    title: 'Scale & Optimize',
    desc: 'Continuous analytical monitoring and scaling winning patterns to maximize long-term market dominance.',
    icon: <BarChart3 />,
    color: 'bg-emerald-500'
  }
];

export default function StrategyRoadmap() {
  const { t } = useAppContext();

  return (
    <section className="py-20 md:py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">METHODOLOGY</span>
              <h2 className="text-4xl md:text-8xl font-display font-medium tracking-tighter leading-[0.9] uppercase italic">
                 The <span className="text-accent">YAVIZ</span> <br/> Growth Loop
              </h2>
           </div>
           <p className="text-[var(--text-secondary)] max-w-sm font-medium leading-relaxed">
              Transparency is our core. Here is the precision-engineered roadmap we follow to transform your digital presence.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 relative">
           {/* Horizontal Line for Desktop */}
           <div className="absolute top-[40px] left-0 w-full h-px bg-[var(--border-primary)] hidden lg:block z-0" />
           
           {steps.map((step, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="group relative z-10 p-8 pt-0 md:pt-8 space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left border-l border-white/5 md:border-l-0 lg:border-r lg:border-white/5 last:border-0"
             >
                {/* ICON & ID */}
                <div className="flex flex-col items-center lg:items-start gap-6">
                   <div className="relative">
                      <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center text-white shadow-2xl relative z-10 group-hover:scale-110 transition-transform`}>
                         {step.icon}
                      </div>
                      <div className="absolute -top-4 -right-4 text-4xl font-black italic opacity-10 group-hover:opacity-100 transition-opacity text-accent">
                         {step.id}
                      </div>
                   </div>
                </div>

                {/* CONTENT */}
                <div className="space-y-4">
                   <h4 className="text-2xl font-black uppercase italic tracking-tighter">{step.title}</h4>
                   <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                      {step.desc}
                   </p>
                </div>

                <div className="pt-4 mt-auto">
                   <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-accent transition-all">
                      <ArrowRight size={16} className="text-accent" />
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* TRUST BADGE FOOTER */}
        <div className="pt-20 flex flex-col md:flex-row items-center justify-center gap-12 border-t border-white/5">
           <div className="flex items-center gap-4 group cursor-help">
              <ShieldCheck className="text-emerald-500" size={32} />
              <div className="space-y-0.5">
                 <p className="text-[10px] font-black uppercase tracking-widest leading-none">Security First</p>
                 <p className="text-[9px] opacity-40 uppercase tracking-widest font-bold">Standard encryption for all data</p>
              </div>
           </div>
           <div className="flex items-center gap-4 group cursor-help">
              <Target className="text-blue-500" size={32} />
              <div className="space-y-0.5">
                 <p className="text-[10px] font-black uppercase tracking-widest leading-none">Result Oriented</p>
                 <p className="text-[9px] opacity-40 uppercase tracking-widest font-bold">Guaranteed KPI delivery</p>
              </div>
           </div>
           <div className="flex items-center gap-4 group cursor-help">
              <Rocket className="text-accent" size={32} />
              <div className="space-y-0.5">
                 <p className="text-[10px] font-black uppercase tracking-widest leading-none">Hyper-Scale</p>
                 <p className="text-[9px] opacity-40 uppercase tracking-widest font-bold">Optimized for global reach</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
