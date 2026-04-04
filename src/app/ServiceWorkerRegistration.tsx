"use client";

import { useEffect } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const registerServiceWorker = async () => {
      try {
        const scope = BASE_PATH ? `${BASE_PATH}/` : "/";

        await navigator.serviceWorker.register(`${BASE_PATH}/sw.js`, {
          scope,
        });
      } catch (error) {
        console.error("Service worker registration failed", error);
      }
    };

    void registerServiceWorker();
  }, []);

  return null;
}
