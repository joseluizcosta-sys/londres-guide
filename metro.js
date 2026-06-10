/* ===== Abas Tube (Londres) e Métro (Paris): mapa da rede + rota De/Para offline ===== */
"use strict";
(function () {

  const CITIES = { tube: "london", metro: "paris" };
  const state = {}; // por cidade: {map, from, to, lineLayers, stMarkers, routeLayer, inited}

  const nrm = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]/g, "");
  const escM = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  /* ---------- roteamento: Dijkstra sobre estados (estação, linha) ---------- */
  function buildGraph(d) {
    if (d._adj) return d._adj;
    const adj = d.stations.map(() => ({})); // adj[st][line] = [[outraSt, secs], ...]
    d.edges.forEach(([a, b, ln, t]) => {
      (adj[a][ln] = adj[a][ln] || []).push([b, t]);
      (adj[b][ln] = adj[b][ln] || []).push([a, t]);
    });
    return (d._adj = adj);
  }
  function route(d, from, to) {
    if (from === to) return null;
    const adj = buildGraph(d), TR = d.transfer;
    const dist = new Map(), prev = new Map();
    const Q = []; // fila simples (rede pequena: ok)
    const push = (k, c) => { Q.push([c, k]); };
    Object.keys(adj[from]).forEach(ln => {
      const k = from + "|" + ln;
      dist.set(k, 0); prev.set(k, null); push(k, 0);
    });
    let bestEnd = null, bestCost = Infinity;
    while (Q.length) {
      let bi = 0;
      for (let i = 1; i < Q.length; i++) if (Q[i][0] < Q[bi][0]) bi = i;
      const [c, k] = Q.splice(bi, 1)[0];
      if (c > (dist.get(k) ?? Infinity)) continue;
      const [stS, ln] = k.split("|"); const st = +stS;
      if (st === to) { if (c < bestCost) { bestCost = c; bestEnd = k; } continue; }
      if (c >= bestCost) continue;
      (adj[st][ln] || []).forEach(([nx, t]) => {
        const nk = nx + "|" + ln, nc = c + t;
        if (nc < (dist.get(nk) ?? Infinity)) { dist.set(nk, nc); prev.set(nk, k); push(nk, nc); }
      });
      Object.keys(adj[st]).forEach(ln2 => {
        if (ln2 === ln) return;
        const nk = st + "|" + ln2, nc = c + TR;
        if (nc < (dist.get(nk) ?? Infinity)) { dist.set(nk, nc); prev.set(nk, k); push(nk, nc); }
      });
    }
    if (!bestEnd) return null;
    const chain = [];
    for (let k = bestEnd; k; k = prev.get(k)) chain.unshift(k);
    // agrupa em pernas por linha (ignora trocas no início)
    const legs = [];
    chain.forEach(k => {
      const [stS, ln] = k.split("|"); const st = +stS;
      const last = legs[legs.length - 1];
      if (last && last.line === ln) {
        if (last.sts[last.sts.length - 1] !== st) last.sts.push(st);
      } else if (last && last.sts[last.sts.length - 1] === st && last.sts.length === 1) {
        last.line = ln; // troca antes de andar: substitui linha
      } else {
        legs.push({ line: ln, sts: [st] });
      }
    });
    const moved = legs.filter(l => l.sts.length > 1);
    return { cost: bestCost, legs: moved };
  }

  /* ---------- sentido da linha (terminal à frente) ---------- */
  function legDirection(d, leg) {
    // subgrafo da linha
    if (!d._lineAdj) d._lineAdj = {};
    let adjL = d._lineAdj[leg.line];
    if (!adjL) {
      adjL = d._lineAdj[leg.line] = {};
      d.edges.forEach(([a, b, ln]) => {
        if (ln !== leg.line) return;
        (adjL[a] = adjL[a] || []).push(b);
        (adjL[b] = adjL[b] || []).push(a);
      });
    }
    const n = leg.sts.length, prev = leg.sts[n - 2], end = leg.sts[n - 1];
    if ((adjL[end] || []).length === 1) return d.stations[end][0]; // desce no terminal
    // BFS a partir do fim, sem voltar: terminais alcançáveis = sentido do trem
    const seen = new Set([prev, end]);
    let frontier = [end];
    const termini = [];
    while (frontier.length) {
      const next = [];
      frontier.forEach(s => (adjL[s] || []).forEach(x => {
        if (seen.has(x)) return;
        seen.add(x);
        if ((adjL[x] || []).length === 1) termini.push(x); else next.push(x);
      }));
      frontier = next;
    }
    if (!termini.length) { // linha circular (ex.: Circle): mostra próxima estação
      const nx = (adjL[end] || []).find(x => x !== prev);
      return nx != null ? "via " + d.stations[nx][0] : "";
    }
    return termini.slice(0, 2).map(t => d.stations[t][0]).join(" / ");
  }

  /* ---------- UI ---------- */
  function cityHtml(view) {
    return `
    <div class="pl-card">
      <div class="pl-row">
        <span class="pl-lab">De</span>
        <div class="pl-inwrap"><input id="${view}-from" class="pl-in" type="text"
          placeholder="Estação de partida" autocomplete="off" autocorrect="off">
          <button class="pl-x" data-x="${view}-from">×</button>
          <div class="pl-sug" id="${view}-from-sug"></div></div>
      </div>
      <div class="pl-row">
        <span class="pl-lab">Para</span>
        <div class="pl-inwrap"><input id="${view}-to" class="pl-in" type="text"
          placeholder="Estação de chegada" autocomplete="off" autocorrect="off">
          <button class="pl-x" data-x="${view}-to">×</button>
          <div class="pl-sug" id="${view}-to-sug"></div></div>
      </div>
      <div class="pl-btns">
        <button class="pl-swap" id="${view}-swap">⇅ Inverter</button>
        <button class="pl-go" id="${view}-go">Traçar rota</button>
      </div>
    </div>
    <div id="${view}-result"></div>
    <div id="${view}-map" class="netmap"></div>
    <div class="pl-hint">Toque numa estação do mapa para defini-la como partida/chegada. Tudo funciona offline.</div>`;
  }

  function lineBadge(d, ln) {
    const L = d.lines[ln] || { n: ln, c: "#888" };
    const dark = ["#FFD300", "#FFCE00", "#D5C900", "#E3B32A", "#98D4E2", "#83C491", "#F3A4BA", "#CEADD2", "#95CDBA", "#F3A9BB"].includes(L.c);
    return `<span class="lbadge" style="background:${L.c};color:${dark ? "#222" : "#fff"}">${escM(L.n)}</span>`;
  }

  function renderResult(view, d, r, from, to) {
    const box = document.getElementById(view + "-result");
    if (!r) {
      box.innerHTML = `<div class="pl-card pl-none">Não encontrei rota entre essas estações.</div>`;
      return;
    }
    const mins = Math.round(r.cost / 60) + 2; // margem p/ espera inicial
    const nTr = r.legs.length - 1;
    let html = `<div class="pl-card">
      <div class="pl-total">⏱ ~${mins} min · ${nTr === 0 ? "direto, sem troca" : nTr + (nTr === 1 ? " troca" : " trocas")}</div>`;
    r.legs.forEach((leg, i) => {
      const a = d.stations[leg.sts[0]][0], b = d.stations[leg.sts[leg.sts.length - 1]][0];
      const stops = leg.sts.length - 1;
      const mids = leg.sts.slice(1, -1).map(s => d.stations[s][0]);
      const dir = legDirection(d, leg);
      html += `<div class="pl-leg">
        <div class="pl-leg-h">${lineBadge(d, leg.line)}
          <span class="pl-leg-t"><b>${escM(a)}</b> → <b>${escM(b)}</b></span></div>
        ${dir ? `<div class="pl-dir">➜ sentido <b>${escM(dir)}</b></div>` : ""}
        <div class="pl-leg-m">${stops} ${stops === 1 ? "parada" : "paradas"}${
          mids.length ? ` · <a class="pl-mid" data-mid="${view}-${i}">ver intermediárias</a>` : ""}</div>
        ${mids.length ? `<div class="pl-mids" id="${view}-mid-${i}">${mids.map(escM).join(" · ")}</div>` : ""}
        ${i < r.legs.length - 1 ? `<div class="pl-troca">↘ troca de linha (~${Math.round(d.transfer / 60)} min)</div>` : ""}
      </div>`;
    });
    html += `</div>`;
    box.innerHTML = html;
    box.querySelectorAll(".pl-mid").forEach(a => a.onclick = () => {
      const [v, i] = a.dataset.mid.split("-");
      const t = document.getElementById(v + "-mid-" + i);
      if (t) t.style.display = t.style.display === "block" ? "none" : "block";
    });
  }

  /* ---------- mapa da rede (Leaflet, sem tiles: 100% offline) ---------- */
  function initNetMap(view) {
    const city = CITIES[view], d = METRO[city], S = state[view];
    const map = L.map(view + "-map", {
      zoomControl: true, attributionControl: false,
      minZoom: 9, maxZoom: 16, zoomSnap: 0.5
    });
    S.map = map;
    // IMPORTANTE: definir a vista ANTES de adicionar camadas,
    // senão o Leaflet lança "Set map center and zoom first".
    const lats = d.stations.map(s => s[1]), lons = d.stations.map(s => s[2]);
    map.fitBounds([[Math.min(...lats), Math.min(...lons)],
                   [Math.max(...lats), Math.max(...lons)]], { padding: [10, 10] });
    const canvas = L.canvas({ padding: 0.3 });
    // linhas (estilo plano oficial: traço grosso, cor cheia)
    const byLine = {};
    d.edges.forEach(([a, b, ln]) => (byLine[ln] = byLine[ln] || []).push([a, b]));
    S.lineLayers = {};
    Object.entries(byLine).forEach(([ln, segs]) => {
      const col = (d.lines[ln] || {}).c || "#888";
      const g = L.layerGroup();
      segs.forEach(([a, b]) => {
        L.polyline([d.stations[a].slice(1), d.stations[b].slice(1)],
          { color: col, weight: 4.5, opacity: 1, lineCap: "round", renderer: canvas }).addTo(g);
      });
      g.addTo(map); S.lineLayers[ln] = g;
    });
    // estações: baldeação = círculo branco com anel preto (padrão TfL);
    // demais = bolinha na cor da linha
    const inter = d.stations.map(() => new Set());
    d.edges.forEach(([a, b, ln]) => { inter[a].add(ln); inter[b].add(ln); });
    S.inter = inter;
    S.stMarkers = d.stations.map((s, i) => {
      const isInt = inter[i].size > 1;
      const lcol = (d.lines[[...inter[i]][0]] || {}).c || "#555";
      const m = L.circleMarker(s.slice(1), isInt
        ? { radius: 5, color: "#111", weight: 2.4, fillColor: "#fff", fillOpacity: 1, renderer: canvas }
        : { radius: 3, color: "#fff", weight: 1.4, fillColor: lcol, fillOpacity: 1, renderer: canvas }
      ).addTo(map);
      m.bindPopup(`<b>${escM(s[0])}</b><br>` +
        [...inter[i]].map(ln => lineBadge(d, ln)).join(" ") +
        `<div class="pop-set"><button onclick="MetroUI.setEnd('${view}',${i},'from')">🚩 Partida</button>
         <button onclick="MetroUI.setEnd('${view}',${i},'to')">🎯 Chegada</button></div>`);
      return m;
    });
    S.routeLayer = L.layerGroup().addTo(map);
    // rótulos por zoom (como no plano: nomes visíveis ao aproximar)
    S.lblLayer = L.layerGroup().addTo(map);
    const renderLabels = () => {
      S.lblLayer.clearLayers();
      if (S.routeOn) return; // rota desenhada tem rótulos próprios
      const z = map.getZoom(), bb = map.getBounds().pad(0.1);
      if (z < 12) return;
      d.stations.forEach((s, i) => {
        if (!bb.contains(s.slice(1))) return;
        if (z < 13.5 && S.inter[i].size < 2) return; // zoom médio: só baldeações
        L.marker(s.slice(1), {
          interactive: false,
          icon: L.divIcon({ className: "st-name", html: escM(s[0]), iconSize: null, iconAnchor: [-7, 7] })
        }).addTo(S.lblLayer);
      });
    };
    map.on("zoomend moveend", renderLabels);
    renderLabels();
  }

  function drawRoute(view, r) {
    const city = CITIES[view], d = METRO[city], S = state[view];
    S.routeLayer.clearLayers();
    S.routeOn = !!r;
    if (S.lblLayer) S.lblLayer.clearLayers();
    Object.values(S.lineLayers).forEach(g => g.eachLayer(l => l.setStyle({ opacity: r ? 0.15 : 1 })));
    S.stMarkers.forEach(m => m.setStyle({ opacity: r ? 0.2 : 1, fillOpacity: r ? 0.2 : 1 }));
    if (!r) { if (S.map) S.map.fire("zoomend"); return; }
    const all = [];
    r.legs.forEach(leg => {
      const col = (d.lines[leg.line] || {}).c || "#333";
      const pts = leg.sts.map(s => d.stations[s].slice(1));
      L.polyline(pts, { color: "#111", weight: 9, opacity: 0.9, lineCap: "round" }).addTo(S.routeLayer);
      L.polyline(pts, { color: col, weight: 5, opacity: 1, lineCap: "round" }).addTo(S.routeLayer);
      leg.sts.forEach(s => all.push(d.stations[s].slice(1)));
      [leg.sts[0], leg.sts[leg.sts.length - 1]].forEach(s => {
        L.circleMarker(d.stations[s].slice(1), {
          radius: 6, color: "#111", weight: 2.6, fillColor: "#fff", fillOpacity: 1
        }).addTo(S.routeLayer).bindTooltip(d.stations[s][0], {
          permanent: true, direction: "top", className: "st-lbl", offset: [0, -7]
        });
      });
    });
    S.map.fitBounds(all, { padding: [46, 46] });
  }

  /* ---------- busca/autocomplete ---------- */
  function wireSearch(view) {
    const city = CITIES[view], d = METRO[city], S = state[view];
    // índice alfabético de todas as estações
    const alpha = d.stations.map((s, i) => i)
      .sort((a, b) => d.stations[a][0].localeCompare(d.stations[b][0], "pt"));
    ["from", "to"].forEach(which => {
      const inp = document.getElementById(`${view}-${which}`);
      const sug = document.getElementById(`${view}-${which}-sug`);
      const show = () => {
        const q = nrm(inp.value);
        let list;
        if (!q) {
          list = alpha; // lista completa, rolável
        } else {
          const hits = [];
          alpha.forEach(i => {
            const n = nrm(d.stations[i][0]);
            const p = n.indexOf(q);
            if (p >= 0) hits.push([p, i]);
          });
          hits.sort((a, b) => a[0] - b[0]);
          list = hits.map(h => h[1]);
        }
        if (!list.length) { sug.style.display = "none"; return; }
        sug.innerHTML = list.map(i =>
          `<div class="pl-opt" data-i="${i}">${escM(d.stations[i][0])}</div>`).join("");
        sug.style.display = "block";
        sug.scrollTop = 0;
        sug.querySelectorAll(".pl-opt").forEach(o => o.onclick = () => {
          MetroUI.setEnd(view, +o.dataset.i, which);
        });
      };
      inp.addEventListener("focus", show);
      inp.addEventListener("input", () => { S[which] = null; show(); });
      inp.addEventListener("blur", () => setTimeout(() => { sug.style.display = "none"; }, 250));
    });
    document.querySelectorAll(`#${view} .pl-x`).forEach(b => b.onclick = () => {
      const id = b.dataset.x; document.getElementById(id).value = "";
      S[id.endsWith("from") ? "from" : "to"] = null;
      document.getElementById(view + "-result").innerHTML = "";
      drawRoute(view, null);
    });
    document.getElementById(view + "-swap").onclick = () => {
      const f = S.from, t = S.to; S.from = t; S.to = f;
      document.getElementById(view + "-from").value = t != null ? d.stations[t][0] : "";
      document.getElementById(view + "-to").value = f != null ? d.stations[f][0] : "";
      if (S.from != null && S.to != null) go(view);
    };
    document.getElementById(view + "-go").onclick = () => {
      if (S.from == null || S.to == null) {
        document.getElementById(view + "-result").innerHTML =
          `<div class="pl-card pl-none">Escolha as estações de partida e chegada (digite e toque numa sugestão, ou toque no mapa).</div>`;
        return;
      }
      go(view);
    };
  }

  function go(view) {
    const d = METRO[CITIES[view]], S = state[view];
    const r = route(d, S.from, S.to);
    renderResult(view, d, r, S.from, S.to);
    drawRoute(view, r);
    if (S.map) S.map.closePopup();
  }

  /* ---------- API pública ---------- */
  window.MetroUI = {
    open(view) { // chamado ao abrir a aba
      const S = state[view] = state[view] || {};
      if (!S.inited) {
        try {
          document.getElementById(view).innerHTML = cityHtml(view);
          initNetMap(view);
          wireSearch(view);
          S.inited = true;
        } catch (e) {
          document.getElementById(view).innerHTML =
            `<div class="pl-card pl-none">Erro ao montar o mapa: ${escM(e.message || e)}.<br>
             Feche e reabra o app; se persistir, me avise com esta mensagem.</div>`;
        }
      } else if (S.map) {
        setTimeout(() => S.map.invalidateSize(), 80);
      }
    },
    setEnd(view, i, which) {
      const d = METRO[CITIES[view]], S = state[view];
      S[which] = i;
      document.getElementById(`${view}-${which}`).value = d.stations[i][0];
      document.getElementById(`${view}-${which}-sug`).style.display = "none";
      if (S.map) S.map.closePopup();
      if (S.from != null && S.to != null) go(view);
    },
    _route: route // exposto para testes
  };
})();
