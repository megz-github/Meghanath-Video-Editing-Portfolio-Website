'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollProgress — A thin accent-colored progress bar fixed at the
 * very top of the viewport.
 *
 * Uses GSAP ScrollTrigger in "scrub" mode so the bar's scaleX maps
 * directly to the page scroll progress (0 → 1). The `origin-left`
 * class ensures it grows from left to right. We animate scaleX
 * (a transform) rather than width for GPU-composited 60fps.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Scrub-linked animation: scaleX follows scroll position
    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3, // slight smoothing so the bar doesn't jitter
      },
    });
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[9999]"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  );
}
