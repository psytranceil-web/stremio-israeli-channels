"use strict";

const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const { buildManifest } = require("./src/manifest");
const { catalogHandler, metaHandler, streamHandler } = require("./src/handlers");

const manifest = buildManifest();
const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(catalogHandler);
builder.defineMetaHandler(metaHandler);
builder.defineStreamHandler(streamHandler);

const addonInterface = builder.getInterface();

const PORT = parseInt(process.env.PORT || "7000", 10);
const HOST = process.env.HOST || "0.0.0.0";

serveHTTP(addonInterface, { port: PORT, hostname: HOST });

console.log("════════════════════════════════════════════════════════");
console.log(`  🇮🇱  Israeli Channels Addon  v${manifest.version}`);
console.log("════════════════════════════════════════════════════════");
console.log(`  🟢  Server:   http://${HOST}:${PORT}`);
console.log(`  📋  Manifest: http://localhost:${PORT}/manifest.json`);
console.log(`  📺  Stremio:  stremio://localhost:${PORT}/manifest.json`);
console.log("════════════════════════════════════════════════════════");
