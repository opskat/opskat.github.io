#!/usr/bin/env node

/**
 * Fetch the latest release info AND the star count from the GitHub API and
 * write both into a single static/release.json:
 *   { version, assets: [...], stars }
 *
 * Run during CI build or locally: node scripts/fetch-release.mjs
 */

import fs from "fs";

const REPO = "opskat/opskat";
const OUTPUT = "static/release.json";

const PLATFORM_MAP = {
  "darwin-arm64": "macOS (Apple Silicon)",
  "darwin-amd64": "macOS (Intel)",
  "windows-amd64": "Windows (x64)",
  "linux-amd64": "Linux (x64)",
};

function ghHeaders() {
  return {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };
}

function fallbackAssets() {
  return Object.entries(PLATFORM_MAP).map(([id, label]) => ({
    id,
    label,
    url: `https://github.com/${REPO}/releases/latest`,
  }));
}

/** @returns {Promise<number|null>} */
async function fetchStars() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: ghHeaders(),
    });
    if (!res.ok) {
      console.warn(`stars: GitHub API returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data.stargazers_count ?? null;
  } catch (err) {
    console.warn("stars: failed to fetch:", err.message);
    return null;
  }
}

/** @returns {Promise<{version: string, assets: any[]}|null>} */
async function fetchRelease() {
  try {
    const url = `https://api.github.com/repos/${REPO}/releases/latest`;
    console.log(`Fetching latest release from ${url}...`);
    const res = await fetch(url, { headers: ghHeaders() });
    if (!res.ok) {
      console.warn(`release: GitHub API returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    const version = data.tag_name;
    const assets = Object.entries(PLATFORM_MAP).map(([id, label]) => {
      const asset = (data.assets || []).find((a) => a.name.includes(id));
      return {
        id,
        label,
        url: asset
          ? asset.browser_download_url
          : `https://github.com/${REPO}/releases/tag/${version}`,
        ...(asset ? { fileName: asset.name } : {}),
      };
    });
    return { version, assets };
  } catch (err) {
    console.warn("release: failed to fetch:", err.message);
    return null;
  }
}

async function main() {
  // Preserve previous values when a given fetch fails.
  let existing = {};
  try {
    existing = JSON.parse(fs.readFileSync(OUTPUT, "utf8"));
  } catch {
    /* no existing file */
  }

  const [stars, release] = await Promise.all([fetchStars(), fetchRelease()]);

  const result = {
    version: release?.version ?? existing.version ?? "v1.0.0",
    assets: release?.assets ?? existing.assets ?? fallbackAssets(),
    stars: stars ?? existing.stars ?? 0,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2));
  console.log(
    `Wrote ${OUTPUT}: version=${result.version}, ${result.assets.length} platforms, ${result.stars} stars`
  );
}

main().catch((err) => {
  console.error("Failed to build release.json:", err.message);
  process.exit(1);
});
