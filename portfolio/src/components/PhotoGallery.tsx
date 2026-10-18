'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { photos, PhotoItem } from '@/data/photos';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type CategoryFilter = 'All' | 'Cinematic Stills' | 'Portraits' | 'Atmospheric';

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const reducedMotion = useReducedMotion();

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const selectedIndex = selectedPhoto ? photos.findIndex((p) => p.id === selectedPhoto.id) : -1;

  const handleNext = useCallback(() => {
    if (selectedIndex === -1) return;
    const next = (selectedIndex + 1) % photos.length;
    setSelectedPhoto(photos[next]);
  }, [selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === -1) return;
    const prev = (selectedIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prev]);
  }, [selectedIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Escape':
          e.preventDefault();
          setSelectedPhoto(null);
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrev();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, handleNext, handlePrev]);

  return (
    <section
      id="stills"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-background"
      aria-label="Color grading and photography gallery"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-satoshi text-xs text-white/40 tracking-[0.3em] uppercase">
                03 // Photography & Stills
              </span>
            </div>
            <h2 className="font-clash text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[0.95]">
              COLOR GRADING{' '}
              <span className="text-accent">&</span>{' '}
              STILLS<span className="text-accent">.</span>
            </h2>
            <p className="font-satoshi text-base sm:text-lg text-white/50 max-w-xl mt-3 font-light">
              Frame-by-frame color science, mood formulation, and photographic retouching across cinema stills and portraiture.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Cinematic Stills', 'Portraits', 'Atmospheric'] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-satoshi tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-accent text-black font-bold shadow-lg shadow-accent/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
                data-cursor="link"
              >
                {cat === 'All' ? `All (${photos.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Bento / Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: reducedMotion ? 0 : 0.4 }}
                className={`group relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 hover:border-accent/50 transition-all duration-500 cursor-pointer ${
                  photo.aspectRatio === 'landscape' ? 'aspect-[16/10]' : 'aspect-[3/4]'
                }`}
                onClick={() => setSelectedPhoto(photo)}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${photo.title}`}
                data-cursor="play"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPhoto(photo);
                  }
                }}
              >
                {/* Photo Image */}
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Corner Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-white/15 text-[10px] font-mono text-accent uppercase tracking-wider backdrop-blur-md">
                    {photo.number}
                  </span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-satoshi text-white/70 uppercase tracking-wider backdrop-blur-md">
                    {photo.category}
                  </span>
                </div>

                {/* Bottom Metadata Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-[11px] font-mono text-accent block mb-1">
                    {photo.gradeProfile}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="font-clash text-xl md:text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                      {photo.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[10003] bg-black/95 backdrop-blur-2xl flex flex-col justify-between items-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Color grading detail for ${selectedPhoto.title}`}
          >
            {/* Header bar */}
            <div className="w-full max-w-7xl flex items-center justify-between pb-4 border-b border-white/10 z-20">
              <div className="flex items-center gap-4">
                <span className="font-clash text-accent font-bold text-sm">
                  {selectedPhoto.number}
                </span>
                <span className="text-white/20">|</span>
                <h3 className="font-clash text-xl md:text-2xl font-bold text-white">
                  {selectedPhoto.title}
                </h3>
                <span className="hidden sm:inline-block px-3 py-0.5 rounded-full text-xs font-satoshi bg-white/10 text-white/70">
                  {selectedPhoto.category}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden md:inline-block text-xs font-satoshi text-white/40 tracking-wider">
                  ARROWS to Navigate · ESC to Close
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent hover:text-black text-white flex items-center justify-center transition-colors"
                  aria-label="Close photo preview"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Center Image */}
            <div className="relative flex-1 w-full max-w-7xl my-4 flex items-center justify-center overflow-hidden">
              <div className="relative max-h-full max-w-full aspect-auto rounded-xl overflow-hidden shadow-2xl border border-white/15">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] md:max-h-[75vh] w-auto object-contain rounded-lg"
                />
              </div>

              {/* Prev / Next float buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white hover:border-accent hover:text-accent flex items-center justify-center transition-all"
                aria-label="Previous photo"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white hover:border-accent hover:text-accent flex items-center justify-center transition-all"
                aria-label="Next photo"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Footer info bar */}
            <div className="w-full max-w-7xl pt-4 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-white z-20">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-0.5">
                  GRADE NOTES
                </span>
                <p className="font-satoshi text-xs sm:text-sm text-white/70 max-w-2xl">
                  {selectedPhoto.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-white/40">
                <span>PROFILE: {selectedPhoto.gradeProfile}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
