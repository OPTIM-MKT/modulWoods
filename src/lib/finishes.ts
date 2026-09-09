import {
  CABINET_COLORS,
  CABINET_FINISHES,
  TOP_COLORS,
  TOP_MATERIALS,
  type CabinetFinish,
  type TopMaterial,
} from "@/constants/site";

/** Asset folder per swatch group — `cultureGranite` is spelled that way on disk. */
export const FINISH_FOLDERS = {
  painted: "painted",
  laminated: "laminated",
  thermofoil: "thermofoil",
  quartz: "quartz",
  culturedMarble: "culturedMarble",
  culturedGranite: "cultureGranite",
} as const satisfies Record<CabinetFinish | TopMaterial, string>;

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/finishes/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}",
  { eager: true },
);

/** `.../painted/Navy-blue.jpg.jpeg` → `navy-blue`, matching the ids in site.ts. */
const toId = (path: string) =>
  path
    .split("/")
    .pop()!
    .replace(/\.(jpe?g|png|webp|avif)/gi, "")
    .toLowerCase();

/** Every swatch image, indexed by `<folder>/<id>` so ids can repeat per folder. */
const IMAGES = new Map<string, ImageMetadata>(
  Object.entries(modules).map(([path, mod]) => {
    const folder = path.split("/").at(-2)!;
    return [`${folder}/${toId(path)}`, mod.default];
  }),
);

export interface Swatch {
  id: string;
  name: string;
  image?: ImageMetadata;
  /** Flat colour fallback for the tiny dots on product cards. */
  hex?: string;
}

export function cabinetSwatches(finish: CabinetFinish): Swatch[] {
  return CABINET_COLORS[finish].map(({ id, name, swatch }) => ({
    id,
    name,
    hex: swatch,
    image: IMAGES.get(`${FINISH_FOLDERS[finish]}/${id}`),
  }));
}

export function topSwatches(material: TopMaterial): Swatch[] {
  return TOP_COLORS[material].map(({ id, name }) => ({
    id,
    name,
    image: IMAGES.get(`${FINISH_FOLDERS[material]}/${id}`),
  }));
}

/** Only the colours a given product is offered in, grouped by finish family. */
export function cabinetSwatchesFor(colorIds: readonly string[]) {
  return CABINET_FINISHES.map((finish) => ({
    finish,
    swatches: cabinetSwatches(finish).filter(({ id }) => colorIds.includes(id)),
  })).filter(({ swatches }) => swatches.length > 0);
}

export function topSwatchesFor(materials: readonly TopMaterial[]) {
  return TOP_MATERIALS.filter((material) => materials.includes(material)).map(
    (material) => ({ material, swatches: topSwatches(material) }),
  );
}
