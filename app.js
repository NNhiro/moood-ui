// Area tags (Tokyo summarized)
const AREA_TAGS = [
  "銀座・日比谷・有楽町",
  "東京駅・丸の内・日本橋",
  "六本木・麻布・広尾",
  "青山・表参道・原宿",
  "渋谷・代々木公園",
  "恵比寿・代官山・中目黒",
  "新宿・代々木",
  "神楽坂・飯田橋・四ツ谷",
  "品川・田町・五反田",
  "お台場・湾岸エリア",
  "上野・浅草・押上",
  "池袋・目白",
  "吉祥寺・中野・東高円寺",
  "自由が丘・二子玉川・世田谷",
  "その他エリア",
];

// Mood & Genre tags
const MOOD_TAGS = ["明るい","ムーディー","家庭的","静かめ","にぎやか","落ち着いた","おしゃれ","カジュアル"];
const GENRE_TAGS = ["和食","中華","イタリアン","フレンチ","居酒屋","バル","小料理"];

// Sample stores (no images)
const STORES = [
  {
    id: "s-001",
    name: "オストレア 銀座コリドー通り店",
    moods: ["ムーディー","落ち着いた","おしゃれ"],
    genres: ["イタリアン","バル","カジュアル"],
    rating: 4.1,
    reviewCount: 190,
    area: "銀座",
    areaGroup: "銀座・日比谷・有楽町",
    summary: "生牡蠣とワイン。落ち着いた雰囲気でデート利用にも。",
    price: "¥4,000〜¥6,000",
    maps: "https://www.google.com/maps",
  },
  {
    id: "s-002",
    name: "獅子丸 銀座",
    moods: ["明るい","にぎやか"],
    genres: ["居酒屋","和食"],
    rating: 4.0,
    reviewCount: 35,
    area: "銀座",
    areaGroup: "銀座・日比谷・有楽町",
    summary: "明るく賑やか。揚げ物も魚も評判。",
    price: "¥3,000〜¥4,500",
    maps: "https://www.google.com/maps",
  },
  {
    id: "s-003",
    name: "銀座 小料理 あかり",
    moods: ["家庭的","静かめ"],
    genres: ["和食","小料理"],
    rating: 4.3,
    reviewCount: 128,
    area: "銀座",
    areaGroup: "銀座・日比谷・有楽町",
    summary: "家庭的で落ち着く。だしの旨みが強い評判。",
    price: "¥5,000〜¥7,000",
    maps: "https://www.google.com/maps",
  },
  {
    id: "s-004",
    name: "オストレア 六本木",
    moods: ["ムーディー","落ち着いた"],
    genres: ["イタリアン","バル"],
    rating: 4.2,
    reviewCount: 220,
    area: "六本木",
    areaGroup: "六本木・麻布・広尾",
    summary: "大箱から少し外れ、ペアに向く雰囲気。",
    price: "¥4,500〜¥6,500",
    maps: "https://www.google.com/maps",
  },
  {
    id: "s-005",
    name: "代々木 上等カレー",
    moods: ["にぎやか","明るい"],
    genres: ["和食","カジュアル"],
    rating: 3.9,
    reviewCount: 210,
    area: "代々木",
    areaGroup: "新宿・代々木",
    summary: "サクッと寄れてボリューム良し。",
    price: "¥800〜¥1,200",
    maps: "https://www.google.com/maps",
  },
  {
    id: "s-006",
    name: "表参道 カフェ ルミエ",
    moods: ["静かめ","おしゃれ"],
    genres: ["カフェ","スイーツ"],
    rating: 4.4,
    reviewCount: 320,
    area: "表参道",
    areaGroup: "青山・表参道・原宿",
    summary: "Wi‑Fiと電源。落ち着いて長居できる。",
    price: "¥1,000〜¥1,800",
    maps: "https://www.google.com/maps",
  },
];

// Helpers
const $ = (s,root=document)=> root.querySelector(s);
const $$ = (s,root=document)=> Array.from(root.querySelectorAll(s));

const areaTagsEl = $("#areaTags");
const moodTagsEl = $("#moodTags");
const genreTagsEl = $("#genreTags");
const gridEl = $("#storeGrid");
const emptyEl = $("#emptyState");
const activeFiltersEl = $("#activeFilters");
const clearAllBtn = $("#clearAll");

const state = {
  areas: new Set(),
  moods: new Set(),
  genres: new Set(),
};

