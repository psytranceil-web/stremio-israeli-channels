const http = require("http");
const https = require("https");

function c(url) {
  return new Promise(r => {
    const cl = url.startsWith("https") ? https : http;
    const req = cl.request(url, { method: "HEAD", timeout: 7000, headers: { "User-Agent": "Mozilla/5.0" } },
      (res) => r({ ok: res.statusCode < 400, s: res.statusCode }));
    req.on("error", () => r({ ok: false, s: 0 }));
    req.on("timeout", () => { req.destroy(); r({ ok: false, s: 408 }); });
    req.end();
  });
}

async function main() {
  const urls = [
    "http://dvr.ch20-cdnwiz.com/hls/dvr.m3u8",
    "https://dvr.ch20-cdnwiz.com/hls/dvr.m3u8",
    "http://ch20-live.cdnwiz.com/ch20/ch20/playlist.m3u8",
    "https://live.ch20-cdnwiz.com/ch20-abr/ch20-abr/playlist.m3u8",
  ];
  for (const u of urls) {
    const r = await c(u);
    console.log(`${r.ok ? "✅" : "❌"} [${r.s}] ${u}`);
  }
}
main();
