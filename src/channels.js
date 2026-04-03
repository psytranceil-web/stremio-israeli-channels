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
    logo: "https://raw.githubusercontent.com/RokuIL/Live-From-Israel/master/Logos/Kan%2011.png",
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
    logo: "https://raw.githubusercontent.com/RokuIL/Live-From-Israel/master/Logos/Keshet%2012.png",
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
  //  רשת 13 ✅ (3 URLs גיבוי)
  // ════════════════════════════════════════
  {
    id: "il-reshet13",
    name: "רשת 13",
    logo: "https://raw.githubusercontent.com/RokuIL/Live-From-Israel/master/Logos/Reshet%2013.jpg",
    genre: ["כללי"],
    streams: [
      { url: "https://d2xg1g9o5vns8m.cloudfront.net/out/v1/0855d703f7d5436fae6a9c7ce8ca5075/index.m3u8", label: "רשת 13 – Live HD", quality: "HD" },
      { url: "https://d18b0e6mopany4.cloudfront.net/out/v1/2f2bc414a3db4698a8e94b89eaf2da2a/index.m3u8", label: "רשת 13 – Live HD (גיבוי 1)", quality: "HD" },
      { url: "https://d198ztbnlup2iq.cloudfront.net/out/v1/2d9050c90fb94df8b78d1d98306a1a65/index.m3u8", label: "רשת 13 – Live HD (גיבוי 2)", quality: "HD" },
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
      { url: "https://kancdn.medonecdn.net/livehls/oil/kancdn-live/live/makan/live.livx/playlist.m3u8", label: "מכאן 33 – Live HD", quality: "HD" },
    ],
  },

  // ════════════════════════════════════════
  //  מכאן 24 ✅ (חדשות)
  // ════════════════════════════════════════
  {
    id: "il-mako24",
    name: "ערוץ 24",
    logo: "https://i.ibb.co/7nYM8MK/arutz24tvtrp.png",
    genre: ["חדשות"],
    streams: [
      {
        url: "https://mako-streaming.akamaized.net/direct/hls/live/2035340/ch24live/video_10801920_p_1.m3u8",
        label: "ערוץ 24 – Live HD",
        quality: "HD",
        headers: { "Referer": "https://www.mako.co.il/", "Origin": "https://www.mako.co.il" },
      },
    ],
  },

  // ════════════════════════════════════════
  //  האח הגדול ✅ – 13+ Live
  // ════════════════════════════════════════
  {
    id: "il-big-brother",
    name: "האח הגדול 🏠 13+",
    logo: "https://raw.githubusercontent.com/RokuIL/Live-From-Israel/master/Logos/Big%20Brother.png",
    genre: ["בידור", "ריאליטי"],
    streams: [
      {
        url: "https://d3snfszc9pg25z.cloudfront.net/out/v1/11329fc2b33a4eca9a2d715c652aa167/indexsource_1.m3u8",
        label: "האח הגדול 13+ – Live ישיר",
        quality: "HD",
      },
    ],
  },

  // ════════════════════════════════════════
  //  Walla News ✅
  // ════════════════════════════════════════
  {
    id: "il-walla-news",
    name: "Walla! חדשות",
    logo: "https://i.ibb.co/jzRyjBn/walla.png",
    genre: ["חדשות"],
    streams: [
      { url: "https://d2dffl3588mvfk.cloudfront.net/out/v1/d8e15050ca4148aab0ee387a5e2eb46b/index.m3u8", label: "Walla News – Live", quality: "HD" },
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
    logo: "https://www.hidabroot.org/images/hidabroot-logo.png",
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
    streams: [
      {
        url: "https://r.il.cdn-redge.media/livehls/oil/ch14/live/ch14/live.livx/playlist.m3u8",
        label: "ערוץ 14 – Live HD (ראשי)",
        quality: "HD",
      },
      {
        url: "https://ch14channel14-cdn.encoders.immergo.tv/2/streamPlaylist.m3u8",
        label: "ערוץ 14 – Live (גיבוי)",
        quality: "HD",
      },
    ],
  },
  {
    id: "il-i24-heb",
    name: "i24 NEWS עברית",
    logo: "https://raw.githubusercontent.com/RokuIL/Live-From-Israel/master/Logos/i24news.jpg",
    genre: ["חדשות"],
    streams: [], // נטען דינמית מ-GuruTV
    placeholder: false,
  },
  {
    id: "il-i24-eng",
    name: "i24 NEWS English",
    logo: "https://raw.githubusercontent.com/RokuIL/Live-From-Israel/master/Logos/i24news.jpg",
    genre: ["חדשות"],
    streams: [],
    placeholder: true, // חסום — Brightcove DRM
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
