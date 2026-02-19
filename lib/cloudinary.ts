type CloudinaryResource = {
  asset_id: string;
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  created_at?: string;
  asset_folder?: string;
  resource_type: "image" | "video";
  context?: {
    custom?: {
      alt?: string;
    };
  };
};

type CloudinarySearchResponse = {
  resources: CloudinaryResource[];
};

export type CloudinaryGalleryImage = {
  id: string;
  src: string;
  alt: string;
  label?: string;
  width: number;
  height: number;
  uploadedAt?: string;
};

export type CloudinaryGalleryVideo = {
  id: string;
  src: string;
  thumbnailSrc: string;
  alt: string;
  label?: string;
  width: number;
  height: number;
  uploadedAt?: string;
};

export type CloudinaryFolderGallery = {
  folder: string;
  images: CloudinaryGalleryImage[];
  videos: CloudinaryGalleryVideo[];
};

export type CloudinaryGalleryResult = {
  folders: string[];
  folderGalleries: CloudinaryFolderGallery[];
  warnings?: string[];
  error?: string;
};

function getCloudinaryConfig() {
  const rawFolderValue = process.env.CLOUDINARY_GALLERY_FOLDER || "ltm-gallery";
  const folders = rawFolderValue
    .split(",")
    .map((folder) => folder.trim())
    .filter(Boolean);

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    folders,
    maxResults: Number(process.env.CLOUDINARY_GALLERY_MAX_RESULTS || "40"),
    displayLimit: Number(process.env.CLOUDINARY_GALLERY_DISPLAY_LIMIT || "24"),
  };
}

function withTransform(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

async function searchResources(
  endpoint: string,
  authHeader: string,
  expression: string,
  maxResults: number
) {
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
    throw new Error(`Cloudinary request failed (${response.status}) for "${expression}".`);
  }

  const data = (await response.json()) as CloudinarySearchResponse;
  return data.resources || [];
}

function toImage(resource: CloudinaryResource): CloudinaryGalleryImage {
  return {
    id: resource.asset_id,
    src: withTransform(resource.secure_url, "f_auto,q_auto,c_fill,w_640,h_480"),
    alt: resource.context?.custom?.alt || "Learning Through Motion session photo",
    label: resource.context?.custom?.alt,
    width: resource.width,
    height: resource.height,
    uploadedAt: resource.created_at,
  };
}

function toVideo(resource: CloudinaryResource): CloudinaryGalleryVideo {
  const videoUrl = withTransform(resource.secure_url, "q_auto,vc_auto,w_960");
  const thumbnailUrl = withTransform(resource.secure_url, "so_0,f_jpg,q_auto,c_fill,w_640,h_480");

  return {
    id: resource.asset_id,
    src: videoUrl,
    thumbnailSrc: thumbnailUrl,
    alt: resource.context?.custom?.alt || "Learning Through Motion session video",
    label: resource.context?.custom?.alt,
    width: resource.width,
    height: resource.height,
    uploadedAt: resource.created_at,
  };
}

export async function getCloudinaryGalleryMedia(): Promise<CloudinaryGalleryResult> {
  const config = getCloudinaryConfig();

  if (!config.cloudName || !config.apiKey || !config.apiSecret) {
    return {
      folders: config.folders,
      folderGalleries: config.folders.map((folder) => ({
        folder,
        images: [],
        videos: [],
      })),
      error: "Cloudinary is not configured yet.",
    };
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName}/resources/search`;
  const authHeader = `Basic ${Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString("base64")}`;

  try {
    const fetchLimit = Math.max(config.maxResults * Math.max(config.folders.length, 1), 100);
    const [imageResources, videoResources] = await Promise.all([
      searchResources(endpoint, authHeader, "resource_type:image", fetchLimit),
      searchResources(endpoint, authHeader, "resource_type:video", fetchLimit),
    ]);

    const allowedFolders = new Set(config.folders);
    const filteredImages = imageResources.filter(
      (resource) => resource.asset_folder && allowedFolders.has(resource.asset_folder)
    );
    const filteredVideos = videoResources.filter(
      (resource) => resource.asset_folder && allowedFolders.has(resource.asset_folder)
    );

    const folderGalleries = config.folders.map((folder) => {
      const folderImages = filteredImages
        .filter((resource) => resource.asset_folder === folder)
        .sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""))
        .slice(0, config.displayLimit)
        .map(toImage);

      const folderVideos = filteredVideos
        .filter((resource) => resource.asset_folder === folder)
        .sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""))
        .slice(0, config.displayLimit)
        .map(toVideo);

      return {
        folder,
        images: folderImages,
        videos: folderVideos,
      };
    });

    return { folders: config.folders, folderGalleries };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown network error";
    return {
      folders: config.folders,
      folderGalleries: config.folders.map((folder) => ({
        folder,
        images: [],
        videos: [],
      })),
      error: `Unable to reach Cloudinary from the server. ${errorMessage}`,
    };
  }
}
