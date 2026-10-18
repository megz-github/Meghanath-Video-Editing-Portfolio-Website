'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import { ANIM } from '@/config/animation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Project, projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded: boolean;
  onSelectProject?: (project: Project) => void;
}

export default function Hero({ isLoaded, onSelectProject }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const videoContainer = videoContainerRef.current;
    if (!section || !headline || !subtitle || !videoContainer) return;

    if (reducedMotion) {
      gsap.set([headline.querySelectorAll('.char'), subtitle.querySelectorAll('.word'), videoContainer], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Per-character reveal
      const chars = headline.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          stagger: 0.02,
          ease: 'power3.out',
          delay: 0.1,
        }
      );

      // Subtitle word reveal
      const words = subtitle.querySelectorAll('.word');
      gsap.fromTo(
        words,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.4,
        }
      );

      // Video frame scale-in
      gsap.fromTo(
        videoContainer,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      // Parallax on scroll
      gsap.to(videoContainer, {
        y: -60,
        scale: 1.05,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isLoaded, reducedMotion]);

  const scrollToWork = () => {
    const workSection = document.getElementById('showreel');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const line1 = 'CONCEPT';
  const line2 = 'CONTINUITY';
  const subtitle = 'Video Editor & Graphics Designer';

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center max-w-[1800px] mx-auto w-full">
        {/* Left Column (7 cols): Huge kinetic typography */}
        <div className="lg:col-span-7 space-y-6 z-10">
          <div ref={headlineRef} className="space-y-1">
            {/* Line 1: CONCEPT */}
            <div className="overflow-hidden">
              <h1 className="font-clash text-4xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-8xl font-bold tracking-tight text-white leading-[0.9] flex flex-nowrap">
                {line1.split('').map((char, ci) => (
                  <span key={ci} className="char inline-block" style={{ opacity: 0 }}>
                    {char}
                  </span>
                ))}
              </h1>
            </div>

            {/* Middle connecting line: ✦ TO */}
            <div className="overflow-hidden flex items-center gap-3 py-1">
              <span className="font-clash text-xl sm:text-3xl text-accent animate-spin-slow">✦</span>
              <span className="font-clash text-2xl sm:text-3xl md:text-4xl font-semibold tracking-widest text-accent uppercase">
                TO
              </span>
            </div>

            {/* Line 2: CONTINUITY */}
            <div className="overflow-hidden">
              <h2 className="font-clash text-4xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-8xl font-bold tracking-tight text-white leading-[0.9] flex flex-nowrap">
                {line2.split('').map((char, ci) => (
                  <span key={ci} className="char inline-block" style={{ opacity: 0 }}>
                    {char}
                  </span>
                ))}
              </h2>
            </div>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="overflow-hidden pt-2">
            <p className="font-satoshi text-lg sm:text-xl md:text-2xl text-white/60 font-light">
              {subtitle.split(' ').map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
                  {word}
                </span>
              ))}
            </p>
          </div>

          {/* CTA Row */}
          <div className="pt-4 flex flex-wrap items-center gap-6">
            <MagneticButton
              className="group relative px-8 py-4 border-2 border-accent rounded-full font-clash text-accent text-sm tracking-widest uppercase hover:bg-accent hover:text-black transition-colors duration-300 font-bold"
              onClick={scrollToWork}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>View Work</span>
                <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
              </span>
              <span className="absolute inset-0 rounded-full bg-accent/15 animate-ping-slow pointer-events-none" />
            </MagneticButton>

            <button
              onClick={() => onSelectProject?.(projects[0])}
              className="inline-flex items-center gap-3 font-satoshi text-sm text-white/50 hover:text-accent transition-colors"
              data-cursor="play"
            >
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-accent">
                ▶
              </span>
              <span>Watch Reel (03:55)</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Glowing Video Frame */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div
            ref={videoContainerRef}
            className="relative w-full aspect-video sm:aspect-[4/3] lg:aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-950 cursor-pointer group"
            data-cursor="play"
            style={{ opacity: 0 }}
            onClick={() => onSelectProject?.(projects[0])}
            role="button"
            tabIndex={0}
            aria-label="Click to play featured video"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProject?.(projects[0]);
              }
            }}
          >
            {/* Ambient accent glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/25 via-transparent to-accent/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

            {/* Featured Poster with high-res image */}
            <Image
              src={projects[0].posterSrc}
              alt={projects[0].title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Overlay badges */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-accent uppercase tracking-wider backdrop-blur-md">
                FEATURED EDIT
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div>
                <p className="font-clash text-sm md:text-base font-bold text-white">
                  {projects[0].title}
                </p>
                <p className="font-satoshi text-xs text-white/50">
                  {projects[0].category} · {projects[0].year}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center font-bold text-xs shadow-lg group-hover:scale-110 transition-transform">
                ▶
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce-slow">
        <span className="font-satoshi text-[10px] text-white/30 tracking-[0.25em] uppercase">
          Scroll
        </span>
        <svg
          className="w-4 h-4 text-white/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </section>
  );
}
