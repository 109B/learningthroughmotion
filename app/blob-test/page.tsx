"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";

export default function BlobTestPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Ready");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setStatus(`Selected: ${file.name}`);
      setError(null);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    setStatus("Form submitted...");
    setError(null);
    setUploadedUrl(null);

    const file = inputRef.current?.files?.[0];
    console.log("File:", file);
    if (!file) {
      setError("Please select a file");
      setStatus("No file selected");
      return;
    }

    console.log("Starting upload for:", file.name, file.type, file.size);
    setStatus(`Uploading ${file.name}...`);
    setUploading(true);

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });

      console.log("Upload successful:", blob);
      setUploadedUrl(blob.url);
      setStatus("Upload complete!");
    } catch (err) {
      console.error("Upload error:", err);
      setError((err as Error).message);
      setStatus("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Blob Storage Test</h1>

      <p style={{ marginBottom: "10px", color: "#666", fontSize: "14px" }}>
        Status: {status}
      </p>

      <form onSubmit={handleUpload} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="file-input"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#f0f0f0",
              border: "2px dashed #999",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {selectedFile ? `Selected: ${selectedFile}` : "Click to select a file"}
          </label>
          <input
            id="file-input"
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0D7C66",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: uploading ? "not-allowed" : "pointer",
            opacity: uploading ? 0.7 : 1,
          }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {error && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {uploadedUrl && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ marginBottom: "10px" }}>
            <strong>Uploaded successfully!</strong>
          </p>
          <p
            style={{
              wordBreak: "break-all",
              fontSize: "14px",
              color: "#666",
              marginBottom: "10px",
            }}
          >
            {uploadedUrl}
          </p>
          {uploadedUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
            <img
              src={uploadedUrl}
              alt="Uploaded"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          ) : uploadedUrl.match(/\.(mp4|mov|webm)$/i) ? (
            <video
              src={uploadedUrl}
              controls
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          ) : null}
        </div>
      )}

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Supported file types:</h3>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>Images: JPEG, PNG, WebP, HEIC, HEIF</li>
          <li>Videos: MP4, MOV (QuickTime)</li>
        </ul>
      </div>
    </div>
  );
}
