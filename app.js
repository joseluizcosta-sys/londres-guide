/* ===== Londres + Paris — guia offline ===== */
"use strict";

const TYPE = {
  museu:       { c: "var(--t-museu)",       e: "🏛️", l: "Museu" },
  atracao:     { c: "var(--t-atracao)",     e: "🎡", l: "Atração" },
  igreja:      { c: "var(--t-igreja)",      e: "⛪", l: "Igreja" },
  parque:      { c: "var(--t-parque)",      e: "🌳", l: "Parque" },
  mercado:     { c: "var(--t-mercado)",     e: "🛒", l: "Mercado" },
  restaurante: { c: "var(--t-restaurante)", e: "🍽️", l: "Comer" },
  loja:        { c: "var(--t-loja)",        e: "🛍️", l: "Loja" },
  mirante:     { c: "var(--t-mirante)",     e: "🌆", l: "Mirante" },
  transporte:  { c: "var(--t-transporte)",  e: "🚇", l: "Transporte" },
  hotel:       { c: "var(--t-hotel)",       e: "🏨", l: "Hotel" }
};
const tcol = t => `var(--t-${t})`;

/* ---------- fotos (Wikipédia) ----------
   Mapa nome-do-lugar -> título do artigo na Wikipédia (en).
   O app busca a miniatura em tempo de execução e guarda em cache
   (localStorage + Service Worker), então funciona offline depois da 1ª vez. */
const WIKI = {
  "Hotel Londres — Park Plaza County Hall": "County Hall, London",
  "British Museum": "British Museum",
  "Covent Garden": "Covent Garden",
  "Leicester Square": "Leicester Square",
  "Trafalgar Square": "Trafalgar Square",
  "National Gallery": "National Gallery",
  "Piccadilly Circus": "Piccadilly Circus",
  "Chinatown": "Chinatown, London",
  "Natural History Museum": "Natural History Museum, London",
  "Science Museum": "Science Museum, London",
  "Hyde Park": "Hyde Park, London",
  "Serpentine Gallery": "Serpentine Galleries",
  "Speaker's Corner": "Speakers' Corner",
  "Kensington High Street": "Kensington High Street",
  "Tower of London": "Tower of London",
  "Tower Bridge": "Tower Bridge",
  "Borough Market": "Borough Market",
  "Tate Modern": "Tate Modern",
  "Shakespeare's Globe": "Shakespeare's Globe",
  "Millennium Bridge": "Millennium Bridge, London",
  "London St Pancras International": "St Pancras railway station",
  "Paris Gare du Nord": "Gare du Nord",
  "Café Les Deux Magots": "Les Deux Magots",
  "Les Deux Magots": "Les Deux Magots",
  "Notre-Dame de Paris": "Notre-Dame de Paris",
  "Pont Neuf": "Pont Neuf",
  "Shakespeare & Company": "Shakespeare and Company (bookstore)",
  "Grande Mosquée de Paris": "Grand Mosque of Paris",
  "Jardin du Luxembourg": "Luxembourg Garden",
  "Fête des Tuileries": "Tuileries Garden",
  "Bouillon Chartier": "Bouillon Chartier",
  "Bouillon Chartier Montparnasse": "Bouillon Chartier",
  "Musée Rodin": "Musée Rodin",
  "Les Invalides": "Les Invalides",
  "Torre Eiffel": "Eiffel Tower",
  "Champ de Mars": "Champ de Mars",
  "Arco do Triunfo": "Arc de Triomphe",
  "Basilique du Sacré-Cœur": "Sacré-Cœur, Paris",
  "Place du Tertre": "Place du Tertre",
  "Espace Dalí": "Dalí Paris",
  "Museu do Louvre": "Louvre",
  "Le Marais (Rue des Rosiers)": "Le Marais",
  "Cutty Sark": "Cutty Sark",
  "National Maritime Museum": "National Maritime Museum",
  "Queen's House": "Queen's House",
  "Greenwich Market": "Greenwich Market",
  "Royal Observatory de Greenwich": "Royal Observatory, Greenwich",
  "Paddington Station": "London Paddington station",
  "Christ Church College": "Christ Church, Oxford",
  "Radcliffe Camera": "Radcliffe Camera",
  "Bodleian Library": "Bodleian Library",
  "Sheldonian Theatre": "Sheldonian Theatre",
  "Covered Market de Oxford": "Oxford Covered Market",
  "Ashmolean Museum": "Ashmolean Museum",
  "University Parks": "University Parks",
  "The Shard (The View)": "The Shard",
  "Sky Garden": "20 Fenchurch Street",
  "Camden Market": "Camden Market",
  "King's Cross — Plataforma 9¾": "King's Cross railway station",
  "Heathrow Airport": "Heathrow Airport"
};
const esc = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

