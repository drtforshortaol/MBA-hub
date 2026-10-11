// Information Center Handbook: online-fresh app pages, reliable offline fallback; preserve shared media.
const CACHE_NAME="information-center-v2.1.2";
const SHARED="mba-shared-assets-v1";
const FILES_TO_CACHE=["./","index.html","styles.css","app.js","data.js","manifest.webmanifest","icon.svg"];
self.addEventListener("install",event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES_TO_CACHE)))});
self.addEventListener("activate",event=>{event.waitUntil((async()=>{for(const key of await caches.keys()){if(key.startsWith("information-center-")&&key!==CACHE_NAME)await caches.delete(key)}await self.clients.claim()})())});
self.addEventListener("fetch",event=>{
  const req=event.request;if(req.method!=="GET")return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  const scope=new URL("./",self.location.href).pathname;if(!url.pathname.startsWith(scope))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    const shared=await caches.open(SHARED);
    const key=(req.mode==="navigate"&&url.pathname.endsWith("/"))?new URL("index.html",url.href).href:req.url;
    const isContent=req.mode==="navigate"||/\/(?:index\.html|styles\.css|app\.js|data\.js)$/.test(url.pathname);
    if(isContent){
      try{const fresh=await fetch(req,{cache:"no-store"});if(fresh.ok){event.waitUntil(cache.put(key,fresh.clone()));return fresh}}catch(e){}
    }
    const hit=await cache.match(key,{ignoreSearch:true})||await shared.match(key,{ignoreSearch:true})||await cache.match(req,{ignoreSearch:true})||await shared.match(req,{ignoreSearch:true});
    if(hit)return hit;
    try{const fresh=await fetch(req);if(fresh.ok)event.waitUntil(cache.put(key,fresh.clone()));return fresh}catch(e){return Response.error()}
  })());
});