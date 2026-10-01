"use client";

import { useEffect, useRef } from "react";

const CANVAS_SIZE = 480;
const SAMPLE_SIZE = 120;
const CURSOR_RADIUS = 54;

type Particle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  delay: number;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function colorDistance(red: number, green: number, blue: number, target: [number, number, number]) {
  return Math.hypot(red - target[0], green - target[1], blue - target[2]);
}

function getBackgroundMask(pixels: ImageData) {
  const data = pixels.data;
  const edge = 7;
  let red = 0;
  let green = 0;
  let blue = 0;
  let samples = 0;

  for (let y = 0; y < SAMPLE_SIZE; y += 1) {
    for (let x = 0; x < SAMPLE_SIZE; x += 1) {
      if (x >= edge && x < SAMPLE_SIZE - edge && y >= edge && y < SAMPLE_SIZE - edge) continue;
      const offset = (y * SAMPLE_SIZE + x) * 4;
      red += data[offset];
      green += data[offset + 1];
      blue += data[offset + 2];
      samples += 1;
    }
  }

  const background: [number, number, number] = [red / samples, green / samples, blue / samples];
  const mask = new Uint8Array(SAMPLE_SIZE * SAMPLE_SIZE);
  const queue = new Int32Array(SAMPLE_SIZE * SAMPLE_SIZE);
  let head = 0;
  let tail = 0;

  function enqueue(x: number, y: number) {
    if (x < 0 || x >= SAMPLE_SIZE || y < 0 || y >= SAMPLE_SIZE) return;
    const index = y * SAMPLE_SIZE + x;
    if (mask[index]) return;
    const offset = index * 4;
    if (colorDistance(data[offset], data[offset + 1], data[offset + 2], background) > 72) return;
    mask[index] = 1;
    queue[tail] = index;
    tail += 1;
  }

  for (let coordinate = 0; coordinate < SAMPLE_SIZE; coordinate += 1) {
    enqueue(coordinate, 0);
    enqueue(coordinate, SAMPLE_SIZE - 1);
    enqueue(0, coordinate);
    enqueue(SAMPLE_SIZE - 1, coordinate);
  }

  while (head < tail) {
    const index = queue[head];
    head += 1;
    const x = index % SAMPLE_SIZE;
    const y = Math.floor(index / SAMPLE_SIZE);
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }

  return mask;
}