/* ---------- header ---------- */
document.getElementById("hTitle").textContent = META.title;
document.getElementById("hSub").textContent = META.subtitle + (META.family ? " · " + META.family : "");
document.getElementById("hMeta").textContent = (META.base ? "Base: " + META.base + " · " : "") + "atualizado " + META.updated;
document.getElementById("foot").textContent = "Roteiro atualizado em " + META.updated + " · guia offline";

/* ---------- tabs ---------- */
document.querySelectorAll("nav button").forEach(b => {
  b.onclick = () => {
    document.querySelectorAll("nav button").forEach(x => x.classList.remove("active"));
    document.querySelectorAll(".view").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    document.getElementById(b.dataset.v).classList.add("active");
    if (b.dataset.v === "mapa" && map) setTimeout(() => { map.invalidateSize(); drawMarkers(); }, 80);
    if ((b.dataset.v === "tube" || b.dataset.v === "metro") && window.MetroUI)
      setTimeout(() => MetroUI.open(b.dataset.v), 30);
  };
});

/* ---------- render: Roteiro ---------- */
function descHtml(d) {
  if (!d) return "";
  if (Array.isArray(d)) return `<ul class="desc">${d.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
  return `<div class="desc solo">${esc(d)}</div>`;
}
function placeHtml(p, dayId, idx) {
  const t = TYPE[p.type] || TYPE.atracao;
  const hasCoord = Array.isArray(p.coords);
  const meta = [t.l, p.area].filter(Boolean).join(" · ");
  let hl = "";
  if (p.highlights && p.highlights.length) {
    hl = `<div class="hl"><div class="hl-t">Não perca</div>` +
      p.highlights.map(h => `<div class="hl-i"><span class="h">${esc(h.name)}</span>` +
        (h.where ? `<span class="w">${esc(h.where)}</span>` : "") +
        (h.note ? `<span class="n">${esc(h.note)}</span>` : "") + `</div>`).join("") + `</div>`;
  }
  const wt = WIKI[p.name];
  const thumb = wt ? `<div class="thumb loading" data-wiki="${esc(wt)}"></div>` : "";
  return `<div class="place">
    <div class="place-h">
      <div class="pin" style="background:${tcol(p.type)}22;color:${tcol(p.type)}">${t.e}</div>
      <div class="place-n">
        <div class="nm">${esc(p.name)}</div>
        <div class="meta">${esc(meta)}</div>
        ${p.price ? `<div class="price">${esc(p.price)}</div>` : ""}
      </div>
      ${thumb}
      ${hasCoord ? `<button class="mapbtn" onclick="goMap(${dayId},${idx})">Mapa</button>` : ""}
    </div>
    ${descHtml(p.desc)}
    ${hl}
  </div>`;
}
function renderDays() {
  const root = document.getElementById("dias");
  root.innerHTML = `<div class="aviso">${esc(AVISO)}</div>` + DAYS.map(d => `
    <div class="day" id="day-${d.id}">
      <div class="day-head" onclick="document.getElementById('day-${d.id}').classList.toggle('open')">
        <div class="day-badge"><div class="d">${esc(d.date)}</div><div class="w">${esc(d.weekday)}</div></div>
        <div class="day-emoji">${d.emoji}</div>
        <div class="day-tt"><div class="t">${esc(d.title)}</div><div class="s">${esc(d.summary)}</div></div>
        <div class="day-city">${esc(d.city)}</div>
        <div class="chev">▶</div>
      </div>
      <div class="day-body">
        ${d.places.map((p, i) => placeHtml(p, d.id, i)).join("")}
        ${d.tips && d.tips.length ? `<ul class="tips">${d.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      </div>
    </div>`).join("");
}
renderDays();
document.getElementById("day-1").classList.add("open");

