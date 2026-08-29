import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Telescope, 
  CheckCircle2, 
  AlertCircle,
  Filter
} from 'lucide-react';
import { CLUB_EVENTS } from '../../data/clubData';
import { ClubEvent } from '../../types';
import { EventRegistrationModal } from './EventRegistrationModal';

export const EventsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeEventModal, setActiveEventModal] = useState<ClubEvent | null>(null);

  const categories = [
    'All',
    'Observation Night',
    'Workshop',
    'Seminar',
    'Quiz & Competition',
    'Expedition',
  ];

  const filteredEvents = selectedCategory === 'All'
    ? CLUB_EVENTS
    : CLUB_EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <section id="events" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#040714] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono mb-3">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>CAMPUS ASTRONOMY HAPPENINGS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            EVENTS & OBSERVATION NIGHTS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Join hands-on telescope observation camps, technical astrophotography workshops, symposiums, and guest space lectures hosted at PSG iTech.
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((event) => {
            const isRegistrationOpen = event.status === 'Registration Open';
            const isUpcoming = event.status === 'Upcoming';

            return (
              <div
                key={event.id}
                id={`event-card-${event.id}`}
                className="stargaze-card rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.02] transition-all duration-200 border border-blue-950 hover:border-blue-500/40"
              >
                {/* Event Top Banner / Visual */}
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={event.bannerImage || 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=800&q=80'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-transparent to-black/40" />

                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950/80 text-cyan-300 border border-blue-500/40 backdrop-blur-md">
                      {event.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold backdrop-blur-md ${
                        isRegistrationOpen
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : isUpcoming
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-700/50 text-slate-400'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-heading font-bold text-lg text-white line-clamp-1">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{event.date} • {event.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">{event.venue}, PSG iTech</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="text-slate-500">Eligibility: {event.targetAudience}</span>
                      {event.seatsLimit && (
                        <span className="text-cyan-400 font-bold">{event.seatsLimit} Seats</span>
                      )}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-3">
                    {isRegistrationOpen ? (
                      <button
                        onClick={() => setActiveEventModal(event)}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-heading font-bold uppercase tracking-wider shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-colors"
                      >
                        <span>Register Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveEventModal(event)}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                      >
                        <span>View Schedule & Details</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Event Registration / Schedule Modal */}
        <EventRegistrationModal
          event={activeEventModal}
          isOpen={!!activeEventModal}
          onClose={() => setActiveEventModal(null)}
        />
      </div>
    </section>
  );
};
