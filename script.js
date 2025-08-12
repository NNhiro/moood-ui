
const state = { area: new Set(), mood: new Set(), genre: new Set() };
const qs = (s,r=document)=>r.querySelector(s);
const qsa = (s,r=document)=>Array.from(r.querySelectorAll(s));

function toggleChip(chip){
  chip.classList.toggle('active');
  const g = chip.dataset.group, v = chip.dataset.value;
  const set = state[g];
  chip.classList.contains('active') ? set.add(v) : set.delete(v);
  render();
}
function clearFilters(){
  qsa('.chip.active').forEach(c=>c.classList.remove('active'));
  state.area.clear(); state.mood.clear(); state.genre.clear();
  render();
}

let places = [];

async function loadData(){
  const tryPaths = ["data/places.json","data/places.sample.json"];
  for(const p of tryPaths){
    try{
      const res = await fetch(p, {cache:"no-store"});
      if(res.ok){ places = await res.json(); return; }
    }catch(e){ /* try next */ }
  }
  places = [];
}

function priceToYen(p){ return "¥".repeat(Math.max(1, Math.min(4, p||1))); }

function summarize(text, max=50){
  if(!text) return "";
  const full = text.replace(/\s+/g,"").slice(0, max);
  return full + (text.length > max ? "…" : "");
}

function match(item){
  // each filter is OR within group, AND across groups
  const groups = [
    ["area", item.areaTags||[]],
    ["mood", item.moodTags||[]],
    ["genre", item.genreTags||[]]
  ];
  for(const [k, arr] of groups){
    const sel = state[k];
    if(sel.size>0){
      let ok = false;
      for(const v of sel){ if(arr.includes(v)) { ok = true; break; } }
      if(!ok) return false;
    }
  }
  return true;
}

function cardTpl(it){
  const photo = it.photo || "";
  const price = priceToYen(it.priceLevel);
  const sum = summarize(it.reviewSummary||"", 50);
  const areaBadge = (it.areaTags||[])[0] || "";
  const moodBadge = (it.moodTags||[])[0] || "";
  const genreBadge = (it.genreTags||[])[0] || "";
  const ratings = `★ ${Number(it.rating||0).toFixed(1)}`;
  const rc = `(${it.reviewsCount||0})`;

  return `<article class="card">
    <div class="img-wrap"><img loading="lazy" src="${photo}" alt="${it.name}"></div>
    <div class="body">
      <div class="title">${it.name}</div>
      <div class="meta"><span class="price">${price}</span><span class="rating">${ratings}</span><span class="reviews">${rc}</span></div>
      <div class="badges">
        ${areaBadge?`<span class="badge">${areaBadge}</span>`:""}
        ${moodBadge?`<span class="badge">${moodBadge}</span>`:""}
        ${genreBadge?`<span class="badge">${genreBadge}</span>`:""}
      </div>
      ${sum?`<p class="summary">${sum}</p>`:""}
    </div>
  </article>`;
}

function render(){
  const list = places.filter(match);
  const el = qs("#cards"); el.innerHTML = list.map(cardTpl).join("");
  qs("#shownCount").textContent = list.length;
  qs("#totalCount").textContent = places.length;
}

async function init(){
  qsa('.chip').forEach(chip=>chip.addEventListener('click', ()=>toggleChip(chip)));
  qs('#clearBtn').addEventListener('click', clearFilters);
  await loadData();
  render();
}

document.addEventListener('DOMContentLoaded', init);
