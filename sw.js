// Clock: is service worker mein koi notification / push nahi hai.
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    try{
      var sub = await self.registration.pushManager.getSubscription();
      if(sub) await sub.unsubscribe();   // purani push subscription band
    }catch(err){}
    try{ var ks = await caches.keys(); await Promise.all(ks.map(function(k){return caches.delete(k)})); }catch(err){}
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', function(){ /* network se seedha chalega */ });
