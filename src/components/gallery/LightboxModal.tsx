import React from 'react';
import { X, Camera, Telescope, Clock, Layers, User, MapPin, Download, Share2 } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="stargaze-card rounded-3xl max-w-5xl w-full border border-blue-500/40 overflow-hidden shadow-2xl relative my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Main Visual Frame */}
          <div className="lg:col-span-7 bg-black flex items-center justify-center p-4 relative group">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Metadata & Technical Workflow Info */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#070c1e] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950 text-cyan-300 border border-blue-800">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {item.captureDate}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-blue-400 mt-0.5">
                  Target: {item.targetObject}
                </p>
              </div>

              {/* Observer Credits */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{item.photographerName}</p>
                  <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    {item.location}
                  </p>
                </div>
              </div>

              {/* Technical EXIF Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block flex items-center gap-1">
                    <Telescope className="w-3 h-3 text-cyan-400" />
                    Telescope / Lens
                  </span>
                  <p className="font-semibold text-slate-200 mt-1 truncate">{item.telescopeUsed}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block flex items-center gap-1">
                    <Camera className="w-3 h-3 text-amber-400" />
                    Camera Sensor
                  </span>
                  <p className="font-semibold text-slate-200 mt-1 truncate">{item.camera}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    Integration Time
                  </span>
                  <p className="font-semibold text-slate-200 mt-1">{item.exposureTime}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block flex items-center gap-1">
                    <Layers className="w-3 h-3 text-indigo-400" />
                    Tracking Mount
                  </span>
                  <p className="font-semibold text-slate-200 mt-1 truncate">{item.mount}</p>
                </div>
              </div>

              {/* Processing Workflow Notes */}
              {item.processingSoftware && (
                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs">
                  <span className="font-mono text-cyan-400 font-bold block mb-1 text-[11px]">
                    Image Calibration & Stacking:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {item.processingSoftware}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-bold text-xs"
              >
                Close Archive View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
