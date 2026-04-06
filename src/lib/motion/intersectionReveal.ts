import { prefersReducedMotion } from "./runtime";

export function initIntersectionReveal(root: ParentNode = document): () => void {
  const nodes = root.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
  if (!nodes.length) return () => {};

  if (prefersReducedMotion()) {
    nodes.forEach((el) => el.classList.add("is-revealed"));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const raw = el.dataset.revealDelay;
        const ms = raw ? Math.max(0, parseInt(raw, 10) || 0) : 0;
        if (ms <= 0) el.classList.add("is-revealed");
        else window.setTimeout(() => el.classList.add("is-revealed"), ms);
        io.unobserve(el);
      });
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
  );

  nodes.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
