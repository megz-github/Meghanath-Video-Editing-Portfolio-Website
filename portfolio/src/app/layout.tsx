import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { CursorProvider } from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import FilmGrain from '@/components/FilmGrain';

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: 'Meghanath Dineshkumar | Video Editor & Graphics Designer',
  description:
    'Concept to Continuity — High-impact cinematic portfolio of Meghanath Dineshkumar featuring multicam concert edits, short films, motion graphics, and documentaries.',
  keywords: [
    'Meghanath Dineshkumar',
    'Video Editor',
    'Motion Designer',
    'Graphics Designer',
    'Cinematic Portfolio',
    'Multicam Video',
    'Concept to Continuity',
  ],
  authors: [{ name: 'Meghanath Dineshkumar' }],
  creator: 'Meghanath Dineshkumar',
  openGraph: {
    title: 'Meghanath Dineshkumar | Video Editor & Graphics Designer',
    description: 'Concept to Continuity — Selected cinematic works and motion reel.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Meghanath Dineshkumar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meghanath Dineshkumar | Video Editor & Graphics Designer',
    description: 'Concept to Continuity — Selected cinematic works and motion reel.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#0A0A0A] text-[#EDEDED] antialiased">
      <head>
        {/* Premium typography via Fontshare: Clash Display (Headings) & Satoshi (Body) */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=satoshi@300,400,500,700,900&display=swap"
        />
      </head>
      <body className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] selection:bg-[#C6FF3D] selection:text-[#0A0A0A] overflow-x-hidden font-satoshi">
        <SmoothScroll>
          <CursorProvider>
            <ScrollProgress />
            <FilmGrain />
            {children}
          </CursorProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
