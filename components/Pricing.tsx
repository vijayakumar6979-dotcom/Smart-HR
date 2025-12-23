
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRICING_PLANS } from '../constants';
import { PricingPeriod } from '../types';

const Pricing: React.FC = () => {
  const [period, setPeriod] = useState<PricingPeriod>(PricingPeriod.MONTHLY);

  return (
    <section className="py-24 bg-transparent transition-colors duration-500" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Choose the plan that fits your business size.</p>
        </motion.div>

        {/* Pricing Toggle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center gap-4 mb-16"
        >
          <span className={`font-semibold transition-colors ${period === PricingPeriod.MONTHLY ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
          <button 
            onClick={() => setPeriod(prev => prev === PricingPeriod.MONTHLY ? PricingPeriod.YEARLY : PricingPeriod.MONTHLY)}
            className="w-14 h-8 flex items-center bg-primary rounded-full p-1 cursor-pointer transition-colors relative"
            aria-label="Toggle pricing period"
          >
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${period === PricingPeriod.YEARLY ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
          <span className={`font-medium flex items-center gap-2 transition-colors ${period === PricingPeriod.YEARLY ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Yearly 
            <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">Save 20%</span>
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className={`relative flex flex-col p-8 bg-white dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border transition-all duration-300 ${
                plan.isMostPopular 
                  ? 'border-2 border-primary shadow-2xl lg:scale-105 z-10' 
                  : 'border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl'
              }`}
            >
              {plan.isMostPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
              <p className="text-sm text-slate-500 mt-2">{plan.description}</p>
              
              <div className="my-8">
                {plan.monthlyPrice === 0 ? (
                  <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Custom</span>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      RM {period === PricingPeriod.MONTHLY ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-slate-500 text-sm font-medium ml-2">staff/month</span>
                  </div>
                )}
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-green-500 text-xl flex-shrink-0">check</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 px-4 font-bold rounded-xl transition-all active:scale-95 ${
                  plan.isMostPopular 
                    ? 'bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/30' 
                    : 'bg-background-light dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 hover:border-primary text-slate-900 dark:text-white'
                }`}
              >
                {plan.ctaText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
