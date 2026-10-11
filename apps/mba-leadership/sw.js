self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;const u=new URL(event.request.url);if(u.origin!==self.location.origin||!u.pathname.startsWith("/MBA-hub/"))return;event.respondWith((async()=>{const own=await caches.open(CACHE_NAME),shared=await caches.open("mba-shared-assets-v1");const fallback=async()=>(await own.match(event.request,{ignoreSearch:true}))||(await shared.match(event.request,{ignoreSearch:true}));if(event.request.mode==="navigate"||/\.(html|css|js)$/.test(u.pathname)){try{const r=await fetch(event.request,{cache:"no-store"});if(r.ok)own.put(event.request,r.clone()).catch(()=>{});return r}catch{return(await fallback())||Response.error()}}return(await fallback())||fetch(event.request)})());});
const CACHE_NAME = "mba-leadership-v1.0.3";

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
