---
title: "Building a Premium Portfolio with Astro 5 & Tailwind CSS 4"
summary: "A deep dive into how I architected this portfolio from scratch — the decisions behind the stack, the design system, and why Astro was the obvious choice for a high-performance personal site."
coverImage: "/blog/covers/portfolio-astro.jpg"
publishedAt: "2026-03-01"
tags:
  ["Astro", "Tailwind CSS", "Web Engineering", "Performance", "Design Systems"]
author:
  name: "Francisco Espindola"
  role: "Web Engineer"
  avatar: "/ysc.png"
  social: "https://github.com/frysccou"
lang: "en"
featured: true
readingTime: 8
---

## Why Astro?

When I decided to rebuild my portfolio from scratch, I evaluated every major option on the table — Next.js, Nuxt, SvelteKit, and even a plain Vite + React setup. After careful analysis, **Astro 5** emerged as the clear winner, and not just because of the hype.

Astro's **Island Architecture** is genuinely revolutionary for content-heavy sites. By shipping zero JavaScript by default and only hydrating the components that actually need interactivity, I achieved a **Lighthouse score of 99/100** on mobile — something that's nearly impossible to replicate with a full SPA framework.

## The Stack Decision

```
Astro 5          →  Core framework & routing
Tailwind CSS 4   →  Styling with CSS custom properties
React            →  For interactive islands only
GSAP             →  Scroll animations & micro-interactions
Vercel           →  Edge deployment (SSR mode)
Turso / LibSQL   →  Guestbook persistence
```

The combination of **Astro SSR** + **Vercel Edge Functions** gives us the best of both worlds: SEO-friendly server-rendered HTML with the performance characteristics of a CDN-distributed static site.

## Design System Architecture

The first thing I built was the design system — not the components, not the pages. The **design system**.

This might seem backwards, but it's the secret to maintaining consistency across 8 different color themes without writing duplicate CSS. Every color in the app is a CSS custom property:

```css
:root {
  --accent-color: #e7d0f7;
  --surface-primary: #ffffff;
  --text-heading: #1f2937;
}

[data-theme="dark"] {
  --accent-color: #e7d0f7;
  --surface-primary: #0f0f11;
  --text-heading: #fafafa;
}
```

Tailwind v4 maps these variables into utility classes via `@theme`, making every component automatically theme-aware without writing a single conditional.

## The Multi-language System

Supporting 4 languages (EN, ES, PT, JA) without a router-based i18n solution was an interesting challenge. My approach:

1. All translatable strings live in a single `translations.js` file
2. Components render the `en` values server-side (for SEO)
3. A global `languageChange` custom event broadcasts the selected language
4. Components listen for this event and update their `data-i18n` attributes

This pattern avoids full page reloads, keeps the bundle small, and ensures the initial HTML is always meaningful for search engines.

## Performance Results

After optimizing images with Astro's built-in `<Image />` component, lazy-loading below-the-fold sections, and deferring non-critical scripts:

| Metric         | Score |
| -------------- | ----- |
| Performance    | 99    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

## What I'd Do Differently

If I were starting from scratch today, I'd probably explore **Astro DB** more aggressively instead of reaching for Turso. The DX is cleaner and the integration is tighter for Astro-first projects.

I'd also extract the theme system into its own package — it's reusable across all my projects and deserves to live as a first-class library.

## Closing Thoughts

Building your own portfolio is one of the most underrated ways to sharpen your skills. You're the client, the designer, the engineer, and the product manager all at once. Every decision is yours to own — and so is every lesson learned.

The web deserves craftsmanship. Ship things you're proud of.
