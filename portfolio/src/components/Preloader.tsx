'use client';

/**
 * Preloader.tsx
 * =============
 * Cinematic preloader that gates page entry with:
 *   1. An animated 0→100 percentage counter (GSAP tween)
 *   2. Per-character stagger reveal of the artist's name (manual span splitting)
 *   3. A clip-path wipe exit that reveals the hero section beneath
 *
 * The component is skippable on click — calling tl.progress(1) immediately
 * jumps to the end of the timeline and triggers the exit animation.
 *
 * Animation budget: ~2.5 s total (configurable via ANIM.duration.preload).
 * Only transform + opacity + clip-path are animated for 60 fps.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ANIM } from '@/config/animation';

interface PreloaderProps {
  /** Called when the exit wipe finishes — parent should unmount the preloader */
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [counter, setCounter] = useState(0);

  /**
   * Skip handler — jumps the main timeline to its end.
   * The timeline's onComplete callback then fires the exit wipe.
   */
  const skipPreloader = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    const container = containerRef.current;
    if (container) {
      gsap.to(container, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete,
      });
    } else {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    const container = containerRef.current;
    const nameEl = nameRef.current;
    if (!container || !nameEl) return;

    // Grab all individual character spans for the stagger reveal
    const chars = nameEl.querySelectorAll('.char');

    /**
     * Main timeline
     * —————————————
     * 1. Counter tween (0→100) starts at t=0
     * 2. Character reveal starts at t=0.3 s
     * 3. On timeline completion → clip-path wipe exit
     */
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation: clip-path wipe from bottom → reveals hero underneath
        gsap.to(container, {
          clipPath: 'inset(0 0 100% 0)',
          duration: ANIM.duration.slow,
          ease: ANIM.easing.snappy,
          onComplete,
        });
      },
    });

    tlRef.current = tl;

    // ── Counter: 0 → 100 ──────────────────────────────────────────────
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: ANIM.duration.preload,
        ease: 'power2.inOut',
        onUpdate: function () {
          setCounter(Math.round(this.targets()[0].val));
        },
      },
      0
    );

    // ── Name character stagger reveal ─────────────────────────────────
    // Each char slides up from 120% translateY with a slight stagger.
    // The overflow-hidden on the parent clips the upward travel.
    tl.fromTo(
      chars,
      { y: '120%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.char,
        ease: ANIM.easing.reveal,
      },
      0.3
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  // ── Character splitting ──────────────────────────────────────────────
  // Manual span-per-character approach (no SplitText plugin required).
  // Spaces become non-breaking spaces to preserve word gaps.
  const name = 'MEGHANATH DINESHKUMAR';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10001] bg-background flex flex-col items-center justify-center cursor-pointer"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
      onClick={skipPreloader}
      role="progressbar"
      aria-valuenow={counter}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading portfolio"
    >
      {/* ── Name reveal ────────────────────────────────────────────── */}
      <div ref={nameRef} className="overflow-hidden mb-8">
        <h1 className="font-clash text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white flex flex-wrap justify-center">
          {name.split('').map((char, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{ opacity: 0 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>

      {/* ── Percentage counter ─────────────────────────────────────── */}
      <div className="flex items-baseline gap-1">
        <span
          ref={counterRef}
          className="font-clash text-6xl md:text-8xl lg:text-9xl font-bold text-accent tabular-nums"
        >
          {counter}
        </span>
        <span className="font-clash text-2xl md:text-4xl text-accent/60">%</span>
      </div>

      {/* ── Skip hint ──────────────────────────────────────────────── */}
      <p className="absolute bottom-8 text-white/30 font-satoshi text-sm tracking-widest uppercase">
        Click to skip
      </p>
    </div>
  );
}
