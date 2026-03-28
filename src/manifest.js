"use strict";

const pkg = require("../package.json");
const { getAllGenres } = require("./channels");

function buildManifest() {
  return {
    id: "community.israeli.channels.gurutv",
    version: pkg.version,
    name: "🇮🇱 ערוצים ישראלים",
    description:
      "צפו בערוצי טלוויזיה ישראלים בשידור חי – כאן, קשת, רשת, i24 ועוד. מבוסס על GuruTv.online",
    logo: "https://flagcdn.com/w160/il.png",
    background:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/1200px-Flag_of_Israel.svg.png",
    resources: ["catalog", "meta", "stream"],
    types: ["tv"],
    idPrefixes: ["il-"],
    catalogs: [
      {
        type: "tv",
        id: "israeli-live",
        name: "ערוצים ישראלים 🇮🇱",
        extra: [
          { name: "genre", isRequired: false, options: getAllGenres() },
          { name: "search", isRequired: false },
          { name: "skip", isRequired: false },
        ],
      },
    ],
    behaviorHints: {
      adult: false,
      p2p: false,
      configurable: false,
    },
  };
}

module.exports = { buildManifest };
