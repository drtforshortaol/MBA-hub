// ROOT HUB FILE: MBA-hub/sw.js
// Hub 2.2.19
// Purpose: Root Hub service worker and offline cache.
// Do not confuse this with individual app sw.js files.

const CACHE_NAME = "mba-hub-2-2-19-20261010-ray-refresh";
const SHARED = "mba-shared-assets-v1";
const MARKER = "/MBA-hub/__offline_complete_v1__";
let busy = false;

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./hub-registry.js",
  "./hub-tags.js",
  "./hub-links1.js",
  "./manifest.json",
  "./offline-assets.json",
  "./icon.svg"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return (
                cacheName.startsWith("mba-hub-") && cacheName !== SHARED &&
                cacheName !== CACHE_NAME
              );
            })
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", event => {
 const req=event.request;
 if(req.method!=="GET")return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin || !url.pathname.startsWith("/MBA-hub/"))return;
 event.respondWith((async()=>{
   const shared=await caches.open(SHARED);
   const pageUrl = req.mode === 'navigate' && url.pathname.endsWith('/') ? new URL('index.html',url.href).href : req.url;
   const cached=await shared.match(pageUrl,{ignoreSearch:true}) || await shared.match(req,{ignoreSearch:true});
   const shell=await caches.open(CACHE_NAME);
   const shellHit=await shell.match(pageUrl,{ignoreSearch:true}) || await shell.match(req,{ignoreSearch:true});
   // The shared cache is the offline source of truth for app files.
   // For online updates, keep serving network responses for non-image assets.
   const isImage=/\.(?:jpe?g|png|webp|gif|avif|svg)$/i.test(url.pathname);
   // User-replaced ray title image: refresh online, retain the shared-cache copy for offline use.\n   const refreshRayHero=url.pathname==="/MBA-hub/apps/bluespotted-ribbontail-ray/ScreenHunter%2010658.jpg" || decodeURIComponent(url.pathname)==="/MBA-hub/apps/bluespotted-ribbontail-ray/ScreenHunter 10658.jpg";\n   if(isImage && cached && !refreshRayHero)return cached;
   try {
     const network=await fetch(req);
     if(network.ok && (url.pathname==="/MBA-hub/" || CORE_ASSETS.some(path=>new URL(path,self.registration.scope).pathname===url.pathname))){
       event.waitUntil(shell.put(req,network.clone()));
     }
     return network;
   }catch(e){
     if(cached)return cached;
     if(shellHit)return shellHit;
     if(req.mode==="navigate")return new Response("<!doctype html><title>Offline file unavailable</title><p>This page is not stored offline. Reconnect to Wi-Fi and use Prepare Offline.</p>",{status:503,headers:{"Content-Type":"text/html"}});
     return Response.error();
   }
 })());
});

