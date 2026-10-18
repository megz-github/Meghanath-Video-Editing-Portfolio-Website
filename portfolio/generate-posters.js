const fs = require('fs');
const path = require('path');

const posters = [
  { file: 'multicam-band', number: '01', title: 'MULTICAM BAND PERFORMANCE', cat: 'MUSIC VIDEO · 2024', bg: '#0d130e', glow: '#C6FF3D' },
  { file: 'the-father', number: '02', title: 'THE FATHER', cat: 'SHORT FILM · 2024', bg: '#140f0c', glow: '#FF6B3D' },
  { file: 'motion-reel', number: '03', title: 'MOTION REEL', cat: 'MOTION GRAPHICS · 2023', bg: '#0c1014', glow: '#3D9BFF' },
  { file: 'people-of-bathsparak', number: '04', title: 'PEOPLE OF BATHSPARAK', cat: 'DOCUMENTARY · 2023', bg: '#140c13', glow: '#D13DFF' },
];

const outDir = path.join(__dirname, 'public', 'posters');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const p of posters) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
    <defs>
      <radialGradient id="glow-${p.number}" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="${p.glow}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#0A0A0A" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="grad-${p.number}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${p.bg}"/>
        <stop offset="100%" stop-color="#0A0A0A"/>
      </linearGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#grad-${p.number})"/>
    <rect width="1920" height="1080" fill="url(#glow-${p.number})"/>
    <rect x="0" y="0" width="1920" height="70" fill="#050505"/>
    <rect x="0" y="1010" width="1920" height="70" fill="#050505"/>
    <line x1="120" y1="70" x2="120" y2="1010" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <line x1="1800" y1="70" x2="1800" y2="1010" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <text x="1750" y="660" font-family="Arial Black, Impact, sans-serif" font-size="360" font-weight="900" fill="none" stroke="rgba(198,255,61,0.12)" stroke-width="3" text-anchor="end">${p.number}</text>
    <text x="140" y="130" font-family="Courier New, monospace" font-size="20" fill="rgba(255,255,255,0.5)" letter-spacing="4">● 4K PRORES · MEGHANATH DINESHKUMAR</text>
    <text x="1780" y="130" font-family="Courier New, monospace" font-size="20" fill="${p.glow}" letter-spacing="4" text-anchor="end">SCENE 0${p.number} // TAKE 01</text>
    <circle cx="960" cy="540" r="54" fill="rgba(0,0,0,0.5)" stroke="${p.glow}" stroke-width="2.5"/>
    <polygon points="950,518 982,540 950,562" fill="${p.glow}"/>
    <text x="140" y="890" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="${p.glow}" letter-spacing="6">${p.cat}</text>
    <text x="140" y="955" font-family="Arial Black, sans-serif" font-size="64" font-weight="900" fill="#FFFFFF" letter-spacing="2">${p.title}</text>
  </svg>`;

  fs.writeFileSync(path.join(outDir, `${p.file}.svg`), svg, 'utf8');
  fs.writeFileSync(path.join(outDir, `${p.file}.jpg`), svg, 'utf8');
}

console.log('Generated 4 cinematic poster frames successfully in public/posters!');
