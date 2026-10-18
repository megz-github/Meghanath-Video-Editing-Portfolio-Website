'use client';

import { useState, useEffect } from 'react';

/**
 * Navbar — Fixed minimal navigation.
 *
 * - Name/logo on the left, section links on the right.
 * - After scrolling 100px, a backdrop-blur background fades in
 *   so the nav remains readable over content.
 * - Clicking a link smooth-scrolls to the matching section ID.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Smooth-scroll to a section by its DOM id */
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9997] px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      {/* Logo / Name */}
      <a
        href="#"
        className="font-clash text-sm md:text-base font-bold text-white tracking-tight"
        data-cursor="link"
      >
        MEGHANATH<span className="text-accent">.</span>
      </a>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-8">
        {[
          { id: 'showreel', label: 'Showreel' },
          { id: 'work', label: 'Projects' },
          { id: 'shorts', label: 'Shorts & Reels' },
          { id: 'stills', label: 'Photos & Grading' },
          { id: 'about', label: 'About' },
          { id: 'contact', label: 'Contact' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="font-satoshi text-sm text-white/50 hover:text-accent transition-colors duration-300"
            data-cursor="link"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
