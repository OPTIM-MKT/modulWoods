export const LANGUAGES = {
  es: { code: "es", name: "Español", short: "ES", locale: "es-MX" },
  en: { code: "en", name: "English", short: "EN", locale: "en-US" },
} as const;

export type Lang = keyof typeof LANGUAGES;

export const DEFAULT_LANG: Lang = "en";
/** `prefixDefaultLocale: false` in astro.config — keep the two in sync. */
/** English is the default: / → EN, /es/ → ES. */
export const SHOW_DEFAULT_LANG = false;

/**
 * Page keys → URL segment per language.
 *
 * Both languages currently share the English segments so a link can be handed
 * around without breaking; give a key a Spanish value here and `usePath()`
 * picks it up everywhere at once.
 */
export const ROUTES = {
  es: {
    index: "",
    about: "about",
    kitchens: "kitchens",
    closets: "closets",
    finishes: "finishes",
    products: "products",
    contact: "contact",
  },
  en: {
    index: "",
    about: "about",
    kitchens: "kitchens",
    closets: "closets",
    finishes: "finishes",
    products: "products",
    contact: "contact",
  },
} as const;

export type RouteKey = keyof (typeof ROUTES)[Lang];

/** Order of the primary nav — split around the centred logo in the header. */
export const NAV_LEFT: RouteKey[] = ["products", "kitchens", "closets"];
export const NAV_RIGHT: RouteKey[] = ["finishes", "about", "contact"];
export const NAV_ALL: RouteKey[] = [...NAV_LEFT, ...NAV_RIGHT];
