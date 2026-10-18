export interface PhotoItem {
  id: string;
  number: string;
  title: string;
  category: 'Cinematic Stills' | 'Portraits' | 'Atmospheric';
  src: string;
  gradeProfile: string;
  aspectRatio: 'portrait' | 'landscape';
  description: string;
}

export const photos: PhotoItem[] = [
  {
    id: 'photo-01',
    number: '01',
    title: 'Glass Reflection Portrait',
    category: 'Portraits',
    src: '/photos/color-grade-01.jpeg',
    gradeProfile: 'Soft Skin Tone Calibration · Natural Light',
    aspectRatio: 'portrait',
    description: 'Clean naturalistic portrait grading emphasizing organic skin tones, gentle highlight roll-off, and subtle cool reflections.',
  },
  {
    id: 'photo-02',
    number: '02',
    title: 'Granite Monolith',
    category: 'Atmospheric',
    src: '/photos/color-grade-02.jpeg',
    gradeProfile: 'Kodak Ektachrome Emulation · Teal Shadows',
    aspectRatio: 'portrait',
    description: 'Vintage 16mm film stock aesthetic applied to rugged mountain topography with rich evergreen shadows and hazy atmospheric sky.',
  },
  {
    id: 'photo-03',
    number: '03',
    title: 'Nocturne & Minarets',
    category: 'Atmospheric',
    src: '/photos/color-grade-03.jpeg',
    gradeProfile: 'Deep Cyan & Cobalt Split Tone',
    aspectRatio: 'portrait',
    description: 'Urban nighttime architecture balanced with deep blue skylines, warm architectural lighting, and silhouette foreground composition.',
  },
  {
    id: 'photo-04',
    number: '04',
    title: 'Golden Hour Glow',
    category: 'Portraits',
    src: '/photos/color-grade-04.jpeg',
    gradeProfile: 'Warm Cine-Amber · Highlight Halation',
    aspectRatio: 'landscape',
    description: 'Sunset portrait profile balancing warm golden backlight with gentle film grain texture and preserved facial shadow detail.',
  },
  {
    id: 'photo-05',
    number: '05',
    title: 'L-Series Macro',
    category: 'Portraits',
    src: '/photos/color-grade-05.jpeg',
    gradeProfile: 'Selective Desaturation · Carbon & Red Pop',
    aspectRatio: 'portrait',
    description: 'Hardware product grade emphasizing metallic textures, deep matte blacks, and selective red color accentuation.',
  },
  {
    id: 'photo-06',
    number: '06',
    title: 'Stratosphere Flare',
    category: 'Atmospheric',
    src: '/photos/color-grade-06.jpeg',
    gradeProfile: 'Cyan & Indigo Split · High-Altitude Atmos',
    aspectRatio: 'portrait',
    description: 'High-altitude wing perspective featuring extreme contrast grading, sun-star flare containment, and deep stratospheric blue gradient.',
  },
  {
    id: 'photo-07',
    number: '07',
    title: 'The Stage Silhouette',
    category: 'Cinematic Stills',
    src: '/photos/color-grade-07.jpeg',
    gradeProfile: 'Low-Key Chiaroscuro · Velvet Crimson',
    aspectRatio: 'landscape',
    description: 'Dramatic theatrical lighting design with amber footlights, velvet crimson curtain hues, and clean silhouette separation.',
  },
  {
    id: 'photo-08',
    number: '08',
    title: 'Canyon Campfire',
    category: 'Cinematic Stills',
    src: '/photos/color-grade-08.jpeg',
    gradeProfile: '35mm Bleach Bypass · Golden Earth Ochre',
    aspectRatio: 'landscape',
    description: 'Cinematic narrative still from "The Father" featuring textured rock faces, warm campfire radiance, and deep contrast framing.',
  },
  {
    id: 'photo-09',
    number: '09',
    title: 'The Colossus Light',
    category: 'Cinematic Stills',
    src: '/photos/color-grade-09.jpeg',
    gradeProfile: 'Film Noir Chiaroscuro · Focused Amber Shaft',
    aspectRatio: 'landscape',
    description: 'Minimalist high-contrast lighting sculpture with single-source volumetric beam piercing pure darkness.',
  },
];
