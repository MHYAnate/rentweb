// // // // const CACHE_NAME = 'next-pwa-cache-v1';
// // // // const OFFLINE_URL = '/offline';

// // // // self.addEventListener('install', (event) => {
// // // //   event.waitUntil(
// // // //     caches.open(CACHE_NAME).then((cache) => {
// // // //       return cache.addAll([
// // // //         '/',
// // // //         '/offline',
// // // //         '/manifest.json',
// // // //         '/image/512x512.png',
// // // //         '/image/192x192.png',
// // // //       ]);
// // // //     })
// // // //   );
// // // // });

// // // // self.addEventListener('fetch', (event) => {
// // // //   event.respondWith(
// // // //     caches.match(event.request).then((response) => {
// // // //       return response || fetch(event.request).catch(() => {
// // // //         return caches.match(OFFLINE_URL);
// // // //       });
// // // //     })
// // // //   );
// // // // });


// // // self.addEventListener('push', function (event) {
// // //   if (event.data) {
// // //     const data = event.data.json()
// // //     const options = {
// // //       body: data.body,
// // //       icon: data.icon || '/favicon.ico',
// // //       badge: '/image/favicon-16x16.png',
// // //       vibrate: [100, 50, 100],
// // //       data: {
// // //         dateOfArrival: Date.now(),
// // //         primaryKey: '2',
// // //       },
// // //     }
// // //     event.waitUntil(self.registration.showNotification(data.title, options))
// // //   }
// // // })
 
// // // self.addEventListener('notificationclick', function (event) {
// // //   console.log('Notification click received.')
// // //   event.notification.close()
// // //   event.waitUntil(clients.openWindow('https://ppoint.vercel.app/'))
// // // })

// // // public/sw.js
// // const CACHE_NAME = 'properties-point-v1.3';
// // const urlsToCache = [
// //   '/',
// //   '/manifest.json',
// //   '/image/192x192.png',
// //   '/image/512x512.png',
// //  '/image/192x192.png'
// // ];

// // // Install event
// // self.addEventListener('install', (event) => {
// //   event.waitUntil(
// //     caches.open(CACHE_NAME)
// //       .then((cache) => cache.addAll(urlsToCache))
// //   );
// //   self.skipWaiting();
// // });

// // // Fetch event
// // self.addEventListener('fetch', (event) => {
// //   event.respondWith(
// //     caches.match(event.request)
// //       .then((response) => {
// //         // Return cached version or fetch from network
// //         return response || fetch(event.request);
// //       }
// //     )
// //   );
// // });

// // // Activate event
// // self.addEventListener('activate', (event) => {
// //   event.waitUntil(
// //     caches.keys().then((cacheNames) => {
// //       return Promise.all(
// //         cacheNames.map((cacheName) => {
// //           if (cacheName !== CACHE_NAME) {
// //             return caches.delete(cacheName);
// //           }
// //         })
// //       );
// //     })
// //   );
// //   self.clients.claim();
// // });

// // // Push Notification Event Handlers
// // self.addEventListener('push', function (event) {
// //   if (!event.data) return;

// //   let data;
// //   try {
// //     data = event.data.json();
// //   } catch (error) {
// //     console.error('Error parsing push data:', error);
// //     return;
// //   }

// //   const options = {
// //     body: data.body,
// //     icon: data.icon || '/image/192x192.png',
// //     badge: '/image/192x192.png',
// //     image: data.image,
// //     vibrate: [100, 50, 100],
// //     data: data.data || {},
// //     actions: [
// //       {
// //         action: 'view',
// //         title: 'View'
// //       },
// //       {
// //         action: 'dismiss',
// //         title: 'Dismiss'
// //       }
// //     ],
// //     tag: data.data?.propertyId || 'property-notification'
// //   };

// //   event.waitUntil(
// //     self.registration.showNotification(data.title, options)
// //   );
// // });

// // self.addEventListener('notificationclick', function (event) {
// //   event.notification.close();

// //   if (event.action === 'dismiss') {
// //     return;
// //   }

// //   // Default URL or use the one from notification data
// //   const urlToOpen = event.notification.data?.url || '/';

// //   event.waitUntil(
// //     clients.matchAll({ type: 'window' }).then((windowClients) => {
// //       // Check if there's already a window/tab open with the target URL
// //       for (let client of windowClients) {
// //         if (client.url.includes(urlToOpen) && 'focus' in client) {
// //           return client.focus();
// //         }
// //       }
// //       // If not, open a new window/tab
// //       if (clients.openWindow) {
// //         return clients.openWindow(urlToOpen);
// //       }
// //     })
// //   );
// // });

// // // Handle push subscription changes
// // self.addEventListener('pushsubscriptionchange', function (event) {
// //   event.waitUntil(
// //     self.registration.pushManager.subscribe({
// //       userVisibleOnly: true,
// //       applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
// //     }).then(function (subscription) {
// //       // Send new subscription to your server
// //       return fetch('/push/resubscribe', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           oldSubscription: event.oldSubscription,
// //           newSubscription: subscription
// //         })
// //       });
// //     })
// //   );
// // });



