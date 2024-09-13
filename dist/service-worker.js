const CACHE_NAME = 'versailles-cache-v1';
  const urlsToCache = [
    '/images/1.png',
    '/images/2.png',
    '/images/3.png',
    '/images/4.png',
    '/images/5.png',
    '/images/6.png',
    '/images/7.png',
    '/images/8.png',
    '/images/9.png',
    '/images/10.png',
    '/images/11.png',
    '/images/12.png',
    '/images/13.png',
    '/images/14.png',
    '/images/15.png',
    '/images/16.png',
    '/images/17.png',
    '/images/18.png',
    '/images/19.png',
    '/images/20.png',
    '/images/21.png',
    '/images/22.png',
    '/images/23.png',
    '/images/24.png',
    '/images/25.png',
    '/images/26.png',
    '/images/27.png',
    '/images/28.png',
    '/images/29.png',
    '/images/30.png',
    '/images/31.png',
    '/images/32.png',
    '/images/33.png',
    '/images/34.png',
    '/images/35.png',
    '/images/36.png',
    '/images/37.png',
    '/images/38.png',
    '/images/39.png',
    '/images/40.png',
    '/images/41.png',
    '/images/42.png',
    '/images/43.png',
    '/images/44.png',
    '/images/45.png',
    '/images/46.png',
    '/images/47.png',
    '/images/48.png',
    '/images/49.png',
    '/images/50.png',
    '/images/51.png',
    '/images/52.png',
    '/images/53.png',
    '/images/54.png',
    '/images/55.png',
    '/images/56.png',
    '/images/57.png',
    '/images/58.png',
    '/images/59.png',
    '/images/60.png',
    '/images/61.png',
    '/images/62.png',
    '/images/63.png',
    '/images/64.png',
    '/images/65.png',
    '/images/66.png',
    '/images/67.png',
    '/images/68.png',
    '/images/69.png',
    '/images/70.png',
    '/images/71.png',
    '/images/72.png',
    '/images/73.png',
    '/images/74.png',
    '/images/saviez-vous/saviez-vous-1.png',
    '/images/saviez-vous/saviez-vous-2.png',
    '/images/saviez-vous/saviez-vous-3.png',
    '/images/saviez-vous/saviez-vous-4.png',
    '/images/saviez-vous/saviez-vous-5.png',
    '/images/saviez-vous/saviez-vous-6.png',
    '/images/saviez-vous/saviez-vous-7.png',
    '/images/saviez-vous/saviez-vous-8.png',
    '/images/saviez-vous/saviez-vous-9.png',
    '/images/saviez-vous/saviez-vous-10.png',
    '/images/saviez-vous/saviez-vous-11.png',
    '/images/saviez-vous/saviez-vous-12.png',
    '/images/saviez-vous/saviez-vous-13.png',
    '/images/saviez-vous/saviez-vous-14.png',
    '/images/saviez-vous/saviez-vous-15.png',
    '/images/saviez-vous/saviez-vous-16.png',
    '/images/saviez-vous/saviez-vous-17.png',
    '/images/saviez-vous/saviez-vous-18.png',
    '/images/saviez-vous/saviez-vous-19.png',
    '/images/saviez-vous/saviez-vous-20.png',
    '/images/saviez-vous/saviez-vous-21.png',
    '/images/saviez-vous/saviez-vous-22.png',
    '/images/saviez-vous/saviez-vous-23.png',
    '/images/saviez-vous/saviez-vous-24.png',
    '/images/saviez-vous/saviez-vous-25.png',
    '/images/saviez-vous/saviez-vous-26.png',
    '/images/saviez-vous/saviez-vous-27.png',
    '/images/saviez-vous/saviez-vous-28.png',
    '/images/saviez-vous/saviez-vous-29.png',
    '/images/saviez-vous/saviez-vous-30.png',
    '/images/saviez-vous/saviez-vous-31.png',
    '/images/saviez-vous/saviez-vous-32.png',
    '/images/saviez-vous/saviez-vous-33.png',
    '/images/saviez-vous/saviez-vous-34.png',
    '/images/saviez-vous/saviez-vous-35.png',
    '/images/saviez-vous/saviez-vous-36.png',
    '/images/saviez-vous/saviez-vous-37.png',
    '/images/saviez-vous/saviez-vous-38.png',
    '/images/saviez-vous/saviez-vous-39.png',
    '/images/saviez-vous/saviez-vous-40.png',
    '/images/saviez-vous/saviez-vous-41.png',
    '/images/saviez-vous/saviez-vous-42.png',
    '/images/saviez-vous/saviez-vous-43.png',
    '/images/saviez-vous/saviez-vous-44.png',
    '/images/saviez-vous/saviez-vous-45.png',
    '/images/saviez-vous/saviez-vous-46.png',
    '/images/saviez-vous/saviez-vous-47.png',
    '/images/saviez-vous/saviez-vous-48.png',
    '/images/saviez-vous/saviez-vous-49.png',
    '/images/saviez-vous/saviez-vous-50.png',
    '/images/saviez-vous/saviez-vous-51.png',
    '/images/saviez-vous/saviez-vous-52.png',
    '/images/saviez-vous/saviez-vous-53.png',
    '/images/saviez-vous/saviez-vous-54.png',
    '/images/saviez-vous/saviez-vous-55.png',
    '/images/saviez-vous/saviez-vous-56.png',
    '/images/saviez-vous/saviez-vous-57.png',
    '/images/saviez-vous/saviez-vous-58.png',
    '/images/saviez-vous/saviez-vous-59.png',
    '/images/saviez-vous/saviez-vous-60.png',
    '/images/saviez-vous/saviez-vous-61.png',
    '/images/saviez-vous/saviez-vous-62.png',
    '/images/saviez-vous/saviez-vous-63.png',
    '/images/saviez-vous/saviez-vous-64.png',
    '/images/saviez-vous/saviez-vous-65.png',
    '/images/saviez-vous/saviez-vous-66.png',
    '/images/saviez-vous/saviez-vous-67.png',
    '/images/saviez-vous/saviez-vous-68.png',
    '/images/saviez-vous/saviez-vous-69.png',
    '/images/saviez-vous/saviez-vous-70.png',
    '/images/saviez-vous/saviez-vous-71.png',
    '/images/saviez-vous/saviez-vous-72.png',
    '/images/saviez-vous/saviez-vous-73.png',
    '/images/saviez-vous/saviez-vous-74.png',
  ];

// 1. Mettre en cache les fichiers lors de l'installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. Intercepter les requêtes et répondre avec les fichiers en cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si la ressource est trouvée dans le cache, on la retourne
      if (response) {
        return response;
      }

      // Sinon, on la télécharge depuis le réseau
      return fetch(event.request).then((networkResponse) => {
        // Optionnel : ajouter les nouvelles requêtes réseau dans le cache
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

// 3. Mise à jour du service worker et suppression des anciens caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});