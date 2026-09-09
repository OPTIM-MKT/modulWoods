import {
  DEFAULT_LANG,
  LANGUAGES,
  ROUTES,
  SHOW_DEFAULT_LANG,
  type Lang,
  type RouteKey,
} from "./ui";

const isLang = (value: unknown): value is Lang =>
  typeof value === "string" && value in LANGUAGES;

/** Normalises `Astro.currentLocale`, which is `string | undefined`. */
export function getLang(locale?: string): Lang {
  return isLang(locale) ? locale : DEFAULT_LANG;
}

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split("/");
  return isLang(segment) ? segment : DEFAULT_LANG;
}

/**
 * Builds a localized href from a route key.
 *
 *   const path = usePath("en");
 *   path("products")           // → /en/products
 *   path("products", "cali")   // → /en/products/cali
 */
export function usePath(lang: Lang) {
  return function path(key: RouteKey, ...segments: string[]): string {
    const prefix = !SHOW_DEFAULT_LANG && lang === DEFAULT_LANG ? "" : `/${lang}`;
    const parts = [ROUTES[lang][key], ...segments].filter(Boolean);
    const href = `${prefix}/${parts.join("/")}`;
    // Collapse the trailing slash the empty `index` segment leaves behind.
    return href.length > 1 ? href.replace(/\/$/, "") : "/";
  };
}

/**
 * Same URL, other language — preserves the current path so the toggle keeps
 * the reader where they are instead of dropping them on the home page.
 */
export function switchLocalePath(url: URL, target: Lang): string {
  const current = getLangFromUrl(url);
  const bare = url.pathname.replace(new RegExp(`^/${current}(?=/|$)`), "");
  const prefix =
    !SHOW_DEFAULT_LANG && target === DEFAULT_LANG ? "" : `/${target}`;
  const href = `${prefix}${bare}`;
  return href === "" ? "/" : href.length > 1 ? href.replace(/\/$/, "") : href;
}

/** Which nav item should read as current — `/en/products/cali` → `products`. */
export function activeRouteKey(url: URL, lang: Lang): RouteKey | undefined {
  const bare = url.pathname
    .replace(new RegExp(`^/${lang}(?=/|$)`), "")
    .replace(/^\/|\/$/g, "");
  const segment = bare.split("/")[0] ?? "";
  const entries = Object.entries(ROUTES[lang]) as [RouteKey, string][];
  return entries.find(([, value]) => value === segment)?.[0];
}
