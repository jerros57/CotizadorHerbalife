const CACHE_NAME = 'cotizador-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Agrega aquí todas tus imágenes de la carpeta img
  './img/aloe.png',
  './img/batido.png',
  './img/pdm.png' 
];

// Instalación y almacenamiento en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Estrategia: Network First (Busca en GitHub, si no hay internet, usa el caché)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});