// get-youtube-stream.js – שולף HLS URL מ-YouTube live
const https = require("https");

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "he-IL,he;q=0.9,en;q=0.8",
        ...headers
      }
    }, (res) => {
      // עקוב אחרי redirects
      if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
        return resolve(get(res.headers.location, headers));
      }
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
    req.on("error", reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error("timeout")); });
    req.end();
  });
}

async function getYouTubeHLS(videoId) {
  // קבל את דף ה-YouTube
  const r = await get(`https://www.youtube.com/watch?v=${videoId}`);

  // חפש hlsManifestUrl
  const hlsMatch = r.body.match(/"hlsManifestUrl":"([^"]+)"/);
  if (hlsMatch) {
    return hlsMatch[1].replace(/\\u0026/g, '&');
  }

  // חפש dashManifestUrl
  const dashMatch = r.body.match(/"dashManifestUrl":"([^"]+)"/);
  if (dashMatch) {
    return dashMatch[1].replace(/\\u0026/g, '&');
  }

  return null;
}

async function main() {
  console.log("\n🔍 שולף URLs לשידור חי של i24...\n");

  const channels = [
    { name: "i24 עברית", videoId: "FUlDpBf_F7k" },
    { name: "i24 English", videoId: null }, // נמצא בהמשך
  ];

  // מצא i24 English
  try {
    const r = await get("https://www.youtube.com/@i24news/live");
    const vidId = r.body.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)?.[1];
    if (vidId) channels[1].videoId = vidId;
    console.log("i24 English video ID:", vidId);
  } catch(e) {}

  for (const ch of channels) {
    if (!ch.videoId) { console.log(`❌ ${ch.name} - לא נמצא video ID`); continue; }
    console.log(`📺 ${ch.name} (${ch.videoId})`);
    try {
      const url = await getYouTubeHLS(ch.videoId);
      if (url) {
        console.log(`  ✅ HLS: ${url.slice(0, 100)}...`);
      } else {
        console.log(`  ⚠️  לא נמצא HLS manifest`);
        console.log(`  🔗 YouTube URL: https://www.youtube.com/watch?v=${ch.videoId}`);
      }
    } catch(e) {
      console.log(`  ❌ שגיאה: ${e.message}`);
    }
  }
  console.log("\n✅ סיום\n");
}
main();
