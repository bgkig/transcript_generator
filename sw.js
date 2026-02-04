const APP_CACHE = 'offline-whisper-app-v7';
const RUNTIME_CACHE = 'offline-whisper-runtime-v1';

const APP_ASSETS = [
  './',
  './index.html',
  './main.css',
  './app.js',
  './worker.js',
  './site.webmanifest',
  './favicon.svg',
  './og-image.svg',
  './robots.txt',
  './sitemap.xml',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(APP_CACHE)
      .then((cache) => cache.addAll(APP_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => ![APP_CACHE, RUNTIME_CACHE].includes(key)).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

function shouldCacheRuntime(request) {
  const url = new URL(request.url);
  if (url.origin === self.location.origin) return false;
  if (url.hostname.includes('cdn.jsdelivr.net')) return true;
  if (url.hostname.includes('cdn.tailwindcss.com')) return true;
  if (url.hostname.includes('fonts.googleapis.com')) return true;
  if (url.hostname.includes('fonts.gstatic.com')) return true;
  if (url.hostname.includes('huggingface.co')) return true;
  return /\.(onnx|bin|json|wasm|txt)$/i.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached ||
        fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(APP_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
      )
    );
    return;
  }

  if (shouldCacheRuntime(request)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => cached);
      })
    );
  }
});


