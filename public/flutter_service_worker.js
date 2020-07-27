'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "8b2a26869a728fac6cb4817282116706",
"assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/images/logo-512.png": "723d451883da7d51ac8dc931b83a18f3",
"assets/LICENSE": "0eb38e5bc2c5de1c6e8cf9223ecaf3a0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "c8ede3aa05ca0e1152993a5f57eb6bb2",
"icons/Icon-192.png": "753cb9d44c4dc9274dfdb4d6c7c834ea",
"icons/Icon-512.png": "723d451883da7d51ac8dc931b83a18f3",
"index.html": "356076ac03677bf7d1f58a25e365f1aa",
"/": "356076ac03677bf7d1f58a25e365f1aa",
"main.dart.js": "09b69e7ae770c49c5aa20038115fb4b9",
"manifest.json": "fd9667223f740b016bab004dfda056df",
"old.favicon.png": "5dcef449791fa27946b3d35ad8803796"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
