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

## ➕ הוספת ערוצים מ-GuruTv.online

### שלב 1 – השג את ה-m3u8 URL
1. פתח [gurutv.online](https://gurutv.online) בדפדפן
2. לחץ **F12** → לשונית **Network**
3. בשדה הסינון הקלד: **m3u8**
4. לחץ Play על ערוץ רצוי
5. קישור `.m3u8` יופיע ברשימה – לחץ עליו ← **Copy link address**

### שלב 2 – הוסף ל-channels.js
פתח `src/channels.js` ועדכן את הערוץ הרצוי:
```javascript
{
  id: "il-keshet12",
  name: "קשת 12",
  streams: [
    {
      url: "https://URL-FROM-GURUTV.m3u8",  // ← הכנס כאן
      label: "קשת 12 – GuruTV",
      quality: "HD",
    },
  ],
},
```

### שלב 3 – Push → עדכון אוטומטי!
```bash
git add src/channels.js
git commit -m "feat: add Keshet 12 stream"
git push
```
GitHub Actions: בדיקות → גרסה חדשה → פריסה ל-Vercel 🎉

---

## ⚙️ הגדרת GitHub + Vercel (חד-פעמי)

### 1. צור repo חדש ב-GitHub והעלה:
```bash
git init
git add .
git commit -m "feat: initial commit"
git remote add origin https://github.com/YOUR_NAME/stremio-israeli-channels
git push -u origin main
```

### 2. צור חשבון Vercel וקשר ל-GitHub:
```bash
npm install -g vercel
vercel login
vercel link
```

### 3. הוסף Secrets ב-GitHub:
Settings → Secrets → Actions → New secret:

| שם | ערך |
|----|-----|
| `VERCEL_TOKEN` | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | מ-`.vercel/project.json` |
| `VERCEL_PROJECT_ID` | מ-`.vercel/project.json` |

---

## 🔄 עדכון אוטומטי בכל push

```
1. 🔢 Bump Version  →  1.0.0 → 1.0.1
2. 🧪 Run Tests     →  31 בדיקות
3. 🌐 Deploy        →  Vercel
4. 🏷️ Release       →  GitHub Release עם קישור
```

Stremio מזהה שינוי גרסה ומציג עדכון למשתמשים ✅

---

## 🧪 הרצת בדיקות
```bash
npm test
```

---

## 📁 מבנה הפרויקט
```
stremio-israeli-channels/
├── .github/workflows/deploy.yml   # CI/CD אוטומטי
├── src/
│   ├── channels.js                # רשימת ערוצים
│   ├── manifest.js                # Manifest (גרסה auto)
│   └── handlers.js                # Catalog/Meta/Stream
├── test/addon.test.js             # 31 בדיקות
├── index.js                       # שרת ראשי
├── package.json
├── vercel.json
└── README.md
```

---

## ⚠️ הערה משפטית
פרויקט זה מיועד **למחקר ולמטרות לימוד בלבד**.
השתמש בתוכן בהתאם לחוקי זכויות היוצרים בישראל.

מבוסס על [stremio-addon-sdk](https://github.com/Stremio/stremio-addon-sdk) ❤️
