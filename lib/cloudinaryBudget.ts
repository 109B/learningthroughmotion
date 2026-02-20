type CloudinaryCredits = {
  usage?: number;
  limit?: number;
  used_percent?: number;
};

type CloudinaryUsageResponse = {
  credits?: CloudinaryCredits;
  plan?: {
    credits?: CloudinaryCredits;
  };
};

type CloudinaryBudgetStatus = {
  enabled: boolean;
  exceeded: boolean;
  reason: string;
};

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return fallback;
}

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getCredits(data: CloudinaryUsageResponse): CloudinaryCredits {
  return data.credits || data.plan?.credits || {};
}

export async function getCloudinaryBudgetStatus(): Promise<CloudinaryBudgetStatus> {
  if (parseBoolean(process.env.CLOUDINARY_FORCE_LOW_MEDIA_MODE, false)) {
    return {
      enabled: true,
      exceeded: true,
      reason: "Forced low media mode is enabled.",
    };
  }

  const enabled = parseBoolean(process.env.CLOUDINARY_BUDGET_GUARD_ENABLED, true);
  if (!enabled) {
    return {
      enabled: false,
      exceeded: false,
      reason: "Cloudinary budget guard is disabled.",
    };
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return {
      enabled: true,
      exceeded: false,
      reason: "Cloudinary credentials are missing.",
    };
  }

  const checkIntervalSeconds = parseNumber(
    process.env.CLOUDINARY_BUDGET_CHECK_INTERVAL_SECONDS,
    1800
  );
  const thresholdPercent = parseNumber(
    process.env.CLOUDINARY_BUDGET_THRESHOLD_PERCENT,
    90
  );
  const configuredLimit = parseNumber(
    process.env.CLOUDINARY_MONTHLY_CREDIT_LIMIT,
    0
  );

  try {
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/usage`;
    const authHeader = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`;

    const response = await fetch(endpoint, {
      headers: {
        Authorization: authHeader,
      },
      next: { revalidate: Math.max(300, checkIntervalSeconds) },
    });

    if (!response.ok) {
      return {
        enabled: true,
        exceeded: false,
        reason: `Usage lookup failed (${response.status}).`,
      };
    }

    const data = (await response.json()) as CloudinaryUsageResponse;
    const credits = getCredits(data);
    const usage = credits.usage;
    const limit = credits.limit ?? configuredLimit;
    const usedPercent =
      credits.used_percent ??
      (usage !== undefined && limit > 0 ? (usage / limit) * 100 : undefined);

    if (usedPercent === undefined) {
      return {
        enabled: true,
        exceeded: false,
        reason: "Credit usage percent is unavailable.",
      };
    }

    return {
      enabled: true,
      exceeded: usedPercent >= thresholdPercent,
      reason: `Usage ${usedPercent.toFixed(2)}% (threshold ${thresholdPercent}%).`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      enabled: true,
      exceeded: false,
      reason: `Usage lookup error: ${message}`,
    };
  }
}

export async function isCloudinaryBudgetExceeded(): Promise<boolean> {
  const status = await getCloudinaryBudgetStatus();
  return status.exceeded;
}
