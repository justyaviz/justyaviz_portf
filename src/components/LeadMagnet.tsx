import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, CheckCircle2, FileText, Download, Sparkles } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAppContext } from "../context/AppContext";

export const LeadMagnet = () => {
  const { t } = useAppContext();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "leads"), {
        email,
        type: "smm-system-guide",
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Lead Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-10 md:p-20 rounded-[4rem] border-[var(--border-primary)] relative overflow-hidden group shadow-2xl">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-[11px] font-black uppercase tracking-widest border border-accent/20">
                  <Sparkles size={14} />
                  Free Digital Product
               </div>
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-tight">
                  SMM Tizimi Qurishning <br />
                  <span className="text-accent">5 ta Oltin Qoidasi</span>
               </h2>
               <p className="text-[var(--text-secondary)] text-lg md:text-xl font-medium leading-relaxed italic opacity-80">
                  Biznesingizni avtomatlashtirish va mijozlarni tizimli jalb qilish bo‘yicha Yahyobek'ning shaxsiy qo‘llanmasini bepul yuklab oling.
               </p>
               
               <ul className="space-y-4">
                  {[
                    "Audit va Strategiya tahlili",
                    "Viral kontent yaratish sirlari",
                    "Reklama byudjetini boshqarish",
                    "Sotuv voronkasini sozlash"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold italic opacity-70 group-hover:opacity-100 transition-opacity">
                       <CheckCircle2 size={18} className="text-accent" />
                       {item}
                    </li>
                  ))}
               </ul>
            </div>

            <div className="relative">
               <div className="bg-[var(--bg-primary)] p-10 rounded-[3rem] border border-[var(--border-primary)] shadow-2xl space-y-8 relative overflow-hidden">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                        <FileText size={32} />
                     </div>
                     <div>
                        <h4 className="font-black italic uppercase tracking-tighter">SMM_System_Guide.pdf</h4>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-secondary)]">Size: 4.8MB • Page: 12</p>
                     </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-secondary)] ml-2">Emailingizni yozing</label>
                        <div className="relative">
                           <input 
                             type="email" 
                             required
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             disabled={isSuccess}
                             placeholder="example@mail.com"
                             className="w-full bg-[var(--text-primary)]/5 border border-[var(--border-primary)] rounded-full px-8 py-5 text-sm font-medium focus:outline-none focus:border-accent transition-all pl-14"
                           />
                           <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" size={20} />
                        </div>
                     </div>

                     <button 
                        type="submit"
                        disabled={isSubmitting || isSuccess}
                        className="w-full ui-btn-galaxy group h-16"
                     >
                        <div className="ui-btn-galaxy-inner px-8 justify-center gap-3 w-full">
                           <AnimatePresence mode="wait">
                             {isSuccess ? (
                               <motion.div 
                                 key="success"
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className="flex items-center gap-2"
                               >
                                  <CheckCircle2 size={20} />
                                  YUBORILDI!
                               </motion.div>
                             ) : (
                               <motion.div 
                                 key="submit"
                                 initial={{ opacity: 0, y: -10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className="flex items-center gap-2"
                               >
                                  {isSubmitting ? "YUBORILMOQDA..." : "YUKLAB OLISH"}
                                  <Download size={20} />
                               </motion.div>
                             )}
                           </AnimatePresence>
                        </div>
                     </button>
                  </form>

                  <p className="text-[10px] text-center text-[var(--text-secondary)] font-bold uppercase tracking-widest leading-relaxed">
                     Qo‘llanma emailingizga PDF formatida yuboriladi. <br />
                     Sizning ma’lumotlaringiz xavfsiz.
                  </p>
               </div>
               
               {/* 3D-like card background */}
               <div className="absolute -bottom-6 -right-6 w-full h-full bg-accent/10 -z-10 rounded-[3rem] border border-accent/20 rotate-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
