"use strict";

const { addonBuilder } = require("stremio-addon-sdk");
const https = require("https");
const http = require("http");
const { buildManifest } = require("../src/manifest");
const { catalogHandler, metaHandler, streamHandler } = require("../src/handlers");

// ── HTTP helper ──────────────────────────────────────────────────────────────
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.request(url, {
      timeout: 8000,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" }
    }, (res) => {
      if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
    req.end();
  });
}

// ── i24 NEWS – YouTube Live stream fetcher ───────────────────────────────────
// YouTube Live של i24 מחזיר HLS manifest ציבורי שמתחדש אוטומטית
async function getI24Streams(lang) {
  const streams = [];
  try {
    const handle = lang === "he" ? "@i24NEWS_HE" : "@i24news";
    const livePage = await fetchUrl(`https://www.youtube.com/${handle}/live`);
    const videoId = livePage.body.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)?.[1];

    if (videoId) {
      const watchPage = await fetchUrl(`https://www.youtube.com/watch?v=${videoId}`);
      const hlsMatch = watchPage.body.match(/"hlsManifestUrl":"([^"]+)"/);

      if (hlsMatch) {
        const hlsUrl = hlsMatch[1].replace(/\\u0026/g, "&");
        streams.push({
          name: lang === "he" ? "i24 NEWS עברית" : "i24 NEWS English",
          title: `📺 i24 NEWS ${lang === "he" ? "עברית" : "English"} [YouTube Live HLS]`,
          url: hlsUrl,
          behaviorHints: { notWebReady: false }
        });
      } else {
        // fallback – YouTube direct URL
        streams.push({
          name: lang === "he" ? "i24 NEWS עברית" : "i24 NEWS English",
          title: `📺 i24 NEWS ${lang === "he" ? "עברית" : "English"} [YouTube]`,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          behaviorHints: { notWebReady: true }
        });
      }
    }
  } catch (e) {
    console.error("i24 fetch error:", e.message);
  }
  return streams;
}

// ── Build Addon ──────────────────────────────────────────────────────────────
const builder = new addonBuilder(buildManifest());
builder.defineCatalogHandler(catalogHandler);
builder.defineMetaHandler(metaHandler);
builder.defineStreamHandler(streamHandler);
const addonInterface = builder.getInterface();

// ── Vercel Serverless Handler ─────────────────────────────────────────────────
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const url = req.url || "/";

  try {
    // ── manifest ────────────────────────────────────────────────────────────
    if (url === "/" || url === "/manifest.json") {
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(addonInterface.manifest);
    }

    // ── catalog ─────────────────────────────────────────────────────────────
    const catMatch = url.match(/^\/catalog\/([^/]+)\/([^/]+)(?:\/([^/]+))?\.json$/);
    if (catMatch) {
      const [, type, id, extraStr] = catMatch;
      const extra = {};
      if (extraStr) {
        extraStr.split("&").forEach(p => {
          const [k, v] = p.split("=");
          if (k && v) extra[decodeURIComponent(k)] = decodeURIComponent(v);
        });
      }
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(await catalogHandler({ type, id, extra }));
    }

    // ── meta ─────────────────────────────────────────────────────────────────
    const metaMatch = url.match(/^\/meta\/([^/]+)\/([^/]+)\.json$/);
    if (metaMatch) {
      const [, type, id] = metaMatch;
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(await metaHandler({ type, id }));
    }

    // ── stream ────────────────────────────────────────────────────────────────
    const streamMatch = url.match(/^\/stream\/([^/]+)\/([^/]+)\.json$/);
    if (streamMatch) {
      const [, type, id] = streamMatch;
      let result = await streamHandler({ type, id });

      // i24 – שלוף YouTube HLS דינמית
      if (id === "il-i24-heb" && result.streams.length === 0) {
        result = { streams: await getI24Streams("he") };
      }
      if (id === "il-i24-eng" && result.streams.length === 0) {
        result = { streams: await getI24Streams("en") };
      }

      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(result);
    }

    res.status(404).json({ error: "Not found", url });

  } catch (err) {
    console.error("Addon error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
