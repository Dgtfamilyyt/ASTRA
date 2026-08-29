import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Globe, 
  Sun, 
  Disc, 
  Layers, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Maximize2,
  Info,
  MapPin
} from 'lucide-react';

interface RealmStep {
  id: string;
  name: string;
  realmType: string;
  scaleMetric: string;
  distanceFromCampus: string;
  tagline: string;
  description: string;
  scientificContext: string;
  whatWeObserveAtAstra: string;
  gradient: string;
  ambientColor: string;
  imageUrl: string;
}

const COSMOS_STEPS: RealmStep[] = [
  {
    id: 'psg-itech',
    name: 'PSG iTech Campus',
    realmType: 'Ground Zero Observatory',
    scaleMetric: '10² meters (0.1 km)',
    distanceFromCampus: '0 km (Ground Station)',
    tagline: 'Where our scientific journey begins.',
    description: 'Neelambur, Coimbatore. From the Civil Engineering terrace and Central Quadrangle, ASTRA members set up Dobsonian and motorized equatorial telescopes under the Tamil Nadu night sky.',
    scientificContext: 'Elevation: 411 m above MSL. Latitude 11.0772° N gives us exceptional visibility of both northern constellations and deep southern skies like the Southern Cross & Carina.',
    whatWeObserveAtAstra: 'Direct telescope eyepieces, laser sky tours, solar white-light sunspot monitoring, and campus astro-gatherings.',
    gradient: 'from-blue-900/40 via-indigo-950/60 to-black',
    ambientColor: '#3b82f6',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore & The Western Ghats',
    realmType: 'Regional Troposphere',
    scaleMetric: '10⁵ meters (100 km)',
    distanceFromCampus: '10 – 100 km',
    tagline: 'Framed by the ancient Nilgiri foothills.',
    description: 'Surrounded by the Western Ghats mountain ranges, Coimbatore offers dark sky expeditions to Siruvani, Anaikatti, and Valparai for deep-sky astrophotography expeditions.',
    scientificContext: 'Mountain air corridors reduce atmospheric turbulence, providing exceptional nights of sub-2 arcsecond seeing for high-magnification planetary imaging.',
    whatWeObserveAtAstra: 'Narrowband deep-sky imaging expeditions, dark sky Milky Way panoramas, and rural school outreach camps.',
    gradient: 'from-cyan-900/40 via-teal-950/60 to-black',
    ambientColor: '#06b6d4',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'earth',
    name: 'Planet Earth & Low Earth Orbit',
    realmType: 'Planetary Biosphere',
    scaleMetric: '10⁷ meters (12,742 km diameter)',
    distanceFromCampus: '400 km (ISS Altitude)',
    tagline: 'Our fragile pale blue dot in the cosmic void.',
    description: 'Earth’s nitrogen-oxygen atmosphere and geomagnetic magnetosphere shield life from solar winds, while granting us a clear optical window to view the universe.',
    scientificContext: 'Orbital velocity of the International Space Station is 7.66 km/s (27,600 km/h), completing an orbit every 92 minutes. ASTRA tracks ISS passes over PSG iTech.',
    whatWeObserveAtAstra: 'High-speed ISS transits across the Sun & Moon, radio meteor echoes via RTL-SDR receivers, and satellite flare predictions.',
    gradient: 'from-blue-800/40 via-emerald-950/60 to-black',
    ambientColor: '#10b981',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'solar-system',
    name: 'The Solar System',
    realmType: 'Heliocentric Realm',
    scaleMetric: '10¹³ meters (100 Astronomical Units)',
    distanceFromCampus: '1 AU to 40 AU (150M – 6B km)',
    tagline: 'Our gravitational family bound to the Sun.',
    description: 'Eight planets, hundreds of moons, the asteroid belt, and the outer Kuiper belt revolving in harmonic Keplerian orbits around our home star.',
    scientificContext: 'Light takes 8.3 minutes to reach PSG iTech from the Sun, 43 minutes from Jupiter, and over 4 hours from distant Neptune and Pluto.',
    whatWeObserveAtAstra: 'Jupiter’s Great Red Spot and 4 Galilean moons, Saturn’s icy rings and Cassini division, Mars polar ice caps, Venus phases, and visiting comets.',
    gradient: 'from-amber-900/40 via-orange-950/60 to-black',
    ambientColor: '#f59e0b',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'milky-way',
    name: 'The Milky Way Galaxy',
    realmType: 'Galactic Spiral Structure',
    scaleMetric: '10²¹ meters (100,000 Light-Years)',
    distanceFromCampus: '26,000 light-years to Galactic Center',
    tagline: 'A vast spinning spiral of 200 billion stars.',
    description: 'PSG iTech is located inside the Orion-Cygnus Arm of our barred spiral galaxy. At the core sits Sagittarius A*, a supermassive black hole with 4.15 million solar masses.',
    scientificContext: 'The Sun orbits the galactic center at 220 km/s, taking approximately 230 million years to complete one "Galactic Cosmic Year".',
    whatWeObserveAtAstra: 'The Great Orion Nebula (M42), Pleiades open cluster (M45), Lagoon Nebula (M8), Ring Nebula (M57), and the blazing summer galactic core.',
    gradient: 'from-purple-900/40 via-indigo-950/60 to-black',
    ambientColor: '#8b5cf6',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'deep-space',
    name: 'Deep Space & The Cosmic Web',
    realmType: 'Observable Universe',
    scaleMetric: '10²⁶ meters (93 Billion Light-Years)',
    distanceFromCampus: '2.5M to billions of light-years',
    tagline: 'The infinite tapestry of galaxies and relativistic spacetime.',
    description: 'Beyond our galaxy lies the Local Group (including the Andromeda Galaxy M31), the Virgo Supercluster, Laniakea, and billions of distant galaxies connected by filaments of dark matter.',
    scientificContext: 'Light we capture at PSG iTech from the Andromeda Galaxy left its stars 2.5 million years ago—before modern humans walked the Earth.',
    whatWeObserveAtAstra: 'Andromeda Galaxy (M31) spiral arms, Triangulum Galaxy (M33), Whirlpool Galaxy (M51), and deep space long-exposure integrations.',
    gradient: 'from-rose-900/40 via-purple-950/60 to-black',
    ambientColor: '#ec4899',
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80',
  },
];

