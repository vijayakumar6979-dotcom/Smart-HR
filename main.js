const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = FramerMotion;
const { BarChart, Bar, ResponsiveContainer, Cell } = Recharts;

// --- UTILITIES ---
const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- CONSTANTS ---
const NAV_ITEMS = [
  { id: 'hero', icon: 'home', label: 'Home' },
  { id: 'features', icon: 'widgets', label: 'Features' },
  { id: 'pricing', icon: 'payments', label: 'Pricing' },
  { id: 'advanced', icon: 'info', label: 'About' },
  { id: 'contact', icon: 'mail', label: 'Contact' }
];

const CORE_FEATURES = [
  { icon: 'payments', title: 'Payroll Precision', description: 'Automated calculations compliant with LHDN, KWSP, and PERKESO tax laws.' },
  { icon: 'calendar_month', title: 'Leave Management', description: 'Apply and approve leave on the go with smart company policy integration.' },
  { icon: 'receipt_long', title: 'Claim Clarity', description: 'Paperless expense claims with instant OCR receipt scanning and tracking.' },
  { icon: 'fingerprint', title: 'Smart Attendance', description: 'GPS-enabled clock-in/out for hybrid and remote teams via mobile app.' }
];

// --- 3D BACKGROUND ---
const DottedSurface = ({ isDarkMode }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 350, 1200);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(AMOUNTX * AMOUNTY * 3);
    const colors = new Float32Array(AMOUNTX * AMOUNTY * 3);
    for (let i = 0, ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        const color = isDarkMode ? 0.2 : 0.85;
        colors[i] = colors[i+1] = colors[i+2] = color;
        i += 3;
      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 4, vertexColors: true, transparent: true, opacity: 0.3 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let count = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      const posArr = geometry.attributes.position.array;
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          posArr[i + 1] = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
          i += 3;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.1;
    };
    animate();
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [isDarkMode]);
  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

