/**
 * Downloads high-quality professional images for Grinex Trade LLC website.
 * Follows redirects, validates Content-Type and size; retries with fallback URLs.
 * Run: npm run download-images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'images');
const MIN_SIZE_BYTES = 50 * 1024; // 50 KB
const FORCE_REPLACE = ['waffle-towels.jpg', 'textile.jpg', 'orings.jpg', 'seals.jpg'];

// Each file has one or more URLs to try (first success wins). 1200px min width for product images.
const IMAGES = [
  {
    file: 'waffle-towels.jpg',
    urls: [
      'https://images.unsplash.com/photo-1616627561839-074385245ff6?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1626483648220-b8619012d2b6?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e5c5?auto=format&fit=crop&w=1200&h=800&q=90',
    ],
  },
  {
    file: 'textile.jpg',
    urls: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e5c5?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1582735689369-41b4e9c6e5c5?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1616627561839-074385245ff6?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1626483648220-b8619012d2b6?auto=format&fit=crop&w=1200&h=800&q=90',
    ],
  },
  {
    file: 'orings.jpg',
    urls: [
      'https://images.unsplash.com/photo-1581092160562-40d1c2d3b6c4?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1565680018434-b513d5e261ab?auto=format&fit=crop&w=1200&h=800&q=90',
    ],
  },
  {
    file: 'seals.jpg',
    urls: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1581092160562-40d1c2d3b6c4?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=800&q=90',
      'https://images.unsplash.com/photo-1565680018434-b513d5e261ab?auto=format&fit=crop&w=1200&h=800&q=90',
    ],
  },
  {
    file: 'hero-export.jpg',
    urls: [
      'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=2048&q=85',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2048&q=85',
    ],
  },
  {
    file: 'bed-linen.jpg',
    urls: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f27af?auto=format&fit=crop&w=2048&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2048&q=85',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2048&q=85',
    ],
  },
  {
    file: 'industrial.jpg',
    urls: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2048&q=85',
      'https://images.unsplash.com/photo-1581092160562-40d1c2d3b6c4?auto=format&fit=crop&w=2048&q=85',
    ],
  },
  {
    file: 'contact.jpg',
    urls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2048&q=85',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2048&q=85',
    ],
  },
];

async function downloadWithValidation(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: { 'User-Agent': 'GrinexTrade-ImageDownload/1.0 (https://grinextrade.com)' },
  });
  const finalUrl = res.url;
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('image/')) {
    throw new Error(`Invalid content-type: ${contentType} (expected image/*)`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < MIN_SIZE_BYTES) {
    throw new Error(`File too small: ${buf.length} bytes (min ${MIN_SIZE_BYTES})`);
  }
  return { buf, finalUrl, contentType, size: buf.length };
}

async function tryDownload({ file, urls }) {
  const outPath = path.join(OUT_DIR, file);
  const forceReplace = FORCE_REPLACE.includes(file);
  const existing = !forceReplace && fs.existsSync(outPath) && fs.statSync(outPath).size >= MIN_SIZE_BYTES;
  if (existing) {
    const size = fs.statSync(outPath).size;
    const sizeKb = (size / 1024).toFixed(1);
    console.log(`  KEEP: ${file} (existing valid file, ${sizeKb} KB)`);
    return;
  }
  if (forceReplace) console.log(`  FORCE REPLACE: ${file}`);
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const { buf, finalUrl, contentType, size } = await downloadWithValidation(url);
      fs.writeFileSync(outPath, buf);
      const sizeKb = (size / 1024).toFixed(1);
      console.log(`  OK: ${file}`);
      console.log(`      URL: ${finalUrl}`);
      console.log(`      Content-Type: ${contentType}`);
      console.log(`      Size: ${sizeKb} KB`);
      return;
    } catch (err) {
      console.error(`  Try ${i + 1}/${urls.length} for ${file} failed: ${err.message}`);
      if (i === urls.length - 1) {
        console.error(`  SKIP: ${file} – no URL succeeded. Not writing file.`);
      }
    }
  }
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
  console.log('Downloading images to public/images/ (min size 50 KB, content-type image/*)...\n');
  for (const entry of IMAGES) {
    await tryDownload(entry);
  }
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
