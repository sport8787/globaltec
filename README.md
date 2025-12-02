Blefador PWA v3
- Enhanced PWA: icons, offline fallback, update prompt, runtime caching.
- To run:
  npm install
  npm run dev
- Build for production to enable SW:
  npm run build
  npm start
Notes:
- next-pwa disables service worker in development by default (configured).
- To test SW locally, run production build or set NODE_ENV=production.
