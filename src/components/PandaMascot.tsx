"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 64;

export function PandaMascot() {
  const pandaRef = useRef<HTMLButtonElement>(null);
  const position = useRef({ x: 18, y: 92 });
  const target = useRef({ x: 18, y: 92 });
  const dragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pandaRef.current) {
      pandaRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
    }

    const clampTarget = (x: number, y: number) => {
      target.current = {
        x: Math.max(8, Math.min(window.innerWidth - SIZE - 8, x)),
        y: Math.max(72, Math.min(window.innerHeight - SIZE - 8, y)),
      };
    };

    const moveWithPointer = (event: PointerEvent) => {
      if (dragging.current) {
        clampTarget(event.clientX - SIZE / 2, event.clientY - SIZE / 2);
        if (reducedMotion && pandaRef.current) {
          position.current = target.current;
          pandaRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
        }
      }
    };

    const release = () => {
      dragging.current = false;
      setIsDragging(false);
    };

    const animate = () => {
      const ease = dragging.current ? 0.62 : reducedMotion ? 0.009 : 0.024;
      position.current.x += (target.current.x - position.current.x) * ease;
      position.current.y += (target.current.y - position.current.y) * ease;
      if (pandaRef.current) {
        pandaRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
      }
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", moveWithPointer, { passive: true });
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    const chooseDestination = () => {
      if (dragging.current) return;
      clampTarget(
        12 + Math.random() * Math.max(0, window.innerWidth - SIZE - 24),
        78 + Math.random() * Math.max(0, window.innerHeight - SIZE - 94),
      );
    };

    chooseDestination();
    const wander = window.setInterval(chooseDestination, reducedMotion ? 4800 : 2600);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(wander);
      window.removeEventListener("pointermove", moveWithPointer);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, []);

  function beginDrag(event: React.PointerEvent<HTMLButtonElement>) {
    dragging.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    target.current = {
      x: Math.max(8, Math.min(window.innerWidth - SIZE - 8, event.clientX - SIZE / 2)),
      y: Math.max(72, Math.min(window.innerHeight - SIZE - 8, event.clientY - SIZE / 2)),
    };
  }

  function moveWithKeyboard(event: React.KeyboardEvent<HTMLButtonElement>) {
    const movement: Record<string, [number, number]> = {
      ArrowLeft: [-16, 0],
      ArrowRight: [16, 0],
      ArrowUp: [0, -16],
      ArrowDown: [0, 16],
    };
    const delta = movement[event.key];
    if (!delta) return;
    event.preventDefault();
    target.current = {
      x: Math.max(8, Math.min(window.innerWidth - SIZE - 8, target.current.x + delta[0])),
      y: Math.max(72, Math.min(window.innerHeight - SIZE - 8, target.current.y + delta[1])),
    };
  }

  function returnHome() {
    target.current = { x: 18, y: 92 };
  }

  return (
    <button
      ref={pandaRef}
      type="button"
      className={`panda-mascot${isDragging ? " is-dragging" : ""}`}
      aria-label="Autonomous draggable panda mascot. Drag with a pointer or move with arrow keys. Double-click to send it home."
      title="I wander on my own — drag me!"
      onPointerDown={beginDrag}
      onKeyDown={moveWithKeyboard}
      onDoubleClick={returnHome}
    >
      <span className="panda-mascot__shadow" />
      <svg className="panda-mascot__body" viewBox="0 0 80 96" aria-hidden="true">
        <circle className="panda-mascot__tail" cx="65" cy="69" r="9" />
        <ellipse className="panda-mascot__torso" cx="40" cy="66" rx="24" ry="27" />
        <ellipse className="panda-mascot__belly" cx="40" cy="66" rx="15" ry="19" />
        <ellipse className="panda-mascot__leg panda-mascot__leg--left" cx="27" cy="87" rx="10" ry="7" />
        <ellipse className="panda-mascot__leg panda-mascot__leg--right" cx="53" cy="87" rx="10" ry="7" />
        <ellipse className="panda-mascot__paw panda-mascot__paw--left" cx="15" cy="63" rx="7" ry="15" transform="rotate(20 15 63)" />
        <ellipse className="panda-mascot__paw panda-mascot__paw--right" cx="65" cy="63" rx="7" ry="15" transform="rotate(-20 65 63)" />
        <circle className="panda-mascot__ear" cx="22" cy="19" r="11" />
        <circle className="panda-mascot__ear" cx="58" cy="19" r="11" />
        <path className="panda-mascot__head" d="M14 35C14 16 25 9 40 9s26 7 26 26c0 17-10 28-26 28S14 52 14 35Z" />
        <ellipse className="panda-mascot__patch" cx="29" cy="35" rx="8" ry="10" transform="rotate(20 29 35)" />
        <ellipse className="panda-mascot__patch" cx="51" cy="35" rx="8" ry="10" transform="rotate(-20 51 35)" />
        <circle className="panda-mascot__eye" cx="30" cy="35" r="2.4" />
        <circle className="panda-mascot__eye" cx="50" cy="35" r="2.4" />
        <path className="panda-mascot__nose" d="M35 45c3-2 7-2 10 0-1 5-9 5-10 0Z" />
        <path className="panda-mascot__mouth" d="M40 49v4m0 0c-4 0-5-3-5-3m5 3c4 0 5-3 5-3" />
      </svg>
    </button>
  );
}
