import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { requireAdminSession } from "@/lib/adminSession";
import {
  buildDefaultRoadmap,
  normalizeRoadmapPayload,
  type RoadmapFile,
  type WorkItemHorizon,
} from "@/lib/adminRoadmap";

export const runtime = "nodejs";

const roadmapFilePath = path.join(process.cwd(), "content", "admin", "roadmap.json");
const historyDirPath = path.join(process.cwd(), "content", "admin", "history");

type LegacyRoadmap = {
  updatedAt?: string;
  milestones?: Array<{
    phase?: string;
    focus?: string;
    outcomes?: string[];
  }>;
};

function createSnapshotFileName(date = new Date()) {
  const safeIso = date.toISOString().replace(/[:.]/g, "-");
  return `roadmap-${safeIso}.json`;
}

async function writeRoadmapSnapshot(payload: RoadmapFile) {
  await fs.mkdir(historyDirPath, { recursive: true });
  const snapshotName = createSnapshotFileName();
  const snapshotPath = path.join(historyDirPath, snapshotName);
  await fs.writeFile(snapshotPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  const files = (await fs.readdir(historyDirPath))
    .filter((file) => file.startsWith("roadmap-") && file.endsWith(".json"))
    .sort();

  const maxSnapshots = 50;
  if (files.length > maxSnapshots) {
    const filesToDelete = files.slice(0, files.length - maxSnapshots);
    await Promise.all(filesToDelete.map((file) => fs.unlink(path.join(historyDirPath, file))));
  }

  return snapshotName;
}

function migrateLegacyRoadmap(input: LegacyRoadmap): RoadmapFile {
  const now = new Date().toISOString();
  const milestones = Array.isArray(input.milestones) ? input.milestones : [];

  const workItems = milestones.flatMap((milestone, index) => {
    const phase = (milestone.phase || "").toLowerCase();
    const horizon: WorkItemHorizon = phase.includes("3")
      ? "3m"
      : phase.includes("6")
        ? "6m"
        : "12m";
    const epicId = `EPIC-${horizon.toUpperCase()}-${String(index + 1).padStart(3, "0")}`;

    const epic = {
      id: epicId,
      type: "epic" as const,
      title: milestone.phase?.trim() || `Horizon ${index + 1}`,
      description: milestone.focus?.trim() || "Planned delivery stream.",
      state: "new" as const,
      horizon,
      tags: ["legacy-import"],
      acceptance: Array.isArray(milestone.outcomes) ? milestone.outcomes : [],
      updatedAt: now,
    };

    return [epic];
  });

  return {
    updatedAt: input.updatedAt || now,
    version: 2,
    workItems,
  };
}

async function readRoadmapFile() {
  try {
    const content = await fs.readFile(roadmapFilePath, "utf8");
    const parsed = JSON.parse(content) as unknown;
    const normalized = normalizeRoadmapPayload(parsed);
    if (normalized) {
      return normalized;
    }

    const legacy = migrateLegacyRoadmap(parsed as LegacyRoadmap);
    await fs.writeFile(roadmapFilePath, `${JSON.stringify(legacy, null, 2)}\n`, "utf8");
    return legacy;
  } catch {
    const fallback = buildDefaultRoadmap();
    await fs.writeFile(roadmapFilePath, `${JSON.stringify(fallback, null, 2)}\n`, "utf8");
    return fallback;
  }
}

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const roadmap = await readRoadmapFile();
    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Failed to read roadmap file:", error);
    return NextResponse.json({ error: "Failed to read roadmap." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as unknown;
    const payload = normalizeRoadmapPayload(body);
    if (!payload) {
      return NextResponse.json({ error: "Invalid roadmap payload." }, { status: 400 });
    }

    await fs.writeFile(roadmapFilePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    const snapshot = await writeRoadmapSnapshot(payload);

    return NextResponse.json({
      success: true,
      updatedAt: payload.updatedAt,
      snapshot,
    });
  } catch (error) {
    console.error("Failed to update roadmap file:", error);
    return NextResponse.json({ error: "Failed to update roadmap." }, { status: 500 });
  }
}
