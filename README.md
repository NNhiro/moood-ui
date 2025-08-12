# MOOOOD UI (JSON-loading, production-leaning)

- JSONから店舗データを読み込み、カードを動的生成します。
- 画像やロゴは ASCII ファイル名の `assets/` に配置します。
- 本番では `data/places.json` を配置（なければ `places.sample.json` を読み込み）。

## フォルダ構成
```
index.html
styles.css
script.js
/assets
/data
  places.json (本番) ※無ければ places.sample.json を使用
```

## データスキーマ（例）
```jsonc
{
  "id": "string",
  "name": "string",
  "address": "string",
  "areaTags": ["新宿"],
  "moodTags": ["さくっと"],
  "genreTags": ["寿司"],
  "rating": 4.2,
  "reviewsCount": 128,
  "priceLevel": 2,   // 1〜4（¥〜¥¥¥¥）
  "photo": "assets/sushi_kohada.svg",  // もしくは Google Place Photos のURL
  "reviewSummary": "全角50文字目安の要約",
  "location": {"lat": 35.0, "lng": 139.0}
}
```

## 差し替え手順
- `data/places.json` を同スキーマで置けば自動でそちらを読み込みます。
- 画像は `assets/` に配置し、英数字のファイル名にしてください（または外部URL）。
