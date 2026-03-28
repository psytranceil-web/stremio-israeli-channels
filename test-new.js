const https = require("https");

// קשת 12 דורש Referer + Origin כדי לעבוד
const tests = [
  {
    name: "קשת 12 – עם Referer",
    url: "https://mako-streaming.akamaized.net/direct/hls/live/2033787/k12dvr/index.m3u8",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0",
      "Referer": "https://www.mako.co.il/",
      "Origin": "https://www.mako.co.il"
    }
  },
  {
    name: "קשת 12 – stream2",
    url: "https://mako-streaming.akamaized.net/n12/hls/live/2041434/n12_b/index.m3u8",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Referer": "https://www.mako.co.il/",
      "Origin": "https://www.mako.co.il"
    }
  },
  {
    name: "ערוץ 14 – now14",
    url: "https://now14.g-mana.live/media/91517161-44ab-4e46-af70-e9fe26117d2e/mainManifest.m3u8",
    headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://www.now14.co.il/" }
  },
  {
    name: "כנסת – gostreaming",
    url: "https://contact.gostreaming.tv/Knesset/myStream/playlist.m3u8",
    headers: { "User-Agent": "Mozilla/5.0" }
  },
];

function check(url, headers) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: "HEAD", timeout: 8000, headers }, (res) => {
      resolve({ status: res.statusCode, ok: res.statusCode < 400 });
    });
    req.on("error", (e) => resolve({ status: 0, ok: false, err: e.message.slice(0, 60) }));
    req.on("timeout", () => { req.destroy(); resolve({ status: 408, ok: false, err: "timeout" }); });
    req.end();
  });
}

async function main() {
  console.log("\n🔍 בדיקה עם headers...\n");
  for (const t of tests) {
    const r = await check(t.url, t.headers);
    const icon = r.ok ? "✅" : "❌";
    console.log(`${icon} [${r.status}] ${t.name}${r.err ? " – " + r.err : ""}`);
  }
}
main();
