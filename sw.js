const CACHE = 'officesync-v2';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html'])));
  self.skipWaiting();
});

self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

// Receive notification from main thread
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SHOW_NOTIF') {
    self.registration.showNotification(e.data.title, {
      body: e.data.body, icon: './icon.png', badge: './icon.png',
      requireInteraction: false, tag: e.data.title
    });
  }
  // Keep SW alive ping
  if (e.data && e.data.type === 'PING') {
    e.source.postMessage({ type: 'PONG' });
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./'));
});
