'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Showreel from '@/components/Showreel';
import ProjectIndex from '@/components/ProjectIndex';
import ShortsSection from '@/components/ShortsSection';
import PhotoGallery from '@/components/PhotoGallery';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import VideoModal from '@/components/VideoModal';
import { Project } from '@/data/projects';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      {/* Cinematic preloader with counter + name wipe */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Global persistent navigation */}
      <Navbar />

      {/* Hero section with per-character kinetic headline + teaser reel */}
      <Hero isLoaded={isLoaded} onSelectProject={setSelectedProject} />

      {/* The Centerpiece: Pinned 4-video scrub sequence with unique reveals */}
      <Showreel onSelectProject={setSelectedProject} />

      {/* Project Index: hover-following video preview table */}
      <ProjectIndex onSelectProject={setSelectedProject} />

      {/* Short Form & Reels: 5 vertical 9:16 mobile cinema showcases with theater player */}
      <ShortsSection />

      {/* Color Grading & Photography Gallery: 9 curated stills with lightbox */}
      <PhotoGallery />

      {/* About: portrait + scroll-triggered luminous typography + tools marquee */}
      <About />

      {/* Contact: high-impact CTA, email link & socials */}
      <Contact />

      {/* Minimalist footer */}
      <Footer />

      {/* Shared-element cinematic fullscreen video player modal */}
      <VideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />
    </main>
  );
}
