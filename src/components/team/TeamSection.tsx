import React, { useState } from 'react';
import { Users, GraduationCap, Telescope, Mail, Linkedin, Github, Sparkles, Award } from 'lucide-react';
import { CLUB_TEAM, CLUB_INFO } from '../../data/clubData';
import { TeamMember } from '../../types';

export const TeamSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Leadership & Faculty', 'Core Office Bearers', 'Technical & Imaging', 'Outreach & Events'];

  const filteredMembers = selectedCategory === 'All'
    ? CLUB_TEAM
    : CLUB_TEAM.filter((m) => m.category === selectedCategory);

  return (
    <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#04060f] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>ORGANIZATIONAL HIERARCHY</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            ASTRA CLUB LEADERSHIP
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Guided by respected PSG iTech faculty coordinators and driven by passionate student astronomers, astrophotographers, and space science enthusiasts.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="stargaze-card rounded-2xl overflow-hidden flex flex-col justify-between border border-blue-950 hover:border-blue-500/40 transition-all hover:scale-[1.02] group"
            >
              {/* Photo & Role Header */}
              <div>
                <div className="relative h-60 overflow-hidden bg-slate-950">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b1c] via-transparent to-black/30" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950/90 text-cyan-300 border border-blue-800 backdrop-blur-md">
                      {member.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-heading font-bold text-lg text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-300">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{member.department} {member.year ? `• ${member.year}` : ''}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-500 block mb-1">
                      Domain Focus:
                    </span>
                    <span className="text-xs font-mono text-blue-300 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-900/50 inline-block">
                      {member.astronomyInterest}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links Footer */}
              <div className="p-4 pt-0 flex items-center gap-2 border-t border-slate-800/40 text-slate-400">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white transition-colors"
                    aria-label={`${member.name} LinkedIn Profile`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Governance Note */}
        <div className="mt-12 p-5 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-center max-w-2xl mx-auto">
          <p className="text-xs text-slate-300">
            ASTRA is governed under the Office of Student Affairs and Principal's Council, PSG Institute of Technology and Applied Research, Coimbatore.
          </p>
        </div>
      </div>
    </section>
  );
};
