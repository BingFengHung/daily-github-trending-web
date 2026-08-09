 const CACHE_NAME = 'docsify-pwa-v1';
    const urlsToCache = [
      './',
      './index.html',
      './README.md',
      './_sidebar.md',
      './manifest.json',
      '//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css',
      '//cdn.jsdelivr.net/npm/docsify@4/lib/docsify.min.js'
    ];

    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
      );
    });

    self.addEventListener('fetch', event => {
      event.respondWith(
        fetch(event.request)
          .then(response => {
            if (response && response.status === 200 && event.request.url.startsWith('http')) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
            }
            return response;
          })
          .catch(() => caches.match(event.request))
      );
    });
