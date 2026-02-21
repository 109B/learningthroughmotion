import { promises as fs } from "fs";
import path from "path";
import { PROGRAMMES } from "@/content/siteContent";

export type ProgrammeCardOverride = {
  slug: string;
  imageUrl: string;
  updatedAt: string;
};

export type ProgrammeCardOverrideFile = {
  updatedAt: string;
  version: number;
  overrides: ProgrammeCardOverride[];
};

const overrideFilePath = path.join(
  process.cwd(),
  "content",
  "admin",
  "programme-card-overrides.json"
);
const DEFAULT_PROGRAMME_OVERRIDE_STORE_KEY = "admin:programme-card-overrides:v1";

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

function buildUpstashCommandUrl(baseUrl: string, command: string[]) {
  const cleanBase = baseUrl.replace(/\/+$/, "");
  const encoded = command.map((part) => encodeURIComponent(part));
  return `${cleanBase}/${encoded.join("/")}`;
}

async function upstashCommand(command: string[]) {
  const config = getUpstashConfig();
  if (!config) return null;

  try {
    const response = await fetch(buildUpstashCommandUrl(config.url, command), {
      headers: { Authorization: `Bearer ${config.token}` },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const json = (await response.json()) as { result?: unknown };
    return json.result;
  } catch {
    return null;
  }
}

function getOverrideStoreKey() {
  return process.env.ADMIN_PROGRAMME_OVERRIDE_STORE_KEY || DEFAULT_PROGRAMME_OVERRIDE_STORE_KEY;
}

function toIso(value: string | Date | undefined) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function buildDefaultProgrammeCardOverridesFile(): ProgrammeCardOverrideFile {
  const now = new Date().toISOString();
  return {
    updatedAt: now,
    version: 1,
    overrides: PROGRAMMES.map((programme) => ({
      slug: programme.slug,
      imageUrl: programme.heroImage || "",
      updatedAt: now,
    })),
  };
}

export function normalizeProgrammeCardOverridesPayload(input: unknown): ProgrammeCardOverrideFile | null {
  if (!input || typeof input !== "object") return null;
  const candidate = input as Partial<ProgrammeCardOverrideFile>;
  if (!Array.isArray(candidate.overrides)) return null;

  const normalizedOverrides: ProgrammeCardOverride[] = [];
  for (const rawItem of candidate.overrides) {
    if (!rawItem || typeof rawItem !== "object") return null;
    const item = rawItem as Partial<ProgrammeCardOverride>;
    if (!item.slug || typeof item.slug !== "string") return null;

    normalizedOverrides.push({
      slug: item.slug,
      imageUrl: typeof item.imageUrl === "string" ? item.imageUrl.trim() : "",
      updatedAt: toIso(item.updatedAt) || new Date().toISOString(),
    });
  }

  return {
    updatedAt: toIso(candidate.updatedAt) || new Date().toISOString(),
    version: Number(candidate.version || 1),
    overrides: normalizedOverrides,
  };
}

export async function readProgrammeCardOverridesFile() {
  const redisKey = getOverrideStoreKey();
  const redisResult = await upstashCommand(["GET", redisKey]);
  if (typeof redisResult === "string" && redisResult.trim().length > 0) {
    try {
      const parsed = JSON.parse(redisResult) as unknown;
      const normalized = normalizeProgrammeCardOverridesPayload(parsed);
      if (normalized) return normalized;
    } catch {
      // Continue with file fallback.
    }
  }

  try {
    const content = await fs.readFile(overrideFilePath, "utf8");
    const parsed = JSON.parse(content) as unknown;
    const normalized = normalizeProgrammeCardOverridesPayload(parsed);
    if (normalized) return normalized;
  } catch {
    // fallback below
  }

  const fallback = buildDefaultProgrammeCardOverridesFile();
  await writeProgrammeCardOverridesFile(fallback);
  return fallback;
}

export async function writeProgrammeCardOverridesFile(file: ProgrammeCardOverrideFile) {
  const redisKey = getOverrideStoreKey();
  const redisSaved = await upstashCommand(["SET", redisKey, JSON.stringify(file)]);
  if (redisSaved !== null) return;
  await fs.writeFile(overrideFilePath, `${JSON.stringify(file, null, 2)}\n`, "utf8");
}

export async function getProgrammeCardOverrideMap() {
  const file = await readProgrammeCardOverridesFile();
  return new Map(file.overrides.map((item) => [item.slug, item.imageUrl]));
}
