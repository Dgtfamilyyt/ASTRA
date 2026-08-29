import React, { useState, useEffect, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  Eye, 
  Compass, 
  Moon, 
  Layers,
  Sparkles,
  Sliders
} from 'lucide-react';
import { CONSTELLATIONS, CELESTIAL_OBJECTS } from '../../data/astronomyData';
import { getSimulatedObjectPositions } from '../../services/astronomyService';
import { CelestialObject, Constellation } from '../../types';

interface InteractiveStarMapProps {
  onSelectObject: (obj: CelestialObject) => void;
}

export const InteractiveStarMap: React.FC<InteractiveStarMapProps> = ({
  onSelectObject,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation | null>(CONSTELLATIONS[0]);
  const [timeHour, setTimeHour] = useState<number>(3); // 3 = ~9 PM (6 PM + 3 hrs)
  const [showConstellationLines, setShowConstellationLines] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Time format helper (0 = 06:00 PM, 6 = 12:00 AM Midnight, 12 = 06:00 AM Dawn)
  const formatTimeLabel = (h: number) => {
    const totalHour = (18 + h) % 24;
    const period = totalHour >= 12 && totalHour < 24 ? 'PM' : 'AM';
    const displayHour = totalHour % 12 === 0 ? 12 : totalHour % 12;
    return `${displayHour.toString().padStart(2, '0')}:00 ${period} IST`;
  };

  const dynamicObjects = getSimulatedObjectPositions(timeHour);

  // Render the star map canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    // Center point & Pan/Zoom transform
    ctx.translate(width / 2 + pan.x, height / 2 + pan.y);
    ctx.scale(zoom, zoom);

    // 1. Draw Celestial Dome Horizon Circle
    const domeRadius = Math.min(width, height) * 0.42;
    ctx.beginPath();
    ctx.arc(0, 0, domeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#050a1b';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 2. Altitude/Azimuth Grid Lines
    if (showGrid) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      // Concentric circles (30°, 60° altitude)
      [0.33, 0.66].forEach((rFactor) => {
        ctx.beginPath();
        ctx.arc(0, 0, domeRadius * rFactor, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Cardinal axes (N-S, E-W)
      ctx.beginPath();
      ctx.moveTo(-domeRadius, 0);
      ctx.lineTo(domeRadius, 0);
      ctx.moveTo(0, -domeRadius);
      ctx.lineTo(domeRadius * 0, domeRadius);
      ctx.stroke();

      // Cardinal markers (North, South, East, West)
      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N (Polaris)', 0, -domeRadius + 15);
      ctx.fillText('S', 0, domeRadius - 15);
      ctx.fillText('E (Rising)', -domeRadius + 25, 0);
      ctx.fillText('W (Setting)', domeRadius - 25, 0);
      ctx.fillText('ZENITH (90°)', 0, -10);
    }

    // 3. Background Random Bright Stars (rotated with time)
    const starAngle = (timeHour * 15 * Math.PI) / 180;
    for (let i = 0; i < 80; i++) {
      const radius = ((i * 37) % 85) / 100 * domeRadius * 0.95;
      const angle = (i * 2.399963 + starAngle) % (Math.PI * 2);
      const sx = radius * Math.cos(angle);
      const sy = radius * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(sx, sy, (i % 3) * 0.7 + 0.8, 0, Math.PI * 2);
      ctx.fillStyle = i % 5 === 0 ? '#bae6fd' : '#ffffff';
      ctx.globalAlpha = 0.6;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 4. Render Constellations (e.g. Orion, Ursa Major)
    CONSTELLATIONS.forEach((c) => {
      const isSelected = selectedConstellation?.id === c.id;
      // Position constellation relative to canvas
      let cx = 0;
      let cy = 0;
      if (c.id === 'orion') {
        cx = -domeRadius * 0.4 * Math.cos(starAngle);
        cy = domeRadius * 0.35 * Math.sin(starAngle);
      } else if (c.id === 'ursa-major') {
        cx = domeRadius * 0.4 * Math.sin(starAngle);
        cy = -domeRadius * 0.5 * Math.cos(starAngle * 0.5);
      } else if (c.id === 'scorpius') {
        cx = domeRadius * 0.5 * Math.cos(starAngle + 1);
        cy = domeRadius * 0.4 * Math.sin(starAngle + 1);
      } else if (c.id === 'cygnus') {
        cx = domeRadius * 0.3 * Math.cos(starAngle + 2);
        cy = -domeRadius * 0.35 * Math.sin(starAngle + 2);
      } else {
        cx = -domeRadius * 0.25;
        cy = -domeRadius * 0.2;
      }

      // Constellation lines
      if (showConstellationLines) {
        ctx.strokeStyle = isSelected ? 'rgba(56, 189, 248, 0.85)' : 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = isSelected ? 1.8 : 1;
        c.lines.forEach(([startIdx, endIdx]) => {
          const s1 = c.keyStars[startIdx];
          const s2 = c.keyStars[endIdx];
          if (s1 && s2) {
            const p1x = cx + (s1.x - 50) * 1.5;
            const p1y = cy + (s1.y - 50) * 1.5;
            const p2x = cx + (s2.x - 50) * 1.5;
            const p2y = cy + (s2.y - 50) * 1.5;
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.stroke();
          }
        });
      }

      // Constellation stars
      c.keyStars.forEach((star) => {
        const px = cx + (star.x - 50) * 1.5;
        const py = cy + (star.y - 50) * 1.5;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1.5, 4 - star.mag * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#38bdf8' : '#e2e8f0';
        ctx.fill();

        if (showLabels && (isSelected || star.mag < 1.5)) {
          ctx.fillStyle = isSelected ? '#7dd3fc' : '#94a3b8';
          ctx.font = '9px monospace';
          ctx.fillText(star.name, px + 5, py - 4);
        }
      });

      // Constellation Center Label
      if (showLabels) {
        ctx.fillStyle = isSelected ? '#38bdf8' : 'rgba(148, 163, 184, 0.6)';
        ctx.font = isSelected ? 'bold 11px sans-serif' : '10px sans-serif';
        ctx.fillText(c.name.toUpperCase(), cx, cy + 35);
      }
    });

    // 5. Render Dynamic Solar System & Deep Sky Objects (Jupiter, Saturn, Moon, Orion Nebula, Andromeda)
    dynamicObjects.forEach((obj) => {
      // Map Altitude (90 to 0) to radius (0 to domeRadius) and Azimuth (0 to 360) to angle
      const altNorm = Math.max(0, Math.min(90, obj.altitudeDegrees)) / 90;
      const objRadius = (1 - altNorm) * (domeRadius * 0.88);
      const azRad = ((obj.azimuthDegrees - 90) * Math.PI) / 180;
      const ox = objRadius * Math.cos(azRad);
      const oy = objRadius * Math.sin(azRad);

      ctx.beginPath();
      let color = '#fef08a';
      let size = 4;

      if (obj.category === 'Planet') {
        color = obj.name === 'Jupiter' ? '#fed7aa' : obj.name === 'Saturn' ? '#fde047' : '#f87171';
        size = 5;
      } else if (obj.category === 'Moon') {
        color = '#ffffff';
        size = 7;
      } else if (obj.category === 'Nebula') {
        color = '#a855f7';
        size = 4;
      } else if (obj.category === 'Galaxy') {
        color = '#38bdf8';
        size = 4;
      }

      ctx.arc(ox, oy, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Outer target glow ring
      ctx.beginPath();
      ctx.arc(ox, oy, size + 3, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1;

      if (showLabels) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`${obj.name}`, ox, oy - 9);
      }
    });

    ctx.restore();
  }, [zoom, pan, timeHour, selectedConstellation, showConstellationLines, showGrid, showLabels, dynamicObjects]);

  // Drag pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="stargaze-card rounded-2xl p-4 sm:p-6 border border-blue-900/40 shadow-2xl flex flex-col space-y-4">
      {/* Top Map Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-bold text-lg text-white">
              Interactive Celestial Dome
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-500/30">
              PSG iTech 11.07° N
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Simulated view of stars, planets, and constellations looking up from Coimbatore
          </p>
        </div>

        {/* Zoom & View Toggles */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            id="starmap-zoom-in"
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            id="starmap-zoom-out"
            onClick={() => setZoom((z) => Math.max(0.7, z - 0.2))}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            id="starmap-reset"
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
            title="Reset Map"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas Frame */}
      <div className="relative w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden bg-[#030612] border border-blue-950 cursor-grab active:cursor-grabbing select-none">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full h-full block"
        />

        {/* Floating Quick Info Badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-cyan-300">
          <span className="text-slate-400">Viewing Time:</span> {formatTimeLabel(timeHour)}
        </div>

        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
          <span>Drag to pan • Click to inspect</span>
        </div>
      </div>

      {/* Night Time Scrubber (6 PM to 6 AM) */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>Time of Night:</span> <strong className="text-white">{formatTimeLabel(timeHour)}</strong>
          </span>
          <span className="text-[11px] text-cyan-400">
            {timeHour < 6 ? 'Evening Twilight' : timeHour < 10 ? 'Midnight Peak' : 'Pre-Dawn Window'}
          </span>
        </div>

        <input
          id="starmap-time-slider"
          type="range"
          min="0"
          max="12"
          step="0.5"
          value={timeHour}
          onChange={(e) => setTimeHour(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>06:00 PM (Sunset)</span>
          <span>12:00 AM (Midnight Zenith)</span>
          <span>06:00 AM (Dawn)</span>
        </div>
      </div>

      {/* Layer Toggles & Constellation Focus */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Highlight Constellation:</span>
          <div className="flex flex-wrap gap-1">
            {CONSTELLATIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedConstellation(selectedConstellation?.id === c.id ? null : c)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedConstellation?.id === c.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* View Switches */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <label className="flex items-center gap-1 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={showConstellationLines}
              onChange={(e) => setShowConstellationLines(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-600"
            />
            <span>Lines</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-600"
            />
            <span>Grid</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-600"
            />
            <span>Labels</span>
          </label>
        </div>
      </div>
    </div>
  );
};
