import { motion } from "motion/react";
import { 
  Send, 
  ArrowRight, 
  Instagram, 
  Youtube, 
  Github, 
  CheckCircle2,
  Mail,
  Phone
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Contact() {
  return (
    <div className="pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
             <div className="badge-it">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" /> Aloqa
             </div>
             <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-[0.8]">
               Loyihangizni <br /> muhokama <br /> qilamiz<span className="text-accent">.</span>
             </h1>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-8 glass rounded-[2.5rem] border-white/5 group hover:border-accent/40 transition-all">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                <Send size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold tracking-widest text-white/20">Telegram</p>
                <a href="https://t.me/justyaviz_life" className="text-2xl font-display font-bold">@justyaviz_life</a>
              </div>
            </div>

            <div className="flex items-center gap-6 p-8 glass rounded-[2.5rem] border-white/5 group hover:border-accent/40 transition-all">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                <Mail size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold tracking-widest text-white/20">Email</p>
                <a href="mailto:yahyobektohirjonov0@gmail.com" className="text-2xl font-display font-bold text-sm">yahyobektohirjonov0@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-6 p-8 glass rounded-[2.5rem] border-white/5 group hover:border-accent/40 transition-all">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                <Phone size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold tracking-widest text-white/20">Telefon</p>
                <a href="tel:+998998939000" className="text-2xl font-display font-bold">+998 99 893 90 00</a>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-10 md:p-16 rounded-[4rem] border-white/5 space-y-12">
           <h3 className="text-4xl font-display font-black tracking-tight">Xabar yuboring</h3>
           <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                 <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-4">Ismingiz</label>
                 <input 
                   type="text" 
                   className="w-full bg-white/5 border border-white/5 rounded-3xl p-6 focus:border-accent/40 outline-none transition-all"
                   placeholder="Yahyobek..."
                 />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-4">Xabaringiz</label>
                 <textarea 
                   rows={4}
                   className="w-full bg-white/5 border border-white/5 rounded-3xl p-6 focus:border-accent/40 outline-none transition-all resize-none"
                   placeholder="Loyihangiz haqida batafsil..."
                 />
              </div>
              <button className="w-full py-6 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-4 group">
                Xabarni yuborish <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
           </form>

           <div className="space-y-6 pt-10 border-t border-white/5">
              <p className="text-xs font-bold uppercase tracking-widest text-white/20">Ijtimoiy tarmoqlar</p>
              <div className="flex gap-8">
                {[
                  { icon: <Instagram size={20} />, url: "https://instagram.com/just_yaviz" },
                  { icon: <Youtube size={20} />, url: "https://youtube.com/@just_yaviz" },
                  { icon: <Github size={20} />, url: "https://github.com/justyaviz" }
                ].map((social, i) => (
                  <a key={i} href={social.url} className="text-white/40 hover:text-white transition-colors">
                    {social.icon}
                  </a>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
