// ROOT HUB FILE: MBA-hub/sw.js
// Hub 2.2.19
// Purpose: Root Hub service worker and offline cache.
// Do not confuse this with individual app sw.js files.

const CACHE_NAME = "mba-hub-2-2-19-20261009-3";
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
   const cached=await shared.match(req,{ignoreSearch:true});
   const shell=await caches.open(CACHE_NAME);
   const shellHit=await shell.match(req,{ignoreSearch:true});
   // The shared cache is the offline source of truth for app files.
   // For online updates, keep serving network responses for non-image assets.
   const isImage=/\\.(?:jpe?g|png|webp|gif|avif|svg)$/i.test(url.pathname);
   if(isImage && cached)return cached;
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

// Central shared image and app-file cache. Existing app workers remain active
// during migration; this manager does not claim their independent readiness.
async function sendStatus(client, type, done, total, error) {
  if(client) client.postMessage({kind:"hub-offline",type,done,total,error});
}
self.addEventListener("message", event => {
  if(!event.data || !["HUB_OFFLINE_PREPARE","HUB_OFFLINE_STATUS"].includes(event.data.type)) return;
  const client=event.source;
  event.waitUntil((async()=>{
    const cache=await caches.open(SHARED);
    const manifestResponse=await fetch("./offline-assets.json",{cache:"no-store"});
    if(!manifestResponse.ok) throw new Error("Asset inventory unavailable");
    const manifest=await manifestResponse.json();
    const assets=[...new Set(manifest.assets)];
    const marker=await cache.match(MARKER);
    const previous=marker?await marker.json():null;
    if(event.data.type==="HUB_OFFLINE_STATUS") {
      await sendStatus(client,previous?.version===manifest.version?"ready":"not-ready",0,assets.length);
      return;
    }
    if(busy){await sendStatus(client,"busy",0,assets.length);return;}
    busy=true;
    try {
      await cache.delete(MARKER);
      let done=0;
      let failed=[];
      const queue=assets.slice();
      const worker=async()=>{while(queue.length){const path=queue.shift();const url=new URL(path,self.registration.scope).href;try{
        let hit=await cache.match(url,{ignoreSearch:true});
        if(!hit){const response=await fetch(url,{cache:"no-store"});if(!response.ok||response.type==="opaque")throw Error("HTTP "+response.status);await cache.put(url,response);}
      }catch(e){failed.push(path)}
      done++;if(done%5===0||done===assets.length)await sendStatus(client,"progress",done,assets.length);
      }};
      await Promise.all(Array.from({length:4},worker));
      if(failed.length) {await sendStatus(client,"incomplete",done,assets.length,failed.slice(0,8).join(", "));return;}
      await cache.put(MARKER,new Response(JSON.stringify({version:manifest.version,count:assets.length,verifiedAt:Date.now()}),{headers:{"Content-Type":"application/json"}}));
      await sendStatus(client,"ready",done,assets.length);
    }finally{busy=false;}
  })().catch(e=>sendStatus(client,"incomplete",0,0,String(e))));
});
