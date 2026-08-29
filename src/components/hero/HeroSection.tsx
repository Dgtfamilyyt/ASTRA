import React, { useEffect, useRef } from 'react';
import { 
  Telescope, 
  Moon, 
  Compass, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Eye, 
  Activity,
  Layers,
  ChevronDown
} from 'lucide-react';
import { CLUB_INFO } from '../../data/clubData';
import { calculateMoonPhase, getObservatorySkyConditions } from '../../services/astronomyService';

interface HeroSectionProps {
  onExploreClick: () => void;
  onTonightSkyClick: () => void;
  onObservatoryClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onTonightSkyClick,
  onObservatoryClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const moonInfo = calculateMoonPhase();
  const skyTelemetry = getObservatorySkyConditions();

  // Subtle interactive HTML5 canvas starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Stars generation
    const starCount = Math.min(180, Math.floor((width * height) / 6000));
    const stars: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
      color: string;
    }[] = [];

    const starColors = ['#ffffff', '#bae6fd', '#e0e7ff', '#fef08a'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Shooting stars
    const shootingStars: {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }[] = [];

    const maybeSpawnShootingStar = () => {
      if (Math.random() < 0.015 && shootingStars.filter((s) => s.active).length < 2) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 10 + 12,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          opacity: 1,
          active: true,
        });
      }
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render twinkling stars
      stars.forEach((star) => {
        star.alpha += Math.sin(Date.now() * star.speed) * 0.01;
        if (star.alpha > 1) star.alpha = 1;
        if (star.alpha < 0.1) star.alpha = 0.1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
      });

      // Render shooting stars
      maybeSpawnShootingStar();
      shootingStars.forEach((s) => {
        if (!s.active) return;
        ctx.save();
        ctx.beginPath();
        const endX = s.x + Math.cos(s.angle) * s.length;
        const endY = s.y + Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, endX, endY);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(1, `rgba(186, 230, 253, ${s.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.02;
        if (s.opacity <= 0 || s.x > width || s.y > height) {
          s.active = false;
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#03040a] via-[#050917] to-[#04060f]"
    >
      {/* Interactive Background Starfield */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* Atmospheric deep cosmic glow layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Institutional Pill Tag */}
        <div
          id="hero-institution-badge"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/25 text-blue-300 text-xs sm:text-sm font-medium mb-6 shadow-sm shadow-blue-500/10 animate-fade-in"
        >
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="tracking-wide">
            PSG INSTITUTE OF TECHNOLOGY AND APPLIED RESEARCH
          </span>
          <span className="w-1 h-1 rounded-full bg-blue-400 hidden sm:inline-block" />
          <span className="text-slate-400 text-xs hidden sm:inline-block">Coimbatore</span>
        </div>

        {/* Main Branding Headings */}
        <div className="space-y-3 mb-6">
          <h1
            id="hero-main-title"
            className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-sm"
          >
            ASTRA
          </h1>

          <h2
            id="hero-tagline-heading"
            className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wide text-blue-200"
          >
            LOOK BEYOND. DISCOVER MORE.
          </h2>
        </div>

        {/* Supporting Narrative */}
        <p
          id="hero-supporting-text"
          className="max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed font-normal mb-8 px-2"
        >
          The Astronomy Club of <span className="text-white font-medium">PSG iTech</span> — exploring the night sky, space science, astrophotography and the universe beyond our campus.
        </p>

        {/* Interactive Actions CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-12">
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="px-6 sm:px-8 py-3.5 rounded-xl font-heading font-bold text-sm sm:text-base bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 border border-blue-400/30 transition-all duration-200 flex items-center gap-2.5 group"
          >
            <span>EXPLORE ASTRA</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-tonight-sky-btn"
            onClick={onTonightSkyClick}
            className="px-6 sm:px-8 py-3.5 rounded-xl font-heading font-bold text-sm sm:text-base bg-[#0b1226]/80 hover:bg-[#111c3d] text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/60 shadow-md transition-all duration-200 flex items-center gap-2.5"
          >
            <Moon className="w-4 h-4 text-cyan-300 animate-pulse-subtle" />
            <span>TONIGHT'S SKY</span>
          </button>

          <button
            id="hero-observatory-btn"
            onClick={onObservatoryClick}
            className="px-5 py-3.5 rounded-xl font-heading font-semibold text-xs sm:text-sm bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors flex items-center gap-2"
          >
            <Telescope className="w-4 h-4 text-indigo-400" />
            <span>Virtual Observatory</span>
          </button>
        </div>

        {/* Live Observational Telemetry Ribbon */}
        <div
          id="hero-telemetry-ribbon"
          className="w-full max-w-4xl stargaze-glass rounded-2xl p-4 sm:p-5 border border-blue-900/40 shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {/* Coordinates */}
            <div className="border-r border-slate-800/80 pr-2 last:border-r-0">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                <span>Station Coordinates</span>
              </div>
              <p className="font-mono text-xs sm:text-sm font-semibold text-white">
                11.0772° N, 77.0867° E
              </p>
              <p className="text-[11px] text-slate-400">PSG iTech Campus Terrace</p>
            </div>

            {/* Moon Status */}
            <div className="border-r border-slate-800/80 pr-2 last:border-r-0">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Moon Phase</span>
              </div>
              <p className="font-heading text-xs sm:text-sm font-semibold text-cyan-200">
                {moonInfo.phaseName}
              </p>
              <p className="text-[11px] text-slate-400">{moonInfo.illumination}% Illumination</p>
            </div>

            {/* Sky Seeing */}
            <div className="border-r border-slate-800/80 pr-2 last:border-r-0">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                <span>Seeing Index</span>
              </div>
              <p className="font-heading text-xs sm:text-sm font-semibold text-white">
                {skyTelemetry.seeingIndex}
              </p>
              <p className="text-[11px] text-emerald-400 font-medium">Bortle Class 5 Dark Sky</p>
            </div>

            {/* Observation Condition */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tonight's Status</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <p className="font-heading text-xs sm:text-sm font-semibold text-emerald-300">
                  {skyTelemetry.overallRating}
                </p>
              </div>
              <p className="text-[11px] text-slate-400">Sunset {skyTelemetry.sunSetTime}</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          id="hero-scroll-down-btn"
          onClick={onExploreClick}
          className="mt-12 text-slate-500 hover:text-slate-300 transition-colors flex flex-col items-center gap-1 text-xs font-mono"
          aria-label="Scroll to about section"
        >
          <span>DISCOVER ASTRA</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
        </button>
      </div>
    </section>
  );
};
