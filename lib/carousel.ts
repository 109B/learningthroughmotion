
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
  const cloudinaryFolders = getFoldersForContext(context);
  const config = getCloudinaryConfig();

  const cloudinaryResources = await searchCloudinaryResources(
    "image",
    cloudinaryFolders,
    Math.max(config.maxResults, 24)
  );

  const cloudinaryImages: CarouselImage[] = cloudinaryResources.map((resource) => ({
    src: withTransform(resource.secure_url, "f_auto,q_auto,c_fill,w_1200,h_800"),
    alt: `${CONTEXT_LABELS[context] || context} session in action`,
  }));

  return cloudinaryImages;
}

export async function getMixedCarouselImages() {
  const contexts = ["homepage", "maths", "sensory", "next-chapter"];
  const allImages: CarouselImage[] = [];

  for (const context of contexts) {
    const images = await getCarouselImages(context);
    allImages.push(...images);
  }

  return allImages.sort(() => Math.random() - 0.5);
}

export async function getHeroVideo(section: string): Promise<string | null> {
  void section;
  const folders = getVideoFolders();
  const resources = await searchCloudinaryResources("video", folders, 20);
  if (resources.length === 0) return null;

  const newest = resources.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""))[0];
  return withTransform(newest.secure_url, "q_auto,vc_auto,w_1280");
}
