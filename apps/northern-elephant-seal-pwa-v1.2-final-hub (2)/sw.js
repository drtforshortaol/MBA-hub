self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==self.location.origin||!u.pathname.startsWith("/MBA-hub/"))return;e.stopImmediatePropagation();e.respondWith((async()=>{const c=await caches.open("mba-shared-assets-v1");const key=e.request.mode==="navigate"&&u.pathname.endsWith("/")?new URL("index.html",u.href).href:u.href;const hit=await c.match(key,{ignoreSearch:true})||await c.match(e.request,{ignoreSearch:true});if(hit)return hit;try{return await fetch(e.request)}catch(err){return Response.error()}})())});
const CACHE_NAME = "mba-northern-elephant-seal-v1-2-design-refresh";

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
