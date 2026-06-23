"use client";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Historia } from "@/components/sections/Historia";
import { Menu } from "@/components/sections/Menu";
import { Espacio } from "@/components/sections/Espacio";
import { Resenas } from "@/components/sections/Resenas";
import { Visitanos } from "@/components/sections/Visitanos";
import { FAQ } from "@/components/sections/FAQ";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PageClient() {
  const reducedMotion = useReducedMotion();
  useScrollReveal(!reducedMotion);

  return (
    <SmoothScrollProvider>
      <div data-isla-root className="bg-cream text-ink">
        <Nav />
        <main>
          <Hero />
          <Historia />
          <Menu />
          <Espacio />
          <Resenas />
          <Visitanos />
          <FAQ />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
