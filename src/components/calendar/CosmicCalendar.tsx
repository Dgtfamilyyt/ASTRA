import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Moon, 
  Star, 
  Eye, 
  Download, 
  CheckCircle2, 
  Filter, 
  ExternalLink 
} from 'lucide-react';
import { ASTRONOMICAL_CALENDAR_EVENTS } from '../../data/astronomyData';
import { CosmicCalendarEvent } from '../../types';

export const CosmicCalendar: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');

  const eventTypes = [
    'All',
    'Meteor Shower',
    'Opposition',
    'Eclipse',
    'Conjunction',
  ];

  const filteredEvents = selectedType === 'All'
    ? ASTRONOMICAL_CALENDAR_EVENTS
    : ASTRONOMICAL_CALENDAR_EVENTS.filter((e) => e.type === selectedType || e.category === selectedType);

  const handleDownloadSingleIcs = (event: CosmicCalendarEvent) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ASTRA PSG iTech//Cosmic Calendar//EN
BEGIN:VEVENT
SUMMARY:Astronomy: ${event.name}
DESCRIPTION:${event.description} (Viewing: ${event.peakTime})
LOCATION:PSG iTech / Coimbatore Night Sky
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-cosmic-event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="calendar" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030613] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-mono mb-3">
            <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>ANNUAL CELESTIAL TIMETABLE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            COSMIC CALENDAR (2025–2026)
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Major astronomical phenomena, meteor shower peaks, planetary oppositions, and lunar events observable from PSG iTech, Coimbatore.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedType === type
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Calendar Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="stargaze-card rounded-2xl p-6 flex flex-col justify-between border border-blue-950 hover:border-blue-500/40 transition-all hover:scale-[1.01]"
            >
              <div>
                {/* Event Top Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950 text-cyan-300 border border-blue-800">
                    {evt.type}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    Visibility: {evt.visibility}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-mono font-bold text-blue-400">
                    {evt.date}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  {evt.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {evt.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Peak / Best Time:</span>
                  <span className="text-white font-semibold">{evt.peakTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Target Equipment:</span>
                  <span className="text-cyan-300 font-semibold">{evt.equipmentNeeded}</span>
                </div>

                <button
                  onClick={() => handleDownloadSingleIcs(evt)}
                  className="w-full mt-2 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 flex items-center justify-center gap-1.5 transition-colors text-[11px]"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>Add Reminder to Calendar (.ics)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
