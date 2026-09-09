/** Single source of truth for anything that is not translated copy. */

export const SITE = {
  name: "Modul Woods",
  url: "https://modul-woods.com",
  founded: 2004,
  catalog: "/Kitchen-Solutions-Catalog.pdf",
} as const;

export const CONTACT = {
  email: "sales1@modul-woods.com",
  tollFreeUS: "866 544 9477",
  tollFreeMX: "81 8127 0840",
  telUS: "+18665449477",
  telMX: "+528181270840",
  manufacturing: "Monterrey, N.L., México",
  distribution: "Laredo, TX, United States",
  hours: [
    { days: "mon-fri", time: "8:00 – 18:00" },
    { days: "sat", time: "9:00 – 14:00" },
    { days: "sun", time: "closed" },
  ],
  social: {
    facebook: "https://www.facebook.com/modulwoods",
    instagram: "https://www.instagram.com/modulwoods",
    linkedin: "https://www.linkedin.com/company/modul-woods",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Products                                                                   */
/* -------------------------------------------------------------------------- */

export const PRODUCT_CATEGORIES = [
  "hospitality",
  "premium",
  "essential",
] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** Cabinet construction families — these double as the tabs on /finishes. */
export const CABINET_FINISHES = ["painted", "laminated", "thermofoil"] as const;
export type CabinetFinish = (typeof CABINET_FINISHES)[number];

/** Vanity top materials. */
export const TOP_MATERIALS = [
  "quartz",
  "culturedMarble",
  "culturedGranite",
] as const;
export type TopMaterial = (typeof TOP_MATERIALS)[number];

/**
 * Every cabinet colour we manufacture, keyed by the finish family it belongs
 * to. The filter panel, the product front-matter and the finishes tabs all read
 * from this list, so a new colour is added in exactly one place.
 */
export const CABINET_COLORS = {
  painted: [
    { id: "white", name: "White", swatch: "#f2efe9" },
    { id: "gray", name: "Gray", swatch: "#8d8b86" },
    { id: "cobblestone", name: "Cobblestone", swatch: "#b8ab99" },
    { id: "navy-blue", name: "Navy Blue", swatch: "#2c3a4d" },
    { id: "espresso", name: "Espresso", swatch: "#3a2820" },
  ],
  laminated: [
    { id: "mangalore-mango", name: "Mangalore Mango", swatch: "#a97b4f" },
    { id: "walnut-heights", name: "Walnut Heights", swatch: "#6d4a32" },
    { id: "zanzibar", name: "Zanzibar", swatch: "#4a3b31" },
    { id: "ebano-indi", name: "Ebano Indi", swatch: "#2f2622" },
    { id: "cedra-escandinavo", name: "Cedra Escandinavo", swatch: "#c3a67f" },
    { id: "fresno-bruma", name: "Fresno Bruma", swatch: "#b4a695" },
  ],
  thermofoil: [
    { id: "veralinga-alaska", name: "Veralinga Alaska", swatch: "#ddd6cb" },
    { id: "amber-oak", name: "Amber Oak", swatch: "#bd8f57" },
    { id: "hg-billbergia", name: "HG Billbergia", swatch: "#e9e4dc" },
    { id: "sanatana-oak", name: "Sanatana Oak", swatch: "#977150" },
  ],
} as const satisfies Record<
  CabinetFinish,
  readonly { id: string; name: string; swatch: string }[]
>;

export const TOP_COLORS = {
  quartz: [
    { id: "pure-white", name: "Pure White" },
    { id: "snow-white", name: "Snow White" },
    { id: "galaxy-white", name: "Galaxy White" },
    { id: "galaxy-gray", name: "Galaxy Gray" },
    { id: "manhattan-gray", name: "Manhattan Gray" },
    { id: "calacatta-vienna", name: "Calacatta Vienna" },
  ],
  culturedMarble: [
    { id: "solid-white", name: "Solid White" },
    { id: "white-white", name: "White / White" },
    { id: "italian-white", name: "Italian White" },
  ],
  culturedGranite: [
    { id: "capuccino", name: "Cappuccino" },
    { id: "pewter", name: "Pewter" },
    { id: "dune", name: "Dune" },
    { id: "frost", name: "Frost" },
    { id: "artic-stone", name: "Artic Stone" },
  ],
} as const satisfies Record<
  TopMaterial,
  readonly { id: string; name: string }[]
>;

/** Flat lookup used by the product filter panel. */
export const ALL_CABINET_COLORS = CABINET_FINISHES.flatMap((finish) =>
  CABINET_COLORS[finish].map((color) => ({ ...color, finish })),
);
