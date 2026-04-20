import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Phone } from 'lucide-react';
import { useState } from 'react';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: 'Telegram',
      icon: <Send size={20} />,
      link: 'https://t.me/Yahyobek_T',
      color: 'bg-[#229ED9]',
      label: '@Yahyobek_T'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      link: 'https://wa.me/998931949200', 
      color: 'bg-[#25D366]',
      label: '+998 93 194 92 00'
    },
    {
      name: 'Telefon',
      icon: <Phone size={20} />,
      link: 'tel:+998931949200',
      color: 'bg-accent',
      label: '+998 93 194 92 00'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-20 right-0 space-y-3 mb-4 min-w-[200px]">
            {contacts.map((c, i) => (
              <motion.a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/20 transition-all group"
              >
                <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  {c.icon}
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">{c.name}</p>
                  <p className="text-xs font-bold text-white group-hover:text-accent transition-colors">{c.label}</p>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${isOpen ? 'bg-rose-500 rotate-90' : 'bg-accent'}`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingContact;
