var cacheName = 'webstore-v1';
var cacheFiles = [
'index.html',
'webstore.webmanifest',
'art.png',
'drama.png',
'english.png',
'french.png',
'geography.png',
'history.png',
'maths.png',
'music.png',
'pe.png',
'science.png',
'schoolicon.png'
];

self.addEventListener('install'
, (e) => {
console.log('[Service Worker] Install');
e.waitUntil(
caches.open(cacheName).then((cache) => {
console.log('[Service Worker] Caching all the files');
return cache.addAll(cacheFiles);
})
);
});




self.addEventListener('fetch'
, function (e) {
e.respondWith(
caches.match(e.request).then(function (r) {
// Download the file if it is not in the cache,
return r || fetch(e.request).then(function (response) {
// add the new file to cache
return caches.open(cacheName).then(function (cache) {
cache.put(e.request, response.clone());
return response;
});
});
})
);
});

