import sharp from "sharp";
import { readdir, stat, mkdir } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import { existsSync } from "fs";
import process from "process";

const config = {
  // Quality settings for different formats
  webp: {
    quality: 82,
    effort: 6,
    method: 6,
  },
  jpeg: {
    quality: 85,
    mozjpeg: true,
  },
  png: {
    compressionLevel: 9,
    quality: 85,
  },
  // Maximum dimensions (preserves aspect ratio)
  maxWidth: 1920,
  maxHeight: 1080,
  // Minimum file size to consider conversion (in bytes)
  minFileSize: 50 * 1024, // 50KB
};

async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

async function optimizeImage(inputPath, outputDir = null) {
  const ext = extname(inputPath).toLowerCase();
  const fileBaseName = basename(inputPath, ext);
  const fileDir = dirname(inputPath);
  const targetDir = outputDir || fileDir;

  // Skip if not an image
  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    return null;
  }

  const originalSize = await getFileSize(inputPath);

  // Skip small files
  if (originalSize < config.minFileSize) {
    console.log(
      `⏭️  Skipping ${basename(inputPath)} (too small: ${formatBytes(originalSize)})`,
    );
    return null;
  }

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`\n📸 Processing: ${basename(inputPath)}`);
    console.log(
      `   Original: ${formatBytes(originalSize)} | ${metadata.width}x${metadata.height}`,
    );

    // Prepare sharp instance with resizing if needed
    let image = sharp(inputPath);

    if (
      metadata.width > config.maxWidth ||
      metadata.height > config.maxHeight
    ) {
      image = image.resize(config.maxWidth, config.maxHeight, {
        fit: "inside",
        withoutEnlargement: true,
      });
      console.log(
        `   ↔️  Resizing to max ${config.maxWidth}x${config.maxHeight}`,
      );
    }

    // Create output directory if it doesn't exist
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }

    const results = [];

    // Test WebP conversion
    const webpPath = join(targetDir, `${fileBaseName}.webp`);
    await image.clone().webp(config.webp).toFile(webpPath);

    const webpSize = await getFileSize(webpPath);
    results.push({
      format: "WebP",
      path: webpPath,
      size: webpSize,
      savings: (((originalSize - webpSize) / originalSize) * 100).toFixed(1),
    });

    // Test optimized JPEG (if original is JPEG)
    if ([".jpg", ".jpeg"].includes(ext)) {
      const jpegPath = join(targetDir, `${fileBaseName}-optimized.jpg`);
      await image.clone().jpeg(config.jpeg).toFile(jpegPath);

      const jpegSize = await getFileSize(jpegPath);
      results.push({
        format: "JPEG",
        path: jpegPath,
        size: jpegSize,
        savings: (((originalSize - jpegSize) / originalSize) * 100).toFixed(1),
      });
    }

    // Test optimized PNG (if original is PNG)
    if (ext === ".png") {
      const pngPath = join(targetDir, `${fileBaseName}-optimized.png`);
      await image.clone().png(config.png).toFile(pngPath);

      const pngSize = await getFileSize(pngPath);
      results.push({
        format: "PNG",
        path: pngPath,
        size: pngSize,
        savings: (((originalSize - pngSize) / originalSize) * 100).toFixed(1),
      });
    }

    // Find the best result (smallest file)
    const bestResult = results.reduce((best, current) =>
      current.size < best.size ? current : best,
    );

    console.log(`\n   📊 Results:`);
    results.forEach((result) => {
      const isBest = result === bestResult;
      const icon = isBest ? "✅" : "  ";
      const sign = result.savings >= 0 ? "-" : "+";
      console.log(
        `   ${icon} ${result.format}: ${formatBytes(result.size)} (${sign}${Math.abs(result.savings)}%)`,
      );
    });

    // Only keep the best version if it's actually smaller
    if (bestResult.size < originalSize) {
      console.log(
        `   ✨ Best: ${bestResult.format} - Saved ${formatBytes(originalSize - bestResult.size)}`,
      );
      return bestResult;
    } else {
      console.log(`   ⚠️  No format smaller than original - keeping original`);
      // Clean up created files
      for (const result of results) {
        const fs = await import("fs/promises");
        await fs.unlink(result.path).catch(() => {});
      }
      return null;
    }
  } catch (error) {
    console.error(
      `   ❌ Error processing ${basename(inputPath)}:`,
      error.message,
    );
    return null;
  }
}

async function processDirectory(dirPath, recursive = true) {
  console.log(`\n🔍 Scanning directory: ${dirPath}\n`);

  const entries = await readdir(dirPath, { withFileTypes: true });
  const stats = {
    processed: 0,
    skipped: 0,
    failed: 0,
    totalSaved: 0,
  };

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory() && recursive) {
      const subStats = await processDirectory(fullPath, recursive);
      stats.processed += subStats.processed;
      stats.skipped += subStats.skipped;
      stats.failed += subStats.failed;
      stats.totalSaved += subStats.totalSaved;
    } else if (entry.isFile()) {
      const result = await optimizeImage(fullPath);

      if (result) {
        const originalSize = await getFileSize(fullPath);
        stats.processed++;
        stats.totalSaved += originalSize - result.size;
      } else {
        const ext = extname(entry.name).toLowerCase();
        if ([".jpg", ".jpeg", ".png"].includes(ext)) {
          stats.skipped++;
        }
      }
    }
  }

  return stats;
}

// Main execution
const targetDir = process.argv[2] || "./public/assets";

console.log("🖼️  Image Optimization Tool");
console.log("==========================\n");
console.log(`📁 Target: ${targetDir}`);
console.log(`⚙️  Settings:`);
console.log(`   - WebP Quality: ${config.webp.quality}`);
console.log(`   - JPEG Quality: ${config.jpeg.quality}`);
console.log(`   - Max Dimensions: ${config.maxWidth}x${config.maxHeight}`);
console.log(`   - Min File Size: ${formatBytes(config.minFileSize)}`);

processDirectory(targetDir)
  .then((stats) => {
    console.log("\n\n📈 Summary");
    console.log("==========");
    console.log(`✅ Processed: ${stats.processed}`);
    console.log(`⏭️  Skipped: ${stats.skipped}`);
    console.log(`❌ Failed: ${stats.failed}`);
    console.log(`💾 Total Saved: ${formatBytes(stats.totalSaved)}`);
    console.log("\n✨ Optimization complete!\n");
  })
  .catch((error) => {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  });
