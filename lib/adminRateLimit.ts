type MemoryRecord = {
  attempts: number;
  firstAttemptAt: number;
};

type RateLimitStatus = {
  limited: boolean;
  retryAfter: number;
};

const memoryStore = new Map<string, MemoryRecord>();

function getNumericEnv(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getWindowMs() {
  const seconds = getNumericEnv(process.env.ADMIN_LOGIN_WINDOW_SECONDS, 15 * 60);
  return seconds * 1000;
}

function getMaxAttempts() {
  return getNumericEnv(process.env.ADMIN_LOGIN_MAX_ATTEMPTS, 5);
}

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

function checkMemoryRateLimit(key: string): RateLimitStatus {
  const now = Date.now();
  const windowMs = getWindowMs();
  const maxAttempts = getMaxAttempts();
  const record = memoryStore.get(key);

  if (!record) return { limited: false, retryAfter: 0 };

  if (now - record.firstAttemptAt > windowMs) {
    memoryStore.delete(key);
    return { limited: false, retryAfter: 0 };
  }

  if (record.attempts >= maxAttempts) {
    const retryAfter = Math.max(1, Math.ceil((windowMs - (now - record.firstAttemptAt)) / 1000));
    return { limited: true, retryAfter };
  }

  return { limited: false, retryAfter: 0 };
}

function recordMemoryFailure(key: string) {
  const now = Date.now();
  const windowMs = getWindowMs();
  const record = memoryStore.get(key);

  if (!record || now - record.firstAttemptAt > windowMs) {
    memoryStore.set(key, { attempts: 1, firstAttemptAt: now });
    return;
  }

  memoryStore.set(key, { ...record, attempts: record.attempts + 1 });
}

export async function checkAdminLoginRateLimit(key: string): Promise<RateLimitStatus> {
  const maxAttempts = getMaxAttempts();
  const windowSeconds = Math.ceil(getWindowMs() / 1000);

  const countResult = await upstashCommand(["GET", key]);
  if (countResult !== null) {
    const attempts = Number(countResult || 0);
    if (!Number.isFinite(attempts) || attempts < maxAttempts) {
      return { limited: false, retryAfter: 0 };
    }

    const ttlResult = await upstashCommand(["TTL", key]);
    const ttl = Number(ttlResult || 0);
    return {
      limited: true,
      retryAfter: ttl > 0 ? ttl : windowSeconds,
    };
  }

  return checkMemoryRateLimit(key);
}

export async function recordAdminLoginFailure(key: string) {
  const windowSeconds = Math.ceil(getWindowMs() / 1000);
  const incrResult = await upstashCommand(["INCR", key]);
  if (incrResult !== null) {
    const incremented = Number(incrResult || 0);
    if (incremented <= 1) {
      await upstashCommand(["EXPIRE", key, String(windowSeconds)]);
    }
    return;
  }

  recordMemoryFailure(key);
}

export async function clearAdminLoginFailures(key: string) {
  const deleted = await upstashCommand(["DEL", key]);
  if (deleted !== null) return;
  memoryStore.delete(key);
}
