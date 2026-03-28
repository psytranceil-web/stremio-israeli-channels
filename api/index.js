"use strict";

const { addonBuilder } = require("stremio-addon-sdk");
const { buildManifest } = require("../src/manifest");
const { catalogHandler, metaHandler, streamHandler } = require("../src/handlers");

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

    // stream
    const streamMatch = url.match(/^\/stream\/([^/]+)\/([^/]+)\.json$/);
    if (streamMatch) {
      const [, type, id] = streamMatch;
      const result = await streamHandler({ type, id });
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
