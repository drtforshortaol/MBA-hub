const CACHE="flamboyant-cuttlefish-v4";
const CORE=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./IMG_2291.jpeg","./IMG_2198.jpeg","./IMG_2197.jpeg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
if(e.request.method!=="GET")return;
const u=new URL(e.request.url);
if(u.origin!==self.location.origin||!u.pathname.startsWith("/MBA-hub/"))return;
e.respondWith((async()=>{
const local=await caches.open(CACHE),shared=await caches.open("mba-shared-assets-v1");
const fallback=async()=>(await local.match(e.request,{ignoreSearch:true}))||(await shared.match(e.request,{ignoreSearch:true}))||(e.request.mode==="navigate"?await local.match("./index.html"):undefined);
if(e.request.mode==="navigate"||/\.(html|js|css)$/.test(u.pathname)){
try{const res=await fetch(e.request,{cache:"no-store"});if(res.ok)local.put(e.request,res.clone()).catch(()=>{});return res}catch{return(await fallback())||Response.error()}
}
const old=await fallback();if(old)return old;
try{const res=await fetch(e.request);if(res.ok)local.put(e.request,res.clone()).catch(()=>{});return res}catch{return Response.error()}
})());
});
