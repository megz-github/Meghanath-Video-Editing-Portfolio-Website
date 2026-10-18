'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * FilmGrain — Subtle noise overlay that adds organic texture to the
 * entire viewport.
 *
 * Uses an inline SVG with `feTurbulence` to generate fractal noise,
 * tiled at 128×128px. The overlay runs a CSS "grain" animation that
 * shifts the background position in discrete steps (steps(1)) so the
 * noise pattern flickers like real film grain rather than sliding.
 *
 * At 4% opacity with `mix-blend-overlay`, it's barely visible but
 * adds subtle life to flat dark backgrounds. Completely removed when
 * the user prefers reduced motion.
 */
export default function FilmGrain() {
  const reducedMotion = useReducedMotion();

  // Respect user's motion preferences — grain animation can be
  // distracting for users with vestibular disorders
  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.04] mix-blend-overlay"
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
        animation: 'grain 0.5s steps(1) infinite',
      }}
    />
  );
}
