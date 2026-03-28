// test-api.js – מדמה את ה-Vercel handler מקומית
const handler = require("./api/index");

function makeReq(url) {
  return { method: "GET", url };
}

function makeRes() {
  const res = {
    headers: {},
    statusCode: 200,
    setHeader(k, v) { this.headers[k] = v; },
    status(code) { this.statusCode = code; return this; },
    json(data) {
      console.log(`\n[${this.statusCode}] ${this._url}`);
      const str = JSON.stringify(data);
      console.log(str.slice(0, 200) + (str.length > 200 ? "..." : ""));
    },
    end() {}
  };
  return res;
}

async function main() {
  console.log("\n🧪 בדיקת Vercel API handler\n");

  const tests = [
    "/manifest.json",
    "/catalog/tv/israeli-live.json",
    "/stream/tv/il-kan11.json",
    "/stream/tv/il-keshet12.json",
    "/meta/tv/il-reshet13.json",
  ];

  for (const url of tests) {
    const req = makeReq(url);
    const res = makeRes();
    res._url = url;
    await handler(req, res);
  }
  console.log("\n✅ סיום\n");
}
main().catch(console.error);
