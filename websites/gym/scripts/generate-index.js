#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDir = path.join(__dirname, '../dist/client');
const indexHtmlPath = path.join(clientDir, 'index.html');

// Read the manifest to get the correct bundle names
const manifestPath = path.join(clientDir, '.vite', 'manifest.json');
let entries = {};

try {
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    entries = manifest;
  }
} catch (e) {
  console.warn('Could not read Vite manifest, using glob fallback');
}

// Find the main entry point bundle
let mainScript = '';
const assets = fs.readdirSync(path.join(clientDir, 'assets'));
const indexFile = assets.find(f => f.startsWith('index-') && f.endsWith('.js'));

if (indexFile) {
  mainScript = `/assets/${indexFile}`;
} else {
  console.warn('Warning: Could not find main bundle, defaulting to first JS file');
  const jsFiles = assets.filter(f => f.endsWith('.js'));
  if (jsFiles.length > 0) {
    mainScript = `/assets/${jsFiles[0]}`;
  }
}

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#080808" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Iron Peak Circle — Portfolio Gym UI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${mainScript}"></script>
  </body>
</html>`;

fs.writeFileSync(indexHtmlPath, html, 'utf-8');
console.log('Generated:', indexHtmlPath);
