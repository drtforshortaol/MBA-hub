// Refresh HTML, CSS, and JavaScript online; keep shared offline assets as fallback.
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith("/MBA-hub/")) return;
  const isCore = event.request.mode === "navigate" || /\.(html|css|js)$/.test(url.pathname);
  event.respondWith((async () => {
    const appCache = await caches.open(CACHE_NAME);
    const sharedCache = await caches.open("mba-shared-assets-v1");
    const fallback = async () => (await appCache.match(event.request, {ignoreSearch:true}))
      || (await sharedCache.match(event.request, {ignoreSearch:true}))
      || (event.request.mode === "navigate" ? await appCache.match("./index.html") : undefined);
    if (isCore) {
      try {
        const response = await fetch(event.request, {cache:"no-store"});
        if (response.ok) appCache.put(event.request, response.clone()).catch(() => {});
        return response;
      } catch (error) { return (await fallback()) || Response.error(); }
    }
    const cached = await fallback();
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response.ok) appCache.put(event.request, response.clone()).catch(() => {});
      return response;
    } catch (error) { return Response.error(); }
  })());
});
const CACHE_NAME = "mba-northern-elephant-seal-v1-2-refresh-fix";

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
