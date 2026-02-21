"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PROGRAMMES } from "@/content/siteContent";
import type { ProgrammeCardOverrideFile } from "@/lib/programmeCardOverrides";

export default function AdminProgrammeCardsEditorClient() {
  const [data, setData] = useState<ProgrammeCardOverrideFile>({
    updatedAt: "",
    version: 1,
    overrides: [],
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/admin/programmes");
        const payload = (await response.json()) as ProgrammeCardOverrideFile & { error?: string };
        if (!response.ok) {
          setStatus(payload.error || "Failed to load programme card settings.");
          return;
        }
        setData(payload);
      } catch {
        setStatus("Failed to load programme card settings.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const updateOverride = (slug: string, imageUrl: string) => {
    setData((prev) => ({
      ...prev,
      overrides: prev.overrides.map((item) =>
        item.slug === slug
          ? {
              ...item,
              imageUrl,
            }
          : item
      ),
    }));
  };

  const handleSave = async () => {
    setStatus("Saving...");
    try {
      const response = await fetch("/api/admin/programmes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          updatedAt: new Date().toISOString(),
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string; updatedAt?: string };
      if (!response.ok || !result.success) {
        setStatus(result.error || "Failed to save programme card settings.");
        return;
      }

      setStatus(`Saved at ${new Date(result.updatedAt || new Date().toISOString()).toLocaleString("en-GB")}`);
    } catch {
      setStatus("Failed to save programme card settings.");
    }
  };

  if (loading) {
    return (
      <main style={{ padding: "32px 24px", maxWidth: "1000px", margin: "0 auto" }}>
        <p>Loading programme card settings...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "32px 24px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "16px", background: "linear-gradient(135deg, #1e3a5f 0%, #2b578f 100%)", padding: "18px", borderRadius: "14px", color: "#fff", position: "sticky", top: "108px", zIndex: 60, boxShadow: "0 10px 24px rgba(30,58,95,0.25)" }}>
        <div>
          <p style={{ margin: 0, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>
            Admin Programmes
          </p>
          <h1 style={{ margin: "8px 0 0 0", color: "#fff" }}>Programme Card Images</h1>
          <p style={{ margin: "6px 0 0 0", color: "rgba(255,255,255,0.9)" }}>
            Update the images shown in programme boxes on the homepage and programmes page.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link href="/admin" style={{ padding: "10px 12px", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "10px", color: "#fff" }}>
            Back to Admin
          </Link>
          <button onClick={handleSave} style={{ padding: "10px 14px", border: "1px solid #16a34a", borderRadius: "10px", background: "#16a34a", color: "#fff", cursor: "pointer", fontWeight: 700 }}>
            Save
          </button>
        </div>
      </div>

      {status && (
        <p style={{ marginTop: 0, marginBottom: "14px", color: "#1e3a5f", background: "#eef4fc", border: "1px solid #c7d6ea", borderRadius: "10px", padding: "10px 12px" }}>
          {status}
        </p>
      )}

      <div style={{ display: "grid", gap: "12px" }}>
        {PROGRAMMES.map((programme) => {
          const override = data.overrides.find((item) => item.slug === programme.slug);
          return (
            <article key={programme.slug} style={{ border: "1px solid #dce5ef", borderRadius: "12px", background: "#fff", padding: "14px" }}>
              <p style={{ margin: 0, color: "#1e3a5f", fontWeight: 700 }}>{programme.title}</p>
              <p style={{ marginTop: "4px", color: "#667085", fontSize: "0.9rem" }}>{programme.slug}</p>
              <label style={{ display: "grid", gap: "6px", marginTop: "10px" }}>
                <span style={{ fontSize: "13px", color: "#555" }}>Image URL</span>
                <input
                  type="text"
                  value={override?.imageUrl || ""}
                  onChange={(event) => updateOverride(programme.slug, event.target.value)}
                  placeholder="https://..."
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
                />
              </label>
            </article>
          );
        })}
      </div>
    </main>
  );
}
