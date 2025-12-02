const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?:.*\/icons\/.*\.(?:png|jpg|jpeg|svg|webp)$/,
      handler: 'CacheFirst',
      options: { cacheName: 'images-cache', expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 } }
    },
    {
      urlPattern: /^https?:.*\.(?:js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'static-resources', expiration: { maxEntries: 200 } }
    },
    {
      urlPattern: /^https?:.*\/(api)\//,
      handler: 'NetworkFirst',
      options: { cacheName: 'api-cache', networkTimeoutSeconds: 10 }
    }
  ]
});

module.exports = withPWA({
  reactStrictMode: true,
});
