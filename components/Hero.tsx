
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { TypewriterLoop } from './TypewriterEffect';
import { DottedSurface } from './DottedSurface';

const chartData = [
  { value: 40 },
  { value: 60 },
  { value: 50 },
  { value: 75 },
  { value: 65 },
  { value: 90 },
];

interface HeroProps {
  isDarkMode?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  const phrases = ["Malaysian Businesses", "Asian Businesses"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-32 bg-transparent">
      {/* Background Animation - Three.js */}
      <DottedSurface isDarkMode={isDarkMode} />
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            x: [0, 40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{
            x: [0, -30, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16"
        >
          {/* Content Container (Left 50%) */}
          <div className="text-center lg:text-left lg:pr-12 xl:pr-16">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-8">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              #1 HR Solution in Malaysia
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start mb-8 gap-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Simplify HR for
              </h1>
              <div className="min-h-[1.2em] flex items-center overflow-visible">
                <TypewriterLoop 
                  phrases={phrases} 
                  textClassName="text-primary dark:text-primary"
                  className="!my-0"
                />
              </div>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Manage Payroll, Leave, Claims, and Attendance in one secure cloud platform specifically compliant with LHDN, KWSP, and PERKESO regulations.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="#pricing" className="group flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-xl shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:scale-95">
                Get Started Free
                <span className="material-symbols-outlined ml-2 text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
              <a href="#contact" className="flex items-center justify-center px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-white bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95">
                <span className="material-symbols-outlined mr-2 text-lg text-primary filled-icon">play_circle</span>
                View Demo
              </a>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-green-500 filled-icon !text-lg">check_circle</span>
                LHDN Compliant
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-green-500 filled-icon !text-lg">check_circle</span>
                KWSP Ready
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-green-500 filled-icon !text-lg">check_circle</span>
                SOCSO/EIS
              </div>
            </motion.div>
          </div>

          {/* Mockups Container (Right 50%) */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="w-full relative lg:translate-x-12"
          >
            <div className="absolute -inset-10 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-3xl opacity-40 dark:opacity-20 pointer-events-none"></div>
            
            {/* Desktop App Mockup */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 backdrop-blur-md z-10 w-full"
            >
              <div className="absolute top-0 w-full h-8 bg-slate-100 dark:bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-200 dark:border-white/10 z-10">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <div className="pt-8 bg-slate-50 dark:bg-transparent min-h-[340px] flex">
                {/* Mini Sidebar */}
                <div className="hidden sm:flex w-12 flex-col items-center py-6 border-r border-slate-200 dark:border-white/10 gap-6 bg-white dark:bg-white/5">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-base">dashboard</span>
                  </div>
                  <span className="material-symbols-outlined text-base text-slate-400">people</span>
                  <span className="material-symbols-outlined text-base text-slate-400">payments</span>
                  <span className="material-symbols-outlined text-base text-slate-400">calendar_month</span>
                </div>
                {/* Main View */}
                <div className="flex-1 p-5">
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">Dashboard</h3>
                      <p className="text-[9px] text-slate-500">Overview</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: 'Employees', value: '124', color: 'text-slate-800 dark:text-white' },
                      { label: 'On Leave', value: '8', color: 'text-orange-500' },
                      { label: 'Pending', value: '12', color: 'text-primary' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white dark:bg-white/5 p-2.5 rounded-lg shadow-sm border border-slate-100 dark:border-white/5 backdrop-blur-sm">
                        <p className="text-[9px] text-slate-500 mb-0.5">{stat.label}</p>
                        <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Chart Block */}
                  <div className="bg-white dark:bg-white/5 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-white/5 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">Payroll Trend</p>
                      <span className="text-[8px] text-green-500 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-full font-bold">LHDN OK</span>
                    </div>
                    <div className="h-20 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                            {chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={index === chartData.length - 1 ? '#135bec' : '#135bec44'} 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile App Mockup (Floating) */}
            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [2, 3, 2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block absolute -bottom-8 -left-4 lg:-left-10 z-20 w-[140px] lg:w-[160px] rounded-[2rem] border-[6px] border-slate-800 bg-slate-800 overflow-hidden shadow-2xl"
            >
              <div className="relative bg-white dark:bg-slate-900 h-[280px] lg:h-[320px] w-full overflow-hidden flex flex-col">
                <div className="bg-primary p-3 pb-6 text-white relative">
                  <div className="flex justify-between items-center mb-3">
                    <span className="material-symbols-outlined text-[10px]">menu</span>
                    <span className="material-symbols-outlined text-[10px]">notifications</span>
                  </div>
                  <h3 className="text-[11px] font-semibold">Hi, Vijay</h3>
                  <p className="text-[8px] opacity-80 uppercase tracking-wider font-medium">Software Engineer</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 flex-1 rounded-t-2xl -mt-4 relative px-2.5 pt-5">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: 'calendar_month', label: 'Leave', color: 'text-primary' },
                      { icon: 'receipt_long', label: 'Claims', color: 'text-orange-500' },
                      { icon: 'payments', label: 'Payslip', color: 'text-green-500' },
                      { icon: 'schedule', label: 'Clock In', color: 'text-blue-500' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800 p-1.5 rounded-lg shadow-sm flex flex-col items-center justify-center gap-1 aspect-square transition-transform hover:scale-95">
                        <span className={`material-symbols-outlined ${item.color} text-base`}>{item.icon}</span>
                        <span className="text-[7px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 bg-white dark:bg-slate-800 rounded-lg p-1.5 border border-slate-100 dark:border-slate-700 shadow-inner">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                      <p className="text-[7px] text-slate-500 font-bold uppercase">Clocked In</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notification Badge */}
            <motion.div 
              animate={{ 
                y: [0, -8, 0],
                x: [0, 4, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -right-4 lg:-right-6 bg-white dark:bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-slate-100 dark:border-white/10 z-30 pointer-events-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined text-lg filled-icon">payments</span>
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Payroll Ready</p>
                  <p className="text-xs font-black text-slate-900 dark:text-white">RM 45,200.00</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
