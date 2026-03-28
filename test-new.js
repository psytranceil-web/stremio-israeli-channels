const https = require("https");

const TESTS = [
  // i24 - ניסיונות חדשים
  { name: "i24 עברית - bcovlive + Referer", url: "https://bcovlive-a.akamaihd.net/d89ede8094c741b7924120b27764153c/eu-central-1/5377161796001/playlist.m3u8",
    headers: { "Referer": "https://www.i24news.tv/", "Origin": "https://www.i24news.tv" } },
  // מכאן 24
  { name: "מכאן 24", url: "https://mako-streaming.akamaized.net/direct/hls/live/2035340/ch24live/video_10801920_p_1.m3u8",
    headers: { "Referer": "https://www.mako.co.il/", "Origin": "https://www.mako.co.il" } },
  // רשת 13 - URL חלופי
  { name: "רשת 13 alt1", url: "https://d18b0e6mopany4.cloudfront.net/out/v1/2f2bc414a3db4698a8e94b89eaf2da2a/index.m3u8" },
  { name: "רשת 13 alt2", url: "https://d198ztbnlup2iq.cloudfront.net/out/v1/2d9050c90fb94df8b78d1d98306a1a65/index.m3u8" },
  // האח הגדול - Keshet 12 sub-channels
  { name: "האח הגדול (mako k12)", url: "https://mako-streaming.akamaized.net/n12/hls/live/2041434/n12_b/index.m3u8",
    headers: { "Referer": "https://www.mako.co.il/", "Origin": "https://www.mako.co.il" } },
  // Walla News
  { name: "Walla News cloudfront", url: "https://d2dffl3588mvfk.cloudfront.net/out/v1/d8e15050ca4148aab0ee387a5e2eb46b/index.m3u8" },
  // כאן חינוכית - iptv-org
  { name: "כאן חינוכית", url: "https://kan23.media.kan.org.il/hls/live/2024691/2024691/master.m3u8" },
];

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36";

function check(url, extra = {}) {
  return new Promise((resolve) => {
    const req = https.request(url, {
      method: "HEAD", timeout: 8000,
      headers: { "User-Agent": UA, ...extra }
    }, (res) => resolve({ status: res.statusCode, ok: res.statusCode < 400 }));
    req.on("error", (e) => resolve({ status: 0, ok: false, err: e.message.slice(0, 60) }));
    req.on("timeout", () => { req.destroy(); resolve({ status: 408, ok: false, err: "timeout" }); });
    req.end();
  });
}

async function main() {
  console.log("\n🔍 בדיקת URLs חדשים...\n");
  for (const t of TESTS) {
    const r = await check(t.url, t.headers || {});
    const icon = r.ok ? "✅" : "❌";
    console.log(`${icon} [${r.status}] ${t.name}${r.err ? " – " + r.err : ""}`);
  }
  console.log("\nסיום\n");
}
main();
