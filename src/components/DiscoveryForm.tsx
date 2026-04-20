import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { toast } from 'sonner';

const steps = [
  {
    id: 1,
    title: 'Objective',
    question: 'Xizmatlardan qaysi biri sizga zarur?',
    options: [
      { id: 'smm', label: 'SMM & Content', icon: <TrendingUp size={20} /> },
      { id: 'branding', label: 'Identity & Branding', icon: <Sparkles size={20} /> },
      { id: 'web', label: 'Web Development', icon: <Briefcase size={20} /> },
      { id: 'scaling', label: 'Ads & Scaling', icon: <DollarSign size={20} /> }
    ]
  },
  {
    id: 2,
    title: 'Industry',
    question: 'Sizning biznesingiz qaysi sohada?',
    options: [
      { id: 'ecommerce', label: 'E-commerce', icon: <CheckCircle2 size={18} /> },
      { id: 'education', label: 'Education', icon: <CheckCircle2 size={18} /> },
      { id: 'realestate', label: 'Real Estate', icon: <CheckCircle2 size={18} /> },
      { id: 'other', label: 'Other Service', icon: <CheckCircle2 size={18} /> }
    ]
  },
  {
    id: 3,
    title: 'Budget',
    question: 'Loyiha uchun taxminiy byudjet?',
    options: [
      { id: 'basic', label: '$500 - $1,000', icon: <Target size={18} /> },
      { id: 'pro', label: '$1,000 - $3,000', icon: <Target size={18} /> },
      { id: 'enterprise', label: '$5,000+', icon: <Target size={18} /> }
    ]
  }
];

export default function DiscoveryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { playClick, playSuccess } = useAudio();

  const handleSelect = (optionId: string) => {
    playClick();
    setAnswers(prev => ({ ...prev, [currentStep]: optionId }));
    
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setSubmitted(true);
      playSuccess();
      toast.success("Murojaatingiz qabul qilindi!");
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="w-full max-w-2xl mx-auto glass p-8 md:p-14 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          className="h-full bg-accent"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="flex items-center justify-between">
               <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">STEP 0{currentStep + 1} / 03</span>
                  <h3 className="text-3xl font-display font-medium tracking-tighter uppercase italic">{currentStepData.title}</h3>
               </div>
               {currentStep > 0 && (
                 <button 
                  onClick={() => { playClick(); setCurrentStep(prev => prev - 1); }}
                  className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                   <ChevronLeft size={20} />
                 </button>
               )}
            </div>

            <div className="space-y-4">
              <p className="text-lg font-medium opacity-60 italic">{currentStepData.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {currentStepData.options.map((opt) => (
                   <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className="p-6 bg-white/5 border border-white/5 rounded-3xl text-left flex items-center gap-4 hover:border-accent hover:bg-accent/5 transition-all group"
                   >
                      <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
                        {opt.icon}
                      </div>
                      <span className="font-bold tracking-tight uppercase text-sm">{opt.label}</span>
                   </button>
                 ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-8"
          >
             <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={48} className="text-accent" />
             </div>
             <div className="space-y-4">
                <h3 className="text-4xl font-display font-medium tracking-tighter uppercase italic">Success!</h3>
                <p className="text-[var(--text-secondary)] font-medium max-w-sm mx-auto">
                  Arizangiz muvaffaqiyatli qabul qilindi. 24 soat ichida mutaxassislarimiz siz bilan bog'lanishadi.
                </p>
             </div>
             <button 
              onClick={() => setSubmitted(false) || setCurrentStep(0)}
              className="text-xs font-black uppercase tracking-widest border-b border-accent pb-1"
             >
                Start New Request
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
