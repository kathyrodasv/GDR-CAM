const CACHE_NAME = 'gdr-cam-v40';
const urlsToCache = [
  './',
  'index.html',
  'app.js',
  'style.css',
  'exif.js',
  'piexif.js',
  'img/LOGO GDR.jpeg',
  'img/icon-512x512.png',
  'img/ECUACORRIENTE.png',
  'manifest.json'
];

// Install a service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    // Try multiple cache strategies to ensure compatibility
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(urlsToCache)
          .then(() => {
            console.log('All assets cached successfully');
            // Skip waiting to allow the service worker to become active immediately
            self.skipWaiting();
          })
          .catch(error => {
            console.error('Failed to cache some assets:', error);
            // Still allow installation to proceed despite caching failures
            self.skipWaiting();
          });
      })
      .catch(error => {
        console.error('Failed to open cache during install:', error);
        // Even if cache opening fails, try to continue installation
        self.skipWaiting();
      })
  );
});

// Cache and return requests with improved strategy
self.addEventListener('fetch', (event) => {
  // Handle different types of requests with appropriate strategies
  if (event.request.destination === 'script' || 
      event.request.destination === 'style' || 
      event.request.destination === 'image' || 
      event.request.destination === 'document') {
    
    // Use cache-first strategy for static assets
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // Return cached version if available
          if (cachedResponse) {
            // Update cache in the background for future requests
            event.waitUntil(
              fetch(event.request)
                .then(networkResponse => {
                  if (networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME)
                      .then(cache => {
                        cache.put(event.request, responseToCache);
                      })
                      .catch(error => {
                        console.error('Failed to update cache:', error);
                      });
                  }
                })
                .catch(error => {
                  console.error('Failed to update cache from network:', error);
                })
            );
            return cachedResponse;
          }
          
          // If not in cache, fetch from network
          return fetch(event.request).then(networkResponse => {
            // If the response is valid, cache it for future use
            if (networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              
              // Don't cache external requests to avoid storage issues
              if (new URL(event.request.url).origin === self.location.origin) {
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  })
                  .catch(error => {
                    console.error('Failed to cache response:', error);
                  });
              }
            }
            
            return networkResponse;
          }).catch(error => {
            console.error('Network request failed for:', event.request.url, error);
            
            // For navigation requests (HTML pages), return the main page to keep the app functional
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            
            // For other asset requests, return error response
            return new Response('Network Error', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({ 'Content-Type': 'text/plain' })
            });
          });
        })
        .catch(error => {
          console.error('Cache lookup failed:', error);
          // If cache lookup fails, try network
          return fetch(event.request).then(networkResponse => {
            if (networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              
              // Don't cache external requests to avoid storage issues
              if (new URL(event.request.url).origin === self.location.origin) {
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  })
                  .catch(cacheError => {
                    console.error('Failed to cache response:', cacheError);
                  });
              }
            }
            
            return networkResponse;
          }).catch(networkError => {
            console.error('Network request also failed:', networkError);
            
            // For navigation requests, return the main page to keep the app functional
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            
            // For other requests, return error response
            return new Response('Network Error', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({ 'Content-Type': 'text/plain' })
            });
          });
        })
    );
  } else {
    // For other request types (like external APIs), use network-first strategy with cache fallback
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // If request succeeded, return it
          if (networkResponse.status === 200) {
            return networkResponse;
          }
          
          // If network response indicates an error, try cache
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || networkResponse;
            });
        })
        .catch(() => {
          // If network request fails, try cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // For navigation requests, return the main page to keep the app functional
              if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
              }
              
              // For other requests, return error response
              return new Response('Network Error', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({ 'Content-Type': 'text/plain' })
              });
            });
        })
    );
  }
});

// Update a service worker with improved cache management
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME && cacheName.startsWith('gdr-cam-'))
            .map(cacheName => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('Service worker activated and old caches cleaned');
        // Claim all clients to ensure the service worker takes control immediately
        return self.clients.claim();
      })
      .catch(error => {
        console.error('Error during activation:', error);
      })
  );
});

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});