// // // In your service worker file or a shared utility
// // function urlBase64ToUint8Array(base64String) {
// //   const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
// //   const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
// //   const rawData = self.atob(base64);
// //   const buffer = new ArrayBuffer(rawData.length);
// //   const outputArray = new Uint8Array(buffer);
  
// //   for (let i = 0; i < rawData.length; ++i) {
// //     outputArray[i] = rawData.charCodeAt(i);
// //   }
// //   return outputArray;
// // }

// const CACHE_NAME = 'properties-point-v2.0';
// const urlsToCache = [
//   '/',
//   '/manifest.json',
//   '/image/192x192.png',
//   '/image/512x512.png',
//   '/offline'
// ];

// // Enhanced install event
// self.addEventListener('install', (event) => {
//   console.log('Service Worker installing');
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//       .then(() => self.skipWaiting())
//   );
// });

// // Enhanced fetch with network-first strategy
// self.addEventListener('fetch', (event) => {
//   // Only handle HTTP/HTTPS requests
//   if (!event.request.url.startsWith('http')) return;

//   event.respondWith(
//     fetch(event.request)
//       .then((response) => {
//         // Cache successful responses
//         if (response.status === 200) {
//           const responseToCache = response.clone();
//           caches.open(CACHE_NAME)
//             .then((cache) => {
//               cache.put(event.request, responseToCache);
//             });
//         }
//         return response;
//       })
//       .catch(() => {
//         // Fallback to cache when offline
//         return caches.match(event.request)
//           .then((response) => {
//             return response || caches.match('/offline');
//           });
//       })
//   );
// });

// // Enhanced push event handler for mobile compatibility
// self.addEventListener('push', function(event) {
//   if (!event.data) return;

//   let data;
//   try {
//     data = event.data.json();
//   } catch (error) {
//     console.error('Error parsing push data:', error);
//     // Fallback for simple text payloads
//     data = {
//       title: 'Properties Point',
//       body: event.data.text() || 'New notification',
//       icon: '/image/192x192.png'
//     };
//   }

//   const options = {
//     body: data.body,
//     icon: data.icon || '/image/192x192.png',
//     badge: '/image/192x192.png',
//     image: data.image,
//     vibrate: [100, 50, 100],
//     data: data.data || {},
//     actions: data.actions || [
//       {
//         action: 'view',
//         title: 'View'
//       },
//       {
//         action: 'dismiss',
//         title: 'Dismiss'
//       }
//     ],
//     tag: data.tag || 'property-notification',
//     requireInteraction: data.requireInteraction || false,
//     silent: data.silent || false
//   };

//   event.waitUntil(
//     self.registration.showNotification(data.title, options)
//   );
// });

// // Enhanced notification click handler
// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();

//   if (event.action === 'dismiss') {
//     return;
//   }

//   const urlToOpen = event.notification.data?.url || '/';
  
//   event.waitUntil(
//     clients.matchAll({ 
//       type: 'window',
//       includeUncontrolled: true 
//     }).then((windowClients) => {
//       // Check for existing tabs
//       for (let client of windowClients) {
//         if (client.url.includes(self.location.origin) && 'focus' in client) {
//           return client.navigate(urlToOpen).then(client => client.focus());
//         }
//       }
      
//       // Open new window if none exists
//       if (clients.openWindow) {
//         return clients.openWindow(urlToOpen);
//       }
//     })
//   );
// });

// // Handle push subscription changes
// self.addEventListener('pushsubscriptionchange', function(event) {
//   console.log('Push subscription changed');
//   event.waitUntil(
//     self.registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
//     }).then(function(newSubscription) {
//       return fetch('/push/resubscribe', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           oldSubscription: event.oldSubscription,
//           newSubscription: newSubscription
//         })
//       });
//     }).catch(error => {
//       console.error('Error resubscribing:', error);
//     })
//   );
// });

// // Utility function for VAPID key conversion
// function urlBase64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
//   const rawData = self.atob(base64);
//   const buffer = new ArrayBuffer(rawData.length);
//   const outputArray = new Uint8Array(buffer);
  
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

// // Activate event - clean up old caches
// self.addEventListener('activate', (event) => {
//   console.log('Service Worker activating');
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             console.log('Deleting old cache:', cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     }).then(() => self.clients.claim())
//   );
// });

// public/sw.js - Update your existing service worker
self.addEventListener('push', function (event) {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch (error) {
    console.error('Error parsing push data:', error);
    // Fallback for simple text notifications
    data = {
      title: 'Properties Point',
      body: event.data.text() || 'New notification',
      icon: '/image/192x192.png'
    };
  }

  const options = {
    body: data.body,
    icon: data.icon || '/image/192x192.png',
    badge: '/image/192x192.png',
    image: data.image,
    vibrate: [100, 50, 100],
    data: data.data || {},
    actions: [
      {
        action: 'view',
        title: 'View'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ],
    tag: data.tag || data.data?.propertyId || 'property-notification',
    // Cross-platform compatibility
    requireInteraction: false,
    silent: false
  };

  // Add platform-specific adjustments
  if (self.clients && self.clients.matchAll) {
    self.clients.matchAll().then(clients => {
      const isFocused = clients.some(client => client.visibilityState === 'visible');
      
      if (!isFocused) {
        options.vibrate = [200, 100, 200]; // More prominent vibration when app not focused
      }
    });
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});