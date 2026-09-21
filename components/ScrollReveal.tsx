"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades every `.reveal` element in once it scrolls into view, so the sections
 * themselves can stay server components.
 *
 * This is mounted in the layout, which means it does NOT remount on a
 * client-side navigation — so it re-runs on `pathname` and re-queries the
 * document. Without that, a soft navigation leaves the new page's elements
 * unobserved and therefore invisible until a hard refresh.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (node: Element) => node.classList.add("is-in");

    const pending = () =>
      Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));

    const nodes = pending();
    if (nodes.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const track = (node: HTMLElement) => {
      // Anything already at or above the fold — including content scrolled
      // past on a restored position — never fires an intersection, so show it.
      if (node.getBoundingClientRect().top < window.innerHeight) {
        reveal(node);
        return;
      }
      observer.observe(node);
    };

    nodes.forEach(track);

    // Catch anything React mounts after this pass (route transitions, lazy UI).
    const mutations = new MutationObserver(() => {
      pending().forEach(track);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
