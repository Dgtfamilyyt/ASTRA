import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Github, 
  Linkedin, 
  Instagram, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Telescope,
  Building,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLUB_INFO } from '../../data/clubData';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    affiliation: 'PSG iTech Student',
    subject: 'Club Membership & Joining',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#818cf8', '#34d399'],
      });
    } catch (e) {
      // fallback
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030612] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMUNICATION & OUTREACH</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            CONNECT WITH ASTRA
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Have questions about telescope sessions, club membership, school outreach camps, or astrophotography collaborations? Reach out to the ASTRA team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Official College Information & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="stargaze-card rounded-2xl p-6 sm:p-7 border border-blue-900/40 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Institutional Headquarters
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    PSG Institute of Technology and Applied Research
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Avinashi Road, Neelambur, Coimbatore – 641 062, Tamil Nadu, India
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <a
                    href={`mailto:${CLUB_INFO.contactEmail}`}
                    className="text-cyan-300 hover:underline font-mono"
                  >
                    {CLUB_INFO.contactEmail}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Observatory Sessions: Friday / Saturday Clear Nights</span>
                </div>
              </div>

              {/* GitHub Official Site Notice */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">GitHub Repository:</span>
                  <a
                    href={CLUB_INFO.socials.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-cyan-300 hover:text-white flex items-center gap-1"
                  >
                    <span>psg-itech-astronomy-club</span>
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={CLUB_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  aria-label="ASTRA GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={CLUB_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  aria-label="ASTRA Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={CLUB_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  aria-label="ASTRA LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={CLUB_INFO.socials.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  aria-label="PSG iTech College Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Membership FAQ */}
            <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-300 space-y-2">
              <h4 className="font-heading font-bold text-sm text-cyan-300 flex items-center gap-1.5">
                <Telescope className="w-4 h-4" />
                <span>Who can join ASTRA?</span>
              </h4>
              <p className="leading-relaxed">
                All enrolled students and faculty members across all departments and academic years at PSG iTech are welcome to join. No prior astronomy experience required!
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact / Membership Form */}
          <div className="lg:col-span-7">
            <div className="stargaze-card rounded-2xl p-6 sm:p-8 border border-blue-900/40 shadow-2xl">
              {!submitted ? (
                <>
                  <h3 className="font-heading font-bold text-xl text-white mb-1">
                    Send a Message or Membership Inquiry
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-mono">
                    Direct communication to ASTRA Faculty Coordinators & Office Bearers
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priyadharshini N."
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-sm font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="your.name@psgitech.ac.in"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-sm font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1">Affiliation *</label>
                        <select
                          value={formState.affiliation}
                          onChange={(e) => setFormState({ ...formState, affiliation: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                        >
                          <option value="PSG iTech Student">PSG iTech Student</option>
                          <option value="PSG iTech Faculty / Staff">PSG iTech Faculty / Staff</option>
                          <option value="Alumni">PSG Alumni</option>
                          <option value="External School / College">External School / College</option>
                          <option value="Astronomy Enthusiast">Astronomy Enthusiast / Parent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1">Inquiry Purpose *</label>
                        <select
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                        >
                          <option value="Club Membership & Joining">Club Membership & Joining</option>
                          <option value="Telescope Observation Request">Telescope Observation Request</option>
                          <option value="Astrophotography Submission">Astrophotography Submission</option>
                          <option value="School Outreach Workshop">School Outreach Workshop</option>
                          <option value="General Question">General Question</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Your Message or Query *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about your astronomy interests, department, or inquiry..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-sm font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-heading font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT INQUIRY</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-white">
                    Message Received!
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formState.name}</strong>. Your message regarding <span className="text-cyan-300">{formState.subject}</span> has been routed to the ASTRA team. We will get back to your email <strong className="text-white">({formState.email})</strong> shortly.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        phone: '',
                        affiliation: 'PSG iTech Student',
                        subject: 'Club Membership & Joining',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
