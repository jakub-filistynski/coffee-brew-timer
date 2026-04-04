const CACHE_NAME = "coffee-brew-timer-v1";
const OFFLINE_URLS = [
  "./",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(OFFLINE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function shouldCache(request, url) {
  if (request.method !== "GET") return false;
  if (url.origin !== self.location.origin) return false;
  if (url.pathname.endsWith("/sw.js")) return false;

  return (
    request.mode === "navigate" ||
    ["document", "script", "style", "image", "font"].includes(
      request.destination,
    )
  );
}

async function fetchAndCache(request) {
  const url = new URL(request.url);
  const response = await fetch(request);

  if (response.ok && shouldCache(request, url)) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }

  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(request);

      if (request.mode === "navigate") {
        try {
          return await fetchAndCache(request);
        } catch (error) {
          return (
            cachedResponse || (await cache.match("./")) || Response.error()
          );
        }
      }

      if (cachedResponse) {
        void fetchAndCache(request).catch(() => undefined);
        return cachedResponse;
      }

      try {
        return await fetchAndCache(request);
      } catch (error) {
        return Response.error();
      }
    })(),
  );
});
