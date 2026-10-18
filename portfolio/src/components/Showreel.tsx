'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project, projects } from '@/data/projects';
import { ANIM } from '@/config/animation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

interface ShowreelProps {
  onSelectProject?: (project: Project) => void;
}

export default function Showreel({ onSelectProject }: ShowreelProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const cards = container.querySelectorAll<HTMLElement>('.showreel-card');
    const totalCards = cards.length;

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalCards * 100}vh`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        const videoWrapper = card.querySelector('.video-wrapper') as HTMLElement;
        const number = card.querySelector('.project-number') as HTMLElement;
        const title = card.querySelector('.project-title') as HTMLElement;
        const meta = card.querySelector('.project-meta') as HTMLElement;

        const startPos = i / totalCards;
        const exitPos = (i + 1) / totalCards;

        // Unique reveal per card
        if (i === 0) {
          masterTl.fromTo(
            videoWrapper,
            { scale: 0.65, clipPath: 'inset(18%)' },
            { scale: 1, clipPath: 'inset(0%)', duration: 1, ease: 'none' },
            startPos
          );
        } else if (i === 1) {
          masterTl.fromTo(
            videoWrapper,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'none' },
            startPos
          );
        } else if (i === 2) {
          masterTl.fromTo(
            videoWrapper,
            { clipPath: 'circle(0% at 50% 50%)' },
            { clipPath: 'circle(75% at 50% 50%)', duration: 1, ease: 'none' },
            startPos
          );
        } else if (i === 3) {
          masterTl.fromTo(
            videoWrapper,
            { clipPath: 'inset(50% 0 50% 0)' },
            { clipPath: 'inset(0% 0 0% 0)', duration: 1, ease: 'none' },
            startPos
          );
        }

        // Metadata staggered reveals
        if (number) {
          masterTl.fromTo(
            number,
            { x: 120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'none' },
            startPos + 0.05
          );
        }
        if (title) {
          masterTl.fromTo(
            title,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'none' },
            startPos + 0.1
          );
        }
        if (meta) {
          masterTl.fromTo(
            meta,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'none' },
            startPos + 0.15
          );
        }

        // Fade out previous card
        if (i < totalCards - 1) {
          masterTl.to(
            card,
            { opacity: 0, duration: 0.3, ease: 'none' },
            exitPos - 0.15
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="relative bg-background"
      aria-label="Featured work showreel"
    >
      <div className="absolute top-8 left-6 md:left-12 lg:left-20 z-20 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping-slow" />
        <span className="font-satoshi text-xs text-white/40 tracking-[0.3em] uppercase">
          Featured Showreel · Click to Watch Fullscreen
        </span>
      </div>

      {/* Desktop: Pinned viewport cards */}
      <div ref={containerRef} className="hidden md:block relative w-full h-screen">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`showreel-card group absolute inset-0 flex items-center justify-center cursor-pointer ${
              i === 0 ? 'z-10' : `z-${10 + i}`
            }`}
            style={{ opacity: i === 0 ? 1 : 0 }}
            onClick={() => onSelectProject?.(project)}
            data-cursor="play"
            role="button"
            tabIndex={0}
            aria-label={`Watch ${project.title} fullscreen`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProject?.(project);
              }
            }}
          >
            {/* Visual wrapper with high-res poster and hover zoom */}
            <div className="video-wrapper absolute inset-0 overflow-hidden">
              <Image
                src={project.posterSrc}
                alt={project.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-black/30" />

              {/* Centered Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-accent/90 text-black flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-115 group-hover:bg-accent transition-all duration-300">
                  <svg className="w-8 h-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Project info overlay */}
            <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 flex items-end pb-16 md:pb-24 h-full pointer-events-none">
              <div className="project-number absolute right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 select-none">
                <span className="font-clash text-[15vw] md:text-[12vw] font-bold text-transparent [-webkit-text-stroke:2px_rgba(198,255,61,0.25)] leading-none">
                  {project.number}
                </span>
              </div>

              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 mb-4 backdrop-blur-sm">
                  <span className="text-accent text-xs font-clash uppercase font-semibold">▶ Watch on YouTube / Click to Expand</span>
                </div>
                <h3 className="project-title font-clash text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                <div className="project-meta flex items-center gap-4 font-satoshi text-sm md:text-base text-white/50">
                  <span className="text-accent">{project.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile fallback: clean vertical card stack */}
      <div className="md:hidden flex flex-col gap-8 px-6 py-16">
        {projects.map((project) => (
          <div
            key={`mobile-${project.id}`}
            className="group relative rounded-2xl overflow-hidden aspect-video cursor-pointer border border-white/10"
            onClick={() => onSelectProject?.(project)}
            role="button"
            tabIndex={0}
          >
            <Image
              src={project.posterSrc}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-accent/90 text-black flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="font-clash text-accent text-sm font-bold">{project.number}</span>
              <h3 className="font-clash text-xl font-bold text-white mt-1">
                {project.title}
              </h3>
              <span className="font-satoshi text-xs text-white/50">
                {project.category} · {project.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
