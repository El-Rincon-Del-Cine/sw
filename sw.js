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
                './imagenes/valor.png',
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.06702196738!2d-99.23779302540879!3d20.13125131800007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d3d4fe19ff8255%3A0xffaabb1ef338a3ef!2sEscuela%20Superior%20de%20Tlahuelilpan%20UAEH!5e0!3m2!1ses-419!2smx!4v1713744368756!5m2!1ses-419!2smx'
]

self.addEventListener('install', function(e) {
    console.log('Service Worker: Instalado');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Service Worker: Cache abierto');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e) {
    console.log('Service Worker: Activado');
    e.waitUntil()(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                   if(thisCacheName !== CACHE_NAME) {
                    console.log('Service Worker: Cache viejo eliminado', thisCacheName);
                    return caches.delete(thisCacheName);
                   }
            }))
        })
    )
})

self.addEventListener('fetch', function(e) {
    console.log('Service Worker: Fetching', e.request.url);
    
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Cache encontrada', e.request.url);
                return response;
            }
            var requestClone = e.request.clone();
            fetch(requestClone).then(function(response) {
                if(!response){
                    console.log('No se encontro respuesta');
                    return response;
                }
                var responseClone = response.clone();
                
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(e.request, responseClone);
                    return response;
                });
            })
            .catch(function(err){
                console.log('Error al hacer fetch', err);
            })
        })
    )
})