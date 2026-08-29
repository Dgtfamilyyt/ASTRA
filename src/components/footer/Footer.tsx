import React from 'react';
import { Telescope, Compass, MapPin, Mail, Heart, Github, Instagram, Linkedin, Globe, ArrowUp } from 'lucide-react';
import { CLUB_INFO } from '../../data/clubData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020308] border-t border-blue-900/30 text-slate-400 text-xs relative overflow-hidden">
      {/* Background Subtle Starfield Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Institutional Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 border border-blue-400/30">
                <Telescope className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-2xl text-white tracking-wider">
                  ASTRA
                </span>
                <p className="text-[11px] text-slate-400 font-medium">
                  Astronomy Club of PSG iTech
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Exploring the night sky, astrophysical science, optics engineering, and astrophotography from PSG Institute of Technology and Applied Research, Coimbatore.
            </p>

            <div className="flex items-center gap-2 text-cyan-300 font-heading font-bold text-xs tracking-wider">
              <span>"LOOK BEYOND. DISCOVER MORE."</span>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>11.0772° N, 77.0867° E • Elev. 411m</span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider font-mono">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About ASTRA' },
                { id: 'cosmos', label: 'Campus to Cosmos' },
                { id: 'observatory', label: 'Digital Observatory' },
                { id: 'events', label: 'Events & Camps' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-cyan-300 transition-colors text-xs"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Knowledge & Archives */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider font-mono">
              Archives
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'calendar', label: 'Cosmic Calendar' },
                { id: 'gallery', label: 'Astrophotography Gallery' },
                { id: 'learn', label: 'Optics Calculator' },
                { id: 'team', label: 'Club Leadership' },
                { id: 'contact', label: 'Membership & Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-cyan-300 transition-colors text-xs"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Institutional Address */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider font-mono">
              Campus Location
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              PSG Institute of Technology and Applied Research<br />
              Avinashi Road, Neelambur<br />
              Coimbatore – 641 062<br />
              Tamil Nadu, India
            </p>
            <div className="pt-2">
              <a
                href={CLUB_INFO.socials.website}
                target="_blank"
                rel="noreferrer noopener"
                className="text-cyan-400 hover:underline flex items-center gap-1 text-xs"
              >
                <span>www.psgitech.ac.in</span>
                <Globe className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Subfooter */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <p>
            © {new Date().getFullYear()} ASTRA — Astronomy Club of PSG iTech. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={CLUB_INFO.socials.github}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={CLUB_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={CLUB_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
