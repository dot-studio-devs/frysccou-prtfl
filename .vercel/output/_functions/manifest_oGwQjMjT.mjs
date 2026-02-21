import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_C_XleWL4.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D-3axlD3.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/","cacheDir":"file:///C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/node_modules/.astro/","outDir":"file:///C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/dist/","srcDir":"file:///C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/","publicDir":"file:///C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/public/","buildClientDir":"file:///C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/dist/client/","buildServerDir":"file:///C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/guestbook","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/guestbook\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"guestbook","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/guestbook.ts","pathname":"/api/guestbook","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://frysccou.dev","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/guestbook@_@ts":"pages/api/guestbook.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_oGwQjMjT.mjs","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_jYpnTyVb.mjs","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/guestbook/GuestbookList.tsx":"_astro/GuestbookList.jW9UTjol.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/guestbook/GuestbookForm":"_astro/GuestbookForm.82uCjCh_.js","@astrojs/react/client.js":"_astro/client.Dc9Vh3na.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.py6xTsTn.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DwU5iq0M.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.BpE00R2B.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts":"_astro/Sidebar.astro_astro_type_script_index_0_lang.CCp4Aruv.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/Hero.astro?astro&type=script&index=0&lang.ts":"_astro/Hero.astro_astro_type_script_index_0_lang.BCLWWqSs.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/About.astro?astro&type=script&index=0&lang.ts":"_astro/About.astro_astro_type_script_index_0_lang.Cxe2Yp1w.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/Availability.astro?astro&type=script&index=0&lang.ts":"_astro/Availability.astro_astro_type_script_index_0_lang.DekN27zn.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/YoutubeMusic.astro?astro&type=script&index=0&lang.ts":"_astro/YoutubeMusic.astro_astro_type_script_index_0_lang.DdM90aTW.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/Skills.astro?astro&type=script&index=0&lang.ts":"_astro/Skills.astro_astro_type_script_index_0_lang.DWAXSTuj.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/Projects.astro?astro&type=script&index=0&lang.ts":"_astro/Projects.astro_astro_type_script_index_0_lang.BBnBNw3e.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/Experience.astro?astro&type=script&index=0&lang.ts":"_astro/Experience.astro_astro_type_script_index_0_lang.DmOOzlx-.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/Marketplace.astro?astro&type=script&index=0&lang.ts":"_astro/Marketplace.astro_astro_type_script_index_0_lang.CXI9RgSg.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/Guestbook.astro?astro&type=script&index=0&lang.ts":"_astro/Guestbook.astro_astro_type_script_index_0_lang.oJfmZxMQ.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/Contact.astro?astro&type=script&index=0&lang.ts":"_astro/Contact.astro_astro_type_script_index_0_lang.V438N9FT.js","C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/CustomCursor.astro?astro&type=script&index=0&lang.ts":"_astro/CustomCursor.astro_astro_type_script_index_0_lang.Bqo6SONy.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts","window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)};"],["C:/Users/Frysccou/Desktop/todo/pr/frysccou-portfolio/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts","const a=document.getElementById(\"sidebar\"),f=document.getElementById(\"sidebar-toggle\"),o=document.getElementById(\"toggle-label\"),p=document.getElementById(\"mobile-menu-btn\"),L=document.getElementById(\"close-sidebar\"),l=document.getElementById(\"mobile-sidebar\"),d=document.getElementById(\"mobile-sidebar-overlay\"),i=document.getElementById(\"bar1\"),c=document.getElementById(\"bar2\"),r=document.getElementById(\"bar3\");localStorage.getItem(\"sidebar-collapsed\")===\"true\"?(a?.classList.remove(\"open\",\"w-64\"),a?.classList.add(\"w-20\"),document.body.classList.add(\"sidebar-collapsed\"),o&&o.setAttribute(\"data-i18n\",\"nav.expand\")):document.body.classList.add(\"sidebar-expanded\");f?.addEventListener(\"click\",()=>{const e=!a?.classList.contains(\"open\");a?.classList.toggle(\"open\"),e?(a?.classList.remove(\"w-20\"),a?.classList.add(\"w-64\"),localStorage.setItem(\"sidebar-collapsed\",\"false\"),document.body.classList.remove(\"sidebar-collapsed\"),document.body.classList.add(\"sidebar-expanded\"),o&&o.setAttribute(\"data-i18n\",\"nav.collapse\")):(a?.classList.remove(\"w-64\"),a?.classList.add(\"w-20\"),localStorage.setItem(\"sidebar-collapsed\",\"true\"),document.body.classList.remove(\"sidebar-expanded\"),document.body.classList.add(\"sidebar-collapsed\"),o&&o.setAttribute(\"data-i18n\",\"nav.expand\")),window.dispatchEvent(new CustomEvent(\"languageChange\"))});let g=!1;function E(){g=!0,l?.classList.remove(\"translate-x-full\"),l?.classList.add(\"translate-x-0\"),d?.classList.remove(\"opacity-0\",\"pointer-events-none\"),d?.classList.add(\"opacity-100\"),document.body.style.overflow=\"hidden\",i&&(i.style.transform=\"rotate(45deg) translateY(7px)\"),c&&(c.style.opacity=\"0\"),r&&(r.style.transform=\"rotate(-45deg) translateY(-7px)\")}function m(){g=!1,l?.classList.add(\"translate-x-full\"),l?.classList.remove(\"translate-x-0\"),d?.classList.add(\"opacity-0\",\"pointer-events-none\"),d?.classList.remove(\"opacity-100\"),document.body.style.overflow=\"\",i&&(i.style.transform=\"none\"),c&&(c.style.opacity=\"1\"),r&&(r.style.transform=\"none\")}p?.addEventListener(\"click\",()=>g?m():E());L?.addEventListener(\"click\",m);d?.addEventListener(\"click\",m);const v=document.getElementById(\"lang-toggle-sidebar\"),h=document.getElementById(\"lang-toggle-mobile\");function u(){const e=document.getElementById(\"lang-toggle\");e&&e.click(),setTimeout(()=>{const t=document.documentElement.lang.toUpperCase();[document.getElementById(\"current-lang-sidebar\"),document.getElementById(\"current-lang-mobile\")].forEach(s=>{s&&(s.textContent=t)})},50)}v?.addEventListener(\"click\",u);h?.addEventListener(\"click\",u);function b(){const e=document.documentElement.getAttribute(\"data-theme\")||\"light\",t=document.getElementById(\"theme-label-sidebar\");t&&(t.textContent=e===\"dark\"?\"Dark\":\"Light\")}const I=document.getElementById(\"theme-toggle-sidebar\"),B=document.getElementById(\"theme-toggle-mobile\");function y(){const t=(document.documentElement.getAttribute(\"data-theme\")||\"light\")===\"dark\"?\"light\":\"dark\",n=document.createElement(\"style\");n.textContent=\"*, *::before, *::after { transition: none !important; }\",document.head.appendChild(n),window.setTheme(t),b(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{document.head.removeChild(n)})})}I?.addEventListener(\"click\",y);B?.addEventListener(\"click\",y);b();document.querySelectorAll('aside a[href^=\"#\"], .mobile-nav-link').forEach(e=>{e.addEventListener(\"click\",t=>{const n=e.getAttribute(\"href\");if(!n||n===\"#\")return;e.classList.contains(\"mobile-nav-link\")&&m();const s=document.querySelector(n);s&&(t.preventDefault(),s.scrollIntoView({behavior:\"smooth\",block:\"start\"}))})});"]],"assets":["/_astro/niuro.DOf8uozh.jpg","/_astro/zatobox.DLI7B5Fq.jpg","/_astro/dragon-pyramid.BXccow9u.jpg","/_astro/issd.DY0ZSEDm.png","/_astro/da-vinci.BPfe7oRb.png","/_astro/henry.DebFSjWL.jpg","/_astro/codigo-facilito.DU6AbDOK.png","/_astro/coderhouse.BUgIcuS9.jpg","/_astro/liz.Dl9EhR8W.png","/_astro/thender.MjS0rHOY.png","/_astro/dot-studio.VFLQuwym.png","/_astro/blog-template.KmoaTwCU.png","/_astro/landing-template.BaHEvGgh.png","/_astro/consentido.B0XcRLmB.png","/_astro/dot-logo.B6xz4_fI.svg","/_astro/zatobox.Dr3XWg-v.png","/_astro/yt-music.uB0Afs0X.jpg","/_astro/me.bOXwpSt9.png","/_astro/lastaurinas.DaFSKxGs.png","/_astro/index.CGWbKkZz.css","/dot-logo-only.svg","/dot-logo.svg","/favicon.ico","/ysc-transparente.png","/ysc.png","/_astro/About.astro_astro_type_script_index_0_lang.Cxe2Yp1w.js","/_astro/Availability.astro_astro_type_script_index_0_lang.DekN27zn.js","/_astro/client.Dc9Vh3na.js","/_astro/Contact.astro_astro_type_script_index_0_lang.V438N9FT.js","/_astro/CustomCursor.astro_astro_type_script_index_0_lang.Bqo6SONy.js","/_astro/Experience.astro_astro_type_script_index_0_lang.DmOOzlx-.js","/_astro/Guestbook.astro_astro_type_script_index_0_lang.oJfmZxMQ.js","/_astro/GuestbookForm.82uCjCh_.js","/_astro/GuestbookList.jW9UTjol.js","/_astro/Hero.astro_astro_type_script_index_0_lang.BCLWWqSs.js","/_astro/index.astro_astro_type_script_index_0_lang.py6xTsTn.js","/_astro/index.CB87Sc6I.js","/_astro/index.DiEladB3.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/Layout.astro_astro_type_script_index_0_lang.DwU5iq0M.js","/_astro/Marketplace.astro_astro_type_script_index_0_lang.CXI9RgSg.js","/_astro/Projects.astro_astro_type_script_index_0_lang.BBnBNw3e.js","/_astro/ScrollTrigger.Cv03IO65.js","/_astro/Skills.astro_astro_type_script_index_0_lang.DWAXSTuj.js","/_astro/translations.Bzb_4B-A.js","/_astro/YoutubeMusic.astro_astro_type_script_index_0_lang.DdM90aTW.js","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"QvO+pff+mkheVBrmZQW3/jJ2iSw4Npt5kYbB+DX3k0w="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
