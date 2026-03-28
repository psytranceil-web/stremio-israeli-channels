// fetch-i24.js – שולף את URL הסטרים של i24 אוטומטית
const https = require("https");

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        ...headers
      }
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on("error", reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error("timeout")); });
    req.end();
  });
}

async function main() {
  console.log("\n🔍 מחפש URL סטרים של i24...\n");

  // ניסיון 1 – API של i24
  const apis = [
    "https://video.i24news.tv/api/getStream?channel=HE",
    "https://video.i24news.tv/api/live?lang=he",
    "https://il.i24news.tv/api/getStream",
    "https://api.i24news.tv/stream/hls/he",
  ];

  for (const url of apis) {
    try {
      const r = await get(url, { "Referer": "https://www.i24news.tv/", "Origin": "https://www.i24news.tv" });
      console.log(`[${r.status}] ${url}`);
      if (r.status < 400 && r.body.length > 10) {
        console.log("  תגובה:", r.body.slice(0, 300));
        if (r.body.includes("m3u8")) {
          const match = r.body.match(/https?:\/\/[^\s"'<>]+\.m3u8[^\s"'<>]*/);
          if (match) console.log("\n✅ נמצא URL:", match[0]);
        }
      }
    } catch(e) {
      console.log(`❌ ${url} – ${e.message}`);
    }
  }

  // ניסיון 2 – דף הבית של i24
  console.log("\n🔍 סורק דף הבית של i24...");
  try {
    const r = await get("https://www.i24news.tv/he", { "Referer": "https://www.i24news.tv/" });
    const m3u8s = r.body.match(/https?:\/\/[^\s"'\\]+\.m3u8[^\s"'\\]*/g) || [];
    const bcov = r.body.match(/bcovlive[^\s"'\\]+/g) || [];
    const acct = r.body.match(/account_id[^"']+/g) || [];
    const vid = r.body.match(/video_id[^"']+/g) || [];

    console.log("  m3u8 URLs:", m3u8s.length > 0 ? m3u8s : "לא נמצאו");
    console.log("  Brightcove:", bcov.slice(0,3));
    console.log("  Account:", acct.slice(0,2));
    console.log("  Video:", vid.slice(0,2));
  } catch(e) {
    console.log("❌ שגיאה:", e.message);
  }

  // ניסיון 3 – Brightcove API ישיר
  console.log("\n🔍 בודק Brightcove API...");
  const accountId = "5377161796001";
  const videoIds = [
    "6386790215112",  // i24 HE known
    "6386790908112",  // i24 EN known
    "5476555825001",  // i24 alternative
  ];

  for (const vid of videoIds) {
    const url = `https://edge.api.brightcove.com/playback/v1/accounts/${accountId}/videos/${vid}`;
    try {
      const r = await get(url, {
        "Accept": "application/json;pk=BCpkADawqM3NEhNy7bvKMFzA7dQOWJiAnX-TiUIOvr9X_WQNKjFMHLgNA_-i_SKRRPsJRHsYBjPuJJiO",
        "Referer": "https://www.i24news.tv/"
      });
      console.log(`[${r.status}] video ${vid}`);
      if (r.status < 400) {
        const m3u8 = r.body.match(/https?:\/\/[^\s"']+\.m3u8[^\s"']*/);
        if (m3u8) console.log("  ✅ URL:", m3u8[0]);
        else console.log("  Body:", r.body.slice(0, 200));
      }
    } catch(e) {
      console.log(`  ❌ ${e.message}`);
    }
  }

  console.log("\n✅ סיום\n");
}
main().catch(console.error);
