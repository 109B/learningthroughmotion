"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { upload } from "@vercel/blob/client";

// Color definitions for sections
const SECTION_COLORS = {
  homepage: { bg: "#e0f2fe", border: "#0284c7", text: "#0369a1" }, // Sky blue
  maths: { bg: "#dcfce7", border: "#16a34a", text: "#166534" }, // Green
  sensory: { bg: "#fef3c7", border: "#d97706", text: "#92400e" }, // Amber
  "next-chapter": { bg: "#fce7f3", border: "#db2777", text: "#9d174d" }, // Pink
  programmes: { bg: "#e0e7ff", border: "#4f46e5", text: "#3730a3" }, // Indigo
  coaches: { bg: "#f3e8ff", border: "#9333ea", text: "#6b21a8" }, // Purple
} as const;

const VIDEO_COLORS = {
  "hero-homepage": { bg: "#fef2f2", border: "#dc2626", text: "#991b1b" }, // Red
} as const;

// Define all image sections on the site - each maps to a page with a carousel
const IMAGE_SECTIONS = [
  { id: "homepage", label: "Homepage", description: "Hero carousel on homepage (also mixes in programme images)" },
  { id: "maths", label: "Maths Through Sport", description: "Carousel on /maths-through-sport page" },
  { id: "sensory", label: "Sensory Redevelopment", description: "Carousel on /sensory-redevelopment page" },
  { id: "next-chapter", label: "The Next Chapter", description: "Carousel on /the-next-chapter page" },
  { id: "programmes", label: "Our Programmes", description: "Carousel on /our-programmes page" },
  { id: "coaches", label: "Our Coaches", description: "Carousel on /our-coaches page" },
] as const;

// Programme card sections - for the homepage programme cards
const PROGRAMME_CARD_SECTIONS = [
  { id: "programme-card-maths", slug: "maths-through-sport", label: "Maths Through Sport", description: "Card image on homepage" },
  { id: "programme-card-sensory", slug: "sensory-redevelopment", label: "Sensory Sessions", description: "Card image on homepage" },
  { id: "programme-card-next-chapter", slug: "the-next-chapter", label: "The Next Chapter", description: "Card image on homepage" },
] as const;

// Video sections - for showcase videos
const VIDEO_SECTIONS = [
  { id: "hero-homepage", label: "Homepage Video", description: "\"See Us In Action\" video on homepage (MP4 recommended)" },
] as const;

type ImageSectionId = typeof IMAGE_SECTIONS[number]["id"];
type VideoSectionId = typeof VIDEO_SECTIONS[number]["id"];
type ProgrammeCardSectionId = typeof PROGRAMME_CARD_SECTIONS[number]["id"];

type MediaData = {
  url: string;
  pathname: string;
  uploadedAt?: string;
};

type ModalContent = {
  type: "image" | "video";
  url: string;
  name: string;
} | null;

type UploadProgress = {
  fileName: string;
  progress: number;
  status: "pending" | "uploading" | "complete" | "error";
};

