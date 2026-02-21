import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DiEladB3.js";/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(...t)=>t.filter((e,n,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,s)=>s?s.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=t=>{const e=j(t);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=i.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:s,className:u="",children:o,iconNode:g,...a},l)=>i.createElement("svg",{ref:l,...v,width:e,height:e,stroke:t,strokeWidth:s?Number(n)*24/Number(e):n,className:p("lucide",u),...!o&&!C(a)&&{"aria-hidden":"true"},...a},[...g.map(([x,m])=>i.createElement(x,m)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(t,e)=>{const n=i.forwardRef(({className:s,...u},o)=>i.createElement(k,{ref:o,iconNode:e,className:p(`lucide-${y(h(t))}`,`lucide-${t}`,s),...u}));return n.displayName=h(t),n};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],L=b("clock",N);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],_=b("send",S);function A({translations:t}){const[e,n]=i.useState(t),[s,u]=i.useState(""),[o,g]=i.useState(""),[a,l]=i.useState("idle"),[x,m]=i.useState("");i.useEffect(()=>{const d=c=>{c.detail&&c.detail.guestbook&&n(c.detail.guestbook)};return window.addEventListener("languageChange",d),()=>window.removeEventListener("languageChange",d)},[]);const f=async d=>{if(d.preventDefault(),!(!s.trim()||!o.trim())){l("loading");try{const c=await fetch("/api/guestbook",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({author:s.trim(),message:o.trim()})}),w=await c.json();c.ok?(l("success"),u(""),g(""),setTimeout(()=>{window.location.reload()},1500)):c.status===429?(l("rate_limit"),m(w.message||e.rateLimitMessage)):(l("error"),m(e.errorMessage))}catch{l("error"),m(e.errorMessage)}a!=="success"&&setTimeout(()=>l("idle"),5e3)}};return r.jsxs("form",{onSubmit:f,className:"space-y-4",children:[r.jsx("div",{children:r.jsx("input",{type:"text",value:s,onChange:d=>u(d.target.value),placeholder:e.namePlaceholder,maxLength:50,required:!0,disabled:a==="loading"||a==="rate_limit",className:"w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"})}),r.jsxs("div",{children:[r.jsx("textarea",{value:o,onChange:d=>g(d.target.value),placeholder:e.messagePlaceholder,maxLength:500,rows:4,required:!0,disabled:a==="loading"||a==="rate_limit",className:"w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"}),r.jsx("div",{className:"text-right mt-1",children:r.jsxs("span",{className:"text-[10px] text-text-muted",children:[o.length,"/500"]})})]}),r.jsx("button",{type:"submit",disabled:a==="loading"||a==="rate_limit"||!s.trim()||!o.trim(),className:"w-full px-6 py-3 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30",children:a==="loading"?r.jsx("div",{className:"w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"}):r.jsxs(r.Fragment,{children:[r.jsx(_,{className:"w-4 h-4"}),e.submitButton]})}),a==="success"&&r.jsx("div",{className:"p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm text-center animate-fade-in",children:e.successMessage}),a==="rate_limit"&&r.jsxs("div",{className:"p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm text-center animate-fade-in flex items-center justify-center gap-2",children:[r.jsx(L,{className:"w-4 h-4"}),x]}),a==="error"&&r.jsx("div",{className:"p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center animate-fade-in",children:x})]})}export{A as default};
