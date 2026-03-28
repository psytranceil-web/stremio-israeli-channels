"use strict";

/**
 * ISRAELI_CHANNELS – רשימת ערוצים ישראלים עם קישורי m3u8 אמיתיים
 *
 * מקורות:
 *  - ערוצי כאן:   kan.org.il (רשמי, ציבורי)
 *  - רשת 13:      cloudfront CDN (ציבורי)
 *  - i24 NEWS:    Brightcove / Akamai (ציבורי)
 *  - GuruTV:      הוסף ידנית – ראה הערות
 *
 * כיצד להוסיף ערוץ מ-GuruTv.online:
 *   1. פתח gurutv.online → לחץ F12 → Network → סנן m3u8
 *   2. לחץ Play על ערוץ → העתק URL
 *   3. הוסף ל-streams של הערוץ הרצוי
 */

const CHANNELS = [

  // ══════════════════════════════════════════════════════════════
  //  ערוצי כאן – ציבוריים, חינמיים, 100% רשמיים
  // ══════════════════════════════════════════════════════════════

  {
    id: "il-kan11",
    name: "כאן 11",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Kan11Logo.svg/512px-Kan11Logo.svg.png",
    genre: ["כללי"],
    streams: [
      {
        url: "https://kan11w.media.kan.org.il/hls/live/2105694/2105694/master.m3u8",
        label: "כאן 11 – Live (ראשי)",
        quality: "HD",
      },
      {
        url: "https://kan11.media.kan.org.il/hls/live/2024514/2024514/master.m3u8",
        label: "כאן 11 – Live (גיבוי)",
        quality: "HD",
      },
    ],
  },

  {
    id: "il-kan12",
    name: "כאן 12",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Kan_12_Logo.svg/512px-Kan_12_Logo.svg.png",
    genre: ["כללי"],
    streams: [
      {
        url: "https://kan12.media.kan.org.il/hls/live/2024515/2024515/master.m3u8",
        label: "כאן 12 – Live",
        quality: "HD",
      },
    ],
  },

  {
    id: "il-kan13",
    name: "כאן 13",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Kan_13_Logo.svg/512px-Kan_13_Logo.svg.png",
    genre: ["כללי", "ילדים"],
    streams: [
      {
        url: "https://kan13.media.kan.org.il/hls/live/2024516/2024516/master.m3u8",
        label: "כאן 13 – Live",
        quality: "HD",
      },
    ],
  },

  {
    id: "il-kan-educational",
    name: "כאן חינוכית",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/KanHinuchit.svg/512px-KanHinuchit.svg.png",
    genre: ["ילדים", "חינוך"],
    streams: [
      {
        url: "https://kan23.media.kan.org.il/hls/live/2024691/2024691/master.m3u8",
        label: "כאן חינוכית – Live",
        quality: "HD",
      },
    ],
  },

  {
    id: "il-kan-news",
    name: "כאן חדשות",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Kan11Logo.svg/512px-Kan11Logo.svg.png",
    genre: ["חדשות"],
    streams: [
      {
        url: "https://kannews.media.kan.org.il/hls/live/2024517/2024517/master.m3u8",
        label: "כאן חדשות – Live",
        quality: "HD",
      },
    ],
  },


  // ══════════════════════════════════════════════════════════════
  //  ערוץ 13 (רשת) – Cloudfront CDN, ציבורי
  // ══════════════════════════════════════════════════════════════

  {
    id: "il-reshet13",
    name: "רשת 13",
    logo: "https://i.imgur.com/eFM3bTq.png",
    genre: ["כללי"],
    streams: [
      {
        url: "https://d2xg1g9o5vns8m.cloudfront.net/out/v1/0855d703f7d5436fae6a9c7ce8ca5075/index.m3u8",
        label: "רשת 13 – Live",
        quality: "HD",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  i24 NEWS – Brightcove / Akamai, ציבורי, בינלאומי
  // ══════════════════════════════════════════════════════════════

  {
    id: "il-i24-heb",
    name: "i24 NEWS עברית",
    logo: "https://www.i24news.tv/images/favicon.png",
    genre: ["חדשות"],
    streams: [
      {
        url: "https://bcovlive-a.akamaihd.net/d89ede8094c741b7924120b27764153c/eu-central-1/5377161796001/profile_0/chunklist.m3u8",
        label: "i24 עברית – Live (ראשי)",
        quality: "HD",
      },
      {
        url: "https://bcovlive-a.akamaihd.net/d89ede8094c741b7924120b27764153c/eu-central-1/5377161796001/playlist.m3u8",
        label: "i24 עברית – Live (גיבוי)",
        quality: "HD",
      },
    ],
  },

  {
    id: "il-i24-eng",
    name: "i24 NEWS English",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/LOGO_i24NEWS.png/512px-LOGO_i24NEWS.png",
    genre: ["חדשות"],
    streams: [
      {
        url: "https://bcovlive-a.akamaihd.net/ecf224f43f3b43e69471a7b626481af0/eu-central-1/5377161796001/playlist.m3u8",
        label: "i24 English – Live",
        quality: "HD",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  ערוצים מסחריים – ממתינים לקישורי GuruTv.online
  //  הורה הערה (#) והכנס את ה-URL שתוציא מ-F12
  // ══════════════════════════════════════════════════════════════

  {
    id: "il-keshet12",
    name: "קשת 12",
    logo: "https://upload.wikimedia.org/wikipedia/he/thumb/3/36/Keshet12_logo.svg/512px-Keshet12_logo.svg.png",
    genre: ["כללי"],
    streams: [
      // {
      //   url: "https://PASTE-GURUTV-URL-HERE.m3u8",
      //   label: "קשת 12 – GuruTV",
      //   quality: "HD",
      // },
    ],
    placeholder: true,
  },

  {
    id: "il-sport5",
    name: "ספורט 5",
    logo: "https://upload.wikimedia.org/wikipedia/he/thumb/5/5e/Sport5_logo_2019.svg/512px-Sport5_logo_2019.svg.png",
    genre: ["ספורט"],
    streams: [
      // {
      //   url: "https://PASTE-GURUTV-URL-HERE.m3u8",
      //   label: "ספורט 5 – GuruTV",
      //   quality: "HD",
      // },
    ],
    placeholder: true,
  },

  {
    id: "il-hot3",
    name: "HOT 3",
    logo: "https://upload.wikimedia.org/wikipedia/he/thumb/5/5e/HOT3_logo.svg/512px-HOT3_logo.svg.png",
    genre: ["כללי"],
    streams: [],
    placeholder: true,
  },

];


// ── Helper functions ──────────────────────────────────────────────────────────

/** רק ערוצים עם סטרים פעיל */
function getActiveChannels() {
  return CHANNELS.filter((ch) => ch.streams && ch.streams.length > 0);
}

/** כל הערוצים כולל placeholders */
function getAllChannels() {
  return CHANNELS;
}

/** חיפוש לפי ID */
function getChannelById(id) {
  return CHANNELS.find((ch) => ch.id === id) || null;
}

/** כל הז'אנרים הייחודיים */
function getAllGenres() {
  const genres = new Set();
  CHANNELS.forEach((ch) => (ch.genre || []).forEach((g) => genres.add(g)));
  return Array.from(genres).sort();
}

module.exports = {
  CHANNELS,
  getActiveChannels,
  getAllChannels,
  getChannelById,
  getAllGenres,
};
