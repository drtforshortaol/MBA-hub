const CACHE_NAME = "mba-information-center-visual-refresh-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css?v=10-topic-v1",
  "./app.js?v=10-topic-v1",
  "./data.js?v=10-topic-v1",
  "./manifest.json",
  "./images/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith("mba-information-center"))
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }

          return new Response("Offline and this file is not cached.", {
            status: 503,
            statusText: "Offline"
          });
        });
      })
  );
});