function renderTags() {
  // Areas
  areaTagsEl.innerHTML = "";
  AREA_TAGS.forEach(tag => areaTagsEl.appendChild(makeTag(tag, "area")));
  // Moods
  moodTagsEl.innerHTML = "";
  MOOD_TAGS.forEach(tag => moodTagsEl.appendChild(makeTag(tag, "mood")));
  // Genres
  genreTagsEl.innerHTML = "";
  GENRE_TAGS.forEach(tag => genreTagsEl.appendChild(makeTag(tag, "genre")));
}

function makeTag(label, kind){
  const btn = document.createElement("button");
  btn.className = "tag";
  btn.type = "button";
  btn.textContent = label;
  btn.setAttribute("aria-pressed", "false");
  btn.addEventListener("click", () => toggleTag(label, kind, btn));
  return btn;
}

function toggleTag(label, kind, btn){
  const set = kind === "area" ? state.areas : kind === "mood" ? state.moods : state.genres;
  if (set.has(label)) { set.delete(label); btn.setAttribute("aria-pressed","false"); }
  else { set.add(label); btn.setAttribute("aria-pressed","true"); }
  renderActiveChips();
  renderGrid();
}

function renderActiveChips(){
  const chips = [];
  state.areas.forEach(v => chips.push(makeChip(v, "area")));
  state.moods.forEach(v => chips.push(makeChip(v, "mood")));
  state.genres.forEach(v => chips.push(makeChip(v, "genre")));
  activeFiltersEl.innerHTML = "";
  chips.forEach(c => activeFiltersEl.appendChild(c));
  clearAllBtn.hidden = chips.length === 0;
}

function makeChip(label, kind){
  const el = document.createElement("span");
  el.className = "active-chip";
  el.textContent = label;
  const x = document.createElement("button");
  x.setAttribute("aria-label", `${label} を外す`);
  x.textContent = "×";
  x.addEventListener("click", () => {
    const set = kind === "area" ? state.areas : kind === "mood" ? state.moods : state.genres;
    set.delete(label);
    // sync pressed state
    const container = kind === "area" ? areaTagsEl : kind === "mood" ? moodTagsEl : genreTagsEl;
    $$(".tag", container).forEach(btn => { if (btn.textContent === label) btn.setAttribute("aria-pressed","false"); });
    renderActiveChips();
    renderGrid();
  });
  el.appendChild(x);
  return el;
}

function score(s){
  return s.rating * Math.log(1 + s.reviewCount);
}

function renderGrid(){
  const list = STORES.filter(s => {
    const areaOk = state.areas.size === 0 || state.areas.has(s.areaGroup);
    const moodOk = state.moods.size === 0 || Array.from(state.moods).every(m => s.moods.includes(m));
    const genreOk = state.genres.size === 0 || Array.from(state.genres).every(g => s.genres.includes(g));
    return areaOk && moodOk && genreOk;
  }).sort((a,b)=> score(b)-score(a));

  gridEl.innerHTML = "";
  list.forEach(s => gridEl.appendChild(renderCard(s)));
  emptyEl.hidden = list.length !== 0;
}

function renderCard(s){
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card__header">
      <h3 class="card__title">${s.name}</h3>
      <div class="card__meta">
        <span class="badge" aria-label="評価">★ ${s.rating.toFixed(1)} ・ ${s.reviewCount}件</span>
        <span class="kicker">${s.area}｜${s.areaGroup}</span>
      </div>
    </div>
    <div class="pills">
      ${[...s.genres].map(g => `<span class="pill">${g}</span>`).join("")}
    </div>
    <div class="desc">${s.summary}</div>
    <div class="price">参考価格：${s.price}</div>
    <div class="card__actions">
      <a class="btn-outline" href="${s.maps}" target="_blank" rel="noopener">Googleマップで開く</a>
      <button class="btn-link" data-id="${s.id}">詳細</button>
    </div>
  `;
  card.querySelector(".btn-link")?.addEventListener("click", () => {
    alert(`${s.name}（モーダルは後で実装可）`);
  });
  return card;
}

clearAllBtn.addEventListener("click", () => {
  state.areas.clear(); state.moods.clear(); state.genres.clear();
  $$(".tag[aria-pressed='true']").forEach(btn => btn.setAttribute("aria-pressed","false"));
  renderActiveChips();
  renderGrid();
});

// Init
renderTags();
renderActiveChips();
renderGrid();
