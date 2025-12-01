import fs from "fs";
import path from "path";

export async function getCarouselImages(folder: string): Promise<{ src: string; alt: string }[]> {
    const directoryPath = path.join(process.cwd(), "public", "images", "carousel", folder);

    try {
        const files = await fs.promises.readdir(directoryPath);

        const images = files
            .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
            .sort() // Sort alphabetically to ensure consistent order
            .map((file) => ({
                src: `/images/carousel/${folder}/${file}`,
                alt: `${folder.replace(/-/g, " ")} image - ${file}`,
            }));

        return images;
    } catch (error) {
        console.warn(`Could not read carousel directory: ${directoryPath}`, error);
        return [];
    }
}
