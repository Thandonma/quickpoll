"use client";

import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js") // Ensure it's fetching from public/
        .then((registration) => {
          console.log("Service Worker Registered with scope:", registration.scope);
        })
        .catch((err) => console.error("Service Worker registration failed:", err));
    }
  }, []);

  return null;
}