// --- NAVBAR COMPONENT ---
const FloatingNavbar = ({ activeId, isDarkMode, onToggleTheme }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-6">
      {/* Branding Header */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white filled-icon !text-2xl">home_work</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase tracking-tighter leading-none">Smart<span className="text-primary">HR</span></span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Malaysia</span>
          </div>
        </div>
        <button 
          type="button"
          onClick={(e) => { e.preventDefault(); onToggleTheme(); }}
          className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-primary transition-all shadow-lg"
        >
          <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
        </button>
      </div>

      {/* Icon Capsule - Matching your screenshot */}
      <nav className="nav-pill bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl rounded-full p-1.5 flex items-center gap-1.5 pointer-events-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav-glow"
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className={cn(
                "material-symbols-outlined !text-[24px]",
                isActive && "filled-icon"
              )}>
                {item.icon}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <DottedSurface isDarkMode={isDarkMode} />
      <FloatingNavbar 
        activeId={activeId} 
        isDarkMode={isDarkMode} 
        onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />
      
      {/* Hero Section */}
      <section id="hero" className="pt-48 pb-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase mb-8 tracking-[0.3em] ring-1 ring-primary/20">
            Designed for SME Success
          </div>
          <h1 className="text-5xl lg:text-8xl font-black leading-[1.05] mb-8 tracking-tighter">
            Smart HR for <br/><span className="text-primary underline decoration-primary/20 underline-offset-8">Growing Teams</span>.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-lg leading-relaxed font-medium">
            Smart HR 4U simplifies the complex world of payroll and compliance for Malaysian businesses.
          </p>
          <div className="flex flex-wrap gap-5">
            <button 
              type="button"
              onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 transform transition active:scale-95 text-xs uppercase tracking-widest"
            >
              Start Free Trial
            </button>
            <button 
              type="button"
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 font-black rounded-2xl transform transition active:scale-95 text-xs uppercase tracking-widest"
            >
              View Features
            </button>
          </div>
          
          <div className="mt-16 flex items-center gap-8 opacity-30 grayscale transition-all duration-700 hover:grayscale-0 hover:opacity-100">
             <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest"><span className="material-symbols-outlined text-primary !text-lg">account_balance</span> LHDN</div>
             <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest"><span className="material-symbols-outlined text-primary !text-lg">savings</span> KWSP</div>
             <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest"><span className="material-symbols-outlined text-primary !text-lg">health_and_safety</span> PERKESO</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
          <div className="bg-white/50 dark:bg-slate-900/50 rounded-[4rem] p-1 border border-white/20 dark:border-white/5 backdrop-blur-3xl shadow-2xl">
            <div className="bg-white dark:bg-slate-900 rounded-[3.8rem] p-10 overflow-hidden relative">
              <div className="flex justify-between items-center mb-10">
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Payroll Trend</span>
                   <span className="text-3xl font-black">RM 42,500.00</span>
                 </div>
                 <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined filled-icon">trending_up</span>
                 </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{v:40},{v:70},{v:55},{v:90},{v:65},{v:80},{v:50}]}>
                    <Bar dataKey="v" fill="#135bec" radius={[12,12,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4">
                 <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Staff Count</p>
                    <p className="text-xl font-black">128</p>
                 </div>
                 <div className="p-5 bg-green-500/5 rounded-3xl border border-green-500/10">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Compliance</p>
                    <p className="text-xl font-black text-green-500">100%</p>
                 </div>
              </div>
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4 border border-slate-100 dark:border-white/10"
          >
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white"><span className="material-symbols-outlined filled-icon !text-xl">verified</span></div>
            <span className="font-black text-xs uppercase tracking-widest">LHDN Ready</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">The Core <span className="text-primary">HR Pillars</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Everything you need to manage a modern Malaysian workforce.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {CORE_FEATURES.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3.5rem] bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-primary transition-all backdrop-blur-xl group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">{f.icon}</span>
              </div>
              <h3 className="text-2xl font-black mb-4">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">Simple RM <span className="text-primary">Pricing</span></h2>
          <p className="text-slate-500 text-lg">Choose a plan that scales with your growth.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { name: 'Starter', price: '50', features: ['Up to 10 Employees', 'Basic Payroll', 'Mobile Access'] },
            { name: 'Growth', price: '150', features: ['Up to 50 Employees', 'AI Claims Processing', 'Full Compliance'], popular: true },
            { name: 'Enterprise', price: 'Custom', features: ['Unlimited Employees', 'API Integration', 'Priority Support'] }
          ].map((plan, i) => (
            <div key={i} className={cn(
              "p-12 rounded-[4rem] border transition-all flex flex-col relative overflow-hidden",
              plan.popular 
                ? "bg-slate-900 text-white border-primary shadow-2xl scale-105 z-10" 
                : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 backdrop-blur-xl"
            )}>
              {plan.popular && <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest">Best Choice</div>}
              <h3 className="text-2xl font-black mb-2 tracking-tight">{plan.name}</h3>
              <div className="text-5xl font-black my-8 tracking-tighter">
                {plan.price !== 'Custom' && 'RM'} {plan.price}
                {plan.price !== 'Custom' && <span className="text-sm opacity-50 font-normal"> /mo</span>}
              </div>
              <ul className="space-y-6 mb-12 flex-grow">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-sm font-bold opacity-80 uppercase tracking-widest">
                    <span className="material-symbols-outlined text-green-500 !text-xl">check_circle</span> {feat}
                  </li>
                ))}
              </ul>
              <button type="button" className={cn(
                "w-full py-5 rounded-2xl font-black transition active:scale-95 uppercase tracking-widest text-[10px]",
                plan.popular ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800"
              )}>Select Plan</button>
            </div>
          ))}
        </div>
      </section>

      {/* About / Advanced */}
      <section id="advanced" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="bg-primary text-white rounded-[5rem] p-16 lg:p-32 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
            <h2 className="text-4xl lg:text-7xl font-black mb-10 leading-none">Built in KL. <br/>Made for Malaysia.</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
                From public holiday calendars to LHDN tax tables, Smart HR 4U is localized to perfection. We handle the paperwork so you can build your legacy.
            </p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50">
                <div className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest"><span className="material-symbols-outlined !text-4xl">public</span> Regionally Secure</div>
                <div className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest"><span className="material-symbols-outlined !text-4xl">lock</span> End-to-End Encrypted</div>
                <div className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest"><span className="material-symbols-outlined !text-4xl">cloud</span> Cloud First</div>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-white/40 dark:bg-slate-900/40 rounded-[5rem] p-16 lg:p-24 border border-slate-200 dark:border-white/10 backdrop-blur-2xl">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-[1.1]">Ready for a <br/><span className="text-primary">Demo?</span></h2>
                 <p className="text-slate-500 text-xl mb-12 max-w-md">Our team will walk you through the integration process in 15 minutes.</p>
                 <div className="space-y-6">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><span className="material-symbols-outlined">mail</span></div>
                       <p className="font-black text-lg">hello@smarthr4u.my</p>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><span className="material-symbols-outlined">call</span></div>
                       <p className="font-black text-lg">+60 3-8888 9999</p>
                    </div>
                 </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] shadow-2xl">
                 <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary transition font-bold" placeholder="Company Name" />
                    <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary transition font-bold" placeholder="Work Email" />
                    <textarea className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-primary transition h-32 font-bold" placeholder="Tell us about your team"></textarea>
                    <button type="button" className="w-full bg-primary text-white py-5 rounded-2xl font-black transform transition active:scale-95 shadow-2xl shadow-primary/30 uppercase tracking-widest text-[10px]">Send Demo Request</button>
                 </form>
              </div>
           </div>
        </div>
      </section>

      <footer className="py-20 text-center opacity-30 text-[10px] font-black uppercase tracking-[0.5em]">
        &copy; 2024 Smart HR 4U SDN BHD. Licensed for Private SME Use in Malaysia.
      </footer>
    </div>
  );
};

// --- RENDER ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);