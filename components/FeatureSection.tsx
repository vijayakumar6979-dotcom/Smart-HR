
import React from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';
import { cn } from '../lib/utils';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  features: Feature[];
  isDarkTheme?: boolean;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ id, title, subtitle, features, isDarkTheme }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section 
      id={id} 
      className={cn(
        "py-24 transition-colors duration-500 overflow-hidden",
        isDarkTheme 
          ? 'bg-white/40 dark:bg-white/5 backdrop-blur-sm border-y border-slate-100 dark:border-white/5' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">{title}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{subtitle}</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={itemVariants}>
              <SpotlightCard 
                className={cn(
                  "group flex flex-col items-start shadow-sm hover:shadow-2xl transition-all duration-500 h-full",
                  isDarkTheme 
                    ? 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/10' 
                    : 'bg-white dark:bg-slate-900/40 border-slate-100 dark:border-white/10'
                )}
                spotlightColor={isDarkTheme ? "rgba(19, 91, 236, 0.15)" : "rgba(19, 91, 236, 0.1)"}
              >
                <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl transition-colors">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                  {feature.description}
                </p>
                
                <div className="mt-auto pt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Learn More 
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
