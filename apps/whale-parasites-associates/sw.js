self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==self.location.origin||!u.pathname.startsWith("/MBA-hub/"))return;e.stopImmediatePropagation();e.respondWith((async()=>{const c=await caches.open("mba-shared-assets-v1");const key=e.request.mode==="navigate"&&u.pathname.endsWith("/")?new URL("index.html",u.href).href:u.href;const hit=await c.match(key,{ignoreSearch:true})||await c.match(e.request,{ignoreSearch:true});if(hit)return hit;const local=await caches.open(CACHE_NAME);const old=await local.match(e.request,{ignoreSearch:true});if(old)return old;try{return await fetch(e.request)}catch(err){return Response.error()}})())});
const CACHE_NAME = "whale-parasites-associates-v5";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./images/icon.svg",
  "../../apps.js",
  "../../hub-links.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== CACHE_NAME &&
            cacheName.startsWith("whale-parasites-associates")
          ) {
            return caches.delete(cacheName);
          }

          return null;
        })
      )
    )
  );

  self.clients.claim();
});
