"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useMounted() {
  return React.useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const playThemeSound = React.useCallback(() => {
    const audio = new Audio("/sounds/switch.mp3");
    audio.volume = 0.35;
    void audio.play().catch(() => undefined);
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    playThemeSound();

    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (documentWithTransition.startViewTransition) {
      documentWithTransition.startViewTransition(() => setTheme(nextTheme));
    } else {
      setTheme(nextTheme);
    }
  };

  return (
    <button
      className={`theme-toggle ${className}`}
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={!isDark}
      title={`Switch to ${isDark ? "light" : "dark"} theme — sound on`}
      data-click-feedback="visual-only"
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb">{isDark ? "☾" : "☼"}</span>
      </span>
      <span className="theme-toggle__label">{isDark ? "Night" : "Day"}</span>
    </button>
  );
}
