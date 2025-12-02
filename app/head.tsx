export default function Head() {
  return (
    <>
      <meta name="application-name" content="Blefador" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      {/* ios splash screens */}
      <link rel="apple-touch-startup-image" href="/icons/icon-512.png" />
    </>
  );
}
