const https = require("https");
https.get("https://stremio-israeli-channels.vercel.app/catalog/tv/israeli-live.json", r => {
  let d = "";
  r.on("data", c => d += c);
  r.on("end", () => {
    const j = JSON.parse(d);
    j.metas.forEach(m => console.log(m.name, "|", m.logo ? m.logo.substring(0,60) : "NO LOGO"));
  });
}).on("error", e => console.log(e.message));
