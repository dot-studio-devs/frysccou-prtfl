export function prefersReducedMotion(): boolean {
  if (typeof document === "undefined") return false;
  return (
    document.documentElement.getAttribute("data-reduced-motion") === "true" ||
    (typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  );
}

export const portfolioScrollMotion = {
  header: { duration: 0.48, ease: "power2.out" as const, y: 40 },
  items: { duration: 0.38, stagger: 0.045, ease: "power2.out" as const, y: 28 },
  block: { duration: 0.52, ease: "power2.out" as const, y: 32 },
} as const;

export const portfolioHeroMotion = {
  ease: "power3.out" as const,
  itemDuration: 0.35,
  stagger: 0.022,
} as const;
