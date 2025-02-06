var CACHE_NAME = 'v1';
var cacheFiles = [
    './',
    './index.html',
    './estilos.css',
    './manifest.json',
    './oferta_educativa.html',
    './ofertaE.css',
    './plan.css',
    './plan.html',
    './Ubicacion.html',
    './Contactanos.html',
    './imagenes/1.jpg',
    './imagenes/2.jpg',
    './imagenes/3.jpg',
    './imagenes/4.jpg',
    './imagenes/5.jpg',
    './imagenes/actitud.png',
    './imagenes/beca.png',
    './imagenes/benemerita.png',
    './imagenes/conocimiento.png',
    './imagenes/escudo.png',
    './imagenes/escuelasuperior.png',
    './imagenes/graduacion.png',
    './imagenes/icon.png',
    './imagenes/icono1.png',
    './imagenes/icono2.png',
    './imagenes/inicio_cap.png',
    './imagenes/itson.png',
    './imagenes/logo_unam.png',
    './imagenes/mujer-removebg-preview.png',
    './imagenes/multitalentoso.png',
    './imagenes/papeleria.png',
    './imagenes/par_students-removebg-preview.png',
    './imagenes/plan_cap.png',
    './imagenes/planeta-tierra.png',
    './imagenes/profesional.jpg',
    './imagenes/public-service.png',
    './imagenes/Software.jpg',
    './imagenes/tia.jpg',
    './imagenes/unam.jpg',
    './imagenes/valor.png'
    // ❌ Eliminado: Google Maps (no se puede cachear)
];

self.addEventListener('install', function(e) {
    console.log('Service Worker: Instalado');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Service Worker: Cache abierto');
            return cache.addAll(cacheFiles);
        }).catch(function(error) {
            console.error('Error al cachear archivos', error);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('Service Worker: Activado');
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(thisCacheName) {
                    if (thisCacheName !== CACHE_NAME) {
                        console.log('Service Worker: Cache viejo eliminado', thisCacheName);
                        return caches.delete(thisCacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log('Service Worker: Fetching', e.request.url);
    
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                console.log('Cache encontrada', e.request.url);
                return response;
            }

            var requestClone = e.request.clone();
            return fetch(requestClone).then(function(response) {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    console.log('No se encontró respuesta válida');
                    return response;
                }

                var responseClone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(e.request, responseClone);
                });

                return response;
            }).catch(function(err) {
                console.log('Error al hacer fetch', err);
            });
        })
    );
});
