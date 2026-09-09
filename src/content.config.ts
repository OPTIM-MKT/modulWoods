import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";
import {
  ALL_CABINET_COLORS,
  CABINET_FINISHES,
  PRODUCT_CATEGORIES,
  TOP_MATERIALS,
} from "@/constants/site";

const LANGS = ["en", "es"] as const;

const COLOR_IDS = ALL_CABINET_COLORS.map((c) => c.id) as [string, ...string[]];

/** Keeps the `<lang>/<slug>` shape as the entry id instead of collapsing it. */
const generateId = ({ entry }: { entry: string }) => entry.replace(/\.mdx?$/, "");

const products = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/products",
    generateId,
  }),
  schema: ({ image }) =>
    z.object({
      lang: z.enum(LANGS),
      /** Shared across languages — the URL segment and the view-transition key. */
      slug: z.string(),
      title: z.string(),
      excerpt: z.string(),
      cover: image(),
      code: z.string(),
      category: z.enum(PRODUCT_CATEGORIES),
      /** Nominal front size, e.g. `13.5" x 24.5"`. */
      size: z.string(),
      /** Which construction families this collection is offered in. */
      finishes: z.array(z.enum(CABINET_FINISHES)).nonempty(),
      /** Cabinet colour ids — must exist in `CABINET_COLORS`. */
      colors: z.array(z.enum(COLOR_IDS)).nonempty(),
      /** Vanity top materials it can be paired with. */
      tops: z.array(z.enum(TOP_MATERIALS)).nonempty(),
      madeToOrder: z.boolean().default(true),
      featured: z.boolean().default(false),
      order: z.number().int().default(0),
      specs: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .default([]),
    }),
});

export const collections = { products };
