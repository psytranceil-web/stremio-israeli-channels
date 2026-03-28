"use strict";

const { addonBuilder } = require("stremio-addon-sdk");
const https = require("https");
const http = require("http");
const { buildManifest } = require("../src/manifest");
const { catalogHandler, metaHandler, streamHandler } = require("../src/handlers");

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
    // ── manifest ──────────────────────────────────────────────────────────────
    if (url === "/" || url === "/manifest.json") {
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(addonInterface.manifest);
    }


    // ── catalog ───────────────────────────────────────────────────────────────
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

    // ── meta ──────────────────────────────────────────────────────────────────
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
      const result = await streamHandler({ type, id });
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(result);
    }

    res.status(404).json({ error: "Not found", url });

  } catch (err) {
    console.error("Addon error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
