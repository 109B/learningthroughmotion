
import { isCloudinaryBudgetExceeded } from "@/lib/cloudinaryBudget";

type CloudinaryResource = {
  asset_id: string;
  secure_url: string;
  created_at?: string;
  asset_folder?: string;
  resource_type: "image" | "video";
};

type CloudinarySearchResponse = {
  resources: CloudinaryResource[];
};

type CarouselImage = {
  src: string;
  alt: string;
};

const CONTEXT_LABELS: Record<string, string> = {
  homepage: "Learning Through Motion",
  maths: "Maths Through Sport",
  sensory: "Sensory Sessions",
  "next-chapter": "The Next Chapter",
  coaches: "Our Coaches",
  programmes: "Our Programmes",
};

const CAROUSEL_IMAGE_TRANSFORM = "f_auto,q_auto:eco,c_fill,w_960,h_640";
const HERO_VIDEO_TRANSFORM = "q_auto:eco,vc_auto,w_960";

function withTransform(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

function parseFolders(value?: string) {
  if (!value) return [];
  return value
    .split(",")
    .map((folder) => folder.trim())
    .filter(Boolean);
}

function getCloudinaryConfig() {
  const defaultFolders = parseFolders(process.env.CLOUDINARY_GALLERY_FOLDER);
  const maxResults = Number(process.env.CLOUDINARY_GALLERY_MAX_RESULTS || "40");

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    defaultFolders,
    maxResults,
  };
}

function getFoldersForContext(context: string) {
  const perContextEnv = process.env[`CLOUDINARY_CAROUSEL_FOLDERS_${context.toUpperCase().replace(/-/g, "_")}`];
  if (perContextEnv) return parseFolders(perContextEnv);

  const defaultFolders = parseFolders(process.env.CLOUDINARY_GALLERY_FOLDER);
  const defaultsByContext: Record<string, string[]> = {
    maths: ["Maths Through Sport"],
    sensory: ["Sensory Development", "Weekend Sensory"],
    homepage: defaultFolders,
    programmes: defaultFolders,
    "next-chapter": defaultFolders,
    coaches: defaultFolders,
  };

  return defaultsByContext[context] || defaultFolders;
}

function getVideoFolders() {
  const explicit = parseFolders(process.env.CLOUDINARY_VIDEO_FOLDERS);
  if (explicit.length > 0) return explicit;
  return parseFolders(process.env.CLOUDINARY_GALLERY_FOLDER);
}

function buildFolderExpression(folders: string[]) {
  if (folders.length === 0) return "";
  const parts = folders.map((folder) => {
    const escaped = folder.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return `asset_folder="${escaped}"`;
  });
  return ` AND (${parts.join(" OR ")})`;
}

async function searchCloudinaryResources(
  resourceType: "image" | "video",
  folders: string[],
  maxResults: number
) {
  const config = getCloudinaryConfig();
  if (!config.cloudName || !config.apiKey || !config.apiSecret) return [];
  if (folders.length === 0) return [];

  const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName}/resources/search`;
  const authHeader = `Basic ${Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString("base64")}`;
  const expression = `resource_type:${resourceType}${buildFolderExpression(folders)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expression,
      max_results: maxResults,
      sort_by: [{ created_at: "desc" }],
    }),
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    console.warn(`Cloudinary ${resourceType} query failed (${response.status})`);
    return [];
  }

  const data = (await response.json()) as CloudinarySearchResponse;
  return data.resources || [];
}

export async function getCarouselImages(context: string) {
  if (await isCloudinaryBudgetExceeded()) {
    return [];
  }

  const cloudinaryFolders = getFoldersForContext(context);
  const config = getCloudinaryConfig();

  const cloudinaryResources = await searchCloudinaryResources(
    "image",
    cloudinaryFolders,
    Math.max(config.maxResults, 24)
  );

  const cloudinaryImages: CarouselImage[] = cloudinaryResources.map((resource) => ({
    src: withTransform(resource.secure_url, CAROUSEL_IMAGE_TRANSFORM),
    alt: `${CONTEXT_LABELS[context] || context} session in action`,
  }));

  return cloudinaryImages;
}

export async function getMixedCarouselImages() {
  // Prefer the dedicated homepage folders to avoid unnecessary fetches.
  const homepageImages = await getCarouselImages("homepage");
  if (homepageImages.length > 0) {
    const uniqueHomepageImages = homepageImages.filter(
      (image, index, collection) => collection.findIndex((candidate) => candidate.src === image.src) === index
    );
    return uniqueHomepageImages.sort(() => Math.random() - 0.5);
  }

  const fallbackContexts = ["maths", "sensory", "next-chapter"];
  const allImages: CarouselImage[] = [];
  for (const context of fallbackContexts) {
    const images = await getCarouselImages(context);
    allImages.push(...images);
  }

  const uniqueFallbackImages = allImages.filter(
    (image, index, collection) => collection.findIndex((candidate) => candidate.src === image.src) === index
  );
  return uniqueFallbackImages.sort(() => Math.random() - 0.5);
}

export async function getHeroVideo(section: string): Promise<string | null> {
  void section;
  if (await isCloudinaryBudgetExceeded()) {
    return null;
  }

  const folders = getVideoFolders();
  const resources = await searchCloudinaryResources("video", folders, 20);
  if (resources.length === 0) return null;

  const newest = resources.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""))[0];
  return withTransform(newest.secure_url, HERO_VIDEO_TRANSFORM);
}
