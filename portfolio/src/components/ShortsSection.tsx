'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShortVideo, shorts } from '@/data/shorts';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function ShortsSection() {
  const [selectedShort, setSelectedShort] = useState<ShortVideo | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const cardVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const reducedMotion = useReducedMotion();

  // Modal player state
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const selectedIndex = selectedShort
    ? shorts.findIndex((s) => s.id === selectedShort.id)
    : -1;

  const handleNext = useCallback(() => {
    if (selectedIndex === -1) return;
    const nextIndex = (selectedIndex + 1) % shorts.length;
    setSelectedShort(shorts[nextIndex]);
  }, [selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === -1) return;
    const prevIndex = (selectedIndex - 1 + shorts.length) % shorts.length;
    setSelectedShort(shorts[prevIndex]);
  }, [selectedIndex]);

  const toggleModalPlay = useCallback(() => {
    const v = modalVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleModalMute = useCallback(() => {
    const v = modalVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!selectedShort) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Escape':
          e.preventDefault();
          setSelectedShort(null);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          handlePrev();
          break;
        case 'Space':
          e.preventDefault();
          toggleModalPlay();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleModalMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedShort, handleNext, handlePrev, toggleModalPlay, toggleModalMute]);

  // Handle card video play/pause on hover
  const handleCardMouseEnter = (id: string) => {
    setHoveredId(id);
    const video = cardVideoRefs.current[id];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleCardMouseLeave = (id: string) => {
    setHoveredId(null);
    const video = cardVideoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section
      id="shorts"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-background border-t border-white/5"
      aria-label="Short form videos and reels"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping-slow" />
              <span className="font-satoshi text-xs text-white/40 tracking-[0.3em] uppercase">
                04 // Vertical Cinema & Reels
              </span>
            </div>
            <h2 className="font-clash text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[0.95]">
              SHORT FORM{' '}
              <span className="text-accent">&</span>{' '}
              REELS<span className="text-accent">.</span>
            </h2>
            <p className="font-satoshi text-base sm:text-lg text-white/50 max-w-2xl mt-3 font-light">
              High-retention 9:16 vertical storytelling, rhythmic beat-syncing, and architectural speed-ramp cinematography crafted for Reels, Shorts, and TikTok.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="text-accent font-bold">5 REELS</span>
            <span>·</span>
            <span>1080×1920 9:16 VERTICAL</span>
          </div>
        </div>

        {/* 5-Column Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {shorts.map((short) => {
            const isHovered = hoveredId === short.id;

            return (
              <div
                key={short.id}
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-zinc-950 border border-white/10 hover:border-accent/60 transition-all duration-500 cursor-pointer shadow-xl"
                onClick={() => setSelectedShort(short)}
                onMouseEnter={() => handleCardMouseEnter(short.id)}
                onMouseLeave={() => handleCardMouseLeave(short.id)}
                data-cursor="play"
                role="button"
                tabIndex={0}
                aria-label={`Play ${short.title} vertical reel`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedShort(short);
                  }
                }}
              >
                {/* Poster Image (shown when not hovered or as fallback) */}
                <Image
                  src={short.posterSrc}
                  alt={short.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  className={`object-cover transition-opacity duration-300 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {/* Looping preview video on hover */}
                <video
                  ref={(el) => {
                    cardVideoRefs.current[short.id] = el;
                  }}
                  src={short.videoSrc}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isHovered ? 'opacity-100 scale-105' : 'opacity-0'
                  }`}
                  style={{ transition: 'opacity 0.3s ease, transform 0.7s ease-out' }}
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/40 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-accent uppercase tracking-wider backdrop-blur-md">
                    {short.number}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white/70 backdrop-blur-md">
                    {short.duration}
                  </span>
                </div>

                {/* Center Play Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-12 h-12 rounded-full bg-accent/90 text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Meta Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 pointer-events-none transform group-hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-[10px] font-mono text-accent uppercase tracking-wider mb-1">
                    {short.clientOrProject}
                  </p>
                  <h3 className="font-clash text-base md:text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors">
                    {short.title}
                  </h3>
                  <p className="font-satoshi text-xs text-white/50 mt-1 truncate">
                    {short.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Vertical Cinema Modal */}
      <AnimatePresence>
        {selectedShort && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[10003] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Short form player for ${selectedShort.title}`}
          >
            {/* Modal Top Header */}
            <div className="w-full max-w-4xl flex items-center justify-between border-b border-white/10 pb-4 z-20">
              <div className="flex items-center gap-3">
                <span className="font-clash text-accent font-bold text-lg">
                  {selectedShort.number}
                </span>
                <span className="text-white/30">|</span>
                <h3 className="font-clash text-lg md:text-xl font-bold text-white">
                  {selectedShort.title}
                </h3>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-satoshi bg-white/10 text-white/70">
                  {selectedShort.category}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden md:inline-block text-xs font-satoshi text-white/40">
                  SPACE to Play/Pause · ARROWS to Navigate · ESC to Close
                </span>

                <button
                  onClick={() => setSelectedShort(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent hover:text-black text-white flex items-center justify-center transition-colors"
                  aria-label="Close short player"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Centered Phone Player Frame */}
            <div className="relative flex-1 w-full flex items-center justify-center py-4 overflow-hidden">
              <div
                className="relative h-full max-h-[75vh] md:max-h-[80vh] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl shadow-accent/10 border-2 border-white/20 bg-black cursor-pointer group"
                onClick={toggleModalPlay}
              >
                <video
                  ref={modalVideoRef}
                  key={selectedShort.id}
                  src={selectedShort.videoSrc}
                  poster={selectedShort.posterSrc}
                  autoPlay
                  playsInline
                  loop
                  muted={isMuted}
                  className="w-full h-full object-cover"
                  onTimeUpdate={() => {
                    if (modalVideoRef.current) setCurrentTime(modalVideoRef.current.currentTime);
                  }}
                  onLoadedMetadata={() => {
                    if (modalVideoRef.current) setDuration(modalVideoRef.current.duration);
                  }}
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Play/Pause Center Indicator */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-accent text-black flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Sound Toggle Floating Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleModalMute();
                  }}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white hover:text-accent hover:border-accent flex items-center justify-center transition-colors backdrop-blur-md z-20"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  title="Toggle Mute (M)"
                >
                  {isMuted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>

                {/* Progress Bar inside frame */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div
                    className="h-full bg-accent transition-all duration-100"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Prev / Next Floating Navigation */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white hover:border-accent hover:text-accent flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
                aria-label="Previous reel"
                title="Previous Reel (← / ↑)"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white hover:border-accent hover:text-accent flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
                aria-label="Next reel"
                title="Next Reel (→ / ↓)"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Modal Bottom Info */}
            <div className="w-full max-w-4xl border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
              <div>
                <p className="text-xs font-mono text-accent uppercase tracking-wider">
                  {selectedShort.clientOrProject} · {selectedShort.category}
                </p>
                <p className="text-xs md:text-sm font-satoshi text-white/70 max-w-xl mt-1">
                  {selectedShort.description}
                </p>
              </div>

              <div className="font-mono text-xs text-white/50 tracking-wider">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1">/</span>
                <span>{formatTime(duration || 0)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
