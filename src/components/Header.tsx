import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../data';
import LucideIcon from './LucideIcon';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigateToOrder: () => void;
}

export default function Header({ currentPage, onPageChange, darkMode, onToggleDarkMode, onNavigateToOrder }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection for sticky shadow/glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavLinkClick = (id: string) => {
    onPageChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-sticky-header"
      className={`sticky top-0 z-40 transition-all duration-300 w-full ${
        isScrolled
          ? darkMode
            ? 'bg-slate-950/90 border-b border-slate-800 shadow-lg backdrop-blur-md'
            : 'bg-white/90 border-b border-slate-100 shadow-md backdrop-blur-md'
          : darkMode
            ? 'bg-slate-950/50'
            : 'bg-slate-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Business Name */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={() => handleNavLinkClick('home')}
            id="header-logo-container"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-white font-black shadow-md shadow-brand-green/10 group-hover:rotate-6 transition-transform">
              <span className="text-xl font-display font-black">+</span>
            </div>
            <div className="text-left">
              <h1 className="font-extrabold text-sm md:text-base font-display tracking-tight leading-none text-primary-navy dark:text-white">
                {BUSINESS_INFO.name}
              </h1>
              <span className={`text-[9px] md:text-[10px] tracking-wider block mt-0.5 font-semibold ${
                darkMode ? 'text-slate-400' : 'text-slate-550'
              }`}>
                Tekari Road • Gaya (Bihar)
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" id="desktop-navigation-menu">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavLinkClick(link.id)}
                  className={`text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-primary-navy dark:text-brand-green border-b-2 border-primary-navy dark:border-brand-green pb-1'
                      : darkMode
                        ? 'text-slate-300 hover:text-brand-green'
                        : 'text-slate-650 hover:text-primary-navy'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right utilities: Theme Toggle, Calls, Mobile button */}
          <div className="flex items-center gap-2 md:gap-3" id="header-utilities">
            {/* Dark Mode toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                darkMode ? 'hover:bg-slate-800 text-amber-400' : 'hover:bg-slate-200 text-slate-550'
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <LucideIcon name={darkMode ? "Sun" : "Moon"} className="w-4.5 h-4.5" />
            </button>

            {/* Call button */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-primary-navy text-primary-navy hover:bg-primary-navy/5 dark:border-brand-green dark:text-brand-green dark:hover:bg-brand-green/5 rounded-xl text-xs font-bold transition-colors"
              title="Call Helpline"
            >
              <LucideIcon name="Phone" className="w-3.5 h-3.5" />
              <span>Call store</span>
            </a>

            {/* Quick Order Form Trigger */}
            <button
              onClick={onNavigateToOrder}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-extrabold tracking-wide uppercase shadow-md shadow-brand-green/10 transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <LucideIcon name="MessageSquare" className="w-4 h-4 animate-bounce" />
              <span>WhatsApp Order</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all cursor-pointer ${
                darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-250 text-slate-600'
              }`}
              title="Toggle Menu"
            >
              <LucideIcon name={mobileMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t animate-slide-down shadow-xl ${
            darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
          }`}
          id="mobile-navigation-drawer"
        >
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavLinkClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-brand-green/10 text-brand-green'
                      : darkMode
                        ? 'hover:bg-slate-900 text-slate-300'
                        : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <LucideIcon name="Check" className="w-4 h-4" />}
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full py-3 border border-brand-green text-brand-green rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <LucideIcon name="Phone" className="w-4 h-4" />
                <span>Call Store Helpline: {BUSINESS_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToOrder();
                }}
                className="w-full py-3 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LucideIcon name="MessageSquare" className="w-4 h-4" />
                <span>Send WhatsApp Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
