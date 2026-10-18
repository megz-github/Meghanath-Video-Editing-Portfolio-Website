'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, projects } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export default function VideoModal({ project, onClose, onSelectProject }: VideoModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const reducedMotion = useReducedMotion();

  // Find currentIndex for next/prev
  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;

  const handleNext = useCallback(() => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % projects.length;
    onSelectProject(projects[nextIndex]);
  }, [currentIndex, onSelectProject]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIndex]);
  }, [currentIndex, onSelectProject]);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation & controls
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      switch (e.code) {
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrev();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, handleNext, handlePrev, toggleFullscreen]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
          className="fixed inset-0 z-[10002] bg-black/95 backdrop-blur-2xl flex flex-col justify-between items-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Cinematic player for ${project.title}`}
        >
          {/* Header Bar */}
          <div className="w-full max-w-7xl px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/10 z-20">
            <div className="flex items-center gap-3">
              <span className="font-clash text-accent font-bold text-lg md:text-xl">
                {project.number}
              </span>
              <span className="text-white/30">|</span>
              <h2 className="font-clash text-lg md:text-2xl font-bold text-white tracking-wide">
                {project.title}
              </h2>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-satoshi bg-white/10 text-white/70">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 border border-red-500/30 text-xs font-satoshi font-medium transition-colors"
                title="Watch directly on YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>YouTube 4K</span>
              </a>

              <span className="hidden md:inline-block text-xs font-satoshi text-white/40 tracking-wider">
                ARROWS to Switch · ESC to Close
              </span>

              <button
                onClick={onClose}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-accent hover:text-black text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Close video player"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Center Video Area */}
          <div className="relative flex-1 w-full flex items-center justify-center px-4 md:px-16 overflow-hidden">
            <motion.div
              layoutId={project.id}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-accent/10 border border-white/15 bg-black"
            >
              <iframe
                key={project.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>

            {/* Quick Next / Prev Float Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white hover:border-accent hover:text-accent flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
              aria-label="Previous project"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white hover:border-accent hover:text-accent flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
              aria-label="Next project"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="w-full max-w-7xl px-6 pb-6 pt-3 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 text-white">
            <p className="text-xs md:text-sm font-satoshi text-white/60 max-w-2xl text-center sm:text-left">
              {project.description}
            </p>

            <div className="flex items-center gap-4">
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-satoshi text-accent hover:underline flex items-center gap-1"
              >
                <span>Watch on YouTube</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <button
                onClick={toggleFullscreen}
                className="hover:text-accent transition-colors p-1"
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                title="Toggle Fullscreen (F)"
              >
                {isFullscreen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0l5 0m-5 0l0 5m11 0l5-5m0 0l-5 0m5 0l0 5M9 15l-5 5m0 0l5 0m-5 0l0-5m11 0l5 5m0 0l-5 0m5 0l0-5" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
