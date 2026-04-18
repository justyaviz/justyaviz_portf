import { motion } from "motion/react";
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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Contact() {
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
             <EditableText contentKey="contactTitle" defaultText="Har qanday savol tug'iladimi? Biz shu yerdamiz." as="span" />
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-white/40 max-w-2xl mx-auto font-medium text-lg leading-relaxed"
           >
             <EditableText contentKey="contactSubtitle" defaultText="Savolingiz bormi, yordam kerakmi yoki yangi loyihani boshlashni xohlaysizmi, bizning jamoamiz yordam berish uchun shu yerda." type="textarea" />
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FORM COLUMN */}
          <motion.div 
            {...fadeIn}
            className="lg:col-span-8 glass p-8 md:p-14 rounded-[3.5rem] border-white/5 space-y-12"
          >
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <label className="text-[11px] font-black uppercase tracking-widest text-white ml-2">Ism*</label>
                     <input 
                       type="text" 
                       className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 focus:border-white/20 outline-none transition-all placeholder:text-white/10"
                       placeholder="..."
                     />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[11px] font-black uppercase tracking-widest text-white ml-2">Familiya*</label>
                     <input 
                       type="text" 
                       className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 focus:border-white/20 outline-none transition-all placeholder:text-white/10"
                       placeholder="..."
                     />
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white ml-2">Siz bilan qanday bog'lanishimiz mumkin?*</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 focus:border-white/20 outline-none transition-all placeholder:text-white/10"
                    placeholder="dizayn.13031@gmail.com"
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <label className="text-[11px] font-black uppercase tracking-widest text-white ml-2">Siz qayerdansiz?*</label>
                     <div className="relative">
                        <select className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 focus:border-white/20 outline-none transition-all appearance-none cursor-pointer text-white/40">
                           <option>Mamlakatingizni tanlang...</option>
                           <option>O'zbekiston</option>
                           <option>Boshqa</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[11px] font-black uppercase tracking-widest text-white ml-2">Sizning kompaniyangiz qanday?*</label>
                     <div className="relative">
                        <select className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 focus:border-white/20 outline-none transition-all appearance-none cursor-pointer text-white/40">
                           <option>Kategoriyani tanlang</option>
                           <option>Marketing</option>
                           <option>Web sayt</option>
                           <option>Brending</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white ml-2">Xabar*</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 focus:border-white/20 outline-none transition-all resize-none placeholder:text-white/10"
                    placeholder="Xabaringizni yozing..."
                  />
               </div>

               <button className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-4 group active:scale-95">
                 Xabarni yuborish <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </form>
          </motion.div>

          {/* SIDEBAR COLUMN */}
          <div className="lg:col-span-4 space-y-6">
             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.1 }}
               className="glass p-8 rounded-[2.5rem] border-white/5 space-y-6 group hover:bg-white/[0.03] transition-all"
             >
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Mail size={18} />
                      <span className="text-xs font-black uppercase tracking-widest">Email</span>
                   </div>
                   <div className="px-2 py-0.5 bg-blue-600 rounded-md text-[8px] font-black uppercase tracking-widest">24/7</div>
                </div>
                <p className="text-white/40 font-medium">yahyobektohirjonov0@gmail.com</p>
             </motion.div>

             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.2 }}
               className="glass p-8 rounded-[2.5rem] border-white/5 space-y-6 group hover:bg-white/[0.03] transition-all"
             >
                <div className="flex items-center gap-3">
                   <Phone size={18} />
                   <span className="text-xs font-black uppercase tracking-widest">Phone</span>
                </div>
                <p className="text-white/40 font-medium">+998 93 194 92 00</p>
             </motion.div>

             <motion.div 
               {...fadeIn}
               transition={{ delay: 0.3 }}
               className="glass p-8 rounded-[2.5rem] border-white/5 space-y-6 group hover:bg-white/[0.03] transition-all"
             >
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <MapPin size={18} />
                      <span className="text-xs font-black uppercase tracking-widest">Address</span>
                   </div>
                   <div className="px-2 py-0.5 bg-blue-600 rounded-md text-[8px] font-black uppercase tracking-widest">Remote</div>
                </div>
                <p className="text-white/40 font-medium font-display translate-y-2">Namangan, O'zbekiston</p>
             </motion.div>

             <div className="pt-10 space-y-6 px-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Social Media</p>
                <div className="flex gap-6">
                   {[
                     { icon: <Instagram size={20} />, url: "https://instagram.com/just_yaviz" },
                     { icon: <Youtube size={20} />, url: "https://youtube.com/@just_yaviz" },
                     { icon: <Github size={20} />, url: "https://github.com/justyaviz" }
                   ].map((social, i) => (
                     <a key={i} href={social.url} target="_blank" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
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
