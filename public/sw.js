const CACHE_NAME = 'mobiceolin-offline-v1';
const urlsToCache = [
  '/',
  '/index.html', // Ajuste para o nome do seu arquivo HTML principal, se for diferente
  '/styles/main.css', // Ajuste para o caminho do seu arquivo CSS
  '/scripts/main.js', // Ajuste para o caminho do seu arquivo JavaScript
  '/images/logo.png', // Ajuste para o caminho de suas imagens importantes
  // Adicione aqui outros arquivos estáticos que você deseja armazenar em cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache match - fetch from network
        return fetch(event.request);
      })
  );
});

// Opcional: Limpar caches antigos durante a ativação
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