/* ---------- fotos: hidratar miniaturas da Wikipédia ---------- */
const THUMB_KEY = "lp_wikithumb_v2";
const loadThumbCache = () => { try { return JSON.parse(localStorage.getItem(THUMB_KEY)) || {}; } catch (e) { return {}; } };
const saveThumbCache = o => { try { localStorage.setItem(THUMB_KEY, JSON.stringify(o)); } catch (e) {} };
function applyThumb(el, url) {
  el.classList.remove("loading");
  if (url) {
    const img = new Image();
    img.onload = () => { el.style.backgroundImage = `url("${url}")`; };
    img.onerror = () => { el.classList.add("empty"); };
    img.src = url;
  } else {
    el.classList.add("empty");
  }
}
async function hydrateThumbs() {
  const cache = loadThumbCache();
  const els = [...document.querySelectorAll(".thumb[data-wiki]")];
  // aplica o que já está em cache na hora (funciona offline)
  els.forEach(el => { const t = el.getAttribute("data-wiki"); if (t in cache) applyThumb(el, cache[t]); });
  // busca os que faltam (precisa de internet só na 1ª vez)
  for (const el of els) {
    const title = el.getAttribute("data-wiki");
    if (title in cache) continue;
    try {
      const r = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title), { headers: { Accept: "application/json" } });
      let url = null;
      if (r.ok) { const j = await r.json(); url = (j.thumbnail && j.thumbnail.source) || (j.originalimage && j.originalimage.source) || null; }
      cache[title] = url; saveThumbCache(cache);
      applyThumb(el, url);
    } catch (e) {
      applyThumb(el, null); // offline e sem cache: esconde a miniatura
    }
  }
}
hydrateThumbs();

