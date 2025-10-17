import sharp from "sharp";
import { readdir } from "fs/promises";
import { join, extname } from "path";

async function convertImages(dir) {
  const files = await readdir(dir, { recursive: true, withFileTypes: true });

  for (const file of files) {
    if (file.isFile()) {
      const ext = extname(file.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        const inputPath = join(file.path, file.name);
        const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

        try {
          await sharp(inputPath)
            .webp({ quality: 80, effort: 6 })
            .toFile(outputPath);
          console.log(`Converted: ${file.name} -> ${outputPath}`);
        } catch (error) {
          console.error(`Error converting ${file.name}:`, error);
        }
      }
    }
  }
}

convertImages("./public/assets")
  .then(() => console.log("Conversion complete!"))
  .catch(console.error);
