import raw from "./media.json";

export type Img = { src: string; w: number; h: number; alt: string; kind?: string };

type Media = {
  projects: Record<string, { name: string; images: Img[] }>;
  exterior: Img[];
  interior: Img[];
  branding: Img[];
  marketing: Img[];
  about: Img[];
  tours: Img[];
  walk: Img[];
  intl: Img[];
  portfolio: Img[];
  clients: Img[];
};

export const media = raw as unknown as Media;

export const logo = {
  light: { src: "/images/brand/logo-light.webp", w: 600, h: 164 },
  dark: { src: "/images/brand/logo-dark.webp", w: 600, h: 164 },
};

/** Pick images from a list by 1-based position, skipping any that are missing. */
export function pick(list: Img[], positions: number[]): Img[] {
  return positions.map((p) => list[p - 1]).filter(Boolean);
}
