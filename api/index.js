"use strict";

const { addonBuilder } = require("stremio-addon-sdk");
const https = require("https");
const { buildManifest } = require("../src/manifest");
const { catalogHandler, metaHandler, streamHandler } = require("../src/handlers");

// ── i24 dynamic stream fetcher ──────────────────────────────────────────────
// מנסה לשלוף URL חי מ-Brightcove בכל פנייה
async function getI24Streams() {
  const accountId = "5377161796001";
  const policyKey = "BCpkADawqM1UIU4favtR1Jj4rqM0ZAkYwMEbgN9bsEpJ2150CdxJmRIG8jK-Up_9w4w37x3tP1AsoO_M";
  const channels = [
    { id: "6386790215112", name: "i24 NEWS עברית", lang: "HE" },
    { id: "6386790908112", name: "i24 NEWS English", lang: "EN" },
  ];

  const streams = [];
  for (const ch of channels) {
    try {
      const data = await new Promise((resolve, reject) => {
        const req = https.request(
          `https://edge.api.brightcove.com/playback/v1/accounts/${accountId}/videos/${ch.id}`,
          {
            timeout: 5000,
            headers: {
              "Accept": `application/json;pk=${policyKey}`,
              "Origin": "https://www.i24news.tv",
              "Referer": "https://www.i24news.tv/",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
          },
          (res) => {
            let body = "";
            res.on("data", d => body += d);
            res.on("end", () => resolve(JSON.parse(body)));
          }
        );
        req.on("error", reject);
        req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
        req.end();
      });

      const sources = (data.sources || []).filter(s => s.src && s.src.includes(".m3u8"));
      if (sources.length > 0) {
        streams.push({ name: ch.name, title: `📺 ${ch.name} [Live]`, url: sources[0].src, behaviorHints: { notWebReady: false } });
      }
    } catch (e) {
      // Brightcove נכשל - נסה fallback
    }
  }
  return streams;
}

// בנה את ה-addon
const builder = new addonBuilder(buildManifest());
builder.defineCatalogHandler(catalogHandler);
builder.defineMetaHandler(metaHandler);
builder.defineStreamHandler(streamHandler);

const addonInterface = builder.getInterface();

// Vercel serverless handler
module.exports = async (req, res) => {
  // CORS headers – חיוני לסטרימיו
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const url = req.url || "/";

  try {
    // manifest.json
    if (url === "/" || url === "/manifest.json") {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(addonInterface.manifest);
      return;
    }

    // catalog
    const catalogMatch = url.match(/^\/catalog\/([^/]+)\/([^/]+)(?:\/([^/]+))?\.json$/);
    if (catalogMatch) {
      const [, type, id, extraStr] = catalogMatch;
      const extra = {};
      if (extraStr) {
        extraStr.split("&").forEach(pair => {
          const [k, v] = pair.split("=");
          if (k && v) extra[decodeURIComponent(k)] = decodeURIComponent(v);
        });
      }
      const result = await catalogHandler({ type, id, extra });
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
      return;
    }

    // meta
    const metaMatch = url.match(/^\/meta\/([^/]+)\/([^/]+)\.json$/);
    if (metaMatch) {
      const [, type, id] = metaMatch;
      const result = await metaHandler({ type, id });
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
      return;
    }

    // stream – עם תמיכה ב-i24 דינמי
    const streamMatch = url.match(/^\/stream\/([^/]+)\/([^/]+)\.json$/);
    if (streamMatch) {
      const [, type, id] = streamMatch;
      let result = await streamHandler({ type, id });

      // אם זה i24, נסה לשלוף URL דינמי
      if ((id === "il-i24-heb" || id === "il-i24-eng") && result.streams.length === 0) {
        const i24streams = await getI24Streams();
        const lang = id === "il-i24-heb" ? "עברית" : "English";
        const filtered = i24streams.filter(s => s.name.includes(lang === "עברית" ? "עברית" : "English"));
        result = { streams: filtered.length > 0 ? filtered : i24streams };
      }

      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
      return;
    }

    // 404
    res.status(404).json({ error: "Not found", url });

  } catch (err) {
    console.error("Addon error:", err);
    res.status(500).json({ error: err.message });
  }
};
