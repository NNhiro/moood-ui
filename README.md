# MOOOOD UI (JSON-loading v1.1)

- JSONの探索順: `data/places.json` → `data/places.sample.json` → `data/data.json` → `data.json`
- どのファイルを読んだかは、ヘッダー右上の「badge」に表示され、Consoleにも出ます。

## 使い方
1. `data/places.json` を本番データで用意（同スキーマ）
2. 画像は `assets/` に格納（英数字ファイル名）または外部URL
3. GitHub Pages に置くだけで動作

## スキーマ
```json
{
  "id":"string",
  "name":"string",
  "address":"string",
  "areaTags":["新宿"],
  "moodTags":["さくっと"],
  "genreTags":["寿司"],
  "rating":4.2,
  "reviewsCount":128,
  "priceLevel":2,
  "photo":"assets/sample.svg",
  "reviewSummary":"50文字前後の要約",
  "location":{"lat":35.0,"lng":139.0}
}
```