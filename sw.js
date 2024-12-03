// Nombre de la caché
const CACHE_NAME = 'app-cache-v2';

// Archivos que se almacenarán en caché
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/adivina-numero.html',
  '/adivina-numero.css',
  '/adivina-numero.js',
  '/adivina-palabra.html',
  '/adivina-palabra.css',
  '/adivina-palabra.js'
];

// Instalar el Service Worker y agregar los archivos a la caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Archivos cacheados');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // Fuerza al Service Worker a activarse inmediatamente
});

// Activar el Service Worker y eliminar cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Caché antiguo eliminado:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Permite que el SW tome el control de la página activa
});

// Interceptar las solicitudes de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Devuelve el archivo desde la caché si está disponible, de lo contrario lo descarga
      return (
        response ||
        fetch(event.request).then(fetchResponse => {
          // Opcional: Cachea nuevos archivos obtenidos de la red
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    }).catch(() => {
      // Opcional: Devuelve una página de error personalizada si no hay conexión
      if (event.request.destination === 'document') {
        return caches.match('/offline.html'); // Crea una página "offline.html" personalizada
      }
    })
  );
});
