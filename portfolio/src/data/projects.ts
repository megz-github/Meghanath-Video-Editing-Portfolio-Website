export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  youtubeId: string;
  youtubeUrl: string;
  posterSrc: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: 'multicam-band',
    number: '01',
    title: 'Multicam Band Performance',
    category: 'Music Video',
    year: '2024',
    youtubeId: '7AitIa0Wzxc',
    youtubeUrl: 'https://www.youtube.com/watch?v=7AitIa0Wzxc',
    posterSrc: '/posters/multicam-band.jpg',
    description: 'A dynamic multicam live performance edit with seamless angle switches and rhythmic cuts.',
  },
  {
    id: 'the-father',
    number: '02',
    title: 'The Father',
    category: 'Short Film',
    year: '2024',
    youtubeId: 'uHuT0t1ehFg',
    youtubeUrl: 'https://youtu.be/uHuT0t1ehFg',
    posterSrc: '/posters/the-father.jpg',
    description: 'A cinematic adaptation of Bjørnstjerne Bjørnson\'s classic narrative.',
  },
  {
    id: 'pinetreelane-showcase',
    number: '03',
    title: 'PineTreeLane Showcase',
    category: 'Motion Graphics',
    year: '2023',
    youtubeId: 'RERWtgUfeGI',
    youtubeUrl: 'https://www.youtube.com/watch?v=RERWtgUfeGI',
    posterSrc: '/posters/pinetreelane.jpg',
    description: 'A curated compilation of high-end motion design, 3D visual effects, and graphic artistry.',
  },
  {
    id: 'people-of-bathsparak',
    number: '04',
    title: 'People of BathSpaRak',
    category: 'Documentary',
    year: '2023',
    youtubeId: '5MkioDkcqjU',
    youtubeUrl: 'https://youtu.be/5MkioDkcqjU',
    posterSrc: '/posters/people-of-bathsparak.jpg',
    description: 'An intimate documentary capturing the spirit and stories of a community.',
  },
];
