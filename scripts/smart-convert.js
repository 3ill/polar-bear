import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import process from "process";

const config = {
  // Try multiple quality levels and keep the best
  webpQualities: [75, 80, 85],
  jpegQuality: 85,
  maxWidth: 1920,
  maxHeight: 1080,
};

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size;
}

async function smartConvert(inputPath) {
  const ext = extname(inputPath).toLowerCase();

  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    return;
  }

  const originalSize = await getFileSize(inputPath);
  const fileBaseName = basename(inputPath, ext);
  const fileDir = dirname(inputPath);

  console.log(`\n📸 ${basename(inputPath)}`);
  console.log(`   Original: ${formatBytes(originalSize)}`);

  try {
    const metadata = await sharp(inputPath).metadata();
    let image = sharp(inputPath);

    // Resize if too large
    if (
      metadata.width > config.maxWidth ||
      metadata.height > config.maxHeight
    ) {
      image = image.resize(config.maxWidth, config.maxHeight, {
        fit: "inside",
        withoutEnlargement: true,
      });
      console.log(`   Resizing from ${metadata.width}x${metadata.height}`);
    }

    // Test different WebP qualities
    let bestWebp = null;
    let bestSize = originalSize;

    for (const quality of config.webpQualities) {
      const tempPath = join(fileDir, `${fileBaseName}-temp-${quality}.webp`);

      await image.clone().webp({ quality, effort: 6 }).toFile(tempPath);

      const size = await getFileSize(tempPath);

      if (size < bestSize) {
        // Delete previous best if exists
        if (bestWebp) {
          await unlink(bestWebp.path).catch(() => {});
        }
        bestWebp = { path: tempPath, size, quality };
        bestSize = size;
      } else {
        // Delete this temp file
        await unlink(tempPath).catch(() => {});
      }
    }

    if (bestWebp) {
      // Rename to final name
      const finalPath = join(fileDir, `${fileBaseName}.webp`);
      const fs = await import("fs/promises");
      await fs.rename(bestWebp.path, finalPath);

      const savings = (
        ((originalSize - bestWebp.size) / originalSize) *
        100
      ).toFixed(1);
      console.log(
        `   ✅ WebP Q${bestWebp.quality}: ${formatBytes(bestWebp.size)} (-${savings}%)`,
      );
      console.log(`   💾 Saved: ${formatBytes(originalSize - bestWebp.size)}`);

      return { saved: originalSize - bestWebp.size, format: "webp" };
    } else {
      console.log(`   ⚠️  WebP not smaller - keeping original`);
      return null;
    }
  } catch (error) {
    console.error(`   ❌ Error:`, error.message);
    return null;
  }
}

async function processDirectory(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  let totalSaved = 0;
  let converted = 0;
  let skipped = 0;

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const stats = await processDirectory(fullPath);
      totalSaved += stats.totalSaved;
      converted += stats.converted;
      skipped += stats.skipped;
    } else if (entry.isFile()) {
      const result = await smartConvert(fullPath);
      if (result) {
        totalSaved += result.saved;
        converted++;
      } else {
        const ext = extname(entry.name).toLowerCase();
        if ([".jpg", ".jpeg", ".png"].includes(ext)) {
          skipped++;
        }
      }
    }
  }

  return { totalSaved, converted, skipped };
}

// Main
const targetDir = process.argv[2] || "./public/assets";

console.log("🎯 Smart Image Converter");
console.log("========================\n");
console.log(`Testing WebP at qualities: ${config.webpQualities.join(", ")}`);
console.log(`Max size: ${config.maxWidth}x${config.maxHeight}\n`);

processDirectory(targetDir)
  .then((stats) => {
    console.log("\n\n📊 Summary");
    console.log("==========");
    console.log(`✅ Converted: ${stats.converted}`);
    console.log(`⏭️  Skipped: ${stats.skipped}`);
    console.log(`💾 Total Saved: ${formatBytes(stats.totalSaved)}`);
    console.log("\n✨ Done!\n");
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
