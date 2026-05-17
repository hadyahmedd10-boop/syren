import sharp from "sharp";
import { readdirSync, statSync, renameSync } from "fs";
import { join, basename } from "path";

const stepsDir = "public/images/excursions/steps";
const excursionsRoot = "public/images/excursions";

async function compressFile(
  fullPath,
  { width = 1200, height = 900, maxBytes = 307200, qualities = [75, 70, 65, 60, 55, 50] } = {}
) {
  for (const q of qualities) {
    const tmp = `${fullPath}.tmp`;
    try {
      await sharp(fullPath)
        .resize(width, height, { fit: "cover", withoutEnlargement: true })
        .jpeg({ quality: q, progressive: true })
        .toFile(tmp);
      renameSync(tmp, fullPath);
      const size = statSync(fullPath).length;
      if (size <= maxBytes) {
        console.log(`Compressed: ${fullPath} @ q${q} -> ${Math.round(size / 1024)}KB`);
        return;
      } else {
        console.log(`Pass q${q} -> ${Math.round(size / 1024)}KB (retry)...`);
      }
    } catch (err) {
      // Fallback: keep aspect ratio if cover fit fails
      try {
        await sharp(fullPath)
          .resize({ width, withoutEnlargement: true })
          .jpeg({ quality: q, progressive: true })
          .toFile(tmp);
        renameSync(tmp, fullPath);
        const size = statSync(fullPath).length;
        if (size <= maxBytes) {
          console.log(`Compressed (fallback): ${fullPath} @ q${q} -> ${Math.round(size / 1024)}KB`);
          return;
        }
      } catch (e) {
        console.error("Error:", fullPath, e?.message || e);
      }
    }
  }
  const size = statSync(fullPath).length;
  console.warn(`Max compression reached for ${fullPath} -> ${Math.round(size / 1024)}KB`);
}

function processDir(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const st = statSync(fullPath);
    if (st.isDirectory()) {
      processDir(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry)) {
      compressFile(fullPath, { width: 1200, height: 900, maxBytes: 307200 });
    }
  }
}

function processExcursionsCovers(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const st = statSync(fullPath);
    if (st.isDirectory()) {
      processExcursionsCovers(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry)) {
      const base = basename(entry).toLowerCase();
      if (base.includes("cover")) {
        // Covers: smaller target ~ under 200KB
        compressFile(fullPath, { width: 1200, height: 800, maxBytes: 204800 });
      } else if (base.includes("hero")) {
        // Heroes: target under 400KB
        compressFile(fullPath, { width: 1600, height: 1000, maxBytes: 409600 });
      }
    }
  }
}

console.log("Compressing step images...");
processDir(stepsDir);
console.log("Compressing excursion hero/cover images...");
processExcursionsCovers(excursionsRoot);
console.log("Done.");
