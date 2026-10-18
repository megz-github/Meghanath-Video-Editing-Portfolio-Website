'use client';

import MagneticButton from './MagneticButton';
import Marquee from './Marquee';

/**
 * Contact — Full-screen CTA section.
 *
 * Features:
 * - Giant "LET'S WORK TOGETHER" heading with accent color
 * - Email link with hover effect: letter-spacing expands + accent underline slides in
 * - Magnetic social buttons (LinkedIn, Email) using the MagneticButton wrapper
 * - Bottom infinite marquee reinforcing the brand tagline
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 lg:py-48 px-6 md:px-12 lg:px-20"
      aria-label="Contact"
    >
      <div className="max-w-[1800px] mx-auto text-center">
        {/* Section label */}
        <span className="font-satoshi text-xs text-white/30 tracking-[0.3em] uppercase mb-8 block">
          Get in Touch
        </span>

        {/* Giant CTA heading */}
        <h2 className="font-clash text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-12 leading-[0.9]">
          LET&apos;S WORK
          <br />
          <span className="text-accent">TOGETHER</span>
          <span className="text-accent">.</span>
        </h2>

        {/* Email link — hover expands letter-spacing and slides in an accent underline */}
        <a
          href="mailto:mdmdeghanath70@gmail.com"
          className="group inline-block font-satoshi text-xl md:text-2xl lg:text-3xl text-white/60 hover:text-accent transition-all duration-500 hover:tracking-[0.1em] relative"
          data-cursor="link"
        >
          mdmdeghanath70@gmail.com
          <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500" />
        </a>

        {/* Social buttons with magnetic hover effect */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {/* LinkedIn */}
          <MagneticButton
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <a
              href="https://www.linkedin.com/in/meghanath-dineshkumar-aa99821b4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-full h-full flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </MagneticButton>

          {/* Email */}
          <MagneticButton
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <a
              href="mailto:mdmdeghanath70@gmail.com"
              aria-label="Email"
              className="w-full h-full flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Infinite marquee at the bottom — brand tagline */}
      <div className="mt-24 md:mt-32">
        <Marquee speed={40} className="text-white/10 font-clash text-4xl md:text-6xl font-bold">
          <span>CONCEPT TO CONTINUITY</span>
          <span className="text-accent/20">✦</span>
          <span>CONCEPT TO CONTINUITY</span>
          <span className="text-accent/20">✦</span>
        </Marquee>
      </div>
    </section>
  );
}
