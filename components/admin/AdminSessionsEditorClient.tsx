"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AdminSessionBlock, AdminSessionsFile } from "@/lib/sessionBlocks";

const STATUS_OPTIONS: Array<AdminSessionBlock["status"]> = [
  "draft",
  "published",
  "full",
  "completed",
];

function toDateInputValue(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function fromDateInputValue(value: string) {
  if (!value) return null;
  return new Date(`${value}T00:00:00.000Z`).toISOString();
}

export default function AdminSessionsEditorPage() {
  const [data, setData] = useState<AdminSessionsFile>({
    updatedAt: "",
    version: 1,
    sessionTimes: [],
    blocks: [],
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/admin/sessions");
        const payload = (await response.json()) as AdminSessionsFile & { error?: string };
        if (!response.ok) {
          setStatus(payload.error || "Failed to load sessions.");
          return;
        }
        setData(payload);
      } catch {
        setStatus("Failed to load sessions.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const updateBlock = (id: string, updates: Partial<AdminSessionBlock>) => {
    setData((prev) => ({
      ...prev,
      blocks: prev.blocks.map((block) =>
        block.id === id
          ? {
              ...block,
              ...updates,
            }
          : block
      ),
    }));
  };

  const removeBlock = (id: string) => {
    setData((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((block) => block.id !== id),
    }));
  };

  const duplicateBlock = (source: AdminSessionBlock) => {
    const now = new Date().toISOString();
    const startDate = new Date(source.start_date);
    const endDate = source.end_date ? new Date(source.end_date) : null;
    const daysInBlock = endDate
      ? Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
      : Math.max(1, source.total_sessions * 7);

    const nextStart = new Date(endDate ? endDate.getTime() : startDate.getTime());
    nextStart.setUTCDate(nextStart.getUTCDate() + 7);

    const nextEnd = new Date(nextStart.getTime());
    nextEnd.setUTCDate(nextEnd.getUTCDate() + daysInBlock);

    setData((prev) => ({
      ...prev,
      blocks: [
        ...prev.blocks,
        {
          ...source,
          id: `block-${Date.now()}`,
          name: `${source.name} (Copy)`,
          start_date: nextStart.toISOString(),
          end_date: nextEnd.toISOString(),
          current_bookings: 0,
          status: "draft",
          created_at: now,
          updated_at: now,
        },
      ],
    }));
  };

  const addBlock = () => {
    const now = new Date().toISOString();
    setData((prev) => ({
      ...prev,
      blocks: [
        ...prev.blocks,
        {
          id: `block-${Date.now()}`,
          name: "New Session Block",
          description: "",
          start_date: now,
          end_date: now,
          day_of_week: 6,
          time_start: "09:00",
          time_end: "12:00",
          capacity: 6,
          current_bookings: 0,
          location: "Bishop Bridgeman C.E. Primary School",
          status: "draft",
          registration_fee: 10,
          session_fee: 15,
          total_sessions: 6,
          created_at: now,
          updated_at: now,
        },
      ],
    }));
  };

  const handleSave = async () => {
    setStatus("Saving...");
    try {
      const payload: AdminSessionsFile = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/admin/sessions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { success?: boolean; error?: string; updatedAt?: string };
      if (!response.ok || !result.success) {
        setStatus(result.error || "Failed to save sessions.");
        return;
      }

      setStatus(`Saved at ${new Date(result.updatedAt || new Date().toISOString()).toLocaleString("en-GB")}`);
    } catch {
      setStatus("Failed to save sessions.");
    }
  };

  if (loading) {
    return (
      <main style={{ padding: "32px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <p>Loading sessions...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "32px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <div>
          <p style={{ margin: 0, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1e3a5f", fontWeight: 700 }}>
            Admin Sessions
          </p>
          <h1 style={{ margin: "8px 0 0 0" }}>Weekend Session Blocks</h1>
          <p style={{ margin: "6px 0 0 0", color: "#666" }}>
            Update dates, prices, and status shown on the booking page.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link href="/admin" style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "8px" }}>
            Back to Admin
          </Link>
          <button onClick={addBlock} style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: "8px", background: "#fff", cursor: "pointer" }}>
            Add Block
          </button>
          <button onClick={handleSave} style={{ padding: "8px 12px", border: "1px solid #1e3a5f", borderRadius: "8px", background: "#1e3a5f", color: "#fff", cursor: "pointer" }}>
            Save
          </button>
        </div>
      </div>

      {status && <p style={{ marginTop: 0, color: "#1e3a5f" }}>{status}</p>}

      <section style={{ border: "1px solid #e6e6e6", borderRadius: "12px", background: "#fff", padding: "14px", marginBottom: "14px" }}>
        <h2 style={{ marginTop: 0 }}>Session Times</h2>
        <input
          type="text"
          value={data.sessionTimes.join(", ")}
          onChange={(event) =>
            setData((prev) => ({
              ...prev,
              sessionTimes: event.target.value.split(",").map((item) => item.trim()).filter(Boolean),
            }))
          }
          placeholder="9:00 - 9:45, 9:45 - 10:30"
          style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
        />
      </section>

      <div style={{ display: "grid", gap: "12px" }}>
        {data.blocks.map((block) => (
          <article key={block.id} style={{ border: "1px solid #e6e6e6", borderRadius: "12px", background: "#fff", padding: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "10px" }}>
              <label>
                Name
                <input
                  type="text"
                  value={block.name}
                  onChange={(event) => updateBlock(block.id, { name: event.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>
              <label>
                Start Date
                <input
                  type="date"
                  value={toDateInputValue(block.start_date)}
                  onChange={(event) => updateBlock(block.id, { start_date: fromDateInputValue(event.target.value) || block.start_date })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>
              <label>
                End Date
                <input
                  type="date"
                  value={toDateInputValue(block.end_date)}
                  onChange={(event) => updateBlock(block.id, { end_date: fromDateInputValue(event.target.value) })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>
              <label>
                Sessions
                <input
                  type="number"
                  min={1}
                  value={block.total_sessions}
                  onChange={(event) => updateBlock(block.id, { total_sessions: Number(event.target.value) || 1 })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>
              <label>
                Capacity
                <input
                  type="number"
                  min={1}
                  value={block.capacity}
                  onChange={(event) => updateBlock(block.id, { capacity: Number(event.target.value) || 1 })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>
              <label>
                Status
                <select
                  value={block.status}
                  onChange={(event) => updateBlock(block.id, { status: event.target.value as AdminSessionBlock["status"] })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                >
                  {STATUS_OPTIONS.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label style={{ display: "block", marginTop: "10px" }}>
              Description
              <textarea
                rows={3}
                value={block.description || ""}
                onChange={(event) => updateBlock(block.id, { description: event.target.value })}
                style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
              />
            </label>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => duplicateBlock(block)}
                style={{ padding: "6px 10px", border: "1px solid #1e3a5f", borderRadius: "6px", background: "#fff", color: "#1e3a5f", cursor: "pointer", marginRight: "8px" }}
              >
                Duplicate Block
              </button>
              <button
                onClick={() => removeBlock(block.id)}
                style={{ padding: "6px 10px", border: "1px solid #ef4444", borderRadius: "6px", background: "#fff", color: "#ef4444", cursor: "pointer" }}
              >
                Remove Block
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
