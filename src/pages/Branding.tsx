import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { EditableText } from "../components/EditableText";
import { useAppContext } from "../context/AppContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { 
  CheckCircle2, 
  Sparkles, 
  Target, 
  Rocket, 
  Smartphone, 
  Briefcase,
  ExternalLink,
  Check,
  X
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Branding() {
  const [content, setContent] = useState<any>(null);
  const { t, theme } = useAppContext();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "siteContent", "main"), (d) => {
      if (d.exists()) setContent(d.data());
    });
    return () => unsub();
  }, []);

  return (
    <div className="pt-32 space-y-40">
      {/* HERO SECTION */}
      <section className="px-6 text-center space-y-8 md:space-y-12 pb-10 md:pb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-[8vw] font-satoshi font-medium tracking-tighter leading-[0.9] md:leading-[0.85] max-w-6xl mx-auto"
        >
          <EditableText contentKey="brandingTitle" defaultText={t("branding.hero.title")} as="span" />
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-[var(--text-secondary)] text-[14px] md:text-[16px] leading-relaxed font-medium"
        >
          <EditableText contentKey="brandingDesc" defaultText={t("branding.hero.desc")} type="textarea" />
        </motion.p>
      </section>

      {/* CARDS SECTION */}
      <section className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             {[
               { key: "brandingCard1", title: t("branding.card1.title"), desc: t("branding.card1.desc") },
               { key: "brandingCard2", title: t("branding.card2.title"), desc: t("branding.card2.desc") },
               { key: "brandingCard3", title: t("branding.card3.title"), desc: t("branding.card3.desc") }
             ].map((card, i) => (
                <motion.div
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="ui-magic-card group"
                >
                  <div className="p-8 md:p-12 space-y-6 md:space-y-8 h-full relative z-10 transition-all">
                     <h4 className="text-xl md:text-3xl font-display font-bold leading-tight uppercase tracking-tight">
                        <EditableText contentKey={`${card.key}Title`} defaultText={card.title} as="span" />
                     </h4>
                     <div className="text-[var(--text-secondary)] text-[13px] md:text-sm leading-relaxed font-medium">
                        <EditableText contentKey={`${card.key}Desc`} defaultText={card.desc} type="textarea" />
                     </div>
                  </div>
                </motion.div>
             ))}
          </div>
      </section>

      {/* LOGO DESIGN SECTION */}
      <section className="px-6 max-w-7xl mx-auto">
         <div className="glass p-8 md:p-20 rounded-3xl md:rounded-[4rem] border-[var(--border-primary)] grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center shadow-lg">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
               <h2 className="text-3xl md:text-6xl font-display font-black leading-none tracking-tighter">
                 {t("branding.logo.title")}
               </h2>
               <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-medium">
                 {t("branding.logo.desc")}
               </p>
               <button className="ui-btn-galaxy w-full md:w-auto">
                 <div className="ui-btn-galaxy-inner px-10 py-4 uppercase text-xs tracking-widest w-full justify-center">
                   {t("branding.logo.cta")}
                 </div>
               </button>
            </div>
            <div className="grid grid-cols-4 gap-3 md:gap-4">
               {[
                 "https://static4.tgstat.ru/channels/_0/58/5874f696205edf0c7aa55152da39921a.jpg",
                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLfkcYEjWfYZIpWvZ7fLMcCVxfVZQcXAZ3RQ&s",
                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwrLEewH9Kw14lXc8nVXi2bIPilJXbDS1zg&s",
                 "https://play-lh.googleusercontent.com/7hUsDaIdSaYwgWXQosQZGuOpQ8RLhp8Iw-bSKzNIxocMqw5l-2ZysdbGdyllKkQIOw",
                 "https://assets.nicepagecdn.com/bc13c16f/6522583/images/Untitled-1.png",
                 "https://taplink.st/a/5/1/6/f/99552c.jpg?1",
                 "https://proud-cyan-whxxiapwah.edgeone.app/8586B6B0-80CD-45D5-8121-D8BB132DDF0B.jpeg",
                 "https://picsum.photos/seed/brand8/200/200"
               ].map((logo, i) => (
                 <div key={i} className="aspect-square bg-accent/5 rounded-2xl md:rounded-3xl border border-[var(--border-primary)] overflow-hidden flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:border-accent">
                   <img src={logo} alt={`Logo ${i}`} className="w-full h-full object-cover p-2" referrerPolicy="no-referrer" />
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ADVANTAGES COMPARISON */}
      <section className="px-6 max-w-7xl mx-auto space-y-12 md:space-y-20">
         <div className="text-center space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-6xl font-satoshi font-medium tracking-tighter">{t("branding.why.title")}</h2>
            <p className="text-[var(--text-secondary)] text-[14px] md:text-base max-w-lg mx-auto">{t("branding.why.subtitle")}</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-primary)] rounded-3xl md:rounded-[4rem] overflow-hidden border border-[var(--border-primary)] shadow-2xl">
            {[
              {
                okTile: t("flow.1.title"),
                okDesc: t("flow.1.desc"),
                badTitle: "Noma'lum yo'nalish",
                badDesc: "Aniq reja va tahlilsiz ish boshlash."
              },
              {
                okTile: "Mijoz Markazida",
                okDesc: "Sizning g‘oyangiz asosida ishlash — biz sizning maqsadlaringizni markazga qo‘yib, aniq strategiya va kreativ yechimlar bilan natijaga yetamiz.",
                badTitle: "Aloqaning Yo‘qligi",
                badDesc: "Muloqot yetishmasligi va fikr almashinuvi sustligi — noto‘g‘ri qarorlar va kutilmagan natijalarga olib keladi."
              },
              {
                okTile: "Aniq Nazorat",
                okDesc: "Har bir bosqichda doimiy yangilanishlar, aniq vaqt rejalari va o‘z vaqtida topshiriladigan ishlar.",
                badTitle: "Tartibsiz Ish",
                badDesc: "Vaqtni to‘g‘ri rejalamaslik, oxirgi daqiqadagi o‘zgarishlar va muloqotdagi sustlik natijasida sifatsiz mahsulotlar."
              },
              {
                okTile: "Zamonaviy Yondashuv",
                okDesc: "Kelajakka mos yechimlar — biznesingiz bilan birga o‘suvchi, moslashuvchan va zamonaviy IT hamda marketing xizmatlari.",
                badTitle: "Eskirgan G‘oyalar",
                badDesc: "Muddati o‘tgan yechimlar — zamonaviy brend imidjingizga mos kelmaydigan, trenddan orqada qolgan yondashuvlar."
              }
            ].map((item, i) => (
              <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 ${theme === 'dark' ? 'bg-black/40' : 'bg-white/80'} backdrop-blur-3xl`}>
                 <div className="p-8 md:p-14 space-y-4 md:space-y-6 border-b lg:border-b-0 lg:border-r border-[var(--border-primary)] bg-accent/5">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                       <Check size={16} className="md:size-5" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-satoshi font-bold leading-tight">{item.okTile}</h4>
                    <p className="text-[var(--text-secondary)] text-[13px] md:text-sm leading-relaxed">{item.okDesc}</p>
                 </div>
                 <div className="p-8 md:p-14 space-y-4 md:space-y-6">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                       <X size={16} className="md:size-5" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-satoshi font-bold text-[var(--text-secondary)] leading-tight">{item.badTitle}</h4>
                    <p className="text-[var(--text-secondary)] opacity-50 text-[13px] md:text-sm leading-relaxed">{item.badDesc}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* WHY US */}
      <section className="py-40 px-6 border-t border-[var(--border-primary)] text-center space-y-24">
         <div className="space-y-8">
            <h2 className="text-5xl md:text-8xl font-satoshi font-medium tracking-tighter leading-none">{t("branding.choosetitle")}</h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto font-medium tracking-tight leading-relaxed">{t("branding.choosedesc")}</p>
         </div>

         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-[var(--border-primary)] hidden md:block" />
            {[
              { title: t("branding.items.contracts"), icon: <Briefcase /> },
              { title: t("branding.items.conv"), icon: <Target /> },
              { title: t("branding.items.fast"), icon: <Rocket /> }
            ].map((item, i) => (
              <div key={i} className="space-y-8 relative z-10">
                <div className={`w-20 h-20 shadow-sm border border-[var(--border-primary)] rounded-full flex items-center justify-center mx-auto text-accent ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
                  {item.icon}
                </div>
                <h4 className="text-xl font-display font-black">{item.title}</h4>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
