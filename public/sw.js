// const CACHE_NAME = 'next-pwa-cache-v1';
// const OFFLINE_URL = '/offline';

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll([
//         '/',
//         '/offline',
//         '/manifest.json',
//         '/image/512x512.png',
//         '/image/192x192.png',
//       ]);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request).catch(() => {
//         return caches.match(OFFLINE_URL);
//       });
//     })
//   );
// });


self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/favicon.ico',
      badge: '/image/favicon-16x16.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})
 
self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  event.notification.close()
  event.waitUntil(clients.openWindow('https://ppoint.vercel.app/'))
})