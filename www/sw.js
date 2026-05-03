const CACHE_NAME = 'cotizador-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Agrega aquí todas tus imágenes de la carpeta img
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
'./img/cremadia.png',
'./img/gelcorporal.png',
'./img/aloecrema.png',
'./img/skinexfoliante.png',
'./img/skinlimpiador.png',
'./img/skinmascarilla.png',
'./img/skinserum.png',
'./img/skintonificador.png',

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