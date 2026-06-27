const CACHE_NAME = "mba-northern-elephant-seal-v1-1";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./icon.svg",
  "./README.txt",
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
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(error => {
        console.warn("Some assets failed to cache. Trying core files only.", error);
        return cache.addAll(["./", "./index.html", "./styles.css", "./app.js", "./data.js", "./manifest.json", "./icon.svg"]);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("mba-northern-elephant-seal") && key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy).catch(() => {}));
        return response;
      }).catch(() => {
        if (event.request.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
