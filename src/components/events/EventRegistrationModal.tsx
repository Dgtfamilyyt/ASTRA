import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Sparkles,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClubEvent } from '../../types';

interface EventRegistrationModalProps {
  event: ClubEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !event) return null;

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    department: 'CSE',
    year: '1st Year',
    email: '',
    phone: '',
    hasTelescopeExp: 'Beginner',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#34d399', '#f472b6'],
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  // Helper to generate and download an .ics iCalendar file for the event
  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ASTRA PSG iTech//Astronomy Club Events//EN
BEGIN:VEVENT
SUMMARY:ASTRA: ${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.venue}, PSG iTech, Coimbatore
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-psgitech-astra.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="stargaze-card rounded-2xl max-w-lg w-full border border-blue-500/40 p-6 sm:p-8 relative shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950 text-blue-300 border border-blue-500/30">
                EVENT REGISTRATION
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-white mt-1">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-2">
                <span className="flex items-center gap-1 text-cyan-300">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.date} • {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.venue}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Full Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Ashwin Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Roll / Register No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 22L104"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500 font-sans text-sm"
                  >
                    <option value="CSE">CSE</option>
                    <option value="AI&DS">AI & DS</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="Mech">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Year of Study *</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500 font-sans text-sm"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">PSG iTech Official Email *</label>
                <input
                  type="email"
                  required
                  placeholder="student@psgitech.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-sans text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-heading font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>CONFIRM REGISTRATION</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-white">
              Registration Confirmed!
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              Greetings, <strong className="text-white">{formData.name}</strong>! Your registration for <strong className="text-blue-300">{event.title}</strong> has been logged. An email confirmation has been dispatched.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-left space-y-1 text-slate-300">
              <p><span className="text-slate-500">Date & Time:</span> {event.date} at {event.time}</p>
              <p><span className="text-slate-500">Venue:</span> {event.venue}, PSG iTech</p>
              <p><span className="text-slate-500">Advisory:</span> Please assemble 10 mins prior. Red night-vision lights recommended for terrace sessions.</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleDownloadIcs}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-2 border border-slate-700"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Save to Calendar (.ics)</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-heading font-bold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