export function ParticlePortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const portraitCanvas = canvas;
    const ctx = context;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = SAMPLE_SIZE;
    sampleCanvas.height = SAMPLE_SIZE;
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
    if (!sampleContext) return;

    const pointer = { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2, active: false };
    const particles: Particle[] = [];
    let animationFrame = 0;
    let frame = 0;
    let disposed = false;
    const image = new window.Image();

    function drawSpiritSlash() {
      const duration = reducedMotion ? 28 : 48;
      if (frame > duration) return;
      const progress = Math.min(frame / (reducedMotion ? 22 : 38), 1);
      const fade = Math.sin(Math.min(1, frame / duration) * Math.PI);
      const tipX = -90 + progress * 720;
      const tipY = 440 - progress * 360;
      const tailX = tipX - 175;
      const tailY = tipY + 88;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.shadowBlur = 22;
      ctx.shadowColor = "rgba(180, 214, 157, .55)";
      ctx.strokeStyle = `rgba(166, 198, 143, ${fade * .28})`;
      ctx.lineWidth = 18 - progress * 10;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();
      ctx.shadowBlur = 8;
      ctx.strokeStyle = `rgba(244, 239, 217, ${fade * .92})`;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(tailX - 18, tailY + 9);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      for (let shard = 0; shard < 7; shard += 1) {
        const offset = seededRandom(shard * 31 + 7) * 150;
        const shardX = tipX - offset;
        const shardY = tipY + offset * .5 + (seededRandom(shard * 17) - .5) * 60;
        ctx.fillStyle = `rgba(216, 204, 172, ${fade * .42})`;
        ctx.fillRect(shardX, shardY, 10 + seededRandom(shard * 9) * 18, 1.4);
      }
      ctx.restore();
    }

    function paint() {
      frame += 1;
      ctx.fillStyle = "#0d0e0f";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      drawSpiritSlash();

      for (const particle of particles) {
        if (frame < particle.delay) continue;
        const assembling = frame < 90;
        const spring = assembling ? .05 : .014;
        particle.vx += (particle.homeX - particle.x) * spring;
        particle.vy += (particle.homeY - particle.y) * spring;

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < CURSOR_RADIUS) {
            const force = (1 - distance / CURSOR_RADIUS) * 7;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        particle.vx *= assembling ? .78 : .86;
        particle.vy *= assembling ? .78 : .86;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const reveal = Math.min(1, (frame - particle.delay + 1) / (reducedMotion ? 6 : 10));
        const drawSize = particle.size * reveal;
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, drawSize, drawSize);
      }

      if (!disposed) animationFrame = window.requestAnimationFrame(paint);
    }

    function updatePointer(event: PointerEvent) {
      const rect = portraitCanvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * CANVAS_SIZE;
      pointer.y = ((event.clientY - rect.top) / rect.height) * CANVAS_SIZE;
      pointer.active = true;
    }

    function leavePointer() {
      pointer.active = false;
    }

    image.onload = () => {
      sampleContext.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
      const pixels = sampleContext.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
      const backgroundMask = getBackgroundMask(pixels);
      const scale = CANVAS_SIZE / SAMPLE_SIZE;

      for (let y = 0; y < SAMPLE_SIZE; y += 1) {
        for (let x = 0; x < SAMPLE_SIZE; x += 1) {
          const index = y * SAMPLE_SIZE + x;
          if (backgroundMask[index]) continue;
          const offset = index * 4;
          const alpha = pixels.data[offset + 3];
          if (alpha < 80) continue;
          const red = pixels.data[offset];
          const green = pixels.data[offset + 1];
          const blue = pixels.data[offset + 2];
          const seed = index + 1;
          const homeX = (x + .5) * scale;
          const homeY = (y + .5) * scale;
          const direction = -.5;
          const travel = reducedMotion ? 90 + seededRandom(seed) * 120 : 250 + seededRandom(seed) * 420;
          const jitter = (seededRandom(seed * 2.37) - .5) * (reducedMotion ? 22 : 54);
          const startX = homeX - Math.cos(direction) * travel + jitter;
          const startY = homeY - Math.sin(direction) * travel + jitter * .35;
          const sweep = (homeX + (CANVAS_SIZE - homeY) * .42) / (CANVAS_SIZE * 1.42);
          const delay = reducedMotion ? Math.floor(seededRandom(seed * 5.1) * 6) : Math.floor(sweep * 34 + seededRandom(seed * 5.1) * 11);
          particles.push({
            homeX,
            homeY,
            x: startX,
            y: startY,
            vx: Math.cos(direction) * (reducedMotion ? 4 : 7 + seededRandom(seed * 3.11) * 4),
            vy: Math.sin(direction) * (reducedMotion ? 4 : 7 + seededRandom(seed * 4.73) * 4),
            size: scale + .35,
            color: `rgb(${red}, ${green}, ${blue})`,
            delay,
          });
        }
      }

      paint();
    };

    image.src = "/profile-ascii.jpg";
    portraitCanvas.addEventListener("pointermove", updatePointer);
    portraitCanvas.addEventListener("pointerenter", updatePointer);
    portraitCanvas.addEventListener("pointerleave", leavePointer);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      portraitCanvas.removeEventListener("pointermove", updatePointer);
      portraitCanvas.removeEventListener("pointerenter", updatePointer);
      portraitCanvas.removeEventListener("pointerleave", leavePointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-portrait"
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      aria-label="Interactive particle portrait of Shivam Singh"
      role="img"
    />
  );
}
