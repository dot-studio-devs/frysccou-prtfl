import { translations } from "../i18n/translations.js";

export const SUPPORTED_LANGS = ["en", "es", "pt", "ja"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const LANG_LABELS: Record<SupportedLang, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  ja: "日本語",
};

export function isSupportedLang(
  value: string | null | undefined
): value is SupportedLang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

export function getStoredLang(): SupportedLang {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/selected-lang=([^;]+)/);
  const v = match?.[1];
  return isSupportedLang(v) ? v : "en";
}

const LANG_ATTR_SELECTORS = [
  ".project-title",
  ".project-desc",
  ".work-company",
  ".work-role",
  ".work-desc",
  ".edu-institution",
  ".edu-degree",
  ".edu-desc",
];

export function applyLanguage(lang: SupportedLang) {
  const t: any = (translations as any)[lang];
  if (!t) return;

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const value = key
      .split(".")
      .reduce<any>((acc, k) => (acc == null ? acc : acc[k]), t);
    if (typeof value === "string") el.innerHTML = value;
  });

  LANG_ATTR_SELECTORS.forEach((sel) => {
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      const text = el.getAttribute(`data-lang-${lang}`);
      if (text) el.textContent = text;
    });
  });

  document.documentElement.lang = lang;
  document.cookie = `selected-lang=${lang}; path=/; max-age=31536000`;
  window.dispatchEvent(new CustomEvent("languageChange", { detail: t }));
}
