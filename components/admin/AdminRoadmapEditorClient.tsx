"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  formatHorizonLabel,
  type AdoWorkItem,
  type RoadmapFile,
  type WorkItemHorizon,
  type WorkItemState,
  type WorkItemType,
} from "@/lib/adminRoadmap";

type HistoryResponse = {
  snapshots?: string[];
};

const horizonOrder: WorkItemHorizon[] = ["3m", "6m", "12m"];
const stateOptions: WorkItemState[] = ["new", "active", "blocked", "resolved", "closed"];
const typeOrder: WorkItemType[] = ["epic", "feature", "story", "task"];

function createId(type: WorkItemType, horizon: WorkItemHorizon, existing: AdoWorkItem[]) {
  const prefix = `${type.toUpperCase()}-${horizon.toUpperCase()}-`;
  const next = existing
    .map((item) => item.id)
    .filter((id) => id.startsWith(prefix))
    .map((id) => Number(id.split("-").pop() || 0))
    .reduce((max, current) => Math.max(max, current), 0) + 1;

  return `${prefix}${String(next).padStart(3, "0")}`;
}

function childTypeFor(type: WorkItemType): WorkItemType | null {
  if (type === "epic") return "feature";
  if (type === "feature") return "story";
  if (type === "story") return "task";
  return null;
}

function typeLabel(type: WorkItemType) {
  return type.toUpperCase();
}

