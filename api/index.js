"use strict";

const { addonBuilder } = require("stremio-addon-sdk");
const https = require("https");
const { buildManifest } = require("../src/manifest");
const { catalogHandler, metaHandler, streamHandler } = require("../src/handlers");

// ── GuruTV i24 scraper – שולף URL חי עם token מ-GuruTV ─────────────────────
function getI24FromGuruTV() {
  return new Promise((resolve) => {
    const req = https.request("https://gurutv.online/chi24news.html", {
      timeout: 8000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://gurutv.online/"
      }
    }, (res) => {
      let body = "";
      res.on("data", c => body += c);
      res.on("end", () => {
        // חפש את ה-Fastly/Brightcove URL עם token
        const match = body.match(/https:\/\/fastly\.live\.brightcove\.com\/[^\s"'<>\\]+playlist-hls\.m3u8[^\s"'<>\\]*/);
        if (match) resolve(match[0]);
        else resolve(null);
      });
    });
    req.on("error", () => resolve(null));
    req.on("timeout", () => { req.destroy(); resolve(null); });
    req.end();
  });
}

// ── Univtec API helper – שולף stream URL חי ────────────────────────────────
function univtecStream(apiBase, guid, type, tenant) {
  return new Promise((resolve) => {
    const url = `${apiBase}cms/interface/${type}/play?relations=true&filter=guid||$eq||${guid}`;
    const req = https.request(url, {
      timeout: 6000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "x-tenant-id": tenant,
        "Referer": "https://snippet.univtec.com/",
        "Origin": "https://snippet.univtec.com",
        "Accept": "application/json"
      }
    }, (res) => {
      let body = "";
      res.on("data", c => body += c);
      res.on("end", () => {
        try {
          const m3u8s = [...body.matchAll(/https?:\/\/[^\s"'<>\\]+\.m3u8[^\s"'<>\\]*/g)].map(m => m[0]);
          resolve(m3u8s);
        } catch { resolve([]); }
      });
    });
    req.on("error", () => resolve([]));
    req.on("timeout", () => { req.destroy(); resolve([]); });
    req.end();
  });
}

// ── Build Addon ───────────────────────────────────────────────────────────────
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
    if (url === "/" || url === "/manifest.json") {
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(addonInterface.manifest);
    }

    const catMatch = url.match(/^\/catalog\/([^/]+)\/([^/]+)(?:\/([^/]+))?\.json$/);
    if (catMatch) {
      const [, type, id, extraStr] = catMatch;
      const extra = {};
      if (extraStr) extraStr.split("&").forEach(p => { const [k,v] = p.split("="); if(k&&v) extra[decodeURIComponent(k)]=decodeURIComponent(v); });
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(await catalogHandler({ type, id, extra }));
    }

    const metaMatch = url.match(/^\/meta\/([^/]+)\/([^/]+)\.json$/);
    if (metaMatch) {
      const [, type, id] = metaMatch;
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(await metaHandler({ type, id }));
    }

    const streamMatch = url.match(/^\/stream\/([^/]+)\/([^/]+)\.json$/);
    if (streamMatch) {
      const [, type, id] = streamMatch;
      let result = await streamHandler({ type, id });

      // i24 עברית – שלוף URL חי עם token מ-GuruTV
      if (id === "il-i24-heb" && result.streams.length === 0) {
        const i24url = await getI24FromGuruTV();
        if (i24url) {
          result = { streams: [{ name: "i24 NEWS עברית", title: "📺 i24 NEWS עברית [Live HD]", url: i24url, behaviorHints: { notWebReady: false } }] };
        }
      }

      // ערוץ 14 – נסה לשלוף URL חי מ-Univtec API (גיבוי לסטרים הקבועים)
      if (id === "il-now14" && result.streams.length === 0) {
        const urls = await univtecStream(
          "https://insight-api-channel14.univtec.com/",
          "b676b906-5625-48af-a331-11a5d22e151b",
          "channels", "channel14"
        );
        result = { streams: urls.map((u, i) => ({
          name: `ערוץ 14`,
          title: `📺 ערוץ 14 – Live [${i === 0 ? "ראשי" : "גיבוי"}]`,
          url: u, behaviorHints: { notWebReady: false }
        }))};
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
