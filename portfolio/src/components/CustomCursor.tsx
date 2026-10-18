'use client';

import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type CursorState = 'default' | 'play' | 'link' | 'hidden';

const CursorContext = createContext<{
  setCursorState: (state: CursorState) => void;
}>({ setCursorState: () => {} });

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const lerp = 0.18;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="play"]')) {
        setCursorState('play');
      } else if (target.closest('a, button, [data-cursor="link"]')) {
        setCursorState('link');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, isMobile]);

  if (reducedMotion || isMobile) {
    return <CursorContext.Provider value={{ setCursorState }}>{children}</CursorContext.Provider>;
  }

  const sizeClasses = {
    default: 'w-4 h-4',
    play: 'w-20 h-20 bg-accent/15 border-accent',
    link: 'w-10 h-10 border-accent bg-accent/10',
    hidden: 'w-0 h-0 opacity-0',
  };

  return (
    <CursorContext.Provider value={{ setCursorState }}>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border border-accent flex items-center justify-center transition-[width,height,background-color] duration-300 ease-out backdrop-blur-[1px] ${sizeClasses[cursorState]}`}
        style={{ willChange: 'transform' }}
      >
        {cursorState === 'play' && (
          <span className="text-accent text-[11px] font-clash font-bold tracking-widest uppercase">
            PLAY
          </span>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 769px) {
              body, a, button, input, [role="button"] {
                cursor: default;
              }
            }
          `,
        }}
      />
      {children}
    </CursorContext.Provider>
  );
}
