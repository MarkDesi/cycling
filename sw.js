// Project 270 — service worker
// Caches only the static app shell (HTML/JS/icons/manifest), never API calls.
// Network-first so you always get the latest index.html when online; falls
// back to the cached shell when offline.

const CACHE_NAME = 'project270-shell-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './config.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only ever handle same-origin GET requests for the app shell itself.
  // Supabase and the Intervals.icu proxy are always cross-origin (*.supabase.co)
  // and must never be intercepted — that data has to always be live.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin){
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
