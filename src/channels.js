"use strict";

/**
 * channels.js – ערוצים ישראלים עם URLים מאומתים
 *
 * ✅ = נבדק ועובד
 * ⏳ = ממתין לקישור מ-GuruTv.online
 *
 * כיצד להוסיף ערוץ מ-GuruTv.online:
 *   1. gurutv.online → F12 → Network → סנן m3u8
 *   2. לחץ Play → העתק URL → הדבק כאן
 */

const CHANNELS = [

  // ════════════════════════════════════════════════
  //  ✅ ערוצי כאן – דרך CDN של kancdn.medonecdn.net
  // ════════════════════════════════════════════════

  {
    id: "il-kan11",
    name: "כאן 11",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Kan11Logo.svg/512px-Kan11Logo.svg.png",
    genre: ["כללי"],
    streams: [
      {
        url: "https://kancdn.medonecdn.net/livehls/oil/kancdn-live/live/kan11/live.livx/playlist.m3u8",
        label: "כאן 11 – Live HD",
        quality: "HD",
      },
    ],
  },

  {
    id: "il-makan33",
    name: "מכאן 33",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/MeKan_33_logo_2017.png",
    genre: ["כללי", "ערבית"],
    streams: [
      {
        url: "https://kancdn.medonecdn.net/livehls/oil/kancdn-live/live/makan/live.livx/playlist.m3u8",
        label: "מכאן 33 – Live HD",
        quality: "HD",
      },
    ],
  },

  // ════════════════════════════════════════════════
  //  ✅ רשת 13 – Cloudfront CDN
  // ════════════════════════════════════════════════

  {
    id: "il-reshet13",
    name: "רשת 13",
    logo: "https://upload.wikimedia.org/wikipedia/he/thumb/1/17/Reshet13Logo2022.svg/559px-Reshet13Logo2022.svg.png",
    genre: ["כללי"],
    streams: [
      {
        url: "https://d2xg1g9o5vns8m.cloudfront.net/out/v1/0855d703f7d5436fae6a9c7ce8ca5075/index.m3u8",
        label: "רשת 13 – Live HD",
        quality: "HD",
      },
    ],
  },

  // ════════════════════════════════════════════════
  //  ✅ Hala TV
  // ════════════════════════════════════════════════

  {
    id: "il-halatv",
    name: "Hala TV הלא",
    logo: "https://i.imgur.com/028M4Ew.png",
    genre: ["ערבית"],
    streams: [
      {
        url: "https://stream.panet.com/edge/halaTV/playlist.m3u8",
        label: "Hala TV – Live",
        quality: "HD",
      },
    ],
  },

  // ════════════════════════════════════════════════
  //  ✅ Hidabroot
  // ════════════════════════════════════════════════

  {
    id: "il-hidabroot",
    name: "הידברות",
    logo: "https://i.imgur.com/CTH4Hu2.png",
    genre: ["דתי"],
    streams: [
      {
        url: "https://cdn.cybercdn.live/HidabrootIL/Live97/playlist.m3u8",
        label: "הידברות – Live",
        quality: "HD",
      },
    ],
  },

  // ════════════════════════════════════════════════
  //  ✅ Shelanu TV
  // ════════════════════════════════════════════════

  {
    id: "il-shelanu",
    name: "Shelanu TV שלנו",
    logo: "https://i.imgur.com/UVz2Ojq.png",
    genre: ["דתי"],
    streams: [
      {
        url: "https://1247634592.rsc.cdn77.org/1247634592/playlist.m3u8",
        label: "Shelanu TV – Live",
        quality: "HD",
      },
    ],
  },


  // ════════════════════════════════════════════════
  //  ⏳ ממתין לקישורים מ-GuruTv.online
  //     פתח gurutv.online → F12 → Network → m3u8
  // ════════════════════════════════════════════════

  {
    id: "il-kan12",
    name: "כאן 12",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Keshet12_2018.svg/512px-Keshet12_2018.svg.png",
    genre: ["כללי"],
    streams: [
      // { url: "https://PASTE-URL-FROM-GURUTV.m3u8", label: "כאן 12 – GuruTV", quality: "HD" },
    ],
    placeholder: true,
  },

  {
    id: "il-kan13",
    name: "כאן 13",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Kan_13_Logo.svg/512px-Kan_13_Logo.svg.png",
    genre: ["כללי", "ילדים"],
    streams: [
      // { url: "https://PASTE-URL-FROM-GURUTV.m3u8", label: "כאן 13 – GuruTV", quality: "HD" },
    ],
    placeholder: true,
  },

  {
    id: "il-keshet12",
    name: "קשת 12",
    logo: "https://upload.wikimedia.org/wikipedia/he/thumb/3/36/Keshet12_logo.svg/512px-Keshet12_logo.svg.png",
    genre: ["כללי"],
    streams: [
      // { url: "https://PASTE-URL-FROM-GURUTV.m3u8", label: "קשת 12 – GuruTV", quality: "HD" },
    ],
    placeholder: true,
  },

  {
    id: "il-sport5",
    name: "ספורט 5",
    logo: "https://upload.wikimedia.org/wikipedia/he/thumb/5/5e/Sport5_logo_2019.svg/512px-Sport5_logo_2019.svg.png",
    genre: ["ספורט"],
    streams: [
      // { url: "https://PASTE-URL-FROM-GURUTV.m3u8", label: "ספורט 5 – GuruTV", quality: "HD" },
    ],
    placeholder: true,
  },

  {
    id: "il-now14",
    name: "ערוץ 14",
    logo: "https://i.imgur.com/Iq2Kb69.png",
    genre: ["חדשות", "כללי"],
    streams: [
      // { url: "https://PASTE-URL-FROM-GURUTV.m3u8", label: "ערוץ 14 – GuruTV", quality: "HD" },
    ],
    placeholder: true,
  },

  {
    id: "il-i24-heb",
    name: "i24 NEWS עברית",
    logo: "https://www.i24news.tv/images/favicon.png",
    genre: ["חדשות"],
    streams: [
      // { url: "https://PASTE-URL-FROM-GURUTV.m3u8", label: "i24 עברית – GuruTV", quality: "HD" },
    ],
    placeholder: true,
  },

];

// ── Helper functions ─────────────────────────────────────────────────────────

function getActiveChannels() {
  return CHANNELS.filter((ch) => ch.streams && ch.streams.length > 0);
}

function getAllChannels() {
  return CHANNELS;
}

function getChannelById(id) {
  return CHANNELS.find((ch) => ch.id === id) || null;
}

function getAllGenres() {
  const genres = new Set();
  CHANNELS.forEach((ch) => (ch.genre || []).forEach((g) => genres.add(g)));
  return Array.from(genres).sort();
}

module.exports = { CHANNELS, getActiveChannels, getAllChannels, getChannelById, getAllGenres };
