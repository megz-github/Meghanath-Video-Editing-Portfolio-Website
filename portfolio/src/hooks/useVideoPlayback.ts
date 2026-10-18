'use client';
import { useEffect, useRef, useCallback } from 'react';

// Global set tracking currently playing videos — ensures only one plays at a time
const playingVideos = new Set<HTMLVideoElement>();

export function useVideoPlayback(threshold = 0.5) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    // Pause all other playing videos first
    playingVideos.forEach((v) => {
      if (v !== video) {
        v.pause();
        playingVideos.delete(v);
      }
    });
    video.play().catch(() => {}); // Silently handle autoplay restrictions
    playingVideos.add(video);
  }, []);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    playingVideos.delete(video);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
        } else {
          pause();
        }
      },
      { threshold }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      pause();
    };
  }, [threshold, play, pause]);

  return { videoRef, play, pause };
}
