// Hub offline preparation pilot: runs in the page, independent of SW messaging.
// Uses the same shared CacheStorage bucket as the root Hub service worker.
(()=>{
 const CACHE="mba-shared-assets-v1",MARKER="/MBA-hub/__offline_complete_v1__";
 const init=()=>{
  const nav=document.querySelector(".top-bar");if(!nav||document.getElementById("prepareHubOfflineBtn"))return;
  const button=document.createElement("button");button.id="prepareHubOfflineBtn";button.type="button";button.className="top-bar-btn top-bar-btn-small";button.textContent="Prepare Offline";nav.appendChild(button);
  button.disabled = !navigator.onLine;
  window.addEventListener("online", () => { button.disabled = false; });
  window.addEventListener("offline", () => { button.disabled = true; });
  const status=document.createElement("div");status.setAttribute("role","status");status.setAttribute("aria-live","polite");status.style.cssText="padding:8px 14px;background:#e7f1f0;color:#073b4c;font-weight:600;text-align:center";nav.after(status);
  const report=t=>{status.textContent=t;};
  if(!("caches" in window)){report("🔴 Offline storage unavailable in this browser.");button.disabled=true;return;}
  report("Hub offline preparation available. Tap Prepare Offline to start.");
  async function manifest(){let r;try{r=await fetch("./offline-assets.json?v=20261009-g",{cache:"no-store"});}catch(e){const c=await caches.open(CACHE);r=await c.match(new URL("offline-assets.json",location.origin+"/MBA-hub/").href);}if(!r||!r.ok)throw Error("Inventory unavailable");return r.json();}
  async function prepare(){
   if (!navigator.onLine) { report("Offline mode: downloading files is unavailable."); return; }
   button.disabled=true;report("🟡 Starting Hub offline preparation…");
   try{
    const m=await manifest(),paths=[...new Set(m.assets)],cache=await caches.open(CACHE);
    await cache.delete(MARKER);
    let done=0,downloaded=0,failed=[];const queue=paths.slice();
    const worker=async()=>{while(queue.length){
     const path=queue.shift(),url=new URL(path,location.origin+"/MBA-hub/").href;
     try{const existing=await cache.match(url,{ignoreSearch:true});if(!existing || /\.(?:html|js|css|json|webmanifest)$/i.test(path)){
       const response=await fetch(url,{cache:"no-store"});if(!response.ok||response.type==="opaque")throw Error("HTTP "+response.status);
       await cache.put(url,response.clone());downloaded++;
     }}catch(e){failed.push(path+" ("+e.message+")");}
     done++;if(done%3===0||done===paths.length)report("🟡 Preparing Hub files: "+done+"/"+paths.length+" · New downloads: "+downloaded+" · Errors: "+failed.length);
    }};
    await Promise.all(Array.from({length:3},worker));
    if(failed.length){report("🔴 Preparation incomplete: "+failed.length+" file(s) failed. First: "+failed.slice(0,3).join("; "));return;}
    const reg=await navigator.serviceWorker.getRegistration("./");
    if(!reg || !reg.active || !reg.active.scriptURL.endsWith("/MBA-hub/sw.js")){
      report("🟡 Files staged, but Hub offline worker is not active. Reload while online before offline testing.");return;
    }
    await cache.put(MARKER,new Response(JSON.stringify({version:m.version,count:paths.length,verifiedAt:Date.now()}),{headers:{"Content-Type":"application/json"}}));
    report("🟢 Hub files staged: "+paths.length+"/"+paths.length+". Individual app offline testing still required.");
   }catch(e){report("🔴 Offline preparation failed: "+e.message);}
   finally{button.disabled=!navigator.onLine;}
  }
  button.addEventListener("click",prepare);
  (async()=>{try{const m=await manifest(),cache=await caches.open(CACHE),r=await cache.match(MARKER);if(!r)return;const v=await r.json();if(v.version===m.version)report("🟢 Hub files previously staged ("+v.count+"). Individual app testing still required.");else report("🟡 Hub offline update available. Tap Prepare Offline.");}catch(e){report("Offline status unavailable: "+e.message);}})();
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
