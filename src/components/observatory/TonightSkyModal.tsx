import React, { useState } from 'react';
import { 
  Moon, 
  X, 
  Sparkles, 
  Compass, 
  Eye, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Star, 
  Telescope,
  ArrowRight,
  Share2
} from 'lucide-react';
import { calculateMoonPhase, getObservatorySkyConditions, getSimulatedObjectPositions } from '../../services/astronomyService';
import { CELESTIAL_OBJECTS } from '../../data/astronomyData';

interface TonightSkyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiModal: () => void;
}

export const TonightSkyModal: React.FC<TonightSkyModalProps> = ({
  isOpen,
  onClose,
  onOpenAiModal,
}) => {
  if (!isOpen) return null;

  const moonInfo = calculateMoonPhase();
  const skyTelemetry = getObservatorySkyConditions();
  const visiblePlanets = CELESTIAL_OBJECTS.filter((o) => o.category === 'Planet' || o.category === 'Moon');
  
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checklist = [
    { id: 'moon-craters', label: 'Observe Moon Tycho & Copernicus craters along the terminator line' },
    { id: 'jupiter-moons', label: 'Resolve Jupiter’s 4 Galilean moons (Io, Europa, Ganymede, Callisto)' },
    { id: 'saturn-rings', label: 'View Saturn’s ring plane and major moon Titan' },
    { id: 'orion-m42', label: 'Starhop from Alnitak to the glowing core of Orion Nebula (M42)' },
    { id: 'pleiades', label: 'Wide-field binocular view of the Seven Sisters (M45)' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="stargaze-glass rounded-3xl max-w-4xl w-full border border-cyan-500/40 p-6 sm:p-8 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          aria-label="Close Tonight Sky Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                LIVE OBSERVATION TELEMETRY
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              TONIGHT'S SKY OVER COIMBATORE
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Calculated for PSG Institute of Technology and Applied Research (11.0772° N, 77.0867° E)</span>
        </p>

        {/* Key Summary Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Moon Condition */}
          <div className="p-5 rounded-2xl bg-[#080e24] border border-blue-900/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>Lunar Status</span>
                <span className="text-cyan-300">{moonInfo.illumination}% Lit</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                {moonInfo.phaseName}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Moon age is {moonInfo.ageDays} days. Ideal for high-contrast terminator relief imaging.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex justify-between">
              <span>Rises: {skyTelemetry.moonRiseTime}</span>
              <span>Sets: {skyTelemetry.moonSetTime}</span>
            </div>
          </div>

          {/* Seeing & Darkness */}
          <div className="p-5 rounded-2xl bg-[#080e24] border border-blue-900/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>Sky Quality</span>
                <span className="text-emerald-400">Class 5 Bortle</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                {skyTelemetry.overallRating}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Seeing: {skyTelemetry.seeingIndex}. Limiting magnitude ~5.6 under terrace conditions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex justify-between">
              <span>Twilight Ends: {skyTelemetry.astronomicalTwilightEnd}</span>
            </div>
          </div>

          {/* Recommended Targets */}
          <div className="p-5 rounded-2xl bg-[#080e24] border border-blue-900/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>Prime Highlight</span>
                <span className="text-amber-300">Gas Giants</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Jupiter & Saturn
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Jupiter shines at Mag -2.7 in Taurus; Saturn displays clear ring shadows in Aquarius.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-cyan-300">
              Best Window: 8:00 PM – 11:30 PM IST
            </div>
          </div>
        </div>

        {/* Visible Planets Table */}
        <div className="mb-8">
          <h3 className="font-heading font-bold text-base text-white mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-cyan-400" />
            <span>Visible Planets & Solar System Bodies</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {visiblePlanets.map((planet) => (
              <div
                key={planet.id}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-3"
              >
                <img
                  src={planet.imageUrl}
                  alt={planet.name}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                />
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-heading font-bold text-sm text-white">{planet.name}</h4>
                    <span className="text-[10px] font-mono text-amber-300">Mag {planet.apparentMagnitude}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{planet.constellation}</p>
                  <p className="text-[10px] font-mono text-cyan-400">{planet.bestViewingTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Observation Checklist */}
        <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/25 mb-8">
          <h3 className="font-heading font-bold text-sm sm:text-base text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Tonight's Skywatcher Checklist (Tick off during observation)</span>
          </h3>
          <div className="space-y-2.5">
            {checklist.map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors cursor-pointer ${
                  checkedItems[item.id] ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-500/30' : 'bg-slate-900/50 hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!checkedItems[item.id]}
                  onChange={() => toggleCheck(item.id)}
                  className="mt-0.5 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
                />
                <span className={`text-xs ${checkedItems[item.id] ? 'line-through text-emerald-300' : ''}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onOpenAiModal();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 border border-indigo-500/30 text-xs font-semibold"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Ask ASTRA AI about tonight's sky</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30"
          >
            Close Sky Guide
          </button>
        </div>
      </div>
    </div>
  );
};
