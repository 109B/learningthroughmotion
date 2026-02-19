export type WorkItemType = "epic" | "feature" | "story" | "task";

export type WorkItemState = "new" | "active" | "blocked" | "resolved" | "closed";

export type WorkItemHorizon = "3m" | "6m" | "12m";

export type AdoWorkItem = {
  id: string;
  type: WorkItemType;
  title: string;
  description: string;
  state: WorkItemState;
  horizon: WorkItemHorizon;
  parentId?: string;
  assignee?: string;
  tags: string[];
  acceptance: string[];
  targetDate?: string;
  updatedAt: string;
};

export type RoadmapFile = {
  updatedAt: string;
  version: number;
  workItems: AdoWorkItem[];
};

const VALID_TYPES: WorkItemType[] = ["epic", "feature", "story", "task"];
const VALID_STATES: WorkItemState[] = ["new", "active", "blocked", "resolved", "closed"];
const VALID_HORIZONS: WorkItemHorizon[] = ["3m", "6m", "12m"];

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function isDateString(value: unknown) {
  if (typeof value !== "string") return false;
  const date = new Date(value);
  return Number.isFinite(date.getTime());
}

export function normalizeRoadmapPayload(input: unknown): RoadmapFile | null {
  if (!input || typeof input !== "object") return null;
  const workItems = (input as { workItems?: unknown }).workItems;
  if (!Array.isArray(workItems)) return null;

  const normalized: AdoWorkItem[] = [];

  for (const item of workItems) {
    if (!item || typeof item !== "object") return null;
    const record = item as Record<string, unknown>;

    if (!isNonEmptyString(record.id)) return null;
    if (!VALID_TYPES.includes(record.type as WorkItemType)) return null;
    if (!isNonEmptyString(record.title)) return null;
    if (typeof record.description !== "string") return null;
    if (!VALID_STATES.includes(record.state as WorkItemState)) return null;
    if (!VALID_HORIZONS.includes(record.horizon as WorkItemHorizon)) return null;
    if (record.parentId !== undefined && !isNonEmptyString(record.parentId)) return null;
    if (record.assignee !== undefined && typeof record.assignee !== "string") return null;
    if (!Array.isArray(record.tags) || !record.tags.every((tag) => typeof tag === "string")) return null;
    if (!Array.isArray(record.acceptance) || !record.acceptance.every((criterion) => typeof criterion === "string")) return null;
    if (record.targetDate !== undefined && !isDateString(record.targetDate)) return null;

    normalized.push({
      id: (record.id as string).trim(),
      type: record.type as WorkItemType,
      title: (record.title as string).trim(),
      description: (record.description as string).trim(),
      state: record.state as WorkItemState,
      horizon: record.horizon as WorkItemHorizon,
      parentId: typeof record.parentId === "string" ? record.parentId.trim() : undefined,
      assignee: typeof record.assignee === "string" ? record.assignee.trim() : undefined,
      tags: (record.tags as string[]).map((tag) => tag.trim()).filter(Boolean),
      acceptance: (record.acceptance as string[]).map((criterion) => criterion.trim()).filter(Boolean),
      targetDate: typeof record.targetDate === "string" ? new Date(record.targetDate).toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    });
  }

  const index = new Map(normalized.map((item) => [item.id, item]));

  for (const item of normalized) {
    if (!item.parentId) continue;
    const parent = index.get(item.parentId);
    if (!parent) return null;

    const rank = VALID_TYPES.indexOf(item.type);
    const parentRank = VALID_TYPES.indexOf(parent.type);
    if (parentRank >= rank) return null;
    if (item.horizon !== parent.horizon) return null;
  }

  return {
    updatedAt: new Date().toISOString(),
    version: 2,
    workItems: normalized,
  };
}

export function buildDefaultRoadmap(): RoadmapFile {
  const now = new Date().toISOString();
  return {
    updatedAt: now,
    version: 2,
    workItems: [
      {
        id: "EPIC-3M-001",
        type: "epic",
        title: "Stabilise delivery foundations",
        description: "Harden media pipelines and admin workflow for reliable weekly operations.",
        state: "active",
        horizon: "3m",
        tags: ["cloudinary", "ops"],
        acceptance: ["All key media surfaces have Cloudinary fallbacks", "Admin publish checklist is documented"],
        updatedAt: now,
      },
      {
        id: "FEAT-3M-001",
        type: "feature",
        parentId: "EPIC-3M-001",
        title: "Cloudinary production readiness",
        description: "Complete folder mappings and ensure image/video delivery is resilient.",
        state: "active",
        horizon: "3m",
        assignee: "Engineering",
        tags: ["media"],
        acceptance: ["Folder mappings verified", "Error states are user-friendly"],
        targetDate: now,
        updatedAt: now,
      },
    ],
  };
}

export function formatHorizonLabel(horizon: WorkItemHorizon) {
  if (horizon === "3m") return "0-3 Months";
  if (horizon === "6m") return "3-6 Months";
  return "6-12 Months";
}
