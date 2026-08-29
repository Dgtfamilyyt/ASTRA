import React, { useState } from 'react';
import { Camera, Sparkles, Telescope, Eye, Layers, User, MapPin, ZoomIn } from 'lucide-react';
import { ASTROPHOTOGRAPHY_GALLERY } from '../../data/astronomyData';
import { GalleryItem } from '../../types';
import { LightboxModal } from './LightboxModal';

export const AstrophotographyGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Moon', 'Sun', 'Planets', 'Nebulae', 'Galaxies', 'Campus Sky'];

  const filteredItems = selectedCategory === 'All'
    ? ASTROPHOTOGRAPHY_GALLERY
    : ASTROPHOTOGRAPHY_GALLERY.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#04060f] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>ASTRA SKY ARCHIVE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            STUDENT ASTROPHOTOGRAPHY
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A gallery of deep space nebulae, lunar craters, planetary cloud belts, and solar flares captured by ASTRA student astronomers from the PSG iTech terrace and Coimbatore dark sky expeditions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="stargaze-card rounded-2xl overflow-hidden group cursor-pointer border border-blue-950 hover:border-blue-500/50 transition-all hover:scale-[1.02] flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative h-60 overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060918] via-transparent to-black/30 opacity-80" />

                {/* Overlay Hover Pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-600/90 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Inspect EXIF & Optics</span>
                  </span>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950/90 text-cyan-300 border border-blue-800 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-slate-300 backdrop-blur-md">
                    {item.captureDate}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-300 truncate">
                    {item.targetObject}
                  </p>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-4 bg-[#070b1c] space-y-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-300 font-semibold truncate">
                    <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    {item.photographerName}
                  </span>
                  <span className="text-[11px] text-cyan-400 font-bold shrink-0">
                    {item.exposureTime}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 truncate">
                  {item.telescopeUsed} • {item.camera}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          item={activeLightboxItem}
          isOpen={!!activeLightboxItem}
          onClose={() => setActiveLightboxItem(null)}
        />
      </div>
    </section>
  );
};
