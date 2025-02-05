if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Services Worker registrdo!!', registration);
            })
            .catch(error => {
                console.log('Error al registrar el service worker', error);
            });
        }
