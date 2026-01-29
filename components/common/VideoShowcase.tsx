"use client";

import { useState, useRef, useEffect } from "react";
import { MediaModal } from "./MediaModal";

type VideoShowcaseProps = {
  src: string;
};

export function VideoShowcase({ src }: VideoShowcaseProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        // Check if video is portrait (taller than wide)
        setIsPortrait(video.videoHeight > video.videoWidth);
      };
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }
  }, []);

  return (
    <>
      <div
        className={`video-showcase ${isPortrait ? 'video-showcase--portrait' : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          controls
          className="video-showcase__video"
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="video-showcase__expand">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          Click to expand
        </div>
      </div>

      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="video"
        src={src}
      />
    </>
  );
}
