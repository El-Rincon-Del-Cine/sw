self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open('mi-cache-v1').then(cache => {
            return cache.addAll([
                'index.html',
                'estilos.css',
                'manifest.json',
                'oferta_educativa.html',
                'ofertaE.css',
                'plan.css',
                'plan.html',
                'Ubicacion.html',
                'Contactanos.html',
                'imagenes/1.jpg',
                'imagenes/2.jpg',
                'imagenes/3.jpg',
                'imagenes/4.jpg',
                'imagenes/5.jpg',
                'imagenes/actitud.png',
                'imagenes/beca.png',
                'imagenes/benemerita.png',
                'imagenes/conocimiento.png',
                'imagenes/escudo.png',
                'imagenes/escuelasuperior.png',
                'imagenes/graduacion.png',
                'imagenes/icon.png',
                'imagenes/icono1.png',
                'imagenes/icono2.png',
                'imagenes/inicio_cap.png',
                'imagenes/itson.png',
                'imagenes/logo_unam.png',
                'imagenes/mujer-removebg-preview.png',
                'imagenes/multitalentoso.png',
                'imagenes/papeleria.png',
                'imagenes/par_students-removebg-preview.png',
                'imagenes/plan_cap.png',
                'imagenes/planeta-tierra.png',
                'imagenes/profesional.jpg',
                'imagenes/public-service.png',
                'imagenes/Software.jpg',
                'imagenes/tia.jpg',
                'imagenes/unam.jpg',
                'imagenes/valor.png'
            ].map(url =>
                    fetch(url) // Intentamos obtener cada archivo
                        .then(response => {
                            if (!response.ok) throw new Error(`Error al cargar ${url}`);
                            return cache.put(url, response.clone());
                        })
                        .catch(error => console.warn(`No se pudo cachear ${url}:`, error))
                )
            );
        })
    );
});



self.addEventListener('activate', event => {
    console.log('Service Worker: Activado');
    const cacheWhitelist = ['mi-cache-v1'];
    event.waitUntil(
         caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhitelist.indexOf(cacheName) === -1){
                        console.log('Limpiando cache antigua');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});     

self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        }).catch(() =>caches.match('/offline.html'))
    );
});
