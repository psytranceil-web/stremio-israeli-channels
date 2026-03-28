"use strict";

/**
 * channels.js – ערוצים ישראלים עם URLים מאומתים
 * עדכון אחרון: בדיקה מלאה של כל URL
 *
 * ✅ = נבדק ועובד
 * 🔑 = דורש headers (Referer/Origin) – Stremio שולח אוטומטית
 * ⏳ = ממתין לקישור
 */

const CHANNELS = [

  // ════════════════════════════════════════
  //  כאן 11 ✅
  // ════════════════════════════════════════
  {
    id: "il-kan11",
    name: "כאן 11",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Kan_11_logo.svg/200px-Kan_11_logo.svg.png",
    genre: ["כללי"],
    streams: [
      {
        url: "https://kancdn.medonecdn.net/livehls/oil/kancdn-live/live/kan11/live.livx/playlist.m3u8",
        label: "כאן 11 – Live HD",
        quality: "HD",
      },
    ],
  },


  // ════════════════════════════════════════
  //  קשת 12 ✅ (עם Referer mako.co.il)
  // ════════════════════════════════════════
  {
    id: "il-keshet12",
    name: "קשת 12",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Keshet12_Logo.svg/200px-Keshet12_Logo.svg.png",
    genre: ["כללי"],
    streams: [
      {
        url: "https://mako-streaming.akamaized.net/n12/hls/live/2041434/n12_b/index.m3u8",
        label: "קשת 12 – Live HD",
        quality: "HD",
        headers: {
          "Referer": "https://www.mako.co.il/",
          "Origin": "https://www.mako.co.il"
        }
      },
    ],
  },

  // ════════════════════════════════════════
  //  רשת 13 ✅
  // ════════════════════════════════════════
  {
    id: "il-reshet13",
    name: "רשת 13",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Reshet_13_logo.svg/200px-Reshet_13_logo.svg.png",
    genre: ["כללי"],
    streams: [
      {
        url: "https://d2xg1g9o5vns8m.cloudfront.net/out/v1/0855d703f7d5436fae6a9c7ce8ca5075/index.m3u8",
        label: "רשת 13 – Live HD",
        quality: "HD",
      },
    ],
  },

  // ════════════════════════════════════════
  //  מכאן 33 ✅
  // ════════════════════════════════════════
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

  // ════════════════════════════════════════
  //  Hala TV ✅
  // ════════════════════════════════════════
  {
    id: "il-halatv",
    name: "הלא TV",
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


  // ════════════════════════════════════════
  //  הידברות ✅
  // ════════════════════════════════════════
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

  // ════════════════════════════════════════
  //  Shelanu TV ✅
  // ════════════════════════════════════════
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

  // ════════════════════════════════════════
  //  ⏳ ממתינים – הוסף URL מ-GuruTv.online
  // ════════════════════════════════════════
  {
    id: "il-kan12",
    name: "כאן 12",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Keshet12_2018.svg/200px-Keshet12_2018.svg.png",
    genre: ["כללי"],
    streams: [],
    placeholder: true,
  },
  {
    id: "il-now14",
    name: "ערוץ 14",
    logo: "https://upload.wikimedia.org/wikipedia/he/thumb/d/d4/Channel_14_Israel_logo.svg/200px-Channel_14_Israel_logo.svg.png",
    genre: ["חדשות", "כללי"],
    streams: [],
    placeholder: true,
  },
  {
    id: "il-knesset",
    name: "ערוץ הכנסת",
    logo: "https://upload.wikimedia.org/wikipedia/he/thumb/4/4b/Knesset_Channel_logo.svg/200px-Knesset_Channel_logo.svg.png",
    genre: ["חדשות"],
    streams: [],
    placeholder: true,
  },
  {
    id: "il-i24-heb",
    name: "i24 NEWS עברית",
    logo: "https://www.i24news.tv/images/favicon.png",
    genre: ["חדשות"],
    streams: [],
    placeholder: true,
  },
  {
    id: "il-sport5",
    name: "ספורט 5",
    logo: "https://upload.wikimedia.org/wikipedia/he/thumb/5/5e/Sport5_logo_2019.svg/200px-Sport5_logo_2019.svg.png",
    genre: ["ספורט"],
    streams: [],
    placeholder: true,
  },

];


// ── Helper functions ─────────────────────────────────────────────
function getActiveChannels() {
  return CHANNELS.filter((ch) => ch.streams && ch.streams.length > 0);
}
function getAllChannels() { return CHANNELS; }
function getChannelById(id) { return CHANNELS.find((ch) => ch.id === id) || null; }
function getAllGenres() {
  const g = new Set();
  CHANNELS.forEach((ch) => (ch.genre || []).forEach((x) => g.add(x)));
  return Array.from(g).sort();
}
module.exports = { CHANNELS, getActiveChannels, getAllChannels, getChannelById, getAllGenres };