/* ---------- render: Prático ---------- */
const CK_KEY = "lp_checklist_v1";
const loadChecks = () => { try { return JSON.parse(localStorage.getItem(CK_KEY)) || {}; } catch (e) { return {}; } };
const saveChecks = o => { try { localStorage.setItem(CK_KEY, JSON.stringify(o)); } catch (e) {} };
const escAttr = s => esc(s).replace(/"/g, "&quot;");

function renderPratico() {
  const P = PRATICO, root = document.getElementById("pratico");
  const kvSec = (s, vClass) => `<div class="sec"><h3>${esc(s.titulo)}</h3>` +
    s.itens.map(([k, v]) => `<div class="kv"><span>${esc(k)}</span><span class="${vClass || "v"}">${esc(v)}</span></div>`).join("") +
    (s.notas ? s.notas.map(n => `<div class="note">${esc(n)}</div>`).join("") : "") + `</div>`;
  const ulSec = s => `<div class="sec"><h3>${esc(s.titulo)}</h3><ul>` +
    s.itens.map(i => `<li>${esc(i)}</li>`).join("") + `</ul></div>`;
  const ckSec = s => {
    const saved = loadChecks();
    return `<div class="sec"><h3>${esc(s.titulo)}<span class="ck-count" id="ckCount"></span></h3>
      <div class="cklist">` +
      s.itens.map(it => {
        const on = !!saved[it];
        return `<label class="ckitem${on ? " done" : ""}">
          <input type="checkbox" data-key="${escAttr(it)}"${on ? " checked" : ""}>
          <span class="box"></span><span class="lbl">${esc(it)}</span></label>`;
      }).join("") +
      `</div><button class="ck-reset" id="ckReset">Limpar marcações</button></div>`;
  };
  root.innerHTML =
    kvSec(P.custos) +
    ulSec(P.lembretes) +
    ckSec(P.checklist) +
    kvSec(P.apps) +
    ulSec(P.dicas);
  wireChecklist();
}
function updateCkCount() {
  const total = document.querySelectorAll("#pratico .ckitem").length;
  const done = document.querySelectorAll("#pratico .ckitem input:checked").length;
  const el = document.getElementById("ckCount");
  if (el) el.textContent = total ? ` ${done}/${total}` : "";
}
function wireChecklist() {
  document.querySelectorAll("#pratico .ckitem input").forEach(inp => {
    inp.addEventListener("change", () => {
      const c = loadChecks();
      if (inp.checked) c[inp.dataset.key] = 1; else delete c[inp.dataset.key];
      saveChecks(c);
      inp.closest(".ckitem").classList.toggle("done", inp.checked);
      updateCkCount();
    });
  });
  const reset = document.getElementById("ckReset");
  if (reset) reset.onclick = () => { saveChecks({}); renderPratico(); };
  updateCkCount();
}
renderPratico();

/* ---------- Map ---------- */
let map, layer, allMarkers = [];
const TILE = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

function flatPlaces() {
  const out = [];
  DAYS.forEach(d => d.places.forEach((p, i) => {
    if (Array.isArray(p.coords)) out.push({ ...p, dayId: d.id, idx: i, dayDate: d.date, city: d.city });
  }));
  return out;
}
function markerIcon(type) {
  const t = TYPE[type] || TYPE.atracao;
  return L.divIcon({
    className: "", iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -14],
    html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(45deg);
      background:${tcol(type)};border:2px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.5);
      display:flex;align-items:center;justify-content:center">
      <span style="transform:rotate(-45deg);font-size:14px">${t.e}</span></div>`
  });
}
function initMap() {
  map = L.map("map", { zoomControl: true, attributionControl: true }).setView([51.509, -0.126], 12);
  L.tileLayer(TILE, { maxZoom: 18, attribution: "© OpenStreetMap", crossOrigin: true }).addTo(map);
  layer = L.markerClusterGroup({
    maxClusterRadius: 45, spiderfyOnMaxZoom: true, showCoverageOnHover: false,
    disableClusteringAtZoom: 16, chunkedLoading: true
  }).addTo(map);
  buildFilters();
  drawMarkers();
}
function buildFilters() {
  const cities = ["Todos", ...new Set(DAYS.map(d => d.city))];
  document.getElementById("fCity").innerHTML = cities.map(c => `<option value="${c}">${c === "Todos" ? "🌍 Todas as cidades" : c}</option>`).join("");
  document.getElementById("fDay").innerHTML = `<option value="all">📅 Todos os dias</option>` +
    DAYS.map(d => `<option value="${d.id}">${d.date} · ${d.title}</option>`).join("");
  document.getElementById("fCity").onchange = drawMarkers;
  document.getElementById("fDay").onchange = drawMarkers;
  // legend
  document.getElementById("legend").innerHTML = Object.entries(TYPE)
    .map(([k, v]) => `<span><i style="background:${tcol(k)}"></i>${v.l}</span>`).join("");
}
function drawMarkers() {
  const city = document.getElementById("fCity").value;
  const day = document.getElementById("fDay").value;
  layer.clearLayers(); allMarkers = [];
  const pts = flatPlaces().filter(p =>
    (city === "Todos" || p.city === city) && (day === "all" || String(p.dayId) === day));
  const bounds = [];
  pts.forEach(p => {
    const m = L.marker(p.coords, { icon: markerIcon(p.type) }).addTo(layer);
    const desc = Array.isArray(p.desc) ? p.desc[0] : (p.desc || "");
    m.bindPopup(`<b>${esc(p.name)}</b><div class="pop-meta">${esc((TYPE[p.type] || {}).l || "")} · ${esc(p.dayDate)} · ${esc(p.area || p.city)}</div>` +
      (p.price ? `<div class="pop-meta">💷 ${esc(p.price)}</div>` : "") +
      (desc ? `<div style="margin-top:5px">${esc(desc)}</div>` : ""));
    m.placeKey = p.dayId + "-" + p.idx;
    allMarkers.push(m); bounds.push(p.coords);
  });
  if (bounds.length) map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
}
window.goMap = function (dayId, idx) {
  document.querySelector('nav button[data-v="mapa"]').click();
  const d = DAYS.find(x => x.id === dayId);
  document.getElementById("fCity").value = "Todos";
  document.getElementById("fDay").value = String(dayId);
  drawMarkers();
  setTimeout(() => {
    const m = allMarkers.find(x => x.placeKey === dayId + "-" + idx);
    if (m) { map.setView(m.getLatLng(), 16); m.openPopup(); }
  }, 200);
};
initMap();

/* ---------- My location (live GPS) ---------- */
let meMarker, meCircle;
const meIcon = L.divIcon({ className: "", iconSize: [18, 18], iconAnchor: [9, 9], html: '<div class="me-dot"></div>' });
document.getElementById("locBtn").onclick = function () {
  const btn = this;
  if (!navigator.geolocation) { alert("Este aparelho não suporta geolocalização."); return; }
  btn.classList.add("busy"); btn.textContent = "📍 Localizando…";
  navigator.geolocation.getCurrentPosition(pos => {
    const ll = [pos.coords.latitude, pos.coords.longitude];
    const acc = pos.coords.accuracy || 30;
    if (meMarker) meMarker.setLatLng(ll);
    else meMarker = L.marker(ll, { icon: meIcon, zIndexOffset: 1000 }).addTo(map).bindPopup("📍 Você está aqui");
    if (meCircle) meCircle.setLatLng(ll).setRadius(acc);
    else meCircle = L.circle(ll, { radius: acc, color: "#2b8aff", weight: 1, fillColor: "#2b8aff", fillOpacity: 0.12 }).addTo(map);
    map.setView(ll, 16);
    btn.classList.remove("busy"); btn.textContent = "📍 Minha localização";
  }, err => {
    btn.classList.remove("busy"); btn.textContent = "📍 Minha localização";
    const msg = err.code === 1
      ? "Permissão de localização negada. Ative em Ajustes → Privacidade → Serviços de Localização → Safari (ou para este app)."
      : "Não foi possível obter sua localização agora. Tente novamente ao ar livre.";
    alert(msg);
  }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 15000 });
};

/* ---------- Offline tile download ---------- */
function lon2tile(lon, z) { return Math.floor((lon + 180) / 360 * Math.pow(2, z)); }
function lat2tile(lat, z) {
  const r = lat * Math.PI / 180;
  return Math.floor((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * Math.pow(2, z));
}
function tileSet() {
  // dedupe tiles across all locations. zoom -> radius (tiles around center)
  const plan = [[12, 1], [13, 1], [14, 2], [15, 2], [16, 1]];
  const set = new Set();
  flatPlaces().forEach(p => {
    const [lat, lon] = p.coords;
    plan.forEach(([z, r]) => {
      const cx = lon2tile(lon, z), cy = lat2tile(lat, z);
      for (let x = cx - r; x <= cx + r; x++)
        for (let y = cy - r; y <= cy + r; y++)
          set.add(z + "/" + x + "/" + y);
    });
  });
  return [...set];
}
document.getElementById("dlBtn").onclick = async function () {
  const btn = this, info = document.getElementById("dlInfo"), bar = document.getElementById("dlBar"), fill = bar.querySelector("i");
  const tiles = tileSet();
  btn.disabled = true; bar.style.display = "block";
  let done = 0, fail = 0;
  const total = tiles.length;
  info.textContent = `Baixando ${total} blocos de mapa…`;
  // throttle: small batches, gentle on the tile server
  const batch = 6;
  for (let i = 0; i < tiles.length; i += batch) {
    await Promise.all(tiles.slice(i, i + batch).map(async t => {
      try { await fetch("https://tile.openstreetmap.org/" + t + ".png", { mode: "cors", cache: "force-cache" }); }
      catch (e) { fail++; }
      done++;
    }));
    fill.style.width = Math.round(done / total * 100) + "%";
    info.textContent = `Baixando mapas… ${done}/${total}`;
    await new Promise(r => setTimeout(r, 120));
  }
  info.textContent = `✅ Mapas salvos (${done - fail}/${total}). Já funciona offline.` + (fail ? ` ${fail} falharam — tente de novo no wi-fi.` : "");
  btn.disabled = false;
  setTimeout(() => { bar.style.display = "none"; fill.style.width = "0"; }, 2500);
};

/* ---------- Service worker + auto-update ---------- */
if ("serviceWorker" in navigator) {
  let refreshing = false;
  // When a new SW takes control, reload once to show the fresh version.
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return; refreshing = true; location.reload();
  });
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(reg => {
      reg.update();
      // Re-check for updates whenever the app comes back to the foreground
      // (iOS resumes PWAs from memory without reloading).
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) reg.update();
      });
      // Also refresh the roteiro data in place when returning to foreground.
      document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshData(); });
    }).catch(() => {});
  });
}

// Pull fresh data.js when online and re-render if the content changed,
// so the app updates without a full reload even when iOS keeps it in memory.
let lastDataHash = null;
function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; } return h; }
async function refreshData() {
  try {
    const res = await fetch("data.js?cb=" + Date.now(), { cache: "no-store" });
    if (!res.ok) return;
    const txt = await res.text();
    const h = hashStr(txt);
    if (lastDataHash === null) { lastDataHash = h; return; }
    if (h !== lastDataHash) { lastDataHash = h; location.reload(); }
  } catch (e) {}
}
// seed the hash so the first foreground check has a baseline
refreshData();
