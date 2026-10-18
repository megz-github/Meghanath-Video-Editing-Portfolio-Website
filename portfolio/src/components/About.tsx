'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from './Marquee';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const bio = `I'm Meghanath Dineshkumar — a video editor and graphics designer dedicated to the craft of visual continuity. From initial concept to the final color grade, I shape raw footage into cinematic narratives with deliberate rhythm, pacing, and emotional weight. Whether cutting multicam live performances, tight narrative shorts, or high-energy motion reels, every frame is treated with surgical precision.`;

const tools = [
  'Premiere Pro',
  'After Effects',
  'DaVinci Resolve',
  'Photoshop',
  'Illustrator',
  'Figma',
  'Cinema 4D',
  'Blender',
];

const highlights = [
  { label: 'Role', val: 'Editor & Motion Designer' },
  { label: 'Specialty', val: 'Multicam, Narrative, Reels' },
  { label: 'Philosophy', val: 'Concept to Continuity' },
  { label: 'Location', val: 'Available Worldwide' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const textEl = textRef.current;
    const imageContainer = imageContainerRef.current;
    if (!section || !textEl || !imageContainer) return;

    const words = textEl.querySelectorAll('.word');

    const ctx = gsap.context(() => {
      // Word lighting scroll-scrub
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: textEl,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 1,
          },
        }
      );

      // Subtle parallax on portrait
      gsap.to(imageContainer, {
        y: -40,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="About me"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Section label */}
        <div className="mb-12 md:mb-16 flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-satoshi text-xs text-white/40 tracking-[0.3em] uppercase">
              04 // Self Introduction
            </span>
          </div>
          <span className="hidden sm:inline-block font-satoshi text-xs text-white/30 tracking-widest uppercase">
            Behind The Cut
          </span>
        </div>

        {/* 2-Column Editorial Grid: Portrait on Left, Story on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Portrait */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div
              ref={imageContainerRef}
              className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-950 group"
            >
              {/* Backlight glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 via-transparent to-accent/5 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/meghanath.jpg"
                  alt="Meghanath Dineshkumar — Video Editor and Graphics Designer"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 550px"
                  className="object-cover object-top grayscale contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />

                {/* Subtle dark gradient overlay at base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge tags overlay */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-accent uppercase tracking-wider backdrop-blur-md">
                    DIRECTOR OF EDIT
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <p className="font-clash text-lg md:text-xl font-bold text-white tracking-wide">
                    Meghanath Dineshkumar
                  </p>
                  <p className="font-satoshi text-xs text-white/50 tracking-wider">
                    Video Editor & Graphics Designer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Narrative & Highlights */}
          <div className="lg:col-span-7 space-y-10">
            {/* Catchphrase Header */}
            <div>
              <h2 className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                TRANSFORMING RAW VISION INTO{' '}
                <span className="text-accent underline decoration-accent/40 underline-offset-8">
                  CONTINUITY
                </span>
                .
              </h2>
            </div>

            {/* Scroll-revealed Bio */}
            <div ref={textRef} className="max-w-2xl">
              <p className="font-satoshi text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-light">
                {bio.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className="word inline-block mr-[0.25em] transition-opacity"
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Quick Specs / Highlights Table */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10 max-w-xl">
              {highlights.map((h, i) => (
                <div key={i} className="space-y-1">
                  <span className="font-satoshi text-xs text-white/40 uppercase tracking-widest block">
                    {h.label}
                  </span>
                  <span className="font-clash text-base sm:text-lg font-semibold text-white">
                    {h.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools & Software Marquee */}
        <div className="mt-20 md:mt-28 border-t border-b border-white/10 py-7">
          <Marquee speed={26} className="text-white/30">
            {tools.map((tool) => (
              <span
                key={tool}
                className="font-satoshi text-base md:text-lg font-medium whitespace-nowrap"
              >
                {tool}
                <span className="mx-6 text-accent">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
