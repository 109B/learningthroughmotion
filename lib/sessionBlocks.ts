import { promises as fs } from "fs";
import path from "path";
import { SESSION_BLOCKS, SESSION_TIMES } from "@/content/sessionData";
import type { SessionBlock } from "@/lib/types/booking";

type SessionStatus = SessionBlock["status"];

export type AdminSessionBlock = {
  id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string | null;
  day_of_week: number;
  time_start: string;
  time_end: string;
  capacity: number;
  current_bookings: number;
  location: string | null;
  status: SessionStatus;
  registration_fee: number;
  session_fee: number;
  total_sessions: number;
  created_at: string;
  updated_at: string;
};

export type AdminSessionsFile = {
  updatedAt: string;
  version: number;
  sessionTimes: string[];
  blocks: AdminSessionBlock[];
};

const sessionsFilePath = path.join(process.cwd(), "content", "admin", "sessions.json");
const VALID_STATUSES: SessionStatus[] = ["draft", "published", "full", "completed"];

function toIsoDate(value: Date | string | null | undefined) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function toAdminBlock(block: SessionBlock): AdminSessionBlock {
  return {
    id: block.id,
    name: block.name,
    description: block.description,
    start_date: toIsoDate(block.start_date) || new Date().toISOString(),
    end_date: toIsoDate(block.end_date),
    day_of_week: block.day_of_week,
    time_start: block.time_start,
    time_end: block.time_end,
    capacity: block.capacity,
    current_bookings: block.current_bookings,
    location: block.location,
    status: block.status,
    registration_fee: block.registration_fee,
    session_fee: block.session_fee,
    total_sessions: block.total_sessions,
    created_at: toIsoDate(block.created_at) || new Date().toISOString(),
    updated_at: toIsoDate(block.updated_at) || new Date().toISOString(),
  };
}

function toRuntimeBlock(block: AdminSessionBlock): SessionBlock {
  return {
    ...block,
    description: block.description || "",
    start_date: new Date(block.start_date),
    end_date: block.end_date ? new Date(block.end_date) : null,
    created_at: new Date(block.created_at),
    updated_at: new Date(block.updated_at),
  };
}

export function buildDefaultSessionsFile(): AdminSessionsFile {
  return {
    updatedAt: new Date().toISOString(),
    version: 1,
    sessionTimes: [...SESSION_TIMES],
    blocks: SESSION_BLOCKS.map(toAdminBlock),
  };
}

export function normalizeSessionsPayload(input: unknown): AdminSessionsFile | null {
  if (!input || typeof input !== "object") return null;
  const candidate = input as Partial<AdminSessionsFile>;
  if (!Array.isArray(candidate.blocks) || !Array.isArray(candidate.sessionTimes)) return null;

  const normalizedBlocks: AdminSessionBlock[] = [];
  for (const rawBlock of candidate.blocks) {
    if (!rawBlock || typeof rawBlock !== "object") return null;
    const block = rawBlock as Partial<AdminSessionBlock>;

    if (!block.id || !block.name || !block.start_date) return null;
    if (!VALID_STATUSES.includes((block.status || "draft") as SessionStatus)) return null;

    const startDate = toIsoDate(block.start_date);
    const endDate = toIsoDate(block.end_date);
    const createdAt = toIsoDate(block.created_at);
    const updatedAt = toIsoDate(block.updated_at);
    if (!startDate || !createdAt || !updatedAt) return null;

    normalizedBlocks.push({
      id: String(block.id),
      name: String(block.name),
      description: typeof block.description === "string" ? block.description : "",
      start_date: startDate,
      end_date: endDate,
      day_of_week: Number(block.day_of_week ?? 6),
      time_start: String(block.time_start ?? "09:00"),
      time_end: String(block.time_end ?? "12:00"),
      capacity: Math.max(1, Number(block.capacity ?? 6)),
      current_bookings: Math.max(0, Number(block.current_bookings ?? 0)),
      location: block.location ? String(block.location) : null,
      status: (block.status as SessionStatus) || "draft",
      registration_fee: Math.max(0, Number(block.registration_fee ?? 10)),
      session_fee: Math.max(0, Number(block.session_fee ?? 15)),
      total_sessions: Math.max(1, Number(block.total_sessions ?? 6)),
      created_at: createdAt,
      updated_at: updatedAt,
    });
  }

  const times = candidate.sessionTimes
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);

  return {
    updatedAt: toIsoDate(candidate.updatedAt) || new Date().toISOString(),
    version: Number(candidate.version || 1),
    sessionTimes: times,
    blocks: normalizedBlocks,
  };
}

export async function readAdminSessionsFile() {
  try {
    const content = await fs.readFile(sessionsFilePath, "utf8");
    const parsed = JSON.parse(content) as unknown;
    const normalized = normalizeSessionsPayload(parsed);
    if (normalized) return normalized;
  } catch {
    // fallback below
  }

  const fallback = buildDefaultSessionsFile();
  await writeAdminSessionsFile(fallback);
  return fallback;
}

export async function writeAdminSessionsFile(file: AdminSessionsFile) {
  await fs.writeFile(sessionsFilePath, `${JSON.stringify(file, null, 2)}\n`, "utf8");
}

export async function getLiveSessionData() {
  const file = await readAdminSessionsFile();
  return {
    blocks: file.blocks.map(toRuntimeBlock),
    sessionTimes: file.sessionTimes,
    updatedAt: file.updatedAt,
  };
}
