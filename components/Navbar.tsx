import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface NavItem {
  name: string;
  url: string;
  icon: string; // Material Symbol name
}

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const LogoIcon = () => (
  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
    <span className="material-symbols-outlined text-primary font-bold filled-icon !text-xl sm:!text-2xl">home_work</span>
  </div>
);

const navItems: NavItem[] = [
  { name: "Home", url: "#hero", icon: "home" },
  { name: "Features", url: "#features", icon: "widgets" },
  { name: "Pricing", url: "#pricing", icon: "payments" },
  { name: "About", url: "#advanced", icon: "info" },
  { name: "Contact", url: "#contact", icon: "mail" },
];

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleTheme }) => {
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      const sections = navItems.map(item => item.url.replace('#', '')).filter(Boolean);
      let currentSection = "";
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is approximately in the middle of the viewport
          if (rect.top <= 300 && rect.bottom >= 300) {
            currentSection = sectionId;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveTab("Home");
      } else if (currentSection) {
        const item = navItems.find(i => i.url === `#${currentSection}`);
        if (item) setActiveTab(item.name);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, name: string) => {
    e.preventDefault();
    setActiveTab(name);
    
    const targetId = url.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (url === '#hero' || url === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 pt-2 sm:pt-4 px-2 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 items-center h-16">
        
        {/* Left: Logo */}
        <motion.a 
          href="#"
          onClick={(e) => handleNavClick(e, '#hero', 'Home')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-3 group pointer-events-auto w-fit"
        >
          <LogoIcon />
          <div className="flex flex-col leading-none">
            <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Smart<span className="text-primary">HR</span>
            </span>
            <span className="text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Solutions 4U
            </span>
          </div>
        </motion.a>

        {/* Center: Floating Nav Pill (Desktop Only) */}
        <nav className="hidden lg:flex justify-center pointer-events-auto">
          <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 backdrop-blur-xl py-1 px-1 rounded-full shadow-lg">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={(e) => handleNavClick(e, item.url, item.name)}
                  className={cn(
                    "relative cursor-pointer text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2",
                    isActive 
                      ? "text-primary dark:text-white" 
                      : "text-slate-500 dark:text-slate-400 hover:text-primary"
                  )}
                >
                  <span className={cn("material-symbols-outlined !text-[18px]", isActive && "filled-icon")}>{item.icon}</span>
                  <span>{item.name}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-primary/5 dark:bg-primary/20 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary rounded-full">
                        <div className="absolute w-12 h-6 bg-primary/30 rounded-full blur-md -top-3 -left-2" />
                      </div>
                    </motion.div>
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Right: Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-end gap-1 sm:gap-4 pointer-events-auto"
        >
          {/* Theme Toggle Button */}
          <button 
            onClick={onToggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-slate-500 hover:text-primary transition-all bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
            aria-label="Toggle Theme"
          >
            <span className="material-symbols-outlined !text-[18px] sm:!text-[20px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button className="hidden sm:block px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
            Login
          </button>
          
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact', 'Contact')}
            className="px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-black text-white bg-primary hover:bg-primary-dark rounded-full shadow-lg shadow-primary/30 transition-all transform active:scale-95 whitespace-nowrap"
          >
            Get Started
          </a>
        </motion.div>
      </div>

      {/* Mobile Nav Switcher (Floating pill moves to bottom for mobile) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
          <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 backdrop-blur-xl py-1 px-1 rounded-full shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => handleNavClick(e, item.url, item.name)}
                className={cn(
                  "relative cursor-pointer p-3 rounded-full transition-all duration-300",
                  isActive ? "text-primary bg-primary/10" : "text-slate-400"
                )}
              >
                <span className={cn("material-symbols-outlined !text-[20px]", isActive && "filled-icon")}>{item.icon}</span>
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;