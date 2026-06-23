"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroCanvas() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const heroCanvas = heroCanvasRef.current;
    const fxCanvas = fxCanvasRef.current;
    if (!heroCanvas || !fxCanvas) return;

    gsap.registerPlugin(ScrollTrigger);

    const hctx = heroCanvas.getContext("2d");
    const fctx = fxCanvas.getContext("2d");
    if (!hctx || !fctx) return;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const P = 0.55;
    let lastP = 0;
    let rafId = 0;
    let fxT = 0;
    const triggers: ScrollTrigger[] = [];

    const size = (canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * DPR);
      canvas.height = Math.max(1, rect.height * DPR);
    };

    size(heroCanvas);
    size(fxCanvas);

    const rnd = (i: number, n: number) => {
      const x = Math.sin(i * 53.7 + n * 31.4) * 9871.23;
      return x - Math.floor(x);
    };

    const bokeh = Array.from({ length: 26 }, (_, i) => ({
      x: rnd(i, 1),
      y: rnd(i, 2),
      z: rnd(i, 3),
      s: 8 + rnd(i, 4) * 34,
      hue: rnd(i, 5),
    }));

    const motes = Array.from({ length: 16 }, (_, i) => ({
      x: rnd(i, 7),
      y: rnd(i, 8),
      vy: -0.00006 - rnd(i, 9) * 0.00012,
      s: 2 + rnd(i, 10) * 4,
      ph: rnd(i, 11) * 6.28,
    }));

    const drawFrame = (p: number) => {
      const w = heroCanvas.width;
      const h = heroCanvas.height;
      hctx.clearRect(0, 0, w, h);

      const base = hctx.createLinearGradient(0, 0, 0, h);
      base.addColorStop(0, "#221A12");
      base.addColorStop(0.55, "#1C160F");
      base.addColorStop(1, "#15100A");
      hctx.fillStyle = base;
      hctx.fillRect(0, 0, w, h);

      const gx = w * (0.72 - p * 0.16);
      const gy = h * (0.82 - p * 0.5);
      const warm = hctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * (0.55 + p * 0.22));
      warm.addColorStop(0, `rgba(200,170,124,${0.3 + p * 0.12})`);
      warm.addColorStop(0.4, `rgba(156,132,102,${0.12 + p * 0.05})`);
      warm.addColorStop(1, "rgba(156,132,102,0)");
      hctx.fillStyle = warm;
      hctx.fillRect(0, 0, w, h);

      const cx = w * (0.15 + p * 0.16);
      const cy = h * 0.2;
      const cool = hctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.5);
      cool.addColorStop(0, "rgba(60,110,80,0.24)");
      cool.addColorStop(1, "rgba(60,110,80,0)");
      hctx.fillStyle = cool;
      hctx.fillRect(0, 0, w, h);

      for (const b of bokeh) {
        const bx = (((b.x - p * 0.5 * P * b.z) % 1) + 1) % 1 * w;
        const by = b.y * h + Math.sin(p * 6 + b.z * 9) * 8 * DPR;
        const rad = b.s * DPR * (0.5 + b.z * 0.8) * (0.7 + p * 0.5);
        const col =
          b.hue > 0.55 ? "216,185,136" : b.hue > 0.28 ? "200,170,124" : "150,134,112";
        const bg = hctx.createRadialGradient(bx, by, 0, bx, by, rad);
        bg.addColorStop(0, `rgba(${col},${0.045 + b.z * 0.06})`);
        bg.addColorStop(1, `rgba(${col},0)`);
        hctx.fillStyle = bg;
        hctx.beginPath();
        hctx.arc(bx, by, rad, 0, 7);
        hctx.fill();
      }

      const v = hctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.35,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.75,
      );
      v.addColorStop(0, "rgba(21,16,10,0)");
      v.addColorStop(1, "rgba(18,12,7,0.62)");
      hctx.fillStyle = v;
      hctx.fillRect(0, 0, w, h);
      lastP = p;
    };

    drawFrame(0);

    const drawSteam = () => {
      fxT += 0.016;
      const w = fxCanvas.width;
      const h = fxCanvas.height;
      fctx.clearRect(0, 0, w, h);

      for (const m of motes) {
        m.y = ((m.y + m.vy) % 1 + 1) % 1;
        const a = 0.04 + 0.1 * Math.abs(Math.sin(fxT * 0.6 + m.ph));
        const x = m.x * w + Math.sin(fxT * 0.5 + m.ph) * 10 * DPR;
        const y = m.y * h;
        const r = m.s * DPR * 6;
        const g = fctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(232,220,198,${a})`);
        g.addColorStop(1, "rgba(232,220,198,0)");
        fctx.fillStyle = g;
        fctx.beginPath();
        fctx.arc(x, y, r, 0, 7);
        fctx.fill();
      }

      rafId = requestAnimationFrame(drawSteam);
    };

    const onResize = () => {
      size(heroCanvas);
      size(fxCanvas);
      drawFrame(lastP);
    };

    window.addEventListener("resize", onResize);

    if (!reducedMotion) {
      rafId = requestAnimationFrame(drawSteam);

      const canvasTrigger = ScrollTrigger.create({
        trigger: "#top",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate(self) {
          drawFrame(self.progress);
        },
      });
      triggers.push(canvasTrigger);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

  return (
    <>
      <canvas
        ref={heroCanvasRef}
        id="heroCanvas"
        className="absolute inset-0 z-0 h-full w-full"
        aria-hidden
      />
      <canvas
        ref={fxCanvasRef}
        id="fxCanvas"
        className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
        aria-hidden
      />
    </>
  );
}
