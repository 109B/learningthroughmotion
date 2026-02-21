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

const DAY_OPTIONS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

export default function AdminSessionsEditorPage() {
  const [data, setData] = useState<AdminSessionsFile>({
    updatedAt: "",
    version: 1,
    sessionTimes: [],
    blocks: [],
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [blocksToAdd, setBlocksToAdd] = useState(1);

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

  const addBlock = (count = 1) => {
    const safeCount = Math.min(Math.max(1, count), 12);
    const baseTime = Date.now();
    setData((prev) => {
      const newBlocks = Array.from({ length: safeCount }, (_, index) => {
        const now = new Date(baseTime + index * 1000).toISOString();
        return {
          id: `block-${baseTime}-${index + 1}`,
          name: safeCount === 1 ? "New Session Block" : `New Session Block ${index + 1}`,
          description: "",
          start_date: now,
          end_date: now,
          day_of_week: 6,
          time_start: "09:00",
          time_end: "12:00",
          capacity: 6,
          current_bookings: 0,
          location: "Bishop Bridgeman C.E. Primary School",
          status: "draft" as const,
          registration_fee: 10,
          session_fee: 15,
          full_block_session_fee: 12,
          total_sessions: 6,
          created_at: now,
          updated_at: now,
        };
      });

      return {
        ...prev,
        blocks: [...prev.blocks, ...newBlocks],
      };
    });
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "16px", background: "linear-gradient(135deg, #1e3a5f 0%, #2b578f 100%)", padding: "18px", borderRadius: "14px", color: "#fff", position: "sticky", top: "108px", zIndex: 60, boxShadow: "0 10px 24px rgba(30,58,95,0.25)" }}>
        <div>
          <p style={{ margin: 0, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>
            Admin Sessions
          </p>
          <h1 style={{ margin: "8px 0 0 0", color: "#fff" }}>Weekend Session Blocks</h1>
          <p style={{ margin: "6px 0 0 0", color: "rgba(255,255,255,0.9)" }}>
            Update dates, prices, and status shown on the booking page.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/admin" style={{ padding: "10px 12px", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "10px", color: "#fff" }}>
            Back to Admin
          </Link>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: "10px", padding: "8px 10px" }}>
            <span style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>How many blocks?</span>
            <input
              type="number"
              min={1}
              max={12}
              value={blocksToAdd}
              onChange={(event) => setBlocksToAdd(Math.min(12, Math.max(1, Number(event.target.value) || 1)))}
              style={{ width: "58px", padding: "6px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.35)", background: "#fff", color: "#1e3a5f", fontWeight: 700 }}
            />
          </label>
          <button onClick={() => addBlock(blocksToAdd)} style={{ padding: "10px 12px", border: "1px solid #fff", borderRadius: "10px", background: "#fff", cursor: "pointer", color: "#1e3a5f", fontWeight: 700 }}>
            Add Block(s)
          </button>
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

      <section style={{ border: "1px solid #d7e2ee", borderRadius: "12px", background: "#f7fbff", padding: "14px", marginBottom: "14px" }}>
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
          <article key={block.id} style={{ border: "1px solid #dce5ef", borderRadius: "12px", background: "#fff", padding: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", gap: "8px", flexWrap: "wrap" }}>
              <strong style={{ color: "#1e3a5f" }}>{block.name}</strong>
              <span style={{ fontSize: "12px", background: block.status === "published" ? "#dcfce7" : "#f1f5f9", color: block.status === "published" ? "#166534" : "#475569", padding: "4px 8px", borderRadius: "999px", textTransform: "uppercase", fontWeight: 700 }}>
                {block.status}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
              <label>
                Block ID
                <input
                  type="text"
                  value={block.id}
                  onChange={(event) => updateBlock(block.id, { id: event.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>
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
                Day
                <select
                  value={block.day_of_week}
                  onChange={(event) => updateBlock(block.id, { day_of_week: Number(event.target.value) })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                >
                  {DAY_OPTIONS.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Time Start
                <input
                  type="time"
                  value={block.time_start}
                  onChange={(event) => updateBlock(block.id, { time_start: event.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>
              <label>
                Time End
                <input
                  type="time"
                  value={block.time_end}
                  onChange={(event) => updateBlock(block.id, { time_end: event.target.value })}
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
                Current Bookings
                <input
                  type="number"
                  min={0}
                  value={block.current_bookings}
                  onChange={(event) => updateBlock(block.id, { current_bookings: Math.max(0, Number(event.target.value) || 0) })}
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
              <label>
                Registration Fee (£)
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={block.registration_fee}
                  onChange={(event) => updateBlock(block.id, { registration_fee: Math.max(0, Number(event.target.value) || 0) })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>
              <label>
                Pay-As-You-Go (£/session)
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={block.session_fee}
                  onChange={(event) => updateBlock(block.id, { session_fee: Math.max(0, Number(event.target.value) || 0) })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>
              <label>
                Full Block (£/session)
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={block.full_block_session_fee}
                  onChange={(event) => updateBlock(block.id, { full_block_session_fee: Math.max(0, Number(event.target.value) || 0) })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>
              <label>
                Location
                <input
                  type="text"
                  value={block.location || ""}
                  onChange={(event) => updateBlock(block.id, { location: event.target.value || null })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
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

            <p style={{ margin: "10px 0 0 0", fontSize: "12px", color: "#667085" }}>
              Created: {new Date(block.created_at).toLocaleString("en-GB")} | Last updated: {new Date(block.updated_at).toLocaleString("en-GB")}
            </p>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => duplicateBlock(block)}
                style={{ padding: "8px 10px", border: "1px solid #1e3a5f", borderRadius: "8px", background: "#eef4fc", color: "#1e3a5f", cursor: "pointer", marginRight: "8px", fontWeight: 600 }}
              >
                Duplicate Block
              </button>
              <button
                onClick={() => removeBlock(block.id)}
                style={{ padding: "8px 10px", border: "1px solid #ef4444", borderRadius: "8px", background: "#fff5f5", color: "#ef4444", cursor: "pointer", fontWeight: 600 }}
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
