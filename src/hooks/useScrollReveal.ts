"use client";

import { useEffect } from "react";

type RevealGroup = {
  el: Element;
  children: Element[];
  stagger: boolean;
};

export function useScrollReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const groups: RevealGroup[] = [];

    document.querySelectorAll("[data-rv]").forEach((el) => {
      groups.push({ el, children: [el], stagger: false });
    });

    document.querySelectorAll("[data-rv-group]").forEach((el) => {
      groups.push({
        el,
        children: Array.from(el.children),
        stagger: true,
      });
    });

    groups.forEach(({ children, stagger }) => {
      children.forEach((child, index) => {
        child.classList.add(stagger ? "reveal-hidden-stagger" : "reveal-hidden");
        if (stagger) {
          (child as HTMLElement).style.transitionDelay = `${index * 0.09}s`;
        }
      });
    });

    const reveal = (group: RevealGroup) => {
      group.children.forEach((child) => child.classList.add("reveal-visible"));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const group = groups.find((g) => g.el === entry.target);
          if (group) {
            reveal(group);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -2% 0px", threshold: 0.01 },
    );

    groups.forEach((group) => observer.observe(group.el));

    const checkVisibleGroups = () => {
      groups.forEach((group) => {
        const rect = group.el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.98 && rect.bottom > 0) {
          reveal(group);
          observer.unobserve(group.el);
        }
      });
    };

    requestAnimationFrame(checkVisibleGroups);
    window.addEventListener("scroll", checkVisibleGroups, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkVisibleGroups);
    };
  }, [enabled]);
}
