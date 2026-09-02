const CACHE_NAME='root-revolution-v1';
const OFFLINE='/offline.html';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll([OFFLINE,'/logo.jpg']))));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request).then(r=>r||caches.match(OFFLINE))))});
