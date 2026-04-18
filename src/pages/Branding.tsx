import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { EditableText } from "../components/EditableText";
import { db } from "../lib/firebase";
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

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "siteContent", "main"), (d) => {
      if (d.exists()) setContent(d.data());
    });
    return () => unsub();
  }, []);

  return (
    <div className="pt-32 space-y-40">
      {/* HERO SECTION */}
      <section className="px-6 text-center space-y-12 pb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-[8vw] font-satoshi font-medium tracking-tighter leading-[0.85] max-w-6xl mx-auto"
        >
          <EditableText contentKey="brandingTitle" defaultText="Sifatli dizayn — bu tasodif emas, tizim." as="span" />
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-white/40 text-[16px] leading-relaxed font-medium"
        >
          <EditableText contentKey="brandingDesc" defaultText="Biznesingizga mos professional dizayn va aniq boshqaruv — natija kafolatli. Har bir detal ustida tizimli ishlaymiz." type="textarea" />
        </motion.p>
      </section>

      {/* CARDS SECTION */}
      <section className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { key: "brandingCard1", title: "Marketing Strategiyasi", desc: "Biznesingizni rivojlantirish uchun aniq va natijaga yo'naltirilgan SMM strategiyalarini tuzamiz." },
               { key: "brandingCard2", title: "IT Yechimlar", desc: "Veb-saytlar, admin panellar va avtomatlashtirilgan tizimlar orqali biznesingizni raqamlashtiramiz." },
               { key: "brandingCard3", title: "Kreativ Kontent", desc: "Mijozlarni jalb qiluvchi Reels, Shorts va professional grafik dizayn xizmatlarini taqdim etamiz." }
             ].map((card, i) => (
               <motion.div
                 key={i}
                 {...fadeIn}
                 transition={{ delay: i * 0.1 }}
                 className="glass p-12 rounded-[3.5rem] border-white/5 space-y-8 hover:bg-white/[0.03] transition-all group"
               >
                 <h4 className="text-3xl font-display font-black leading-tight">
                    <EditableText contentKey={`${card.key}Title`} defaultText={card.title} as="span" />
                 </h4>
                 <div className="text-white/40 text-sm leading-relaxed font-medium">
                    <EditableText contentKey={`${card.key}Desc`} defaultText={card.desc} type="textarea" />
                 </div>
               </motion.div>
             ))}
          </div>
      </section>

      {/* LOGO DESIGN SECTION */}
      <section className="px-6 max-w-7xl mx-auto">
         <div className="glass p-12 md:p-20 rounded-[4rem] border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl md:text-6xl font-display font-black leading-none tracking-tighter">
                 Brendingiz uchun logolar
               </h2>
               <p className="text-white/40 leading-relaxed font-medium">
                 Bizning professional mutaxassis dizaynerlarimiz bilan bevosita ishlang. Yangilanishlarni oling, fikr-mulohazalaringizni baham ko'ring va har qachongidan ham tezroq ishga tushiring. Biz silliq va tezkor aloqani ta'minlaymiz.
               </p>
               <button className="px-10 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-all">Boshlaymiz</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[...Array(8)].map((_, i) => (
                 <div key={i} className="aspect-square bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:border-white/20">
                   <Sparkles className="text-white/20" />
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ADVANTAGES COMPARISON */}
      <section className="px-6 max-w-7xl mx-auto space-y-20">
         <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-satoshi font-medium tracking-tighter">Nega biz bilan ishlash kerak?</h2>
            <p className="text-white/40 max-w-lg mx-auto">Biznesingiz uchun eng to'g'ri tanlovni qiling.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-[4rem] overflow-hidden border border-white/10">
            {[
              {
                okTile: "Tajriba va Mukammallik",
                okDesc: "Ko‘p yillik tajribaga ega IT va marketing jamoasi — yuqori sifat, innovatsion yondashuv va mukammal natija kafolati.",
                badTitle: "Tajriba Yetishmasligi",
                badDesc: "Havaskor ijrochi — tajriba yetishmasligi natijasida IT va marketing loyihalarida nomuvofiqlik, xatoliklar va kutilgan natijaga erishmaslik xavfi tug‘iladi"
              },
              {
                okTile: "Zamonaviy Yondashuv",
                okDesc: "Kelajakka mos yechimlar — biznesingiz bilan birga o‘suvchi, trendlarni ilgari ko‘ra oladigan, moslashuvchan va zamonaviy IT hamda marketing xizmatlari",
                badTitle: "Eskirgan G‘oyalar",
                badDesc: "Muddati o‘tgan yechimlar — zamonaviy brend imidjingizga mos kelmaydigan, trenddan orqada qolgan IT va marketing yondashuvlari."
              },
              {
                okTile: "Mijoz Markazida Hamkorlik",
                okDesc: "Sizning g‘oyangiz asosida ishlash — biz sizning maqsadlaringizni markazga qo‘yib, aniq strategiya va kreativ yechimlar bilan natijaga yetamiz",
                badTitle: "Aloqaning Yo‘qligi",
                badDesc: "Muloqot yetishmasligi va fikr almashinuvi sustligi — noto‘g‘ri qarorlar, yo‘nalishdan chetlanish va kutilmagan natijalarga olib keladi."
              },
              {
                okTile: "Aniq Rejaga Asoslangan Nazorat",
                okDesc: "Har bir bosqichda doimiy yangilanishlar, aniq vaqt rejalari va o‘z vaqtida topshiriladigan ishlar — siz har doim jarayon markazidasiz.",
                badTitle: "Tartibsiz Ish Yondashuvi",
                badDesc: "Vaqtni to‘g‘ri rejalamaslik, oxirgi daqiqadagi o‘zgarishlar va muloqotdagi sustlik natijasida sifatsiz mahsulotga olib keladi."
              }
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 bg-black">
                 <div className="p-10 md:p-14 space-y-6 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.02]">
                    <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                       <Check size={20} />
                    </div>
                    <h4 className="text-2xl font-satoshi font-bold">{item.okTile}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{item.okDesc}</p>
                 </div>
                 <div className="p-10 md:p-14 space-y-6">
                    <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                       <X size={20} />
                    </div>
                    <h4 className="text-2xl font-satoshi font-bold text-white/60">{item.badTitle}</h4>
                    <p className="text-white/30 text-sm leading-relaxed">{item.badDesc}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* WHY US */}
      <section className="py-40 px-6 border-t border-white/5 text-center space-y-24">
         <div className="space-y-8">
            <h2 className="text-5xl md:text-8xl font-satoshi font-medium tracking-tighter leading-none">Nega bizni tanlaysiz?</h2>
            <p className="text-white/40 max-w-xl mx-auto font-medium tracking-tight leading-relaxed">Biz har bir loyihaga individual yondashib, uning rivojlanishi uchun barcha zamonaviy marketing va IT vositalarini birlashtiramiz.</p>
         </div>

         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden md:block" />
            {[
              { title: "Shartnomalar", icon: <Briefcase /> },
              { title: "Konvertatsiyaga qaratilgan", icon: <Target /> },
              { title: "Tezkor dizayn", icon: <Rocket /> }
            ].map((item, i) => (
              <div key={i} className="space-y-8 relative z-10">
                <div className="w-20 h-20 bg-[#000] border border-white/10 rounded-full flex items-center justify-center mx-auto text-accent shadow-[0_0_30px_rgba(255,255,255,0.05)]">
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
