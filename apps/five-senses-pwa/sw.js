self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==self.location.origin||!u.pathname.startsWith("/MBA-hub/"))return;e.stopImmediatePropagation();e.respondWith((async()=>{const c=await caches.open("mba-shared-assets-v1");const key=e.request.mode==="navigate"&&u.pathname.endsWith("/")?new URL("index.html",u.href).href:u.href;const hit=await c.match(key,{ignoreSearch:true})||await c.match(e.request,{ignoreSearch:true});if(hit)return hit;try{return await fetch(e.request)}catch(err){return Response.error()}})())});
/* APP FILE: apps/five-senses-pwa/sw.js */

const CACHE_NAME = "using-five-senses-mba-v1.2-20260628";

const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./icon.svg",
  "./images/header-five-senses-mba.svg",
  "./README.txt",
  "./CHANGELOG.txt"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});