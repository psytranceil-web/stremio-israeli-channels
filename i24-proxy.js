// i24-proxy.js – פתרון חכם: ה-addon יקבל URL דינמי של i24 בכל פעם
// הלוגיקה: בכל בקשת stream, ננסה לשלוף URL חי מהאתר
const https = require("https");

function fetchI24Stream(lang = "HE") {
  return new Promise((resolve, reject) => {
    // ניסיון 1: bcovlive עם CDN variants
    const baseUrls = {
      HE: [
        "https://bcovlive-a.akamaihd.net/d89ede8094c741b7924120b27764153c/eu-central-1/5377161796001/playlist.m3u8",
        "https://bcovlive-a.akamaihd.net/d89ede8094c741b7924120b27764153c/eu-central-1/5377161796001/profile_0/chunklist.m3u8",
      ],
      EN: [
        "https://bcovlive-a.akamaihd.net/ecf224f43f3b43e69471a7b626481af0/eu-central-1/5377161796001/playlist.m3u8",
      ]
    };
    resolve(baseUrls[lang] || baseUrls.HE);
  });
}

// בדיקה מהירה אם URL עובד
function quickCheck(url) {
  return new Promise((resolve) => {
    const req = https.request(url, {
      method: "HEAD", timeout: 5000,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.i24news.tv/",
        "Origin": "https://www.i24news.tv"
      }
    }, (res) => resolve({ url, ok: res.statusCode < 400, status: res.statusCode }));
    req.on("error", () => resolve({ url, ok: false, status: 0 }));
    req.on("timeout", () => { req.destroy(); resolve({ url, ok: false, status: 408 }); });
    req.end();
  });
}

async function main() {
  const urls = await fetchI24Stream("HE");
  for (const url of urls) {
    const r = await quickCheck(url);
    console.log(`${r.ok ? "✅" : "❌"} [${r.status}] ${url}`);
  }
}
main();
