const CACHE_NAME = "mba-northern-elephant-seal-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./icon.svg",
  "./images/size_compare.jpg",
  "./images/size_sketch.jpg",
  "./images/migration_map.jpg",
  "./images/cons_basics.jpg",
  "./images/rookery_scene.jpg",
  "./images/calendar.jpg",
  "./images/diet_diagram.jpg",
  "./images/sleep_diagram.jpg",
  "./images/buoyancy_chart.jpg",
  "./images/cons_comeback.jpg",
  "./images/cons_success.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(() => cache.addAll(ASSETS.slice(0, 7)))));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});