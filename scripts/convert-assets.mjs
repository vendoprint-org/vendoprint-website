#!/usr/bin/env node
/**
 * Asset → WebP pipeline for Vend-O-Print.
 *
 * Converts every PNG under a source directory to optimized WebP in
 * /public/assets/vendoprint/<category>/, preserving alpha and (optionally)
 * downscaling oversized renders.
 *
 * Usage:
 *   node scripts/convert-assets.mjs <srcDir> <category> [maxWidth]
 *   node scripts/convert-assets.mjs assets/Background backgrounds 2400
 *
 * Categories: hero | illustrations | backgrounds | icons | 3d-assets | bento
 */
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const [, , srcDir, category, maxWidthArg] = process.argv;

if (!srcDir || !category) {
  console.error('Usage: node scripts/convert-assets.mjs <srcDir> <category> [maxWidth]');
  process.exit(1);
}

const maxWidth = maxWidthArg ? parseInt(maxWidthArg, 10) : null;
const outDir = join('public', 'assets', 'vendoprint', category);

function toKebab(name) {
  return basename(name, extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  await mkdir(outDir, { recursive: true });
  const entries = await readdir(srcDir);
  const pngs = entries.filter((f) => extname(f).toLowerCase() === '.png');

  let converted = 0;
  let savedBytes = 0;

  for (const file of pngs) {
    const srcPath = join(srcDir, file);
    const outName = `${toKebab(file)}.webp`;
    const outPath = join(outDir, outName);

    let img = sharp(srcPath);
    const meta = await img.metadata();
    if (maxWidth && meta.width && meta.width > maxWidth) {
      img = img.resize({ width: maxWidth, withoutEnlargement: true });
    }

    await img.webp({ quality: 82, effort: 5 }).toFile(outPath);

    const [srcStat, outStat] = await Promise.all([stat(srcPath), stat(outPath)]);
    savedBytes += srcStat.size - outStat.size;
    converted++;
    console.log(`  ${file}  →  ${category}/${outName}`);
  }

  console.log(
    `\n✔ ${converted} file(s) → public/assets/vendoprint/${category}/  ` +
      `(saved ${(savedBytes / 1024 / 1024).toFixed(1)} MB)`
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
