
import React from 'react';

const LogoIcon = ({ className }: { className?: string }) => (
  <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.1" />
    <path d="M12 28V12H15V18.5H25V12H28V28H25V21.5H15V28H12Z" fill="url(#footer-logo-gradient)" />
    <circle cx="20" cy="18" r="3" fill="url(#footer-logo-gradient)" />
    <defs>
      <linearGradient id="footer-logo-gradient" x1="12" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#135bec" />
        <stop offset="1" stopColor="#6366f1" />
      </linearGradient>
    </defs>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Mobile App', 'Updates']
    },
    {
      title: 'Resources',
      links: ['Help Center', 'LHDN PCB Calculator', 'HR Guides', 'API Documentation']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Contact', 'Privacy Policy']
    }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <LogoIcon />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-white">
                  SMART<span className="text-primary">HR</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Solutions 4U
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Making HR simple, compliant, and efficient for Malaysian businesses of all sizes since 2018.
            </p>
          </div>

          {/* Links Col */}
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-4 text-sm">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href="#" className="hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-medium italic">
            &copy; {currentYear} Smart HR 4U Sdn Bhd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors" aria-label="Language">
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
