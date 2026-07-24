import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'exterior' | 'shelves' | 'devices' | 'staff';
  imageUrl: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'New Mantu Pharma Storefront',
    description: 'Our primary medical counter located at Tekari Road, Gaya, Bihar.',
    category: 'exterior',
    imageUrl: 'https://picsum.photos/seed/pharmacyfront1/800/600'
  },
  {
    id: 'g2',
    title: 'Pristine Medicine Shelves',
    description: 'Neatly organized racks storing life-saving prescriptions and ethical medicines.',
    category: 'shelves',
    imageUrl: '/src/assets/images/pharmacy_hero_banner_1784098319405.jpg'
  },
  {
    id: 'g3',
    title: 'Modern Diagnostic Devices',
    description: 'Imported blood pressure gauges, blood sugar reader kits, and pediatric nebulizers.',
    category: 'devices',
    imageUrl: 'https://picsum.photos/seed/medicaldevices2/800/600'
  },
  {
    id: 'g4',
    title: 'Certified Pharmacist Guidance',
    description: 'Mantu Kumar verifying drug safety guidelines and generic equivalency lists.',
    category: 'staff',
    imageUrl: '/src/assets/images/pharmacist_consultation_about_1784098339254.jpg'
  },
  {
    id: 'g5',
    title: 'Maternal & Baby Care Section',
    description: 'Pediatric care range from certified brands, baby food powders, and skin care kits.',
    category: 'shelves',
    imageUrl: 'https://picsum.photos/seed/babysection3/800/600'
  },
  {
    id: 'g6',
    title: 'Surgical & Sterile Bandages',
    description: 'Bulk clinics supplies, sterile cotton rolls, antiseptics, and medical disposables.',
    category: 'devices',
    imageUrl: 'https://picsum.photos/seed/surgicalkits5/800/600'
  }
];

interface GallerySectionProps {
  darkMode: boolean;
}

export default function GallerySection({ darkMode }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'exterior' | 'shelves' | 'devices' | 'staff'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1); // 1x, 1.5x, 2x zoom!

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setZoomScale(1);
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setZoomScale(1);
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const cycleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomScale === 1) setZoomScale(1.5);
    else if (zoomScale === 1.5) setZoomScale(2);
    else setZoomScale(1);
  };

  return (
    <div className="space-y-8" id="gallery-section-root">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-black text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
          Store Gallery & Inspection
        </span>
        <h2 className="text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-2">Explore New Mantu Pharma</h2>
        <p className={`text-sm mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          A visual look inside our professional premises, well-organized storage shelves, medical equipment counters, and clinical environments.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8" id="gallery-filters">
        {(['all', 'exterior', 'shelves', 'devices', 'staff'] as const).map((tab) => {
          const isSelected = activeFilter === tab;
          const labelMap = {
            all: 'All Images',
            exterior: 'Store Front',
            shelves: 'Medicine Shelves',
            devices: 'Medical Equipment',
            staff: 'Staff & Care'
          };
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveFilter(tab);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-brand-green text-white shadow-sm'
                  : darkMode
                    ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-850'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {labelMap[tab]}
            </button>
          );
        })}
      </div>

      {/* Masonry / Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-masonry-grid">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                id={`gallery-card-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 aspect-[4/3] bg-slate-100"
                onClick={() => {
                  setLightboxIndex(index);
                  setZoomScale(1);
                }}
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.3]"
                  referrerPolicy="no-referrer"
                />

                {/* Cover Details */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full w-max mb-2">
                    {item.category === 'exterior' ? 'Store Front' : item.category === 'shelves' ? 'Medicine Shelf' : item.category === 'devices' ? 'Device' : 'Pharmacist'}
                  </span>
                  <h4 className="text-white font-bold text-base leading-tight tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <span className="text-[10px] text-brand-green font-bold flex items-center gap-1 mt-3">
                    <LucideIcon name="Search" className="w-3 h-3" /> Click to Zoom & Inspect
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal with Incremental Zoom */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-6"
            onClick={() => setLightboxIndex(null)}
            id="gallery-lightbox"
          >
            {/* Top Bar inside Lightbox */}
            <div className="w-full max-w-5xl flex items-center justify-between text-white" onClick={(e) => e.stopPropagation()}>
              <div>
                <h4 className="font-bold text-lg font-display tracking-tight text-white">
                  {filteredItems[lightboxIndex].title}
                </h4>
                <p className="text-xs text-slate-400">
                  Image {lightboxIndex + 1} of {filteredItems.length} • Category: <span className="capitalize">{filteredItems[lightboxIndex].category}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Toggle */}
                <button
                  onClick={cycleZoom}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1 transition-colors text-xs font-bold cursor-pointer"
                  title="Toggle Zoom level"
                >
                  <LucideIcon name="Search" className="w-4 h-4 text-brand-green" />
                  <span>Zoom: {zoomScale}x</span>
                </button>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
                  title="Close Lightbox"
                >
                  <LucideIcon name="X" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stage: Image Container with zoom scale */}
            <div className="relative w-full max-w-3xl flex items-center justify-center flex-grow py-4" onClick={(e) => e.stopPropagation()}>
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-0 z-10 p-3 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full transition-colors cursor-pointer border border-slate-800"
                title="Previous Image"
              >
                <LucideIcon name="ChevronDown" className="w-6 h-6 rotate-90" />
              </button>

              {/* Central Zooming Frame */}
              <div className="overflow-hidden rounded-2xl max-h-[70vh] flex items-center justify-center bg-slate-950 border border-slate-800 shadow-2xl">
                <img
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  style={{
                    transform: `scale(${zoomScale})`,
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="max-w-full max-h-[70vh] object-contain select-none cursor-zoom-in"
                  onClick={cycleZoom}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-0 z-10 p-3 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full transition-colors cursor-pointer border border-slate-800"
                title="Next Image"
              >
                <LucideIcon name="ChevronDown" className="w-6 h-6 -rotate-90" />
              </button>
            </div>

            {/* Bottom Bar: Description and Navigation indicator */}
            <div className="w-full max-w-3xl text-center text-white pb-2" onClick={(e) => e.stopPropagation()}>
              <p className="text-sm text-slate-350 max-w-xl mx-auto leading-relaxed">
                {filteredItems[lightboxIndex].description}
              </p>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block mt-3 tracking-widest">
                Use arrows to navigate • Click image to zoom (1x &rarr; 1.5x &rarr; 2x)
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
