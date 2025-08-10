// ---- データ（GoogleマップURL付き） ----
const DATA = [
  {
    name: "オストレア 銀座コリドー通り店",
    genre: ["イタリアン","バル"],
    mood: ["ムーディー","カジュアル"],
    rating: 4.1, reviews: 190,
    price: "¥4,000〜¥6,000",
    summary: "Googleレビュー要約：生牡蠣とワイン。落ち着いた照明でデート利用にも。",
    maps: "https://maps.google.com/?q=オストレア 銀座コリドー通り店"
  },
  {
    name: "獅子丸 銀座",
    genre: ["居酒屋","和食"],
    mood: ["明るい","にぎやか"],
    rating: 4.0, reviews: 35,
    price: "¥3,000〜¥4,500",
    summary: "Googleレビュー要約：明るく賑やか。揚げ物も日本酒も評判。",
    maps: "https://maps.google.com/?q=獅子丸 銀座"
  },
  {
    name: "オストレア 六本木",
    genre: ["イタリアン","バル"],
    mood: ["ムーディー","落ち着いた"],
    rating: 4.2, reviews: 220,
    price: "¥4,500〜¥6,500",
    summary: "Googleレビュー要約：六本木の喧騒から少し外れ、ペアに向く雰囲気。",
    maps: "https://maps.google.com/?q=オストレア 六本木"
  },
  {
    name: "銀座 小料理 あかり",
    genre: ["和食","小料理"],
    mood: ["家庭的","静か"],
    rating: 4.3, reviews: 128,
    price: "¥5,000〜¥7,000",
    summary: "Googleレビュー要約：家庭的で落ち着く。だしの旨みが強い料理。",
    maps: "https://maps.google.com/?q=銀座 小料理 あかり"
  }
];

const MOODS = ["明るい","ムーディー","家庭的","静か","にぎやか","落ち着いた","おしゃれ","高級感あり","カジュアル"];
const GENRES = ["和食","中華","イタリアン","フレンチ","居酒屋","バル","小料理"];

const state = { moods:new Set(), genres:new Set() };

function tag(label, group){
  const el = document.createElement("button");
  el.className = "tag";
  el.textContent = label;
  el.addEventListener("click", ()=>{
    const set = group==="mood" ? state.moods : state.genres;
    if(set.has(label)){ set.delete(label); el.classList.remove("active"); }
    else{ set.add(label); el.classList.add("active"); }
    render();
  });
  return el;
}

function setupTags(){
  const moodWrap = document.getElementById("mood-tags");
  const genreWrap = document.getElementById("genre-tags");
  MOODS.forEach(m => moodWrap.appendChild(tag(m,"mood")));
  GENRES.forEach(g => genreWrap.appendChild(tag(g,"genre")));
}

function matchesFilters(item){
  const mOk = state.moods.size===0 || [...state.moods].every(m=> item.mood.includes(m));
  const gOk = state.genres.size===0 || [...state.genres].every(g=> item.genre.includes(g));
  return mOk && gOk;
}

function card(item){
  const el = document.createElement("article");
  el.className = "card";
  el.innerHTML = `
    <div class="row-top">
      <h3 class="title">${item.name}</h3>
      <div class="meta">⭐ ${item.rating.toFixed(1)}・${item.reviews}件</div>
    </div>
    <div class="mapchip">
      <i class="map-ic"></i>
      <span>${item.genre.join(" / ")} ・ ${item.mood.join(" / ")}</span>
      <a class="map-link" href="${item.maps}" target="_blank" rel="noopener">Googleマップで開く</a>
    </div>
    <div class="label">Googleレビュー要約</div>
    <p class="summary">${item.summary}</p>
    <div class="price">参考価格：${item.price}</div>
  `;
  el.addEventListener("click", (e)=>{
    if(!(e.target && e.target.classList.contains("map-link"))){
      window.open(item.maps, "_blank", "noopener");
    }
  });
  return el;
}

function render(){
  const wrap = document.getElementById("cards");
  wrap.innerHTML = "";
  DATA.filter(matchesFilters).forEach(d => wrap.appendChild(card(d)));
  if(!wrap.children.length){
    const empty = document.createElement("div");
    empty.style.color = "#666";
    empty.textContent = "該当するお店が見つかりません。タグを減らしてお試しください。";
    wrap.appendChild(empty);
  }
}

// init
setupTags();
render();
