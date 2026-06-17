import sharp from 'sharp';
import { readdir, stat, rename, writeFile } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = './public/images';

// Max dimensions per image type
const RULES = [
  // Team headshots — displayed at ~300px max in cards
  { match: /^\/images\/team\//, maxWidth: 800,  maxHeight: 960,  quality: 82 },
  // Everything else — hero / section photos
  { match: /^\/images\//,       maxWidth: 1920, maxHeight: 1280, quality: 82 },
];

const SKIP = [
  'broadlab-full-logo.png', 'broadlab-logo.png', 'full.logo.png', 'logo.png',
  'thinkbox.png', 'audience-targeting.png', 'audience targeting.png',
  'paul-cooper.png',
];

async function getFiles(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await getFiles(full, base));
    } else if (/\.(jpe?g|png|webp)$/i.test(e.name) && !SKIP.includes(e.name)) {
      files.push(full);
    }
  }
  return files;
}

const files = await getFiles(IMAGES_DIR);

for (const file of files) {
  const webPath = '/' + file.replace(/\\/g, '/').replace('public/', '');
  const rule = RULES.find(r => r.match.test(webPath)) ?? RULES[1];
  const ext  = extname(file).toLowerCase();

  const { size: before } = await stat(file);
  const img = sharp(file);
  const meta = await img.metadata();

  const needsResize = meta.width > rule.maxWidth || meta.height > rule.maxHeight;

  let pipeline = needsResize
    ? img.resize({ width: rule.maxWidth, height: rule.maxHeight, fit: 'inside', withoutEnlargement: true })
    : img;

  if (ext === '.png') {
    pipeline = pipeline.png({ quality: rule.quality, compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: rule.quality, mozjpeg: true });
  }

  const buf = await pipeline.toBuffer();
  const tmp = file + '.tmp';
  await writeFile(tmp, buf);
  await rename(tmp, file);

  const { size: after } = await stat(file);
  const saved = ((1 - after / before) * 100).toFixed(0);
  console.log(`${basename(file).padEnd(30)} ${(before/1024/1024).toFixed(1)}MB → ${(after/1024).toFixed(0)}KB  (${saved}% smaller)`);
}

console.log('\nDone.');
