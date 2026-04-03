// bump-version.js – מעלה גרסה patch אוטומטית
const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const [major, minor, patch] = pkg.version.split(".").map(Number);
const newVersion = `${major}.${minor}.${patch + 1}`;
pkg.version = newVersion;

fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2) + "\n");
console.log(`✅ גרסה עודכנה: ${newVersion}`);
