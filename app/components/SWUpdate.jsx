
"use client";
import { useEffect, useState } from "react";

export default function SWUpdate() {
  const [waitingSW, setWaitingSW] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker?.addEventListener('controllerchange', () => {
        // The new service worker has taken control
      });

      navigator.serviceWorker.getRegistration().then(reg => {
        if (!reg) return;
        if (reg.waiting) {
          setWaitingSW(reg.waiting);
          setShow(true);
        }
        reg.addEventListener('updatefound', () => {
          const newSW = reg.installing;
          newSW.addEventListener('statechange', () => {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingSW(newSW);
              setShow(true);
            }
          });
        });
      });
    }
  }, []);

  function applyUpdate() {
    if (!waitingSW) return;
    waitingSW.postMessage({ type: 'SKIP_WAITING' });
    setShow(false);
    // reload to activate new SW
    window.location.reload();
  }

  if (!show) return null;
  return (
    <div className="toast">
      <div className="bg-gray-900 text-white px-4 py-3 rounded shadow-lg flex items-center space-x-3">
        <div>
          <strong>Nova versão disponível</strong>
          <div className="text-sm text-gray-300">Atualize para ver melhorias.</div>
        </div>
        <div className="ml-3">
          <button onClick={applyUpdate} className="bg-yellow-500 text-black px-3 py-1 rounded font-bold">Atualizar</button>
        </div>
      </div>
    </div>
  );
}
