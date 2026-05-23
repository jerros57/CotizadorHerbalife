// ============================================
// sw.js - Service Worker Cotizador Herbalife
// CAMBIA EL NÚMERO DE VERSIÓN CADA VEZ QUE
// ACTUALICES EL SITIO (ej: v3, v4, v5...)
// ============================================
const CACHE_NAME = 'herbalife-cache-v2';

const ARCHIVOS_A_CACHEAR = [
  './',
  './index.html',
  './manifest.json',
  './img/aloe.png',
  './img/barras.png',
  './img/batido.png',
  './img/betahearth.png',
  './img/beverage.png',
  './img/colageno.png',
  './img/cr7.png',
  './img/fibra.png',
  './img/golden.png',
  './img/herbalifeline.png',
  './img/immunity.png',
  './img/liftoff.png',
  './img/memory.png',
  './img/multivitaminico.png',
  './img/niteworks.png',
  './img/nrg.png',
  './img/nutrisoup.png',
  './img/nutrimuffin.png',
  './img/pdm.png',
  './img/ppp.png',
  './img/probiotics.png',
  './img/rebuild.png',
  './img/relaxation.png',
  './img/te100.png',
  './img/techai.png',
  './img/xtracal.png',
  './img/nightmode.png',
  './img/cremadia.png',
  './img/gelcorporal.png',
  './img/aloecrema.png',
  './img/skinexfoliante.png',
  './img/skinlimpiador.png',
  './img/skinmascarilla.png',
  './img/skinserum.png',
  './img/skintonificador.png'
];

// --- INSTALACIÓN: guarda archivos en caché ---
self.addEventListener('install', event => {
  console.log('[SW] Instalando versión:', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARCHIVOS_A_CACHEAR);
    })
  );
  // Fuerza que este SW tome control inmediatamente
  self.skipWaiting();
});

// --- ACTIVACIÓN: borra cachés viejos ---
self.addEventListener('activate', event => {
  console.log('[SW] Activando versión:', CACHE_NAME);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Borrando caché viejo:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Toma control de todas las pestañas abiertas
  self.clients.claim();
});

// --- FETCH: sirve desde caché, si falla va a red ---
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(respuestaCacheada => {
      if (respuestaCacheada) {
        return respuestaCacheada;
      }
      return fetch(event.request).catch(() => {
        // Si no hay red y no está en caché, no hace nada
        console.warn('[SW] Sin red y sin caché para:', event.request.url);
      });
    })
  );
});
