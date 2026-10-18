export interface ShortVideo {
  id: string;
  number: string;
  title: string;
  clientOrProject: string;
  category: string;
  duration: string;
  videoSrc: string;
  posterSrc: string;
  description: string;
}

export const shorts: ShortVideo[] = [
  {
    id: 'jumeirah-park',
    number: '01',
    title: 'Jumeirah Parks',
    clientOrProject: 'Pine Tree Lane',
    category: 'Architecture & Villa Tour',
    duration: '0:33',
    videoSrc: '/shorts/JumeirahPark.mp4',
    posterSrc: '/shorts/JumeirahPark.jpg',
    description: 'Mediterranean villa showcase featuring fluid speed ramping, atmospheric natural lighting, and pristine architectural transitions.',
  },
  {
    id: 'factory-process',
    number: '02',
    title: 'The Factory Production',
    clientOrProject: 'Pine Tree Lane',
    category: 'Industrial & Craftsmanship',
    duration: '0:29',
    videoSrc: '/shorts/Factoryfinal.mp4',
    posterSrc: '/shorts/Factoryfinal.jpg',
    description: 'Precision machining and custom cabinetry manufacturing captured in high-tempo kinetic cuts and metallic sound design.',
  },
  {
    id: 'andy-gabby',
    number: '03',
    title: 'Andy & Gabby Residence',
    clientOrProject: 'Luxury Residential',
    category: 'Interior Design Reel',
    duration: '0:24',
    videoSrc: '/shorts/andygabbyfinal.mp4',
    posterSrc: '/shorts/andygabbyfinal.jpg',
    description: 'Sophisticated modern home walk-through focusing on natural lighting, organic textures, and elegant negative space.',
  },
  {
    id: 'tara-villa',
    number: '04',
    title: 'Tara Villa - Final Stage',
    clientOrProject: 'Villa Reveal',
    category: 'Real Estate & Build',
    duration: '0:12',
    videoSrc: '/shorts/tarafinal.mp4',
    posterSrc: '/shorts/tarafinal.jpg',
    description: 'Final handover reveal reel highlighting bespoke woodwork, custom cabinetry, and architectural harmony.',
  },
  {
    id: 'modern-kitchen',
    number: '05',
    title: 'Kitchen Showcase',
    clientOrProject: 'Architectural Details',
    category: 'Design & Micro-Edit',
    duration: '0:10',
    videoSrc: '/shorts/Kicthen.mp4',
    posterSrc: '/shorts/Kicthen.jpg',
    description: 'High-impact 10-second vertical edit highlighting countertop craft, marble veins, and contemporary kitchen details.',
  },
];