export const CampusToCosmos: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentStep = COSMOS_STEPS[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => (prev + 1) % COSMOS_STEPS.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Cosmic canvas particle zoom effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const particles: { x: number; y: number; z: number; size: number }[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      particles.forEach((p) => {
        p.z -= 1.5 + currentStepIndex * 0.8;
        if (p.z <= 0) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 2;
          p.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 300 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (1000 - p.z) / 500);
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.5, p.size * k), 0, Math.PI * 2);
          ctx.fillStyle = currentStep.ambientColor;
          ctx.globalAlpha = alpha * 0.7;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [currentStepIndex, currentStep.ambientColor]);

  return (
    <section
      id="cosmos"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#03050c] relative overflow-hidden border-t border-b border-blue-900/30"
    >
      {/* Background Cosmic Grid */}
      <div className="absolute inset-0 cosmic-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SIGNATURE EXPERIENCE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            FROM CAMPUS TO COSMOS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            "We explore the universe from our own campus." Take an interactive journey across 26 orders of physical magnitude — from PSG iTech, Coimbatore to the edge of the observable universe.
          </p>
        </div>

        {/* Step Progress Sequence Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
          {COSMOS_STEPS.map((step, idx) => {
            const isSelected = currentStepIndex === idx;
            return (
              <button
                key={step.id}
                id={`cosmos-step-btn-${idx}`}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  setIsPlaying(false);
                }}
                className={`p-3 rounded-xl text-left transition-all duration-200 border relative ${
                  isSelected
                    ? 'bg-blue-900/40 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-[#080d1e]/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-blue-400">
                    Step 0{idx + 1}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
                <p className="font-heading font-bold text-xs sm:text-sm truncate">
                  {step.name.split(' ')[0]}
                </p>
                <p className="text-[10px] font-mono text-slate-400 truncate">
                  {step.scaleMetric.split(' ')[0]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Display Stage Card */}
        <div className="stargaze-glass rounded-2xl border border-blue-900/40 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Visual Canvas / Image Realm */}
            <div className="lg:col-span-7 relative flex items-center justify-center p-6 sm:p-8 overflow-hidden bg-gradient-to-br from-black via-[#060a17] to-slate-950">
              {/* Particle Canvas Animation */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none opacity-90 z-0"
              />

              {/* Background Artwork */}
              <img
                src={currentStep.imageUrl}
                alt={currentStep.name}
                className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen scale-105 transition-all duration-700 pointer-events-none"
              />

              {/* Floating Scale Metric Visualizer */}
              <div className="relative z-10 text-center max-w-md p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono mb-3">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Physical Realm: {currentStep.realmType}</span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mb-2">
                  {currentStep.name}
                </h3>

                <p className="text-cyan-300 font-mono text-sm sm:text-base font-semibold mb-4">
                  Scale: {currentStep.scaleMetric}
                </p>

                <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed">
                  "{currentStep.tagline}"
                </p>

                {/* Distance Badge */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>From PSG iTech: {currentStep.distanceFromCampus}</span>
                </div>
              </div>
            </div>

            {/* Scientific Information & ASTRA Context Panel */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#070b1c]/95 border-t lg:border-t-0 lg:border-l border-blue-900/40">
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase text-blue-400 tracking-wider">
                    Cosmic Exploration Level 0{currentStepIndex + 1}
                  </span>
                  <h4 className="font-heading font-bold text-xl sm:text-2xl text-white mt-1">
                    {currentStep.name}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    {currentStep.description}
                  </p>
                </div>

                {/* Scientific Insight Card */}
                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/20">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-300 mb-1.5 font-mono">
                    <Info className="w-4 h-4 text-cyan-400" />
                    <span>Scientific Context</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStep.scientificContext}
                  </p>
                </div>

                {/* What we observe at ASTRA */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1.5 font-mono">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>ASTRA Telescope Target</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStep.whatWeObserveAtAstra}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  <button
                    id="cosmos-prev-btn"
                    onClick={() => {
                      setCurrentStepIndex((prev) =>
                        prev === 0 ? COSMOS_STEPS.length - 1 : prev - 1
                      );
                      setIsPlaying(false);
                    }}
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    id="cosmos-play-toggle-btn"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-3.5 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Pause' : 'Auto Tour'}</span>
                  </button>

                  <button
                    id="cosmos-next-btn"
                    onClick={() => {
                      setCurrentStepIndex((prev) => (prev + 1) % COSMOS_STEPS.length);
                      setIsPlaying(false);
                    }}
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                    aria-label="Next step"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs text-slate-400">
                    Step <strong className="text-white">{currentStepIndex + 1}</strong> of {COSMOS_STEPS.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
