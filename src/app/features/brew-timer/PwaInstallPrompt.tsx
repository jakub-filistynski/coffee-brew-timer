"use client";

import { useEffect, useState } from "react";
import styles from "./BrewTimerHome.module.css";

type InstallChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

interface DeferredInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<InstallChoice>;
}

function isRunningStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
}

export function PwaInstallPrompt() {
  const [installPrompt, setInstallPrompt] =
    useState<DeferredInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [hasDismissedPrompt, setHasDismissedPrompt] = useState(false);

  useEffect(() => {
    setIsInstalled(isRunningStandalone());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setHasDismissedPrompt(false);
      setInstallPrompt(event as DeferredInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setHasDismissedPrompt(false);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const description = isInstalled
    ? "The timer is installed and ready for quick launches while you brew."
    : installPrompt
      ? "Install the timer for faster access, fullscreen brewing, and offline use."
      : hasDismissedPrompt
        ? "You can still install the timer later from your browser’s install or share menu."
        : "Use your browser’s install or share menu to add the timer to your home screen.";

  const handleInstall = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();

    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    setHasDismissedPrompt(choice.outcome === "dismissed");
  };

  return (
    <section className={styles.installCard} aria-live="polite">
      <div>
        <p className={styles.installEyebrow}>Progressive Web App</p>
        <h2 className={styles.installTitle}>
          Keep the brew timer on your home screen
        </h2>
        <p className={styles.installText}>{description}</p>
      </div>

      <div className={styles.installActions}>
        {installPrompt ? (
          <button
            type="button"
            className={styles.installButton}
            onClick={() => void handleInstall()}
          >
            Install app
          </button>
        ) : (
          <span className={styles.installBadge}>
            {isInstalled ? "Installed" : "Offline ready"}
          </span>
        )}

        <p className={styles.installHint}>
          The timer keeps working offline after the first visit.
        </p>
      </div>
    </section>
  );
}
