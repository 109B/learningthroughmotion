"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  SITE_IMAGE_DEFINITIONS,
  type SiteImageOverridesFile,
} from "@/lib/siteImageConfig";

type SaveResult = {
  success?: boolean;
  error?: string;
  updatedAt?: string;
};

export default function AdminSiteImagesEditorClient() {
  const [data, setData] = useState<SiteImageOverridesFile>({
    updatedAt: "",
    version: 1,
    overrides: [],
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/admin/site-images");
        const payload = (await response.json()) as SiteImageOverridesFile & { error?: string };
        if (!response.ok) {
          setStatus(payload.error || "Failed to load site image settings.");
          return;
        }
        setData(payload);
      } catch {
        setStatus("Failed to load site image settings.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const groupedDefinitions = useMemo(() => {
    const groups = new Map<string, typeof SITE_IMAGE_DEFINITIONS>();
    for (const item of SITE_IMAGE_DEFINITIONS) {
      const groupItems = groups.get(item.group) || [];
      groupItems.push(item);
      groups.set(item.group, groupItems);
    }
    return groups;
  }, []);

  const getOverrideUrl = (key: string) => {
    return data.overrides.find((item) => item.key === key)?.imageUrl || "";
  };

  const updateOverride = (key: string, imageUrl: string) => {
    setData((prev) => {
      const existing = prev.overrides.find((item) => item.key === key);
      if (existing) {
        return {
          ...prev,
          overrides: prev.overrides.map((item) =>
            item.key === key
              ? {
                  ...item,
                  imageUrl,
                }
              : item
          ),
        };
      }

      return {
        ...prev,
        overrides: [
          ...prev.overrides,
          {
            key,
            imageUrl,
            updatedAt: new Date().toISOString(),
          },
        ],
      };
    });
  };

  const handleSave = async () => {
    setStatus("Saving...");
    try {
      const response = await fetch("/api/admin/site-images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          updatedAt: new Date().toISOString(),
        }),
      });

      const result = (await response.json()) as SaveResult;
      if (!response.ok || !result.success) {
        setStatus(result.error || "Failed to save site image settings.");
        return;
      }

      setStatus(`Saved at ${new Date(result.updatedAt || new Date().toISOString()).toLocaleString("en-GB")}`);
    } catch {
      setStatus("Failed to save site image settings.");
    }
  };

  if (loading) {
    return (
      <main style={{ padding: "32px 24px", maxWidth: "1120px", margin: "0 auto" }}>
        <p>Loading site image settings...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "32px 24px", maxWidth: "1120px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "16px", background: "linear-gradient(135deg, #1e3a5f 0%, #2b578f 100%)", padding: "18px", borderRadius: "14px", color: "#fff", position: "sticky", top: "108px", zIndex: 60, boxShadow: "0 10px 24px rgba(30,58,95,0.25)" }}>
        <div>
          <p style={{ margin: 0, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>
            Admin Media
          </p>
          <h1 style={{ margin: "8px 0 0 0", color: "#fff" }}>Site Image Manager</h1>
          <p style={{ margin: "6px 0 0 0", color: "rgba(255,255,255,0.9)" }}>
            Paste Cloudinary secure URLs to update brand and homepage images.
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

      <div style={{ display: "grid", gap: "14px" }}>
        {Array.from(groupedDefinitions.entries()).map(([group, items]) => (
          <section key={group} style={{ border: "1px solid #dce5ef", borderRadius: "12px", background: "#fff", padding: "14px" }}>
            <h2 style={{ margin: "0 0 10px 0", color: "#1e3a5f" }}>{group}</h2>
            <div style={{ display: "grid", gap: "12px" }}>
              {items.map((item) => {
                const value = getOverrideUrl(item.key);
                return (
                  <article key={item.key} style={{ border: "1px solid #e6ecf2", borderRadius: "10px", padding: "12px", background: "#fbfdff" }}>
                    <p style={{ margin: 0, color: "#1e3a5f", fontWeight: 700 }}>{item.label}</p>
                    <p style={{ margin: "4px 0", color: "#667085", fontSize: "0.88rem" }}>{item.key}</p>
                    {item.hint && <p style={{ margin: "0 0 8px 0", color: "#475467", fontSize: "0.9rem" }}>{item.hint}</p>}

                    <label style={{ display: "grid", gap: "6px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "13px", color: "#555" }}>Image URL</span>
                      <input
                        type="text"
                        value={value}
                        onChange={(event) => updateOverride(item.key, event.target.value)}
                        placeholder="https://res.cloudinary.com/..."
                        style={{ padding: "10px", borderRadius: "8px", border: "1px solid #cfd8e3" }}
                      />
                    </label>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => updateOverride(item.key, item.defaultUrl)}
                        style={{ padding: "8px 10px", borderRadius: "8px", border: "1px solid #c7d6ea", background: "#fff", color: "#1e3a5f", cursor: "pointer", fontWeight: 600 }}
                      >
                        Reset to default
                      </button>
                      <span style={{ color: "#667085", fontSize: "0.85rem" }}>Default: {item.defaultUrl}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
