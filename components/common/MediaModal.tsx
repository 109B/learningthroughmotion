"use client";

import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

type MediaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "image" | "video";
  src: string;
  alt?: string;
  // For image navigation
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
  currentIndex?: number;
  totalCount?: number;
};

export function MediaModal({
  isOpen,
  onClose,
  type,
  src,
  alt,
  onPrevious,
  onNext,
  showNavigation = false,
  currentIndex = 0,
  totalCount = 0,
}: MediaModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
    if (showNavigation) {
      if (e.key === "ArrowLeft" && onPrevious) {
        onPrevious();
      }
      if (e.key === "ArrowRight" && onNext) {
        onNext();
      }
    }
  }, [onClose, onPrevious, onNext, showNavigation]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");

      // Ensure video starts muted
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || typeof document === "undefined") return null;

  const modalContent = (
    <div className="media-modal" onClick={onClose}>
      <div className="media-modal__backdrop" />
      <button
        className="media-modal__close"
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Navigation arrows for images */}
      {showNavigation && onPrevious && (
        <button
          className="media-modal__nav media-modal__nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label="Previous image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {showNavigation && onNext && (
        <button
          className="media-modal__nav media-modal__nav--next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      <div className="media-modal__content" onClick={(e) => e.stopPropagation()}>
        {type === "video" ? (
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            muted
            playsInline
            className="media-modal__video"
          />
        ) : (
          <img
            src={src}
            alt={alt || ""}
            className="media-modal__image"
          />
        )}

        {/* Image counter */}
        {showNavigation && totalCount > 1 && (
          <div className="media-modal__counter">
            {currentIndex + 1} / {totalCount}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
