import { getCollection, type CollectionEntry } from "astro:content";

import type { Lang } from "@/i18n/ui";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/constants/site";

export type Product = CollectionEntry<"products">;

/** Line order is deliberate: the flagship line leads the grid. */
const LINE_ORDER: Record<ProductCategory, number> = {
  premium: 0,
  hospitality: 1,
  essential: 2,
};

const byLineThenOrder = (a: Product, b: Product) =>
  LINE_ORDER[a.data.category] - LINE_ORDER[b.data.category] ||
  a.data.order - b.data.order;

export async function getProducts(lang: Lang): Promise<Product[]> {
  const products = await getCollection(
    "products",
    ({ data }) => data.lang === lang,
  );
  return products.sort(byLineThenOrder);
}

export async function getProduct(
  lang: Lang,
  slug: string,
): Promise<Product | undefined> {
  const products = await getProducts(lang);
  return products.find((product) => product.data.slug === slug);
}

/** Same line, excluding the current entry — feeds the "related" rail. */
export function relatedProducts(
  products: Product[],
  current: Product,
  limit = 4,
): Product[] {
  return products
    .filter(
      (product) =>
        product.data.category === current.data.category &&
        product.data.slug !== current.data.slug,
    )
    .slice(0, limit);
}

export function countByCategory(products: Product[]) {
  return Object.fromEntries(
    PRODUCT_CATEGORIES.map((category) => [
      category,
      products.filter((product) => product.data.category === category).length,
    ]),
  ) as Record<ProductCategory, number>;
}
