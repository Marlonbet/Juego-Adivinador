// Nombre de la caché
const CACHE_NAME = 'app-cache-v1';

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
});

// Interceptar las solicitudes de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Devuelve el archivo desde la caché si está disponible, de lo contrario lo descarga
      return response || fetch(event.request);
    })
  );
});
