import { motion } from "motion/react";
import { useState } from "react";
import { 
  Send, 
  ArrowRight, 
  Instagram, 
  Youtube, 
  Github, 
  Mail,
  Phone,
  MapPin,
  ChevronDown
} from "lucide-react";
import { EditableText } from "../components/EditableText";
import { useAppContext } from "../context/AppContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Contact() {
  const { t, theme } = useAppContext();
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.content) return;
    setStatus("loading");
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      setStatus("success");
      setFormData({ name: "", email: "", content: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* HEADER SECTION */}
        <div className="text-center space-y-8">
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.9] max-w-5xl mx-auto"
           >
             <EditableText contentKey="contactTitle" defaultText={t("contact.hero.title")} as="span" />
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-[var(--text-secondary)] max-w-2xl mx-auto font-medium text-lg leading-relaxed"
           >
             <EditableText contentKey="contactSubtitle" defaultText={t("contact.hero.desc")} type="textarea" />
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FORM COLUMN */}
          <motion.div 
            {...fadeIn}
            className="lg:col-span-8 glass p-8 md:p-14 rounded-[3.5rem] border-[var(--border-primary)] space-y-12 shadow-sm"
          >
            <form className="space-y-10" onSubmit={handleSubmit}>
               {status === "success" && (
                 <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl font-medium text-center">
                   Xabaringiz muvaffaqiyatli yuborildi!
                 </div>
               )}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <label className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] ml-2">{t("contact.form.firstname")}*</label>
                     <input 
                       type="text" 
                       value={formData.name}
                       onChange={e => setFormData({...formData, name: e.target.value})}
                       required
                       className="w-full bg-accent/5 border border-[var(--border-primary)] rounded-2xl p-6 focus:border-accent outline-none transition-all placeholder:text-[var(--text-secondary)]/30 text-[var(--text-primary)]"

                       placeholder="..."
                     />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] ml-2">{t("contact.form.lastname")}*</label>
                     <input 
                       type="text" 
                       className="w-full bg-accent/5 border border-[var(--border-primary)] rounded-2xl p-6 focus:border-accent outline-none transition-all placeholder:text-[var(--text-secondary)]/30 text-[var(--text-primary)]"
                       placeholder="..."
                     />
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] ml-2">{t("contact.form.contactmethod")}*</label>
                  <input 
                    type="text" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full bg-accent/5 border border-[var(--border-primary)] rounded-2xl p-6 focus:border-accent outline-none transition-all placeholder:text-[var(--text-secondary)]/30 text-[var(--text-primary)]"
                    placeholder="dizayn.13031@gmail.com yoki raqam"
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <label className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] ml-2">{t("contact.form.location")}*</label>
                     <div className="relative">
                        <select className="w-full bg-accent/5 border border-[var(--border-primary)] rounded-2xl p-6 focus:border-accent outline-none transition-all appearance-none cursor-pointer text-[var(--text-secondary)]">
                           <option>{t("contact.form.country.select")}</option>
                           <option>{t("contact.form.country.uz")}</option>
                           <option>{t("contact.form.country.other")}</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] ml-2">{t("contact.form.category")}*</label>
                     <div className="relative">
                        <select className="w-full bg-accent/5 border border-[var(--border-primary)] rounded-2xl p-6 focus:border-accent outline-none transition-all appearance-none cursor-pointer text-[var(--text-secondary)]">
                           <option>{t("contact.form.category.select")}</option>
                           <option>{t("contact.form.category.marketing")}</option>
                           <option>{t("contact.form.category.website")}</option>
                           <option>{t("contact.form.category.branding")}</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" />
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] ml-2">{t("contact.form.message")}*</label>
                  <textarea 
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    required
                    rows={6}
                    className="w-full bg-accent/5 border border-[var(--border-primary)] rounded-3xl p-6 focus:border-accent outline-none transition-all resize-none placeholder:text-[var(--text-secondary)]/30 text-[var(--text-primary)]"
                    placeholder={t("contact.form.placeholder")}
                  />
               </div>

               <button type="submit" disabled={status === "loading"} className="px-12 py-6 bg-accent text-white font-black uppercase tracking-widest text-xs rounded-full hover:shadow-xl transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50">
                 {status === "loading" ? "Yuborilmoqda..." : t("contact.form.submit")} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </form>
          </motion.div>

          {/* SIDEBAR COLUMN */}
          <div className="lg:col-span-4 space-y-6">
             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.1 }}
               className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] space-y-6 group hover:bg-accent/5 transition-all shadow-sm"
             >
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Mail size={18} className="text-accent" />
                      <span className="text-xs font-black uppercase tracking-widest">{t("contact.info.email")}</span>
                   </div>
                   <div className="px-2 py-0.5 bg-accent rounded-md text-[8px] font-black uppercase tracking-widest text-white">24/7</div>
                </div>
                <p className="text-[var(--text-secondary)] font-medium">yahyobektohirjonov0@gmail.com</p>
             </motion.div>

             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.2 }}
               className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] space-y-6 group hover:bg-accent/5 transition-all shadow-sm"
             >
                <div className="flex items-center gap-3">
                   <Phone size={18} className="text-accent" />
                   <span className="text-xs font-black uppercase tracking-widest">{t("contact.info.phone")}</span>
                </div>
                <p className="text-[var(--text-secondary)] font-medium">+998 93 194 92 00</p>
             </motion.div>

             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.3 }}
               className="glass p-8 rounded-[2.5rem] border-[var(--border-primary)] space-y-6 group hover:bg-accent/5 transition-all shadow-sm"
             >
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-accent" />
                      <span className="text-xs font-black uppercase tracking-widest">{t("contact.info.address")}</span>
                   </div>
                   <div className="px-2 py-0.5 bg-accent rounded-md text-[8px] font-black uppercase tracking-widest text-white">Remote</div>
                </div>
                <p className="text-[var(--text-secondary)] font-medium font-display translate-y-2">{t("contact.info.address.val")}</p>
             </motion.div>

             <div className="pt-10 space-y-6 px-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-50">{t("contact.info.social")}</p>
                <div className="flex gap-6">
                   {[
                     { icon: <Instagram size={20} />, url: "https://instagram.com/just_yaviz" },
                     { icon: <Youtube size={20} />, url: "https://youtube.com/@just_yaviz" },
                     { icon: <Github size={20} />, url: "https://github.com/justyaviz" }
                   ].map((social, i) => (
                     <a key={i} href={social.url} target="_blank" className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-[var(--text-secondary)] hover:text-accent hover:bg-accent/10 transition-all border border-[var(--border-primary)]">
                       {social.icon}
                     </a>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
