// Show fresh app content online, retain local/shared copies for offline use.
self.addEventListener("fetch",e=>{const req=e.request;if(req.method!=="GET")return;const u=new URL(req.url);if(u.origin!==self.location.origin||!u.pathname.startsWith(new URL("./",self.location.href).pathname))return;e.stopImmediatePropagation();e.respondWith((async()=>{const local=await caches.open(CACHE_NAME),shared=await caches.open("mba-shared-assets-v1");const key=req.mode==="navigate"&&u.pathname.endsWith("/")?new URL("index.html",u.href).href:req.url;const page=req.mode==="navigate"||/\/(?:index\.html|app\.js|styles\.css|data\.js)$/.test(u.pathname);if(page){try{const fresh=await fetch(req,{cache:"no-store"});if(fresh.ok){e.waitUntil(local.put(key,fresh.clone()));return fresh}}catch(_){}}const hit=await local.match(key,{ignoreSearch:true})||await shared.match(key,{ignoreSearch:true});if(hit)return hit;try{const res=await fetch(req);if(res.ok)e.waitUntil(local.put(key,res.clone()));return res}catch(_){return Response.error()}})())});
const CACHE_NAME = "interpretation-principles-v1.0.2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("interpretation-principles") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});