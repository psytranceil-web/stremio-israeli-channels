const https = require("https");
const http = require("http");

function check(url, hdrs = {}) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.request(url, {
      method: "HEAD", timeout: 7000,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36", ...hdrs }
    }, (res) => resolve({ ok: res.statusCode < 400, status: res.statusCode }));
    req.on("error", () => resolve({ ok: false, status: 0 }));
    req.on("timeout", () => { req.destroy(); resolve({ ok: false, status: 408 }); });
    req.end();
  });
}

async function main() {
  const REF14 = { "Referer": "https://www.now14.co.il/", "Origin": "https://www.now14.co.il" };

  const tests = [
    // ערוץ 14 - URLs חדשים
    { name: "ch14 akamaized",  url: "https://ch14-live.akamaized.net/hls/live/2036603/ch14/index.m3u8", h: REF14 },
    { name: "ch14 cloudfront", url: "https://d3bp6dwmpbdajl.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-ury0meh5m4nzm/index.m3u8", h: {} },
    { name: "ch14 cdnwiz",     url: "https://live.ch14-cdnwiz.com/ch14/ch14/playlist.m3u8", h: REF14 },
    { name: "ch14 gostreaming", url: "https://contact.gostreaming.tv/ch14/myStream/playlist.m3u8", h: {} },
    { name: "ch14 brightcove", url: "https://bcovlive-a.akamaihd.net/b1e3a2e40a6142d3b5f5f43cf9b44c33/eu-central-1/5377161796001/playlist.m3u8", h: {} },
    // ערוץ 20 (בעברית - תחבורה)
    { name: "ch20 cdnwiz",     url: "https://live.ch20-cdnwiz.com/ch20-abr/ch20-abr/playlist.m3u8", h: {} },
    { name: "ch20 dvr",        url: "https://dvr.ch20-cdnwiz.com/hls/dvr.m3u8", h: {} },
    // i24 - ניסיון אחרון: לנסות להגיע לFastly CDN
    { name: "i24 fastly",      url: "https://fastly.live.brightcove.com/6386790215112/eu-central-1/5377161796001/playlist-hls.m3u8", h: {} },
    { name: "i24alive akamai", url: "https://i24alive2.akamaized.net/d89ede8094c741b7924120b27764153c/eu-central-1/5377161796001/playlist.m3u8", h: {} },
  ];

  console.log("\n🔍 בדיקת URLs חדשים...\n");
  for (const t of tests) {
    const r = await check(t.url, t.h);
    console.log(`  ${r.ok ? "✅" : "❌"} [${r.status}] ${t.name}`);
  }
  console.log("\n✅ סיום\n");
}
main();
