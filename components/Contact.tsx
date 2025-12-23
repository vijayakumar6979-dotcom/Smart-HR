
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden transition-colors duration-500" id="contact">
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 -skew-y-3 origin-top-left transform scale-110 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Ready to Modernize Your HR?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              Get in touch with our team for a personalized demo or if you have any questions about compliance with local regulations.
            </p>
            
            <div className="space-y-8">
              {[
                { 
                  icon: 'location_on', 
                  title: 'Visit Us', 
                  content: 'No 10, Lorong Eco Meadows, Juru, 14100 Simpang Ampat, Peneng' 
                },
                { 
                  icon: 'mail', 
                  title: 'Email Us', 
                  content: 'support@smarthr4u.com.my' 
                },
                { 
                  icon: 'call', 
                  title: 'Call Us', 
                  content: '+60 3-1234 5678' 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 whitespace-pre-line">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white dark:bg-slate-900/60 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 transition-colors duration-500"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">First Name</label>
                  <input 
                    type="text" 
                    placeholder="Vijay"
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="A"
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Company Email</label>
                <input 
                  type="email" 
                  placeholder="Vijay@macrosys.com"
                  className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about your requirements..."
                  className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-xl shadow-primary/30 transform active:scale-95"
                onClick={(e) => e.preventDefault()}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
