'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll — Wraps the app in a Lenis smooth-scroll context.
 *
 * Lenis provides momentum-based smooth scrolling that feels premium
 * compared to the browser default. We sync it with GSAP's ScrollTrigger
 * so all scroll-driven animations stay perfectly in phase with the
 * smooth scroll position (not the native scroll position).
 *
 * The easing function `1.001 - 2^(-10t)` is an exponential ease-out
 * that decelerates naturally, giving a "weighted" feel to scrolling.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with premium-feeling settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger
    // This ensures ScrollTrigger reads Lenis's interpolated position
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for Lenis animation frame — keeps both systems
    // on the same requestAnimationFrame loop for zero drift
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
