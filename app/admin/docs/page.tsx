"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const DOC_SECTIONS = [
  {
    title: "Project Overview",
    icon: "📋",
    color: { bg: "#e0f2fe", border: "#0284c7", text: "#0369a1" },
    items: [
      { label: "Executive Summary", description: "High-level project overview and key metrics" },
      { label: "Time & Effort", description: "Detailed breakdown of development work" },
      { label: "Tech Stack", description: "Technologies and frameworks used" },
    ]
  },
  {
    title: "Features Built",
    icon: "✨",
    color: { bg: "#dcfce7", border: "#16a34a", text: "#166534" },
    items: [
      { label: "Homepage", description: "Hero carousel, sections, and CTAs" },
      { label: "Programme Pages", description: "Maths, Sensory, Next Chapter pages" },
      { label: "Interactive Games", description: "Memory, jigsaw, word search, number match" },
      { label: "Accessibility", description: "WCAG AAA compliance features" },
      { label: "Components", description: "Reusable UI components library" },
    ]
  },
  {
    title: "Admin Portal",
    icon: "🔐",
    color: { bg: "#fef3c7", border: "#d97706", text: "#92400e" },
    items: [
      { label: "Media Management", description: "Image and video upload system" },
      { label: "Authentication", description: "Login and session handling" },
      { label: "Section Colors", description: "Color-coded content organization" },
    ]
  },
  {
    title: "Technical",
    icon: "⚙️",
    color: { bg: "#e0e7ff", border: "#4f46e5", text: "#3730a3" },
    items: [
      { label: "Architecture", description: "Next.js App Router structure" },
      { label: "Content Management", description: "Centralized content in siteContent.ts" },
      { label: "Styling System", description: "Tailwind CSS and custom properties" },
      { label: "Vercel Blob", description: "Cloud storage integration" },
    ]
  },
];

const QUICK_LINKS = [
  { label: "MkDocs Site", href: "/docs-content/", external: true, description: "Full searchable documentation" },
  { label: "Progress Report", href: "/progress", description: "Client-facing changelog" },
  { label: "GitHub", href: "https://github.com", external: true, description: "Source code repository" },
];

export default function AdminDocsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}>
        <div>
          <h1 style={{ marginBottom: "5px" }}>Documentation</h1>
          <p style={{ color: "#666", margin: 0 }}>
            Project documentation, guides, and technical references.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            href="/admin/images"
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
            🖼️ Media
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

      {/* Quick Links */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "15px",
        marginBottom: "40px",
      }}>
        {QUICK_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            style={{
              padding: "20px",
              backgroundColor: "#1e3a5f",
              color: "white",
              borderRadius: "10px",
              textDecoration: "none",
              display: "block",
            }}
          >
            <div style={{ fontWeight: "600", fontSize: "16px", marginBottom: "5px" }}>
              {link.label} {link.external && "↗"}
            </div>
            <div style={{ fontSize: "13px", opacity: 0.8 }}>
              {link.description}
            </div>
          </a>
        ))}
      </div>

      {/* Documentation Sections */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
      }}>
        {DOC_SECTIONS.map((section) => (
          <div
            key={section.title}
            style={{
              border: `2px solid ${section.color.border}`,
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <div style={{
              backgroundColor: section.color.bg,
              padding: "15px 20px",
              borderBottom: `1px solid ${section.color.border}`,
            }}>
              <h2 style={{
                margin: 0,
                fontSize: "18px",
                color: section.color.text,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <span>{section.icon}</span>
                {section.title}
              </h2>
            </div>
            <div style={{ padding: "15px" }}>
              {section.items.map((item, idx) => (
                <div
                  key={item.label}
                  style={{
                    padding: "12px 0",
                    borderBottom: idx < section.items.length - 1 ? "1px solid #eee" : "none",
                  }}
                >
                  <div style={{ fontWeight: "500", color: "#333", marginBottom: "4px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "13px", color: "#666" }}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Updates */}
      <div style={{
        marginTop: "40px",
        padding: "25px",
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}>
        <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#374151" }}>
          📝 Recent Updates
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{
            padding: "15px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            borderLeft: "4px solid #dc2626",
          }}>
            <div style={{ fontWeight: "600", color: "#333", marginBottom: "5px" }}>
              January 29, 2026 - Admin Portal & Media Management
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>
              Added secure admin portal with media management, color-coded sections, bulk video upload with progress bars, and updated site color scheme.
            </div>
          </div>
          <div style={{
            padding: "15px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            borderLeft: "4px solid #16a34a",
          }}>
            <div style={{ fontWeight: "600", color: "#333", marginBottom: "5px" }}>
              January 27, 2026 - Documentation System
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>
              Added MkDocs documentation site with password protection and comprehensive project documentation.
            </div>
          </div>
          <div style={{
            padding: "15px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            borderLeft: "4px solid #0284c7",
          }}>
            <div style={{ fontWeight: "600", color: "#333", marginBottom: "5px" }}>
              December 11, 2025 - Programme Pages Revamp
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>
              Complete overhaul of Sensory Redevelopment and The Next Chapter pages with structured content and pricing.
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div style={{
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#fef3c7",
        borderRadius: "10px",
        border: "1px solid #fbbf24",
      }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#92400e", fontSize: "16px" }}>
          💡 Need Help?
        </h3>
        <p style={{ margin: 0, color: "#78350f", fontSize: "14px" }}>
          Contact the development team for support with the admin portal or website updates.
          For content changes, use the Media Management section to upload new images and videos.
        </p>
      </div>
    </div>
  );
}
