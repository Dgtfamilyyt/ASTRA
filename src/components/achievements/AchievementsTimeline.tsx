import React from 'react';
import { Award, Trophy, Sparkles, CheckCircle2, Calendar, Star } from 'lucide-react';
import { CLUB_ACHIEVEMENTS } from '../../data/clubData';

export const AchievementsTimeline: React.FC = () => {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#030510] relative border-t border-b border-blue-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>CLUB MILESTONES</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
            OUR ASTRONOMICAL JOURNEY
          </h2>
          <p className="text-slate-300 text-sm">
            Milestones and major achievements of ASTRA at PSG iTech from inaugural founding to state-level recognition.
          </p>
        </div>

        {/* Timeline Sequence */}
        <div className="relative border-l border-blue-500/30 ml-4 sm:ml-32 space-y-10">
          {CLUB_ACHIEVEMENTS.map((ach, idx) => (
            <div key={ach.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Year Badge on Left for Desktop */}
              <div className="hidden sm:block absolute -left-28 top-0.5 text-right w-20">
                <span className="font-mono text-sm font-bold text-blue-400">
                  {ach.year}
                </span>
              </div>

              {/* Glowing Timeline Marker Dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#030612] border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors shadow-sm shadow-cyan-400/50" />

              {/* Content Card */}
              <div className="stargaze-card rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-blue-500/40 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="sm:hidden font-mono text-xs font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded">
                      {ach.year}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {ach.category}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {ach.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
