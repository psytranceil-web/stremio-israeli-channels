"use strict";

const { buildManifest } = require("../src/manifest");
const { catalogHandler, metaHandler, streamHandler } = require("../src/handlers");
const { getAllChannels, getActiveChannels, getChannelById, getAllGenres } = require("../src/channels");

let passed = 0;
let failed = 0;

function assert(label, condition, detail = "") {
  if (condition) {
    console.log(`  ✅  ${label}`);
    passed++;
  } else {
    console.error(`  ❌  ${label}${detail ? " – " + detail : ""}`);
    failed++;
  }
}

async function run() {
  console.log("\n════════════════════════════════════════════════════════");
  console.log("  🧪  Israeli Channels Addon – Test Suite");
  console.log("════════════════════════════════════════════════════════\n");

  console.log("📋  Manifest");
  const manifest = buildManifest();
  assert("manifest נוצר", !!manifest);
  assert("יש id", typeof manifest.id === "string" && manifest.id.length > 0);
  assert("יש version", /^\d+\.\d+\.\d+$/.test(manifest.version), manifest.version);
  assert("סוג tv קיים ב-catalogs", manifest.catalogs.some((c) => c.type === "tv"));
  assert("resources מכיל catalog,meta,stream",
    ["catalog", "meta", "stream"].every((r) => manifest.resources.includes(r)));
  console.log();

  console.log("📺  Channels");
  const all = getAllChannels();
  const active = getActiveChannels();
  const genres = getAllGenres();
  assert("יש ערוצים", all.length > 0, `נמצאו ${all.length}`);
  assert("יש ערוצים פעילים עם סטרים", active.length > 0, `פעילים: ${active.length}`);
  assert("כל ערוץ יש לו id", all.every((ch) => !!ch.id));
  assert("כל ערוץ יש לו name", all.every((ch) => !!ch.name));
  assert("כל ערוץ יש לו genre מערך", all.every((ch) => Array.isArray(ch.genre)));
  assert("אין IDs כפולים", new Set(all.map((ch) => ch.id)).size === all.length);
  assert("יש ז'אנרים", genres.length > 0, genres.join(", "));
  assert("getChannelById עובד", !!getChannelById(all[0].id));
  assert("getChannelById עם ID לא קיים מחזיר null", getChannelById("not-exist") === null);
  console.log();
  console.log("🗂   Catalog Handler");
  const catRes = await catalogHandler({ type: "tv", id: "israeli-live", extra: {} });
  assert("catalog מחזיר metas", Array.isArray(catRes.metas));
  assert("catalog לא ריק", catRes.metas.length > 0);
  assert("כל meta יש id", catRes.metas.every((m) => !!m.id));
  assert("כל meta יש name", catRes.metas.every((m) => !!m.name));
  assert("כל meta type=tv", catRes.metas.every((m) => m.type === "tv"));
  const firstGenre = genres[0];
  const filtered = await catalogHandler({ type: "tv", id: "israeli-live", extra: { genre: firstGenre } });
  assert(`סינון ז'אנר "${firstGenre}" עובד`, filtered.metas.length > 0);
  const searchRes = await catalogHandler({ type: "tv", id: "israeli-live", extra: { search: "כאן" } });
  assert("חיפוש 'כאן' מחזיר תוצאות", searchRes.metas.length > 0);
  const wrongType = await catalogHandler({ type: "movie", id: "israeli-live", extra: {} });
  assert("type שגוי מחזיר מערך ריק", wrongType.metas.length === 0);
  console.log();

  console.log("🔍  Meta Handler");
  const firstActive = active[0];
  const metaRes = await metaHandler({ type: "tv", id: firstActive.id });
  assert("meta מחזיר אובייקט", !!metaRes.meta);
  assert("meta.id נכון", metaRes.meta.id === firstActive.id);
  assert("meta.type = tv", metaRes.meta.type === "tv");
  const missingMeta = await metaHandler({ type: "tv", id: "not-exist-xyz" });
  assert("meta עבור ID לא קיים מחזיר null", missingMeta.meta === null);
  console.log();

  console.log("▶️   Stream Handler");
  const streamRes = await streamHandler({ type: "tv", id: firstActive.id });
  assert("streams מחזיר מערך", Array.isArray(streamRes.streams));
  assert("יש לפחות סטרים אחד", streamRes.streams.length > 0);
  assert("כל סטרים יש url", streamRes.streams.every((s) => typeof s.url === "string" && s.url.startsWith("http")));
  assert("כל סטרים יש title", streamRes.streams.every((s) => typeof s.title === "string"));
  const noStream = await streamHandler({ type: "tv", id: "not-exist-xyz" });
  assert("ערוץ לא קיים מחזיר streams ריק", noStream.streams.length === 0);
  console.log();

  console.log("════════════════════════════════════════════════════════");
  console.log(`  📊  תוצאות: ${passed} עברו ✅  |  ${failed} נכשלו ❌`);
  console.log("════════════════════════════════════════════════════════\n");

  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error("שגיאה בלתי צפויה:", err);
  process.exit(1);
});
