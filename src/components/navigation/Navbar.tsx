import React, { useState, useEffect } from 'react';
import { 
  Telescope, 
  Sparkles, 
  Menu, 
  X, 
  Compass, 
  Calendar, 
  Camera, 
  BookOpen, 
  Users, 
  Mail, 
  Moon,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CLUB_INFO } from '../../data/clubData';
import { calculateMoonPhase } from '../../services/astronomyService';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAiModal: () => void;
  onOpenTonightSky: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAiModal,
  onOpenTonightSky,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const moonInfo = calculateMoonPhase();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About ASTRA' },
    { id: 'cosmos', label: 'Campus to Cosmos' },
    { id: 'observatory', label: 'Observatory' },
    { id: 'events', label: 'Events' },
    { id: 'calendar', label: 'Cosmic Calendar' },
    { id: 'gallery', label: 'Astrophotography' },
    { id: 'learn', label: 'Learn' },
    { id: 'ask-astra', label: 'Ask ASTRA AI' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#04060f]/90 backdrop-blur-md border-b border-blue-900/30 py-3 shadow-lg shadow-black/40'
            : 'bg-gradient-to-b from-[#04060f]/90 via-[#04060f]/60 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Identity */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 border border-blue-400/30">
              <Telescope className="w-5 h-5 text-white animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-wider text-white group-hover:text-blue-300 transition-colors">
                  ASTRA
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium hidden sm:inline-block">
                  PSG iTech
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-none tracking-tight">
                Astronomy Club • Coimbatore
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.slice(0, 8).map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-all duration-150 relative ${
                    isActive
                      ? 'text-white bg-blue-600/20 text-blue-300 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-400 rounded-full shadow-sm shadow-blue-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Ask ASTRA AI Button */}
            <button
              id="nav-ask-astra-btn"
              onClick={onOpenAiModal}
              title="Ask ASTRA Astronomy AI Guide"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-200 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
              <span>Ask ASTRA</span>
            </button>

            {/* Special CTA: Tonight's Sky */}
            <button
              id="nav-tonights-sky-btn"
              onClick={onOpenTonightSky}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-600/25 border border-cyan-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
              </span>
              <Moon className="w-3.5 h-3.5 text-cyan-200" />
              <span>TONIGHT'S SKY</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="nav-mobile-tonight-btn"
              onClick={onOpenTonightSky}
              className="sm:hidden px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 text-white flex items-center gap-1"
            >
              <Moon className="w-3 h-3" />
              <span>Sky</span>
            </button>

            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-40 lg:hidden bg-black/80 backdrop-blur-xl pt-20 px-4 pb-8 overflow-y-auto animate-fade-in"
        >
          <div className="bg-[#090d1e] rounded-2xl border border-blue-900/40 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">ASTRA</h3>
                <p className="text-xs text-slate-400">PSG iTech Astronomy Club</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono">
                <Moon className="w-3.5 h-3.5 text-cyan-300" />
                <span>{moonInfo.phaseName} ({moonInfo.illumination}%)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                    activeSection === link.id
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
              <button
                id="mobile-ask-astra-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiModal();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Ask ASTRA AI</span>
              </button>

              <button
                id="mobile-tonight-sky-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTonightSky();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <Moon className="w-4 h-4 text-cyan-200" />
                <span>Tonight's Sky</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
