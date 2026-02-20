import { PROGRAMMES } from "@/content/siteContent";
import { isCloudinaryBudgetExceeded } from "@/lib/cloudinaryBudget";

type CloudinaryResource = {
  asset_id: string;
  secure_url: string;
  created_at?: string;
  asset_folder?: string;
};

type CloudinarySearchResponse = {
  resources: CloudinaryResource[];
};

type ProgrammeCardImage = {
  slug: string;
  imageUrl: string;
};

type ProgrammeCardConfig = {
  slug: string;
  folder: string;
};

const PROGRAMME_PLACEHOLDER = "/images/comingsoon.png";

function getConfig(): ProgrammeCardConfig[] {
  return [
    {
      slug: "maths-through-sport",
      folder: process.env.CLOUDINARY_PROGRAMME_CARD_FOLDER_MATHS || "HOME_CARD_MATHS",
    },
    {
      slug: "sensory-redevelopment",
      folder: process.env.CLOUDINARY_PROGRAMME_CARD_FOLDER_SENSORY || "HOME_CARD_SENSORY",
    },
    {
      slug: "the-next-chapter",
      folder: process.env.CLOUDINARY_PROGRAMME_CARD_FOLDER_NEXT_CHAPTER || "HOME_CARD_NEXT_CHAPTER",
    },
  ];
}

function withTransform(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

function buildFolderExpression(folders: string[]) {
  if (folders.length === 0) return "";
  const parts = folders.map((folder) => {
    const escaped = folder.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return `asset_folder="${escaped}"`;
  });
  return `(${parts.join(" OR ")})`;
}

async function fetchProgrammeCardImages() {
  if (await isCloudinaryBudgetExceeded()) return [];

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return [];

  const config = getConfig().filter((item) => item.folder.trim().length > 0);
  if (config.length === 0) return [];

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;
  const authHeader = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`;
  const expression = `resource_type:image AND ${buildFolderExpression(config.map((item) => item.folder))}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expression,
      max_results: 100,
      sort_by: [{ created_at: "desc" }],
    }),
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Cloudinary programme card query failed (${response.status})`);
  }

  const data = (await response.json()) as CloudinarySearchResponse;
  return data.resources || [];
}

export async function getProgrammeCardImages(): Promise<ProgrammeCardImage[]> {
  const mappedImages: Record<string, string> = {};
  const config = getConfig();

  try {
    const resources = await fetchProgrammeCardImages();

    for (const { slug, folder } of config) {
      const match = resources.find((resource) => resource.asset_folder === folder);
      if (!match) continue;

      mappedImages[slug] = withTransform(
        match.secure_url,
        "f_auto,q_auto,c_fill,w_900,h_700"
      );
    }
  } catch (error) {
    console.error("Failed to load programme card images from Cloudinary:", error);
  }

  return PROGRAMMES.map((programme) => ({
    slug: programme.slug,
    imageUrl:
      mappedImages[programme.slug] ||
      programme.heroImage ||
      PROGRAMME_PLACEHOLDER ||
      "",
  }));
}
