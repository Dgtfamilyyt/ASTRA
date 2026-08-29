import React, { useState } from 'react';
import { 
  Telescope, 
  BookOpen, 
  Camera, 
  Compass, 
  Share2, 
  Eye, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  Layers
} from 'lucide-react';
import { CLUB_INFO, CLUB_OBJECTIVES, CLUB_EQUIPMENT } from '../../data/clubData';

interface AboutSectionProps {
  onJoinClick: () => void;
  onExploreEventsClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onJoinClick,
  onExploreEventsClick,
}) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'objectives' | 'equipment'>('mission');

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#04060f] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono mb-3">
            <Telescope className="w-3.5 h-3.5 text-cyan-400" />
            <span>PSG iTech OFFICIAL STUDENT CLUB</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            ABOUT ASTRA
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            ASTRA is the official Astronomy Club of PSG Institute of Technology and Applied Research, Coimbatore — fostering scientific curiosity, observational rigor, space engineering research, and public astronomy outreach.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
            <button
              id="about-tab-mission"
              onClick={() => setActiveTab('mission')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-heading font-semibold transition-all ${
                activeTab === 'mission'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Our Mission & Heritage
            </button>
            <button
              id="about-tab-objectives"
              onClick={() => setActiveTab('objectives')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-heading font-semibold transition-all ${
                activeTab === 'objectives'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              5 Core Objectives
            </button>
            <button
              id="about-tab-equipment"
              onClick={() => setActiveTab('equipment')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-heading font-semibold transition-all ${
                activeTab === 'equipment'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Observatory Optics & Gear
            </button>
          </div>
        </div>

        {/* Tab 1: Mission & Heritage */}
        {activeTab === 'mission' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
            <div className="lg:col-span-6 space-y-6">
              <div className="stargaze-card rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="font-heading font-bold text-2xl text-white">
                  Why ASTRA was created at PSG iTech
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Founded with the vision to bridge theoretical physics, mechanical precision optics, data analytics, and space science, <strong className="text-white">ASTRA</strong> provides an authentic experiential platform for college students.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  From tracking deep-sky nebulae on our campus terrace to analyzing real astronomical datasets, ASTRA members develop multidisciplinary skills in optics, signal processing, astrophotography, and public science communication.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Hands-on Observation</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Regular telescope sessions resolving lunar craters, Jupiter moons, Saturn rings & Messier objects.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Student Opportunities</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Leadership in night camps, astrophotography competitions, workshops, and science outreach.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="stargaze-glass rounded-2xl p-6 sm:p-8 border border-blue-900/40 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <h4 className="font-heading font-bold text-lg text-white mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Key Pillars of ASTRA at PSG iTech</span>
                </h4>

                <div className="space-y-4">
                  {[
                    {
                      title: 'Observational Discipline',
                      desc: 'Weekly night sky observing on the Civil Block Terrace using precision 8" Dobsonian and equatorial telescopes.',
                    },
                    {
                      title: 'Astro-Engineering & Data',
                      desc: 'Integrating software, sensor algorithms, RTL-SDR radio meteor detection, and image processing tools like Siril.',
                    },
                    {
                      title: 'Community Science Outreach',
                      desc: 'Taking solar safety projection telescopes and star talks to local Coimbatore schools and rural education centers.',
                    },
                    {
                      title: 'Academic & Research Integration',
                      desc: 'Facilitating student projects in orbital mechanics, satellite telemetry, and solar activity tracking.',
                    },
                  ].map((pillar, index) => (
                    <div key={index} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                      <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                        0{index + 1}
                      </span>
                      <div>
                        <h5 className="font-heading font-bold text-sm text-slate-100">{pillar.title}</h5>
                        <p className="text-xs text-slate-400 mt-0.5">{pillar.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onExploreEventsClick}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow"
                  >
                    <span>View Club Events</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onJoinClick}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                  >
                    Join ASTRA
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 5 Core Objectives */}
        {activeTab === 'objectives' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {CLUB_OBJECTIVES.map((obj, i) => {
              const icons = {
                Eye: <Eye className="w-6 h-6 text-blue-400" />,
                BookOpen: <BookOpen className="w-6 h-6 text-indigo-400" />,
                Camera: <Camera className="w-6 h-6 text-amber-400" />,
                Compass: <Compass className="w-6 h-6 text-emerald-400" />,
                Share2: <Share2 className="w-6 h-6 text-rose-400" />,
              };

              return (
                <div
                  key={obj.id}
                  id={`club-objective-${obj.id}`}
                  className="stargaze-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:scale-[1.02] transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                        {icons[obj.iconName as keyof typeof icons]}
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500">
                        OBJECTIVE 0{i + 1}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-xl text-white tracking-wide mb-1">
                      {obj.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-400 mb-3">
                      {obj.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {obj.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>PSG iTech Campus</span>
                    <span className="text-cyan-400">Active Focus</span>
                  </div>
                </div>
              );
            })}

            {/* CTA Box */}
            <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-blue-900/30 to-indigo-950/40 border border-blue-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                  Get Involved
                </span>
                <h3 className="font-heading font-bold text-2xl text-white mt-1 mb-2">
                  Be a Part of ASTRA
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Whether you are a complete beginner holding a pair of binoculars for the first time or an experienced astrophotographer, ASTRA has a place for you.
                </p>
              </div>

              <button
                onClick={onJoinClick}
                className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-heading uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all"
              >
                Join ASTRA Community
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Equipment Showcase */}
        {activeTab === 'equipment' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CLUB_EQUIPMENT.map((item, idx) => (
                <div
                  key={idx}
                  className="stargaze-card rounded-2xl p-6 border border-slate-800 hover:border-blue-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-lg bg-blue-950/60 border border-blue-500/30">
                      <Telescope className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-2">
                    {item.name}
                  </h3>

                  <div className="space-y-1.5 text-xs font-mono text-slate-400 mb-4">
                    <p><span className="text-slate-500">Aperture:</span> {item.aperture}</p>
                    <p><span className="text-slate-500">Focal Spec:</span> {item.focalLength}</p>
                  </div>

                  <p className="text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                    <strong className="text-slate-200">Observation Role:</strong> {item.purpose}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 text-center max-w-2xl mx-auto">
              <p className="text-xs text-slate-300">
                <span className="text-cyan-400 font-bold">Safety Note:</span> Solar observation is strictly performed using certified Baader safety filters and solar projection rigs under faculty supervision.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
