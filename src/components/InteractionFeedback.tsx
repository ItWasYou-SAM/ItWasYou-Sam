"use client";

import { useEffect } from "react";

let clickAudioContext: AudioContext | null = null;

function playInterfaceClick() {
  const AudioContextConstructor = window.AudioContext;
  if (!AudioContextConstructor) return;

  clickAudioContext ??= new AudioContextConstructor();
  const context = clickAudioContext;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(720, now);
  oscillator.frequency.exponentialRampToValueAtTime(420, now + 0.045);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.026, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.052);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.055);
}

export function InteractionFeedback() {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const interactive = target.closest<HTMLElement>("a, button, [role='button']");
      if (!interactive || interactive.closest(".panda-mascot")) return;

      const feedbackMode = interactive.dataset.clickFeedback;
      if (feedbackMode === "off") return;

      const ripple = document.createElement("span");
      ripple.className = "interface-click";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      ripple.setAttribute("aria-hidden", "true");
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });

      if (feedbackMode !== "visual-only") playInterfaceClick();
    };

    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return null;
}
