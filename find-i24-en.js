const https = require("https");

function get(url, lang = "en") {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      timeout: 8000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": lang === "he" ? "he-IL,he;q=0.9" : "en-US,en;q=0.9"
      }
    }, (res) => {
      let d = "";
      res.on("data", c => d += c);
      res.on("end", () => resolve({ s: res.statusCode, b: d }));
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
    req.end();
  });
}

async function main() {
  // נסה כל הפורמטים האפשריים של YouTube עבור i24
  const tests = [
    "https://www.youtube.com/i24news/live",
    "https://www.youtube.com/i24newsFR/live",
    "https://www.youtube.com/i24newsAR/live",
    "https://www.youtube.com/@i24newsen/live",
    "https://www.youtube.com/@i24newsfrench/live",
  ];

  for (const url of tests) {
    try {
      const r = await get(url);
      const videoId = r.b.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)?.[1];
      const isLive  = r.b.includes('"isLive":true');
      const title   = r.b.match(/"title":\{"runs":\[\{"text":"([^"]+)"/)?.[1];
      console.log(`${url.split("/").slice(-2).join("/")} => videoId=${videoId} live=${isLive} title=${title}`);
    } catch(e) {
      console.log(`${url} => ERROR: ${e.message}`);
    }
  }
}
main();
