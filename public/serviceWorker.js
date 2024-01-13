const websiteName = 'Personal-portfolio';
const websiteVersion = 'v1';
const websiteCache = `${websiteName}-${websiteVersion}`;
const image = [
    '/',
    '/index.html',
    'style.css',
    'script.js',
    'image/logo.png',
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(websiteCache).then((cache) => {
            cache.addAll(assets);
        })
    );
});

// fetch the assets from the cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cacheRes) => {
            return cacheRes || fetch(event.request);
        })
    );
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('serviceWorker.js')
            .then((reg) => console.log('Service Worker: Registered'))
            .catch((err) => console.log(`Service Worker: Error: ${err}`));
    });
}