export default function AdminRoadmapEditorPage() {
  const [data, setData] = useState<RoadmapFile>({ updatedAt: "", version: 2, workItems: [] });
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [roadmapResponse, historyResponse] = await Promise.all([
          fetch("/api/admin/roadmap"),
          fetch("/api/admin/roadmap/history"),
        ]);

        const roadmapData = (await roadmapResponse.json()) as RoadmapFile & { error?: string };
        const historyData = (await historyResponse.json()) as HistoryResponse;

        if (!roadmapResponse.ok) {
          setStatus(roadmapData.error || "Failed to load roadmap.");
          return;
        }

        setData({
          updatedAt: roadmapData.updatedAt,
          version: roadmapData.version || 2,
          workItems: roadmapData.workItems || [],
        });
        setSnapshots(historyData.snapshots || []);
      } catch {
        setStatus("Failed to load roadmap.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const itemIndex = useMemo(
    () => new Map(data.workItems.map((item) => [item.id, item])),
    [data.workItems]
  );

  const sortedWorkItems = useMemo(() => {
    return [...data.workItems].sort((a, b) => {
      if (a.horizon !== b.horizon) return horizonOrder.indexOf(a.horizon) - horizonOrder.indexOf(b.horizon);
      if (a.type !== b.type) return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
      return a.id.localeCompare(b.id);
    });
  }, [data.workItems]);

  const updateItem = (id: string, next: Partial<AdoWorkItem>) => {
    setData((prev) => ({
      ...prev,
      workItems: prev.workItems.map((item) =>
        item.id === id
          ? {
              ...item,
              ...next,
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    }));
  };

  const addEpic = (horizon: WorkItemHorizon) => {
    setData((prev) => {
      const id = createId("epic", horizon, prev.workItems);
      return {
        ...prev,
        workItems: [
          ...prev.workItems,
          {
            id,
            type: "epic",
            title: "New epic",
            description: "",
            state: "new",
            horizon,
            tags: [],
            acceptance: [],
            updatedAt: new Date().toISOString(),
          },
        ],
      };
    });
  };

  const addChild = (parent: AdoWorkItem) => {
    const childType = childTypeFor(parent.type);
    if (!childType) return;

    setData((prev) => {
      const id = createId(childType, parent.horizon, prev.workItems);
      return {
        ...prev,
        workItems: [
          ...prev.workItems,
          {
            id,
            type: childType,
            parentId: parent.id,
            title: `New ${childType}`,
            description: "",
            state: "new",
            horizon: parent.horizon,
            tags: [],
            acceptance: [],
            updatedAt: new Date().toISOString(),
          },
        ],
      };
    });
  };

  const removeItem = (id: string) => {
    setData((prev) => {
      const idsToDelete = new Set<string>([id]);
      let found = true;

      while (found) {
        found = false;
        for (const item of prev.workItems) {
          if (item.parentId && idsToDelete.has(item.parentId) && !idsToDelete.has(item.id)) {
            idsToDelete.add(item.id);
            found = true;
          }
        }
      }

      return {
        ...prev,
        workItems: prev.workItems.filter((item) => !idsToDelete.has(item.id)),
      };
    });
  };

  const handleSave = async () => {
    setStatus("Saving...");
    try {
      const payload: RoadmapFile = {
        version: 2,
        updatedAt: new Date().toISOString(),
        workItems: data.workItems,
      };

      const response = await fetch("/api/admin/roadmap", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
        updatedAt?: string;
        snapshot?: string;
      };

      if (!response.ok || !result.success) {
        setStatus(result.error || "Failed to save.");
        return;
      }

      const updatedAt = result.updatedAt || new Date().toISOString();
      setData((prev) => ({ ...prev, updatedAt }));
      setStatus(`Saved at ${new Date(updatedAt).toLocaleString("en-GB")}`);

      if (result.snapshot) {
        setSnapshots((prev) => [result.snapshot!, ...prev.filter((item) => item !== result.snapshot)].slice(0, 20));
      }
    } catch {
      setStatus("Failed to save.");
    }
  };

  if (loading) {
    return (
      <main style={{ padding: "32px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <p>Loading roadmap...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "32px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px", background: "linear-gradient(135deg, #1e3a5f 0%, #2b578f 100%)", padding: "18px", borderRadius: "14px", color: "#fff" }}>
        <div>
          <p style={{ margin: 0, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>
            Admin Roadmap
          </p>
          <h1 style={{ margin: "8px 0 0 0", color: "#fff" }}>ADO Work Items (3 / 6 / 12 Months)</h1>
          <p style={{ margin: "6px 0 0 0", color: "rgba(255,255,255,0.9)" }}>
            Epics, Features, Stories, and Tasks with parent linkage and status tracking.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link href="/admin" style={{ padding: "10px 12px", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "10px", color: "#fff" }}>
            Back to Admin
          </Link>
          <button onClick={handleSave} style={{ padding: "10px 14px", border: "1px solid #16a34a", background: "#16a34a", color: "#fff", borderRadius: "10px", cursor: "pointer", fontWeight: 700 }}>
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
        {horizonOrder.map((horizon) => {
          const items = sortedWorkItems.filter((item) => item.horizon === horizon);
          return (
            <section key={horizon} style={{ border: "1px solid #e6e6e6", borderRadius: "12px", background: "#fff", padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <h2 style={{ margin: 0 }}>{formatHorizonLabel(horizon)}</h2>
                <button
                  onClick={() => addEpic(horizon)}
                  style={{ padding: "7px 10px", border: "1px solid #cfd8e3", background: "#f4f7fb", borderRadius: "8px", cursor: "pointer" }}
                >
                  Add Epic
                </button>
              </div>

              {items.length === 0 ? (
                <p style={{ margin: 0, color: "#666" }}>No work items in this horizon yet.</p>
              ) : (
                <div style={{ display: "grid", gap: "10px" }}>
                  {items.map((item) => {
                    const parent = item.parentId ? itemIndex.get(item.parentId) : null;
                    const childType = childTypeFor(item.type);

                    return (
                      <article key={item.id} style={{ border: "1px solid #ececec", borderRadius: "10px", padding: "12px", background: "#fafafa" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "140px 140px 1fr auto", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                          <strong>{typeLabel(item.type)}</strong>
                          <select
                            value={item.state}
                            onChange={(e) => updateItem(item.id, { state: e.target.value as WorkItemState })}
                            style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "8px" }}
                          >
                            {stateOptions.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                          <code style={{ color: "#1e3a5f" }}>{item.id}</code>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{ padding: "6px 10px", border: "1px solid #efcaca", background: "#fff5f5", color: "#a33", borderRadius: "8px", cursor: "pointer" }}
                          >
                            Remove
                          </button>
                        </div>

                        {parent && (
                          <p style={{ margin: "0 0 8px 0", color: "#666", fontSize: "0.92rem" }}>
                            Parent: <code>{parent.id}</code> {parent.title}
                          </p>
                        )}

                        <label style={{ display: "grid", gap: "6px", marginBottom: "8px" }}>
                          <span style={{ fontSize: "13px", color: "#555" }}>Title</span>
                          <input
                            value={item.title}
                            onChange={(e) => updateItem(item.id, { title: e.target.value })}
                            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
                          />
                        </label>

                        <label style={{ display: "grid", gap: "6px", marginBottom: "8px" }}>
                          <span style={{ fontSize: "13px", color: "#555" }}>Description</span>
                          <textarea
                            rows={3}
                            value={item.description}
                            onChange={(e) => updateItem(item.id, { description: e.target.value })}
                            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd", resize: "vertical" }}
                          />
                        </label>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                          <label style={{ display: "grid", gap: "6px" }}>
                            <span style={{ fontSize: "13px", color: "#555" }}>Assignee</span>
                            <input
                              value={item.assignee || ""}
                              onChange={(e) => updateItem(item.id, { assignee: e.target.value })}
                              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
                            />
                          </label>

                          <label style={{ display: "grid", gap: "6px" }}>
                            <span style={{ fontSize: "13px", color: "#555" }}>Target date</span>
                            <input
                              type="date"
                              value={item.targetDate ? new Date(item.targetDate).toISOString().slice(0, 10) : ""}
                              onChange={(e) => updateItem(item.id, { targetDate: e.target.value ? new Date(`${e.target.value}T00:00:00Z`).toISOString() : undefined })}
                              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
                            />
                          </label>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                          <label style={{ display: "grid", gap: "6px" }}>
                            <span style={{ fontSize: "13px", color: "#555" }}>Tags (comma separated)</span>
                            <input
                              value={item.tags.join(", ")}
                              onChange={(e) => updateItem(item.id, { tags: e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) })}
                              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
                            />
                          </label>

                          <label style={{ display: "grid", gap: "6px" }}>
                            <span style={{ fontSize: "13px", color: "#555" }}>Acceptance criteria (one per line)</span>
                            <textarea
                              rows={3}
                              value={item.acceptance.join("\n")}
                              onChange={(e) => updateItem(item.id, { acceptance: e.target.value.split("\n") })}
                              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd", resize: "vertical" }}
                            />
                          </label>
                        </div>

                        {childType && (
                          <div style={{ marginTop: "10px" }}>
                            <button
                              onClick={() => addChild(item)}
                              style={{ padding: "7px 10px", border: "1px solid #cfd8e3", background: "#f4f7fb", borderRadius: "8px", cursor: "pointer" }}
                            >
                              Add {childType}
                            </button>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <section style={{ marginTop: "20px", border: "1px solid #e6e6e6", borderRadius: "12px", background: "#fff", padding: "14px" }}>
        <h2 style={{ marginTop: 0, marginBottom: "8px", fontSize: "1.1rem" }}>Version History</h2>
        {snapshots.length === 0 ? (
          <p style={{ margin: 0, color: "#666" }}>No snapshots yet.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: "18px", display: "grid", gap: "6px" }}>
            {snapshots.map((snapshot) => (
              <li key={snapshot}>
                <code>{snapshot}</code>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
