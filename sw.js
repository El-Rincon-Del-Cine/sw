const CACHE_NAME = "mi-app-cache-v3";
const ASSETS = [
    "/",
    "/index.html",
    "/estilos.css",
    "/app.js",
    "/sw.js",
    "/imagenes/1.jpg",
    "/imagenes/2.jpg",
    "/imagenes/3.jpg",
    "/imagenes/4.jpg",
    "/imagenes/5.jpg",
    "/imagenes/profesional.jpg",
    "/imagenes/Software.jpg",
    "/imagenes/tla.jpg",
    "/imagenes/unam.jpg",
    "/imagenes/valor.png",
    "/imagenes/actitud.png",
    "/imagenes/beca.png",
    "/imagenes/benemerita.png",
    "/imagenes/conocimiento.png",
    "/imagenes/escudo.png",
    "/imagenes/escuelassuperior.png",
    "/imagenes/graduacion.png",
    "/imagenes/icon.png",
    "/imagenes/icono1.png",
    "/imagenes/icono2.png",
    "/imagenes/inicio_cap.png",
    "/imagenes/itson.png",
    "/imagenes/logo_unam.png",
    "/imagenes/mujer-removebg-preview.png",
    "/imagenes/multitalentoso.png",
    "/imagenes/papeleria.png",
    "/imagenes/par_students_removebg_preview.png",
    "/imagenes/plan_cap.png",
    "/imagenes/planeta-tierra.png",
    "/imagenes/public-service.png",
    "/offline.html" 
];

// Instalación
self.addEventListener("install", (event) => {
    console.log("Service Worker: Instalando...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Cacheando archivos esenciales...");
            return cache.addAll(ASSETS);
        })
    );
});

// Activación
self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activado");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cache) => cache !== CACHE_NAME)
                    .map((cache) => caches.delete(cache))
            );
        })
    );
});

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => caches.match("/offline.html"));
        })
    );
});
