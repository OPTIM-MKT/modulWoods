import en from "@/constants/en.json";
import es from "@/constants/es.json";
import { getLang } from "./utils";
import type { Lang } from "./ui";

/** `es` is the reference shape — `en.json` must stay structurally identical. */
export type Dictionary = typeof es;

const DICTIONARIES: Record<Lang, Dictionary> = {
  es,
  en: en as Dictionary,
};

export function getI18N(lang: Lang): Dictionary {
  return DICTIONARIES[lang];
}

export { getLang };
export type { Lang };
