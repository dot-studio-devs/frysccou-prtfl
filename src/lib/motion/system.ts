export type MotionProductType =
  | "banking"
  | "ecommerce"
  | "kids"
  | "healthcare"
  | "creative_portfolio";

export const MOTION_PROFILES: Record<
  MotionProductType,
  {
    personality: string;
    easingPreference: string;
    durationBias: "short" | "medium" | "long";
    springiness: "none" | "low" | "medium" | "high";
    staggerMs: [number, number];
    notes: string;
  }
> = {
  banking: {
    personality: "Controlled, precise, no bounce; predictable stops.",
    easingPreference: "ease-out-cubic or custom cubic with flat tail; avoid elastic.",
    durationBias: "medium",
    springiness: "none",
    staggerMs: [40, 80],
    notes: "Micro-interactions feel firm; no playful overshoot; respect trust.",
  },
  ecommerce: {
    personality: "Snappy, non-blocking; cart and checkout feel instant.",
    easingPreference: "Strong ease-out, short durations; parallel where possible.",
    durationBias: "short",
    springiness: "low",
    staggerMs: [24, 56],
    notes: "Prefer transform/opacity; overlap stagger with short gaps.",
  },
  kids: {
    personality: "Playful springs, friendly overshoot; readable silhouettes.",
    easingPreference: "Spring or soft bounce; larger motion acceptable if gentle.",
    durationBias: "medium",
    springiness: "high",
    staggerMs: [48, 96],
    notes: "Keep primary tasks obvious; motion supports delight, not distraction.",
  },
  healthcare: {
    personality: "Calm, low amplitude, accessible; minimal vestibular load.",
    easingPreference: "Linearish ease-out, soft curves; avoid aggressive spin.",
    durationBias: "long",
    springiness: "none",
    staggerMs: [56, 120],
    notes: "Hierarchy through fade and slight translateY only; high contrast text.",
  },
  creative_portfolio: {
    personality: "Polished showcase: snappy entrances, editorial stagger, no bounce overload.",
    easingPreference: "Power2/3 out; tight sequences under 700ms per beat.",
    durationBias: "short",
    springiness: "low",
    staggerMs: [28, 56],
    notes: "Read as premium product UI: fast feedback, restrained flourishes.",
  },
} as const;

export const ELEMENT_DURATIONS_MS = {
  button: [100, 150],
  linkHover: [120, 180],
  chip: [140, 200],
  tooltip: [150, 220],
  dropdown: [180, 260],
  toast: [200, 320],
  sheet: [280, 400],
  modal: [300, 500],
  pageSection: [360, 560],
  routeTransition: [240, 400],
} as const;

export const EASING_CURVES = {
  linearOutSoft: "cubic-bezier(0.16, 1, 0.3, 1)",
  standardOut: "cubic-bezier(0.33, 1, 0.68, 1)",
  expressiveOut: "cubic-bezier(0.22, 1, 0.36, 1)",
  entrance: "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
  emphasized: "cubic-bezier(0.2, 0, 0, 1)",
} as const;

export const SPRING_PRESETS = {
  banking: { stiffness: 520, damping: 38, mass: 1 },
  ecommerce: { stiffness: 420, damping: 28, mass: 0.9 },
  kids: { stiffness: 280, damping: 18, mass: 1 },
  healthcare: { stiffness: 380, damping: 36, mass: 1.1 },
  creative_portfolio: { stiffness: 380, damping: 30, mass: 1 },
} as const;

export const CHOREOGRAPHY = {
  maxSequenceMs: 700,
  staggerOverlapRatio: 0.35,
  rules: [
    "Lead with one focal element; secondary elements trail by 1–3 frames of stagger.",
    "Overlap sibling animations instead of strict serial handoffs when they share context.",
    "One hero motion per viewport: avoid simultaneous large parallax and section reveal.",
    "Settle state must be readable within maxSequenceMs from first paint of motion.",
    "Reduce simultaneous axis motion (scale + blur + y) to at most two for clarity.",
  ],
} as const;

export const WHEN_MOTION_FEELS_WRONG: Record<string, string> = {
  sluggish: "Cut duration 30–50%, ease-out harder, remove delay chains; animate only transform/opacity.",
  janky: "Stop animating layout (width, height, top, left, margin, padding); move to transform; check compositing.",
  robotic: "Introduce spring or a gentler cubic with longer tail; vary stagger slightly.",
  floaty: "Increase damping or shorten duration; reduce overshoot; snap exit slightly faster than enter.",
  busy: "Lower stagger count, extend gap between groups, or demote non-critical motion to opacity-only.",
  cheap: "Align durations to a scale (100/150/200); one consistent easing family per surface.",
  dizzying: "Reduce parallax amplitude, disable spin on scroll, respect prefers-reduced-motion.",
};

export const ACCESSIBILITY_MOTION = {
  vestibular: [
    "Honor prefers-reduced-motion: replace motion with instant state or sub-50ms opacity.",
    "Avoid full-field drift tied to scroll; prefer local fades.",
    "Do not tie critical meaning only to motion.",
  ],
  wcag: [
    "WCAG 2.2.2 Pause, Stop, Hide for auto-updating animated content exceeding 5s.",
    "2.3.1 Three Flashes: avoid strobing below general flash thresholds.",
    "2.3.3 Animation from Interactions: motion can be disabled unless essential.",
  ],
} as const;

export const PERFORMANCE_MOTION = {
  safeProperties: ["transform", "opacity", "filter"],
  avoidForHighFrequency: ["width", "height", "top", "left", "margin", "padding", "box-shadow"],
  willChange:
    "Apply sparingly on active animators; remove after settle to limit layer memory.",
  gpuFriendly:
    "translateZ(0) or translate3d promote layers intentionally; do not blanket will-change.",
} as const;
