const CACHE = "gooseneck-barnacle-v5";
const CORE = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.webmanifest", "./IMG_2489.jpeg", "./IMG_2490.jpeg", "./IMG_2491.jpeg", "./IMG_2492.jpeg", "./IMG_2493.jpeg", "./IMG_2496.jpeg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith("/MBA-hub/")) return;
  event.respondWith((async () => {
    const local = await caches.open(CACHE);
    const shared = await caches.open("mba-shared-assets-v1");
    const fallback = async () => (await local.match(event.request, {ignoreSearch:true}))
      || (await shared.match(event.request, {ignoreSearch:true}))
      || (event.request.mode === "navigate" ? await local.match("./index.html") : undefined);
    const coreDocument = event.request.mode === "navigate" || /\.(?:html|js|css)$/.test(url.pathname);
    if (coreDocument) {
      try {
        const response = await fetch(event.request, {cache:"no-store"});
        if (response.ok) local.put(event.request, response.clone()).catch(() => {});
        return response;
      } catch { return (await fallback()) || Response.error(); }
    }
    const cached = await fallback();
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response.ok) local.put(event.request, response.clone()).catch(() => {});
      return response;
    } catch { return Response.error(); }
  })());
});