export default function ImageAdminPage() {
  const [selectedSection, setSelectedSection] = useState<ImageSectionId>("homepage");
  const [images, setImages] = useState<Record<string, MediaData[]>>({});
  const [videos, setVideos] = useState<Record<string, MediaData[]>>({});
  const [programmeCardImages, setProgrammeCardImages] = useState<Record<string, MediaData | null>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingProgrammeCard, setUploadingProgrammeCard] = useState<string | null>(null);
  const [migrating, setMigrating] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [videoStatus, setVideoStatus] = useState<string>("");
  const [programmeCardStatus, setProgrammeCardStatus] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedVideoFiles, setSelectedVideoFiles] = useState<File[]>([]);
  const [modalContent, setModalContent] = useState<ModalContent>(null);
  const [videoUploadProgress, setVideoUploadProgress] = useState<UploadProgress[]>([]);

  // Load existing images and videos for all sections
  useEffect(() => {
    loadAllMedia();
  }, []);

  const loadAllMedia = async () => {
    try {
      const response = await fetch("/api/blob/list");
      if (response.ok) {
        const data = await response.json();
        setImages(data.images || {});
        setVideos(data.videos || {});

        // Extract programme card images from the response
        const cardImages: Record<string, MediaData | null> = {};
        PROGRAMME_CARD_SECTIONS.forEach(section => {
          const sectionImages = data.images?.[section.id] || [];
          cardImages[section.id] = sectionImages.length > 0 ? sectionImages[0] : null;
        });
        setProgrammeCardImages(cardImages);
      }
    } catch (error) {
      console.error("Failed to load media:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      setStatus(`Selected ${files.length} file${files.length > 1 ? 's' : ''}`);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setStatus("Please select file(s) first");
      return;
    }

    setUploading(true);
    let uploaded = 0;
    const total = selectedFiles.length;

    try {
      for (const file of selectedFiles) {
        setStatus(`Uploading ${file.name} (${uploaded + 1}/${total})...`);

        await upload(`${selectedSection}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
        });

        uploaded++;
      }

      setStatus(`Successfully uploaded ${uploaded} file${uploaded > 1 ? 's' : ''}!`);
      setSelectedFiles([]);

      const fileInput = document.getElementById("file-input") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      await loadAllMedia();
    } catch (error) {
      setStatus(`Upload failed after ${uploaded}/${total}: ${(error as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleProgrammeCardUpload = async (sectionId: ProgrammeCardSectionId, file: File) => {
    setUploadingProgrammeCard(sectionId);
    setProgrammeCardStatus(`Uploading ${file.name}...`);

    try {
      // Delete existing image first if there is one
      const existingImage = programmeCardImages[sectionId];
      if (existingImage) {
        await fetch("/api/blob/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: existingImage.url }),
        });
      }

      // Upload new image
      await upload(`${sectionId}/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });

      setProgrammeCardStatus("Image uploaded successfully!");
      await loadAllMedia();
    } catch (error) {
      setProgrammeCardStatus(`Upload failed: ${(error as Error).message}`);
    } finally {
      setUploadingProgrammeCard(null);
    }
  };

  const handleProgrammeCardDelete = async (sectionId: ProgrammeCardSectionId) => {
    const existingImage = programmeCardImages[sectionId];
    if (!existingImage) return;

    if (!confirm("Are you sure you want to delete this programme card image?")) return;

    try {
      const response = await fetch("/api/blob/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: existingImage.url }),
      });

      if (response.ok) {
        setProgrammeCardStatus("Image deleted");
        await loadAllMedia();
      } else {
        setProgrammeCardStatus("Failed to delete image");
      }
    } catch (error) {
      setProgrammeCardStatus(`Delete failed: ${(error as Error).message}`);
    }
  };

  const handleMigrate = async () => {
    if (!confirm("This will copy all existing local carousel images to Vercel Blob storage. Continue?")) {
      return;
    }

    setMigrating(true);
    setStatus("Migrating existing images...");

    try {
      const response = await fetch("/api/blob/migrate", { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        setStatus(`Migration complete! Migrated ${data.migrated} images.`);
        await loadAllMedia();
      } else {
        setStatus(`Migration failed: ${data.error}`);
      }
    } catch (error) {
      setStatus(`Migration failed: ${(error as Error).message}`);
    } finally {
      setMigrating(false);
    }
  };

  const handleDelete = async (url: string, type: "image" | "video" = "image") => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const response = await fetch("/api/blob/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        if (type === "video") {
          setVideoStatus("Video deleted");
        } else {
          setStatus("Image deleted");
        }
        await loadAllMedia();
      } else {
        if (type === "video") {
          setVideoStatus("Failed to delete video");
        } else {
          setStatus("Failed to delete image");
        }
      }
    } catch (error) {
      const msg = `Delete failed: ${(error as Error).message}`;
      if (type === "video") {
        setVideoStatus(msg);
      } else {
        setStatus(msg);
      }
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedVideoFiles(files);
      setVideoStatus(`Selected ${files.length} video${files.length > 1 ? 's' : ''}`);
      // Initialize progress tracking
      setVideoUploadProgress(files.map(f => ({
        fileName: f.name,
        progress: 0,
        status: "pending"
      })));
    }
  };

  const handleVideoUpload = async (sectionId: VideoSectionId) => {
    if (selectedVideoFiles.length === 0) {
      setVideoStatus("Please select video file(s) first");
      return;
    }

    setUploadingVideo(true);
    const total = selectedVideoFiles.length;
    let uploaded = 0;

    try {
      for (let i = 0; i < selectedVideoFiles.length; i++) {
        const file = selectedVideoFiles[i];

        // Update progress to uploading
        setVideoUploadProgress(prev => prev.map((p, idx) =>
          idx === i ? { ...p, status: "uploading", progress: 10 } : p
        ));

        setVideoStatus(`Uploading ${file.name} (${i + 1}/${total})...`);

        // Simulate progress updates during upload
        const progressInterval = setInterval(() => {
          setVideoUploadProgress(prev => prev.map((p, idx) =>
            idx === i && p.status === "uploading" && p.progress < 90
              ? { ...p, progress: Math.min(p.progress + 10, 90) }
              : p
          ));
        }, 300);

        try {
          await upload(`${sectionId}/${file.name}`, file, {
            access: "public",
            handleUploadUrl: "/api/blob/upload",
          });

          clearInterval(progressInterval);

          // Mark as complete
          setVideoUploadProgress(prev => prev.map((p, idx) =>
            idx === i ? { ...p, status: "complete", progress: 100 } : p
          ));

          uploaded++;
        } catch (error) {
          clearInterval(progressInterval);

          // Mark as error
          setVideoUploadProgress(prev => prev.map((p, idx) =>
            idx === i ? { ...p, status: "error", progress: 0 } : p
          ));

          throw error;
        }
      }

      setVideoStatus(`Successfully uploaded ${uploaded} video${uploaded > 1 ? 's' : ''}!`);
      setSelectedVideoFiles([]);
      setVideoUploadProgress([]);

      const fileInput = document.getElementById("video-input") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      await loadAllMedia();
    } catch (error) {
      setVideoStatus(`Upload failed after ${uploaded}/${total}: ${(error as Error).message}`);
    } finally {
      setUploadingVideo(false);
    }
  };

  const openModal = (type: "image" | "video", url: string, name: string) => {
    setModalContent({ type, url, name });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const currentSectionImages = images[selectedSection] || [];
  const currentSection = IMAGE_SECTIONS.find(s => s.id === selectedSection);
  const currentSectionColor = SECTION_COLORS[selectedSection];

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header with logout and nav */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}>
        <div>
          <h1 style={{ marginBottom: "5px" }}>Media Management</h1>
          <p style={{ color: "#666", margin: 0 }}>
            Upload and manage images and videos for the site.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            href="/admin/docs"
            style={{
              padding: "8px 16px",
              backgroundColor: "#1e3a5f",
              color: "white",
              border: "none",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Documentation
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#666",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Modal for viewing images/videos */}
      {modalContent && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              position: "relative",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              Close
            </button>
            {modalContent.type === "image" ? (
              <img
                src={modalContent.url}
                alt={modalContent.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <video
                src={modalContent.url}
                controls
                autoPlay
                style={{
                  maxWidth: "100%",
                  maxHeight: "85vh",
                  borderRadius: "8px",
                }}
              />
            )}
            <p style={{ color: "white", textAlign: "center", marginTop: "10px" }}>
              {modalContent.name}
            </p>
          </div>
        </div>
      )}

      {/* ==================== PROGRAMME CARD IMAGES SECTION ==================== */}
      <div style={{
        border: "2px solid #8b5cf6",
        borderRadius: "12px",
        padding: "30px",
        marginBottom: "40px",
        backgroundColor: "#faf5ff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <span style={{ fontSize: "28px" }}>🎴</span>
          <h2 style={{ margin: 0, fontSize: "20px", color: "#6b21a8" }}>Programme Card Images</h2>
        </div>
        <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
          These images appear on the programme cards on the homepage. Upload one image per programme to replace the default.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {PROGRAMME_CARD_SECTIONS.map((section) => {
            const currentImage = programmeCardImages[section.id];
            const isUploading = uploadingProgrammeCard === section.id;

            return (
              <div
                key={section.id}
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "2px solid #c4b5fd",
                }}
              >
                <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#6b21a8" }}>
                  {section.label}
                </h3>
                <p style={{ margin: "0 0 15px 0", color: "#666", fontSize: "12px" }}>
                  {section.description}
                </p>

                {/* Current Image Preview */}
                {currentImage ? (
                  <div style={{ marginBottom: "15px" }}>
                    <img
                      src={currentImage.url}
                      alt={`${section.label} card`}
                      onClick={() => openModal("image", currentImage.url, section.label)}
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        cursor: "pointer",
                        border: "1px solid #e5e5e5",
                      }}
                    />
                    <button
                      onClick={() => handleProgrammeCardDelete(section.id)}
                      style={{
                        marginTop: "8px",
                        padding: "6px 12px",
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                        width: "100%",
                      }}
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div style={{
                    width: "100%",
                    height: "120px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "15px",
                    color: "#999",
                    fontSize: "13px",
                  }}>
                    No custom image set
                  </div>
                )}

                {/* Upload Button */}
                <input
                  id={`programme-card-input-${section.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleProgrammeCardUpload(section.id, file);
                      e.target.value = "";
                    }
                  }}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor={`programme-card-input-${section.id}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "10px",
                    backgroundColor: isUploading ? "#ccc" : "#8b5cf6",
                    color: "white",
                    borderRadius: "6px",
                    cursor: isUploading ? "not-allowed" : "pointer",
                    fontSize: "13px",
                  }}
                >
                  {isUploading ? "Uploading..." : currentImage ? "Replace Image" : "Upload Image"}
                </label>
              </div>
            );
          })}
        </div>

        {programmeCardStatus && (
          <p style={{
            marginTop: "15px",
            textAlign: "center",
            color: programmeCardStatus.includes("failed") ? "#dc2626" : "#666",
            fontSize: "13px"
          }}>
            {programmeCardStatus}
          </p>
        )}
      </div>

      {/* ==================== IMAGE MANAGEMENT SECTION ==================== */}
      <div style={{
        border: "2px solid #0284c7",
        borderRadius: "12px",
        padding: "30px",
        marginBottom: "40px",
        backgroundColor: "#f0f9ff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <span style={{ fontSize: "28px" }}>🖼️</span>
          <h2 style={{ margin: 0, fontSize: "20px", color: "#0369a1" }}>Carousel Images</h2>
        </div>

        {/* Section Selector with Colors */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>Select Section:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {IMAGE_SECTIONS.map((section) => {
              const colors = SECTION_COLORS[section.id];
              const isSelected = selectedSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: isSelected ? colors.border : colors.bg,
                    color: isSelected ? "white" : colors.text,
                    border: `2px solid ${colors.border}`,
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: isSelected ? "600" : "400",
                    transition: "all 0.2s ease",
                  }}
                >
                  {section.label}
                  {(images[section.id]?.length || 0) > 0 && (
                    <span style={{
                      marginLeft: "6px",
                      backgroundColor: isSelected ? "rgba(255,255,255,0.3)" : colors.border,
                      color: isSelected ? "white" : "white",
                      padding: "2px 6px",
                      borderRadius: "10px",
                      fontSize: "11px",
                    }}>
                      {images[section.id]?.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Section Info with Color */}
        <div style={{
          backgroundColor: currentSectionColor.bg,
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "20px",
          fontSize: "14px",
          borderLeft: `4px solid ${currentSectionColor.border}`,
        }}>
          <strong style={{ color: currentSectionColor.text }}>{currentSection?.label}</strong>
          <span style={{ color: "#666", marginLeft: "10px" }}>{currentSection?.description}</span>
        </div>

        {/* Upload Area */}
        <div style={{
          border: `2px dashed ${currentSectionColor.border}`,
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          textAlign: "center",
          backgroundColor: "#fff",
        }}>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label
            htmlFor="file-input"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: currentSectionColor.bg,
              border: `1px solid ${currentSectionColor.border}`,
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              color: currentSectionColor.text,
            }}
          >
            {selectedFiles.length > 0
              ? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`
              : "Choose images..."}
          </label>
          <button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              backgroundColor: uploading || selectedFiles.length === 0 ? "#ccc" : currentSectionColor.border,
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: uploading || selectedFiles.length === 0 ? "not-allowed" : "pointer",
              fontSize: "14px",
            }}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {status && (
            <p style={{ marginTop: "10px", color: status.includes("failed") ? "#dc2626" : "#666", fontSize: "13px" }}>
              {status}
            </p>
          )}
        </div>

        {/* Image Grid with Color Border */}
        <div style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "8px",
          border: `1px solid ${currentSectionColor.border}`,
        }}>
          <p style={{ fontSize: "14px", color: currentSectionColor.text, marginBottom: "10px", fontWeight: "500" }}>
            Current Images ({currentSectionImages.length}) - Click to view full size
          </p>
          {currentSectionImages.length === 0 ? (
            <p style={{ color: "#999", fontStyle: "italic", fontSize: "14px" }}>
              No images uploaded to this section yet.
            </p>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: "10px",
            }}>
              {currentSectionImages.map((image, index) => (
                <div
                  key={image.url}
                  style={{
                    border: `2px solid ${currentSectionColor.border}`,
                    borderRadius: "6px",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    position: "relative",
                  }}
                >
                  <img
                    src={image.url}
                    alt={`${currentSection?.label} image ${index + 1}`}
                    onClick={() => openModal("image", image.url, image.pathname.split("/").pop() || "")}
                    style={{
                      width: "100%",
                      height: "80px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                  <div style={{ padding: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: currentSectionColor.bg }}>
                    <span style={{ fontSize: "10px", color: currentSectionColor.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60px" }}>
                      {image.pathname.split("/").pop()}
                    </span>
                    <button
                      onClick={() => handleDelete(image.url, "image")}
                      style={{
                        padding: "2px 6px",
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "10px",
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Migrate Button */}
        <div style={{
          marginTop: "20px",
          paddingTop: "20px",
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontSize: "13px", color: "#666" }}>
            Migrate existing local images to cloud storage
          </span>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            style={{
              padding: "8px 16px",
              backgroundColor: migrating ? "#ccc" : "#ea580c",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: migrating ? "not-allowed" : "pointer",
              fontSize: "13px",
            }}
          >
            {migrating ? "Migrating..." : "Migrate All"}
          </button>
        </div>
      </div>

      {/* ==================== VIDEO MANAGEMENT SECTION ==================== */}
      <div style={{
        border: "2px solid #dc2626",
        borderRadius: "12px",
        padding: "30px",
        backgroundColor: "#fef2f2",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <span style={{ fontSize: "28px" }}>🎬</span>
          <h2 style={{ margin: 0, fontSize: "20px", color: "#991b1b" }}>Video Showcase</h2>
        </div>
        <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
          Upload videos for the site. Videos can be expanded to full view by visitors. Supports bulk upload.
        </p>

        {VIDEO_SECTIONS.map((section) => {
          const sectionVideos = videos[section.id] || [];
          const colors = VIDEO_COLORS[section.id];

          return (
            <div
              key={section.id}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                border: `2px solid ${colors.border}`,
              }}
            >
              <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", color: colors.text }}>{section.label}</h3>
              <p style={{ margin: "0 0 15px 0", color: "#666", fontSize: "13px" }}>
                {section.description}
              </p>

              {/* Current Videos Grid */}
              {sectionVideos.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ fontSize: "13px", color: colors.text, marginBottom: "10px", fontWeight: "500" }}>
                    Current Videos ({sectionVideos.length})
                  </p>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "15px",
                  }}>
                    {sectionVideos.map((video) => (
                      <div
                        key={video.url}
                        style={{
                          border: `2px solid ${colors.border}`,
                          borderRadius: "8px",
                          overflow: "hidden",
                          backgroundColor: colors.bg,
                        }}
                      >
                        <div
                          onClick={() => openModal("video", video.url, video.pathname.split("/").pop() || "")}
                          style={{
                            width: "100%",
                            height: "100px",
                            backgroundColor: "#000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        >
                          <video
                            src={video.url}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            muted
                          />
                          <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "14px",
                          }}>
                            ▶
                          </div>
                        </div>
                        <div style={{ padding: "8px" }}>
                          <p style={{
                            fontSize: "11px",
                            color: colors.text,
                            margin: "0 0 6px 0",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}>
                            {video.pathname.split("/").pop()}
                          </p>
                          <button
                            onClick={() => handleDelete(video.url, "video")}
                            style={{
                              padding: "4px 10px",
                              backgroundColor: "#fee2e2",
                              color: "#dc2626",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "11px",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Area */}
              <div style={{
                border: `2px dashed ${colors.border}`,
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: colors.bg,
              }}>
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                  <input
                    id="video-input"
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm"
                    multiple
                    onChange={handleVideoFileChange}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="video-input"
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#fff",
                      border: `1px solid ${colors.border}`,
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "13px",
                      color: colors.text,
                    }}
                  >
                    {selectedVideoFiles.length > 0
                      ? `${selectedVideoFiles.length} video${selectedVideoFiles.length > 1 ? 's' : ''} selected`
                      : "Choose videos (MP4/MOV/WebM)..."}
                  </label>
                  <button
                    onClick={() => handleVideoUpload(section.id)}
                    disabled={uploadingVideo || selectedVideoFiles.length === 0}
                    style={{
                      marginLeft: "10px",
                      padding: "10px 20px",
                      backgroundColor: uploadingVideo || selectedVideoFiles.length === 0 ? "#ccc" : colors.border,
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: uploadingVideo || selectedVideoFiles.length === 0 ? "not-allowed" : "pointer",
                      fontSize: "13px",
                    }}
                  >
                    {uploadingVideo ? "Uploading..." : "Upload Videos"}
                  </button>
                </div>

                {/* Progress Bars */}
                {videoUploadProgress.length > 0 && (
                  <div style={{ marginTop: "15px" }}>
                    {videoUploadProgress.map((item, idx) => (
                      <div key={idx} style={{ marginBottom: "10px" }}>
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "4px",
                        }}>
                          <span style={{
                            fontSize: "12px",
                            color: item.status === "error" ? "#dc2626" : "#666",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "200px",
                          }}>
                            {item.fileName}
                          </span>
                          <span style={{
                            fontSize: "11px",
                            color: item.status === "complete" ? "#16a34a" : item.status === "error" ? "#dc2626" : "#666",
                            fontWeight: "500",
                          }}>
                            {item.status === "complete" ? "Done" :
                             item.status === "error" ? "Failed" :
                             item.status === "uploading" ? `${item.progress}%` : "Waiting..."}
                          </span>
                        </div>
                        <div style={{
                          width: "100%",
                          height: "6px",
                          backgroundColor: "#e5e5e5",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}>
                          <div style={{
                            width: `${item.progress}%`,
                            height: "100%",
                            backgroundColor: item.status === "complete" ? "#16a34a" :
                                           item.status === "error" ? "#dc2626" : colors.border,
                            borderRadius: "3px",
                            transition: "width 0.3s ease",
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {videoStatus && videoUploadProgress.length === 0 && (
                  <p style={{
                    textAlign: "center",
                    marginTop: "10px",
                    color: videoStatus.includes("failed") ? "#dc2626" : "#666",
                    fontSize: "12px"
                  }}>
                    {videoStatus}
                  </p>
                )}
              </div>

              {/* Tips */}
              <div style={{
                marginTop: "15px",
                fontSize: "12px",
                color: "#888",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                borderRadius: "6px",
              }}>
                <strong>Tips:</strong> MP4/WebM format recommended, keep under 50MB for best performance, 1920x1080 ideal
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
