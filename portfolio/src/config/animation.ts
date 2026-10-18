// config/animation.ts — Single source of truth for all animation parameters
export const ANIM = {
  easing: {
    smooth: 'power3.out',
    snappy: 'power4.out',
    reveal: 'expo.out',
    elastic: 'elastic.out(1, 0.5)',
    scrub: 'none',
  },
  duration: {
    fast: 0.4,
    medium: 0.8,
    slow: 1.2,
    hero: 1.6,
    preload: 2.5,
  },
  stagger: {
    char: 0.03,
    word: 0.05,
    item: 0.1,
    section: 0.15,
  },
  cursor: {
    lerp: 0.15,
    size: { default: 16, play: 80, link: 40 },
  },
  breakpoints: {
    mobile: 375,
    tablet: 768,
    desktop: 1440,
  },
} as const;

export type AnimConfig = typeof ANIM;
