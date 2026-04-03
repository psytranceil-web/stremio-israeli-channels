# 🇮🇱 Stremio Israeli Channels Addon

> צפו בערוצי טלוויזיה ישראלים בשידור חי ישירות ב-Stremio

[![Deploy](https://github.com/YOUR_USERNAME/stremio-israeli-channels/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/stremio-israeli-channels/actions/workflows/deploy.yml)
![Version](https://img.shields.io/github/package-json/v/YOUR_USERNAME/stremio-israeli-channels)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📺 ערוצים זמינים

| ערוץ | ז'אנר | סטטוס |
|------|--------|--------|
| כאן 11 | כללי | ✅ זמין |
| כאן 12 | כללי | ✅ זמין |
| כאן 13 | כללי / ילדים | ✅ זמין |
| כאן ילדים | ילדים | ✅ זמין |
| כאן מורשת | כללי | ✅ זמין |
| כאן תרבות | תרבות | ✅ זמין |
| כאן חדשות | חדשות | ✅ זמין |
| i24 NEWS עברית | חדשות | ✅ זמין |
| i24 NEWS English | חדשות | ✅ זמין |
| קשת 12 | כללי | ⚙️ הוסף URL מ-GuruTV |
| רשת 13 | כללי | ⚙️ הוסף URL מ-GuruTV |
| ספורט 5 | ספורט | ⚙️ הוסף URL מ-GuruTV |

---

## 🚀 התקנה מהירה

### אפשרות א' – מ-Vercel (אונליין, מומלץ)
```
stremio://your-addon.vercel.app/manifest.json
```

### אפשרות ב' – מקומית
```bash
git clone https://github.com/YOUR_USERNAME/stremio-israeli-channels
cd stremio-israeli-channels
npm install
npm start
```
ואז פתח ב-Stremio:
```
stremio://localhost:7000/manifest.json
```

---
מבוסס על [stremio-addon-sdk](https://github.com/Stremio/stremio-addon-sdk) ❤️
