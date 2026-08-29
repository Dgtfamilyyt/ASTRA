import React, { useState } from 'react';
import { 
  Telescope, 
  Moon, 
  Compass, 
  Eye, 
  Activity, 
  Sparkles, 
  MapPin, 
  Clock, 
  Layers, 
  ChevronRight, 
  X, 
  Info,
  Thermometer,
  CloudSun,
  Shield,
  Star
} from 'lucide-react';
import { InteractiveStarMap } from './InteractiveStarMap';
import { CELESTIAL_OBJECTS, CONSTELLATIONS } from '../../data/astronomyData';
import { calculateMoonPhase, getObservatorySkyConditions } from '../../services/astronomyService';
import { CelestialObject } from '../../types';

export const DigitalObservatory: React.FC = () => {
  const [selectedObject, setSelectedObject] = useState<CelestialObject | null>(CELESTIAL_OBJECTS[0]);
  const [modalObject, setModalObject] = useState<CelestialObject | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const moonInfo = calculateMoonPhase();
  const skyTelemetry = getObservatorySkyConditions();

  const filteredObjects = categoryFilter === 'All'
    ? CELESTIAL_OBJECTS
    : CELESTIAL_OBJECTS.filter((obj) => obj.category === categoryFilter);

  return (
    <section id="observatory" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030612] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Telescope className="w-3.5 h-3.5 text-cyan-400" />
            <span>ASTRA DIGITAL OBSERVATORY</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            THE OBSERVATORY & TONIGHT'S SKY
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Real-time astronomical ephemeris and interactive sky guide calculated for{' '}
            <strong className="text-white">PSG Institute of Technology and Applied Research</strong>, Coimbatore (11.0772° N, 77.0867° E).
          </p>
        </div>

        {/* Observatory Live Telemetry Bar */}
        <div className="stargaze-glass rounded-2xl p-6 sm:p-7 border border-blue-900/40 mb-10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">
                  PSG iTech Station Telemetry
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Neelambur, Coimbatore • Elev. 411m • Bortle Class 5
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs text-emerald-400 font-semibold uppercase">
                {skyTelemetry.overallRating}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 text-xs">
            {/* Moon Phase */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">Moon Phase</span>
              <p className="font-heading font-bold text-white text-sm">{moonInfo.phaseName}</p>
              <p className="text-[11px] text-cyan-300 font-mono">{moonInfo.illumination}% lit • Age {moonInfo.ageDays}d</p>
            </div>

            {/* Seeing Index */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">Atmospheric Seeing</span>
              <p className="font-heading font-bold text-white text-sm">{skyTelemetry.seeingIndex}</p>
              <p className="text-[11px] text-emerald-400 font-mono">Terrace Resolution</p>
            </div>

            {/* Transparency */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">Transparency</span>
              <p className="font-heading font-bold text-white text-sm">{skyTelemetry.transparency}</p>
              <p className="text-[11px] text-slate-400 font-mono">Limit: Mag {skyTelemetry.limitingMagnitude}</p>
            </div>

            {/* Sunset & Twilight */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">Sunset / Twilight</span>
              <p className="font-heading font-bold text-white text-sm">{skyTelemetry.sunSetTime}</p>
              <p className="text-[11px] text-slate-400 font-mono">Dark: {skyTelemetry.astronomicalTwilightEnd}</p>
            </div>

            {/* Moon Rise / Set */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">Moonset Time</span>
              <p className="font-heading font-bold text-white text-sm">{skyTelemetry.moonSetTime}</p>
              <p className="text-[11px] text-slate-400 font-mono">Rise: {skyTelemetry.moonRiseTime}</p>
            </div>

            {/* Weather / Temp */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">Night Ambient</span>
              <p className="font-heading font-bold text-white text-sm">{skyTelemetry.temperatureCelsius}°C</p>
              <p className="text-[11px] text-slate-400 font-mono">Humidity: {skyTelemetry.humidityPercentage}%</p>
            </div>
          </div>
        </div>

        {/* Two-Column Core Layout: Interactive Sky Map & Visible Objects Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Interactive Star Dome Map */}
          <div className="lg:col-span-7">
            <InteractiveStarMap onSelectObject={(obj) => setModalObject(obj)} />
          </div>

          {/* Observation Target Cards / Tonight's Planets */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="stargaze-card rounded-2xl p-5 border border-blue-900/40">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Visible Celestial Objects Tonight</span>
                </h3>
                <span className="text-xs font-mono text-cyan-400">
                  {CELESTIAL_OBJECTS.filter((o) => o.visibleTonight).length} Observable Targets
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['All', 'Planet', 'Moon', 'Nebula', 'Galaxy', 'Star Cluster'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      categoryFilter === cat
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Object List Scroll area */}
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {filteredObjects.map((obj) => (
                  <div
                    key={obj.id}
                    onClick={() => setModalObject(obj)}
                    className="p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={obj.imageUrl}
                        alt={obj.name}
                        className="w-11 h-11 rounded-lg object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-heading font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                            {obj.name}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800">
                            {obj.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {obj.constellation} • Best: {obj.bestViewingTime}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-amber-300 block">
                        Mag {obj.apparentMagnitude}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        {obj.viewingDifficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tonight's Observation Advice Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/25 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-600/20 text-cyan-300 shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white mb-1">
                  Observatory Recommendation for Tonight
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prime viewing starts after 8:30 PM as Jupiter and Saturn climb above the eastern terrace horizon. The Moon’s terminator reveals crisp crater rims along Montes Apenninus. Use an 80A blue filter on the 8" Dobsonian for Jovian cloud bands.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Modal when clicking any object */}
        {modalObject && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="stargaze-card rounded-2xl max-w-2xl w-full border border-blue-500/40 overflow-hidden shadow-2xl animate-fade-in">
              <div className="relative h-48 sm:h-60 overflow-hidden">
                <img
                  src={modalObject.imageUrl}
                  alt={modalObject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c18] via-black/40 to-transparent" />
                <button
                  onClick={() => setModalObject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-blue-600 text-white uppercase">
                    {modalObject.category}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
                    {modalObject.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-300">{modalObject.designation || modalObject.constellation}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-200 leading-relaxed">
                  {modalObject.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Apparent Magnitude</span>
                    <strong className="text-amber-300">{modalObject.apparentMagnitude}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Constellation</span>
                    <strong className="text-white">{modalObject.constellation}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Best Viewing</span>
                    <strong className="text-cyan-300">{modalObject.bestViewingTime}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Optics Required</span>
                    <strong className="text-emerald-400">{modalObject.viewingDifficulty}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-xs uppercase text-slate-400 tracking-wider mb-2 font-mono">
                    Key Observational Features at PSG iTech
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {modalObject.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => setModalObject(null)}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-heading"
                  >
                    Close Object Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
