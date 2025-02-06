const CACHE_NAME = 'mi-cache-v1';

self.addEventListener('install', event => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return Promise.all([
                '/',
                '/index.html',
                '/estilos.css',
                '/manifest.json',
                '/oferta_educativa.html',
                '/ofertaE.css',
                '/plan.css',
                '/plan.html',
                '/Ubicacion.html',
                '/Contactanos.html',
                '/imagenes/1.jpg',
                '/imagenes/2.jpg',
                '/imagenes/3.jpg',
                '/imagenes/4.jpg',
                '/imagenes/5.jpg',
                '/imagenes/actitud.png',
                '/imagenes/beca.png',
                '/imagenes/benemerita.png',
                '/imagenes/conocimiento.png',
                '/imagenes/escudo.png',
                '/imagenes/escuelasuperior.png',
                '/imagenes/graduacion.png',
                '/imagenes/icon.png',
                '/imagenes/icono1.png',
                '/imagenes/icono2.png',
                '/imagenes/inicio_cap.png',
                '/imagenes/itson.png',
                '/imagenes/logo_unam.png',
                '/imagenes/mujer-removebg-preview.png',
                '/imagenes/multitalentoso.png',
                '/imagenes/papeleria.png',
                '/imagenes/par_students-removebg-preview.png',
                '/imagenes/plan_cap.png',
                '/imagenes/planeta-tierra.png',
                '/imagenes/profesional.jpg',
                '/imagenes/public-service.png',
                '/imagenes/Software.jpg',
                '/imagenes/tia.jpg',
                '/imagenes/unam.jpg',
                '/imagenes/valor.png'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activado');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Limpiando cache antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();  
});

self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching', event.request.url);
    
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch((error) => {
            console.error('Fetch failed; regresa al offline.', error);
        })
    );
});
