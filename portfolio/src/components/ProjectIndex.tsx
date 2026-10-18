'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Project, projects } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ProjectIndexProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectIndex({ onSelectProject }: ProjectIndexProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const animate = () => {
      const lerp = 0.12;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleRowEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleRowLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <section
      id="work"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20"
      onMouseMove={handleMouseMove}
      aria-label="Project index"
    >
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-16">
          <span className="font-satoshi text-xs text-white/30 tracking-[0.3em] uppercase">
            All Projects · Click to Watch Fullscreen
          </span>
        </div>

        <div className="space-y-0">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`group border-t border-white/10 last:border-b py-8 md:py-10 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                hoveredIndex !== null && hoveredIndex !== i
                  ? 'opacity-30'
                  : 'opacity-100 hover:pl-4'
              }`}
              onMouseEnter={() => handleRowEnter(i)}
              onMouseLeave={handleRowLeave}
              onClick={() => onSelectProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              data-cursor="play"
              role="button"
              tabIndex={0}
              aria-label={`Open cinematic player for ${project.title}`}
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className="font-clash text-accent text-sm md:text-base font-bold">
                  {project.number}
                </span>
                <h3 className="font-clash text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <span className="font-satoshi text-sm text-white/40">{project.category}</span>
                <span className="font-satoshi text-sm text-white/40">{project.year}</span>
                <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black text-white/40 transition-all duration-300">
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor-following project preview */}
      <div
        ref={previewRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 w-64 md:w-80 aspect-video rounded-xl overflow-hidden shadow-2xl border border-accent/40 bg-black transition-opacity duration-300 ${
          hoveredIndex !== null ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {hoveredIndex !== null && (
          <div className="relative w-full h-full">
            <img
              src={projects[hoveredIndex].posterSrc}
              alt={projects[hoveredIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80 bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
              <span>{projects[hoveredIndex].category}</span>
              <span className="text-accent font-bold">YOUTUBE 4K</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
