// Self-destroying service worker.
//
// This site does not use a service worker. This file exists only to unregister
// any stale service worker left in a visitor's browser from a previous version
// of the site (which could otherwise serve cached, out-of-date content) and to
// clear its caches. Browsers that never registered an old SW never request this.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", async () => {
  try {
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map((key) => caches.delete(key)));
  } catch {
    // ignore cache-clearing errors
  }

  await self.registration.unregister();

  // Reload any open tabs so they pick up fresh, un-cached content.
  const clients = await self.clients.matchAll({ type: "window" });
  for (const client of clients) {
    client.navigate(client.url);
  }
});
