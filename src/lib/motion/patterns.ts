import { EASING_CURVES } from "./system";

export const PATTERN_CSS_TRANSITION_BUTTON = `
.button {
  transition: transform 120ms ${EASING_CURVES.standardOut}, opacity 120ms ${EASING_CURVES.standardOut};
}
.button:active { transform: scale(0.97); }
`;

export const PATTERN_CSS_KEYFRAMES_ENTRANCE = `
@keyframes rise-in {
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.reveal { animation: rise-in 420ms ${EASING_CURVES.entrance} both; }
`;

export const PATTERN_CSS_SCROLL_DRIVEN = `
@supports (animation-timeline: scroll()) {
  .fade-on-scroll {
    animation: fade-scroll linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
}
@keyframes fade-scroll {
  from { opacity: 0; transform: translate3d(0, 20px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
`;

export const PATTERN_FRAMER_MOTION = `
import { motion } from "framer-motion";

export function StaggerList({ items }: { items: string[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
      }}
    >
      {items.map((t) => (
        <motion.li
          key={t}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.33, 1, 0.68, 1] } },
          }}
        >
          {t}
        </motion.li>
      ))}
    </motion.ul>
  );
}
`;

export const PATTERN_GSAP_SCROLLTRIGGER = `
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.from(".panel", {
  opacity: 0,
  y: 28,
  duration: 0.45,
  stagger: 0.06,
  ease: "power2.out",
  scrollTrigger: { trigger: ".panel-wrap", start: "top 80%", toggleActions: "play none none none" },
});
`;

export const PATTERN_REACT_SPRING = `
import { animated, useSpring } from "@react-spring/web";

function HoverLift() {
  const [springs, api] = useSpring(() => ({
    y: 0,
    config: { tension: 380, friction: 30 },
  }));
  return (
    <animated.div
      style={springs}
      onMouseEnter={() => api.start({ y: -4 })}
      onMouseLeave={() => api.start({ y: 0 })}
    />
  );
}
`;

export const PATTERN_LOTTIE = `
import lottie, { type AnimationItem } from "lottie-web";

let inst: AnimationItem | undefined;
export function mountLottie(container: HTMLElement, data: object) {
  inst = lottie.loadAnimation({ container, renderer: "svg", loop: false, autoplay: false, animationData: data });
}
export function playIntro() {
  inst?.goToAndPlay(0, true);
}
`;

export const PATTERN_RIVE = `
import { Rive, Layout, Fit, Alignment } from "@rive-app/canvas";

const r = new Rive({
  src: "/anim.riv",
  canvas: document.getElementById("rive") as HTMLCanvasElement,
  autoplay: true,
  layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
});
`;

export const PATTERN_VIEW_TRANSITIONS_API = `
document.querySelectorAll("a[data-vt]").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (!(e.currentTarget instanceof HTMLAnchorElement)) return;
    if (!document.startViewTransition) return;
    e.preventDefault();
    const href = e.currentTarget.href;
    document.startViewTransition(() => { window.location.href = href; });
  });
});
`;

export const PATTERN_INTERSECTION_OBSERVER = `
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
);
document.querySelectorAll("[data-io-reveal]").forEach((el) => io.observe(el));
`;

export const PATTERN_CSS_3D_CARD = `
.card-wrap { perspective: 900px; }
.card {
  transform-style: preserve-3d;
  transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.card:hover { transform: rotateX(6deg) rotateY(-8deg) translateZ(0); }
`;
