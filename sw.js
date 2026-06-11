/* Service Worker — Londres + Paris guia offline */
const APP = "lp-app-v12";      // app shell (bump version to force update)
const TILES = "lp-tiles-v1";   // map tiles (kept across app updates)
const PHOTOS = "lp-photos-v1"; // fotos da Wikipédia (kept across app updates)

const SHELL = [
  "./",
  "index.html",
  "app.js",
  "data.js",
  "metro.js",
  "metro-data.js",
  "manifest.webmanifest",
  "vendor/leaflet.css",
  "vendor/leaflet.js",
  "vendor/markercluster.css",
  "vendor/markercluster.default.css",
  "vendor/leaflet.markercluster.js",
  "vendor/images/marker-icon.png",
  "vendor/images/marker-icon-2x.png",
  "vendor/images/marker-shadow.png",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(APP).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== APP && k !== TILES && k !== PHOTOS).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Content that changes when the roteiro is updated -> always try network first.
const FRESH = /(^\/$|\/$|index\.html$|app\.js$|data\.js$|metro\.js$|metro-data\.js$|manifest\.webmanifest$)/;

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Map tiles: cache-first, dedicated cache (never refetch once stored).
  if (url.hostname.endsWith("tile.openstreetmap.org")) {
    e.respondWith(
      caches.open(TILES).then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        } catch (err) { return hit || Response.error(); }
      })
    );
    return;
  }

  // Fotos da Wikipédia (miniaturas + API REST de resumo): cache-first, cache dedicado.
  if (url.hostname.endsWith("wikimedia.org") ||
      (url.hostname.endsWith("wikipedia.org") && url.pathname.includes("/api/rest_v1/page/summary/"))) {
    e.respondWith(
      caches.open(PHOTOS).then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        } catch (err) { return hit || Response.error(); }
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return; // let other cross-origin pass

  // Roteiro content: network-first (fresh when online), cache fallback (offline).
  // Use no-store so the browser HTTP cache can't serve a stale copy while online.
  if (FRESH.test(url.pathname)) {
    e.respondWith(
      fetch(req, { cache: "no-store" }).then(res => {
        if (res && res.ok) { const c = res.clone(); caches.open(APP).then(k => k.put(req, c)); }
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match("index.html")))
    );
    return;
  }

  // Static assets (vendor, icons): cache-first.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.ok) { const c = res.clone(); caches.open(APP).then(k => k.put(req, c)); }
      return res;
    }))
  );
});
