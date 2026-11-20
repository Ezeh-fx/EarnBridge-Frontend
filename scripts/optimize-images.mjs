// Converts PNG assets in src/assets to optimized WebP files.
// Usage: node scripts/optimize-images.mjs
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ASSETS_DIR = path.resolve('src/assets');
const MAX_DIMENSION = 1600;
const QUALITY = 80;

const files = await readdir(ASSETS_DIR);
const pngFiles = files.filter((f) => f.toLowerCase().endsWith('.png'));

for (const file of pngFiles) {
  const input = path.join(ASSETS_DIR, file);
  const output = path.join(ASSETS_DIR, file.replace(/\.png$/i, '.webp'));

  const before = (await stat(input)).size;
  await sharp(input)
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY })
    .toFile(output);

  const after = (await stat(output)).size;
  console.log(
    `${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
  );
}

console.log(`\nDone. ${pngFiles.length} files converted.`);
