
import React from 'react';
import { motion } from 'framer-motion';

const TrustBar: React.FC = () => {
  const partners = [
    { icon: 'account_balance', name: 'LHDN' },
    { icon: 'savings', name: 'KWSP (EPF)' },
    { icon: 'health_and_safety', name: 'PERKESO' },
    { icon: 'work', name: 'HRD Corp' }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="border-y border-slate-200 dark:border-white/10 bg-white/10 dark:bg-transparent py-8 transition-colors duration-500 backdrop-blur-[2px]"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs font-semibold text-slate-500 mb-6 uppercase tracking-widest">Trusted by 500+ Malaysian SMEs & Compliant With</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale transition-all hover:grayscale-0 hover:opacity-100">
          {partners.map((partner, i) => (
            <div key={i} className="flex items-center gap-2 text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200">
              <span className="material-symbols-outlined text-primary">{partner.icon}</span> 
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TrustBar;
