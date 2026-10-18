'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MarqueeProps {
  children: React.ReactNode;
  /** Duration in seconds for one full loop cycle */
  speed?: number;
  className?: string;
  /** Reverse the scroll direction */
  reverse?: boolean;
}

/**
 * Marquee — Infinite horizontal scrolling text/content strip.
 *
 * Content is duplicated 4× to ensure seamless looping even at wide
 * viewports. The animation uses the `animate-marquee` keyframe
 * defined in tailwind.config — a simple translateX(0 → -25%) since
 * we have 4 copies (each copy is 25% of the total width).
 *
 * Pauses on hover via `hover:[animation-play-state:paused]` for
 * better readability. Static when user prefers reduced motion.
 *
 * Marked `aria-hidden` since the content is decorative/repeated.
 */
export default function Marquee({
  children,
  speed = 30,
  className = '',
  reverse = false,
}: MarqueeProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      aria-hidden="true"
    >
      <div
        className={`inline-flex gap-8 hover:[animation-play-state:paused] ${
          reducedMotion ? '' : 'animate-marquee'
        } ${reverse ? '[animation-direction:reverse]' : ''}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {/* Duplicate content 4× for seamless loop at all viewport widths */}
        <span className="inline-flex gap-8 items-center">{children}</span>
        <span className="inline-flex gap-8 items-center">{children}</span>
        <span className="inline-flex gap-8 items-center">{children}</span>
        <span className="inline-flex gap-8 items-center">{children}</span>
      </div>
    </div>
  );
}
