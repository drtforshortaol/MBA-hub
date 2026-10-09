self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==self.location.origin||!u.pathname.startsWith("/MBA-hub/"))return;e.stopImmediatePropagation();e.respondWith((async()=>{const c=await caches.open("mba-shared-assets-v1");const key=e.request.mode==="navigate"&&u.pathname.endsWith("/")?new URL("index.html",u.href).href:u.href;const hit=await c.match(key,{ignoreSearch:true})||await c.match(e.request,{ignoreSearch:true});if(hit)return hit;try{return await fetch(e.request)}catch(err){return Response.error()}})())});
const CACHE_NAME = "mba-leadership-v1.0.2";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./icon.svg",
  "./images/jenny-gray.jpg",
  "./images/lauren-cole.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name.startsWith("mba-leadership-") && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, copy);
          });

          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});