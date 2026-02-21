import { promises as fs } from "fs";
import path from "path";
import {
  SITE_IMAGE_DEFINITIONS,
  type SiteImageOverride,
  type SiteImageOverridesFile,
} from "@/lib/siteImageConfig";

const siteImageOverrideFilePath = path.join(
  process.cwd(),
  "content",
  "admin",
  "site-image-overrides.json"
);

const DEFAULT_SITE_IMAGE_OVERRIDE_STORE_KEY = "admin:site-image-overrides:v1";

const SITE_IMAGE_KEYS = new Set(SITE_IMAGE_DEFINITIONS.map((item) => item.key));
const SITE_IMAGE_DEFAULTS = new Map(
  SITE_IMAGE_DEFINITIONS.map((item) => [item.key, item.defaultUrl])
);

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
  return process.env.ADMIN_SITE_IMAGE_OVERRIDE_STORE_KEY || DEFAULT_SITE_IMAGE_OVERRIDE_STORE_KEY;
}

function toIso(value: string | Date | undefined) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function buildDefaultSiteImageOverridesFile(): SiteImageOverridesFile {
  const now = new Date().toISOString();
  return {
    updatedAt: now,
    version: 1,
    overrides: SITE_IMAGE_DEFINITIONS.map((item) => ({
      key: item.key,
      imageUrl: item.defaultUrl,
      updatedAt: now,
    })),
  };
}

export function normalizeSiteImageOverridesPayload(input: unknown): SiteImageOverridesFile | null {
  if (!input || typeof input !== "object") return null;
  const candidate = input as Partial<SiteImageOverridesFile>;
  if (!Array.isArray(candidate.overrides)) return null;

  const normalizedOverrides: SiteImageOverride[] = [];
  for (const rawItem of candidate.overrides) {
    if (!rawItem || typeof rawItem !== "object") return null;
    const item = rawItem as Partial<SiteImageOverride>;
    if (!item.key || typeof item.key !== "string") return null;
    if (!SITE_IMAGE_KEYS.has(item.key)) return null;

    const fallback = SITE_IMAGE_DEFAULTS.get(item.key) || "";
    const normalizedUrl = typeof item.imageUrl === "string" ? item.imageUrl.trim() : "";

    normalizedOverrides.push({
      key: item.key,
      imageUrl: normalizedUrl || fallback,
      updatedAt: toIso(item.updatedAt) || new Date().toISOString(),
    });
  }

  const completeOverrides = SITE_IMAGE_DEFINITIONS.map((definition) => {
    const found = normalizedOverrides.find((item) => item.key === definition.key);
    return (
      found || {
        key: definition.key,
        imageUrl: definition.defaultUrl,
        updatedAt: new Date().toISOString(),
      }
    );
  });

  return {
    updatedAt: toIso(candidate.updatedAt) || new Date().toISOString(),
    version: Number(candidate.version || 1),
    overrides: completeOverrides,
  };
}

export async function readSiteImageOverridesFile() {
  const redisKey = getOverrideStoreKey();
  const redisResult = await upstashCommand(["GET", redisKey]);
  if (typeof redisResult === "string" && redisResult.trim().length > 0) {
    try {
      const parsed = JSON.parse(redisResult) as unknown;
      const normalized = normalizeSiteImageOverridesPayload(parsed);
      if (normalized) return normalized;
    } catch {
      // Continue with file fallback.
    }
  }

  try {
    const content = await fs.readFile(siteImageOverrideFilePath, "utf8");
    const parsed = JSON.parse(content) as unknown;
    const normalized = normalizeSiteImageOverridesPayload(parsed);
    if (normalized) return normalized;
  } catch {
    // Fallback below.
  }

  const fallback = buildDefaultSiteImageOverridesFile();
  await writeSiteImageOverridesFile(fallback);
  return fallback;
}

export async function writeSiteImageOverridesFile(file: SiteImageOverridesFile) {
  const redisKey = getOverrideStoreKey();
  const redisSaved = await upstashCommand(["SET", redisKey, JSON.stringify(file)]);
  if (redisSaved !== null) return;
  await fs.writeFile(siteImageOverrideFilePath, `${JSON.stringify(file, null, 2)}\n`, "utf8");
}

export async function getSiteImageOverrideMap() {
  const file = await readSiteImageOverridesFile();
  return new Map(file.overrides.map((item) => [item.key, item.imageUrl]));
}

export async function getResolvedSiteImages() {
  const overrideMap = await getSiteImageOverrideMap();
  return SITE_IMAGE_DEFINITIONS.reduce<Record<string, string>>((acc, definition) => {
    acc[definition.key] = overrideMap.get(definition.key) || definition.defaultUrl;
    return acc;
  }, {});
}
