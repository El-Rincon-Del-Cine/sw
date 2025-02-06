if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', {scope: './'})
            .then(function(registration){
                console.log('Services Worker registrdo!!', registration);
            })
            .catch(function(err) {
                console.log('Error al registrar el service worker', error);
            });
        }
