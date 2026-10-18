'use client';

import { useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** How strongly the button follows the cursor (0–1). Default 0.3 */
  strength?: number;
  onClick?: () => void;
}

/**
 * MagneticButton — A wrapper that makes any button feel "magnetic".
 *
 * When the user hovers, the button shifts toward the cursor position
 * proportional to `strength`. This creates a playful, tactile
 * interaction that's common in award-winning portfolio sites.
 *
 * The offset is calculated from the cursor's position relative to the
 * button center, then multiplied by the strength factor. On mouse
 * leave, the button snaps back via a CSS transition.
 *
 * Tagged with `data-cursor="link"` so the custom cursor automatically
 * expands when hovering this component.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion || !btnRef.current) return;

      // Calculate cursor offset from button center
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Apply offset scaled by strength factor
      btnRef.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current) return;
    // Reset to origin — the CSS transition handles the spring-back
    btnRef.current.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <button
      ref={btnRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor="link"
    >
      {children}
    </button>
  );
}
