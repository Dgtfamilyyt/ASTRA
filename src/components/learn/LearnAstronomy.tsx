import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Calculator, 
  Layers, 
  Globe, 
  Sun, 
  Compass, 
  Info, 
  ArrowRight,
  Telescope
} from 'lucide-react';
import { ASTRONOMY_TOPICS } from '../../data/astronomyData';
import { AstronomyTopic } from '../../types';

export const LearnAstronomy: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<AstronomyTopic>(ASTRONOMY_TOPICS[0]);
  
  // Interactive Calculator State
  const [calcFocalLength, setCalcFocalLength] = useState<number>(1200); // 1200mm (8" Dob)
  const [calcAperture, setCalcAperture] = useState<number>(203); // 203mm (8")
  const [calcEyepiece, setCalcEyepiece] = useState<number>(25); // 25mm plossl
  const [calcEyepieceAFor, setCalcEyepieceAFOV] = useState<number>(52); // 52 deg AFOV

  // Computed Optics Calculations
  const magnification = Math.round(calcFocalLength / calcEyepiece);
  const focalRatio = (calcFocalLength / calcAperture).toFixed(1);
  const trueFieldOfView = (calcEyepieceAFor / magnification).toFixed(2);
  const exitPupil = (calcAperture / magnification).toFixed(1);

  return (
    <section id="learn" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030612] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-mono mb-3">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>ASTRA KNOWLEDGE BASE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            LEARN ASTRONOMY & ASTROPHYSICS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Curated student tutorials, deep space physics modules, space mission chronicles, and interactive telescope optics calculators.
          </p>
        </div>

        {/* Two Columns: Topics Explorer & Interactive Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Topics Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold mb-3 px-1">
              Curated Study Modules
            </h3>
            {ASTRONOMY_TOPICS.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full p-4 rounded-xl text-left transition-all border flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-900/40 border-blue-400 text-white shadow-lg shadow-blue-600/20 font-bold'
                      : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 block">
                      {topic.readingTimeMinutes} min read • {topic.difficulty}
                    </span>
                    <p className="font-heading font-bold text-sm text-white mt-0.5">
                      {topic.title}
                    </p>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Selected Topic Content Display */}
          <div className="lg:col-span-8">
            <div className="stargaze-card rounded-2xl p-6 sm:p-8 border border-blue-900/40 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950 text-cyan-300 border border-blue-800">
                    ASTRA Educational Series
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-2">
                    {selectedTopic.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Level: {selectedTopic.difficulty} • Estimated Duration: {selectedTopic.readingTimeMinutes} Minutes
                  </p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line font-sans">
                {selectedTopic.contentMarkdown}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>PSG iTech ASTRA Academic Wing</span>
                <span className="text-cyan-400">Open Educational Resource</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Optics Tool: Telescope Magnification & Field-of-View Calculator */}
        <div className="stargaze-glass rounded-2xl p-6 sm:p-8 border border-blue-900/40 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-blue-600/20 text-cyan-400 border border-blue-500/30">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Interactive Telescope Optics Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Calculate real optical performance metrics: Magnification ($M = F / f_e$), Focal Ratio ($f / D$), True Field of View, and Exit Pupil.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sliders and Inputs */}
            <div className="lg:col-span-7 space-y-5">
              {/* Presets */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="text-slate-400 py-1">ASTRA Telescope Presets:</span>
                <button
                  onClick={() => {
                    setCalcFocalLength(1200);
                    setCalcAperture(203);
                    setCalcEyepiece(25);
                  }}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700"
                >
                  8" Dobsonian (1200mm / f5.9)
                </button>
                <button
                  onClick={() => {
                    setCalcFocalLength(650);
                    setCalcAperture(130);
                    setCalcEyepiece(10);
                  }}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-blue-300 border border-slate-700"
                >
                  130mm Celestron (650mm / f5)
                </button>
                <button
                  onClick={() => {
                    setCalcFocalLength(700);
                    setCalcAperture(70);
                    setCalcEyepiece(20);
                  }}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-700"
                >
                  70mm Refractor (700mm / f10)
                </button>
              </div>

              {/* Slider 1: Telescope Focal Length */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Telescope Focal Length (F):</span>
                  <strong className="text-cyan-400">{calcFocalLength} mm</strong>
                </div>
                <input
                  type="range"
                  min="400"
                  max="2500"
                  step="50"
                  value={calcFocalLength}
                  onChange={(e) => setCalcFocalLength(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Slider 2: Telescope Aperture */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Telescope Primary Aperture (D):</span>
                  <strong className="text-cyan-400">{calcAperture} mm ({(calcAperture / 25.4).toFixed(1)} inches)</strong>
                </div>
                <input
                  type="range"
                  min="60"
                  max="350"
                  step="10"
                  value={calcAperture}
                  onChange={(e) => setCalcAperture(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Slider 3: Eyepiece Focal Length */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Eyepiece Focal Length (f_e):</span>
                  <strong className="text-cyan-400">{calcEyepiece} mm</strong>
                </div>
                <input
                  type="range"
                  min="4"
                  max="40"
                  step="1"
                  value={calcEyepiece}
                  onChange={(e) => setCalcEyepiece(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Eyepiece Apparent FOV */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Eyepiece Apparent FOV (AFOV):</span>
                  <strong className="text-cyan-400">{calcEyepieceAFor}° (Plössl / Wide)</strong>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="2"
                  value={calcEyepieceAFor}
                  onChange={(e) => setCalcEyepieceAFOV(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            {/* Computed Results Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#080e22] border border-blue-900/50 flex flex-col justify-between">
                <span className="text-[11px] font-mono text-slate-400">Magnification</span>
                <p className="font-heading font-extrabold text-3xl sm:text-4xl text-cyan-300 my-1">
                  {magnification}x
                </p>
                <p className="text-[10px] font-mono text-slate-500">M = F / f_e</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#080e22] border border-blue-900/50 flex flex-col justify-between">
                <span className="text-[11px] font-mono text-slate-400">Focal Ratio</span>
                <p className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-300 my-1">
                  f/{focalRatio}
                </p>
                <p className="text-[10px] font-mono text-slate-500">Speed: {+focalRatio < 6 ? 'Fast (Deep-Sky)' : 'Slow (Planetary)'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#080e22] border border-blue-900/50 flex flex-col justify-between">
                <span className="text-[11px] font-mono text-slate-400">True Field of View</span>
                <p className="font-heading font-extrabold text-3xl sm:text-4xl text-emerald-300 my-1">
                  {trueFieldOfView}°
                </p>
                <p className="text-[10px] font-mono text-slate-500">Full Moon is ~0.5° wide</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#080e22] border border-blue-900/50 flex flex-col justify-between">
                <span className="text-[11px] font-mono text-slate-400">Exit Pupil</span>
                <p className="font-heading font-extrabold text-3xl sm:text-4xl text-indigo-300 my-1">
                  {exitPupil} mm
                </p>
                <p className="text-[10px] font-mono text-slate-500">Human eye dilates 5–7mm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
