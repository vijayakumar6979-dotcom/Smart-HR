
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import FeatureSection from './components/FeatureSection';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CORE_FEATURES, ADVANCED_FEATURES } from './constants';
import { cn } from './lib/utils';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return false;
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-700 relative",
      isDarkMode 
        ? "bg-slate-950 text-white" 
        : "bg-background-light text-slate-900"
    )}>
      {/* Global Background Layer (Persistent for both themes) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Main Radial Base with theme-aware colors */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isDarkMode 
            ? "bg-[radial-gradient(circle_at_50%_0%,_#135bec22_0%,_transparent_50%),radial-gradient(circle_at_100%_100%,_#6366f111_0%,_transparent_50%)]"
            : "bg-[radial-gradient(circle_at_50%_0%,_#135bec15_0%,_transparent_60%),radial-gradient(circle_at_100%_100%,_#6366f108_0%,_transparent_60%)]"
        )} />
        
        {/* Animated Mesh Blobs with theme-aware opacities */}
        <div className={cn(
          "absolute top-[20%] -left-[10%] w-[60%] h-[40%] blur-[120px] rounded-full animate-pulse transition-all duration-1000",
          isDarkMode ? "bg-primary/5" : "bg-primary/10"
        )} />
        <div className={cn(
          "absolute bottom-[10%] -right-[5%] w-[40%] h-[30%] blur-[100px] rounded-full transition-all duration-1000",
          isDarkMode ? "bg-purple-500/5" : "bg-purple-500/10"
        )} />
      </div>

      <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      
      <main className="relative z-10">
        <Hero isDarkMode={isDarkMode} />
        <TrustBar />
        <FeatureSection 
          id="features"
          title="Your First Steps: Understanding Core HR Pillars"
          subtitle="Master the essentials of workforce management with tools designed for accuracy and compliance."
          features={CORE_FEATURES}
        />
        <FeatureSection 
          id="advanced"
          title="Advancing Your Skills: Nurturing Your Workforce"
          subtitle="Go beyond the basics with tools designed to develop talent and streamline operations."
          features={ADVANCED_FEATURES}
          isDarkTheme={true}
        />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
