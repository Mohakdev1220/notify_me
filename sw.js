const CACHE = 'officesync-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['/', '/index.html']))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// Background periodic check via message from main thread
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_CHECK') {
    const { slots, notifBefore } = e.data;
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();

    slots.forEach(s => {
      const [h, m] = s.startTime.split(':').map(Number);
      const slotMins = h * 60 + m;
      const diff = slotMins - nowMins;

      if (diff === notifBefore) {
        self.registration.showNotification(`⏰ ${s.label} in ${notifBefore} min`, {
          body: `Starting at ${s.startTime} — get ready!`,
          icon: '/icon.png',
          badge: '/icon.png',
          tag: `slot-${s.startTime}`,
          requireInteraction: false
        });
      }

      if (diff === 0) {
        self.registration.showNotification(`📢 ${s.label} starting now!`, {
          body: `It's ${s.startTime}`,
          tag: `slot-now-${s.startTime}`,
          requireInteraction: true
        });
      }
    });
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
