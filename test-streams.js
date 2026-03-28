const https = require("https");
const http = require("http");

const EXTRA = [
  { name: "ערוץ 14", url: "https://now14.g-mana.live/media/91517161-44ab-4e46-af70-e9fe26117d2e/mainManifest.m3u8" },
  { name: "Shopping IL", url: "https://shoppingil-rewriter.vidnt.com/index.m3u8" },
  { name: "מכאן 33 (kan.org)", url: "https://makan.media.kan.org.il/hls/live/2024680/2024680/master.m3u8" },
  { name: "i24 עברית amagi", url: "https://i24news-i24newshe.amagi.tv/playlist/amagi-hls-production-i24newshe-i24news/playlist.m3u8" },
  { name: "i24 English amagi", url: "https://i24news-i24newsen.amagi.tv/playlist/amagi-hls-production-i24newsen-i24news/playlist.m3u8" },
];

function check(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.request(url, {
      method: "HEAD", timeout: 8000,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    }, (res) => resolve({ status: res.statusCode, ok: res.statusCode < 400 }));
    req.on("error", (e) => resolve({ status: 0, ok: false, err: e.message.slice(0,60) }));
    req.on("timeout", () => { req.destroy(); resolve({ status: 408, ok: false, err: "timeout" }); });
    req.end();
  });
}

async function main() {
  for (const c of EXTRA) {
    const r = await check(c.url);
    const icon = r.ok ? "✅" : "❌";
    console.log(`${icon} [${r.status}] ${c.name}${r.err ? " – "+r.err : ""}`);
  }
}
main();
