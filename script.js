
const state = {
  area: new Set(),
  mood: new Set(),
  genre: new Set()
};

const counters = {
  area: {},
  mood: {},
  genre: {}
};

function qs(sel, root=document){ return root.querySelector(sel); }
function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

function toggleChip(chip){
  chip.classList.toggle('active');
  const group = chip.dataset.group;
  const value = chip.dataset.value;
  const set = state[group];
  if(chip.classList.contains('active')) set.add(value); else set.delete(value);
  filterCards();
}

function clearFilters(){
  qsa('.chip.active').forEach(c=>c.classList.remove('active'));
  state.area.clear(); state.mood.clear(); state.genre.clear();
  filterCards();
}

function matchCard(card){
  const area = card.dataset.area.split(',');
  const mood = card.dataset.mood.split(',');
  const genre = card.dataset.genre.split(',');
  const groups = [
    ['area', area],
    ['mood', mood],
    ['genre', genre]
  ];
  for(const [k, arr] of groups){
    const sel = state[k];
    if(sel.size>0){
      let ok=false;
      for(const v of sel){ if(arr.includes(v)) { ok=true; break; } }
      if(!ok) return false;
    }
  }
  return true;
}

function filterCards(){
  const cards = qsa('.card');
  let shown = 0;
  cards.forEach(c=>{
    if(matchCard(c)){ c.style.display='flex'; shown++; }
    else c.style.display='none';
  });
  qs('#shownCount').textContent = shown;
  qs('#totalCount').textContent = cards.length;
}

function buildCounters(){
  // optional: not used currently for counts per chip; placeholder for future
}

function init(){
  qsa('.chip').forEach(chip => chip.addEventListener('click', ()=>toggleChip(chip)));
  qs('#clearBtn').addEventListener('click', clearFilters);
  filterCards();
}
document.addEventListener('DOMContentLoaded', init);
