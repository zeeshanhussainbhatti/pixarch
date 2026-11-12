import { media, type Img } from "./media";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  scope: { label: string; href: string }[];
  images: Img[];
  cover: Img;
  video?: { src: string; poster: string };
  metaTitle: string;
  metaDescription: string;
};

const withVideo = new Set([
  "the-rise",
  "aum-99",
  "empire-living",
  "empire-lakeviews",
  "mehran-qaf-sky-tower",
  "gold-crest",
  "saars-3",
]);

const order = [
  "the-trillium-towers",
  "the-rise",
  "empire-living",
  "aum-99",
  "mehran-qaf-sky-tower",
  "empire-lakeviews",
  "saars-3",
  "mount-khalid",
  "gold-crest",
  "bisma-shafi-heights",
];

const notes: Record<string, string> = {
  "the-trillium-towers":
    "For The Trillium Towers, Pixarch produced seafront exterior renders showing the tower facades, ocean views and waterfront landscaping, together with a full set of amenity interiors including the reception, lift lobby, business centre, cafe, gym and cigar lounge.",
};

function build(slug: string): Project {
  const p = media.projects[slug];
  const images = p.images;
  const exteriors = images.filter((i) => i.kind === "exterior").length;
  const interiors = images.filter((i) => i.kind === "interior").length;
  const video = withVideo.has(slug)
    ? { src: `/video/${slug}.mp4`, poster: `/video/${slug}.webp` }
    : undefined;

  const scope = [
    exteriors > 0 && { label: "Exterior rendering", href: "/services/exterior-rendering" },
    interiors > 0 && { label: "Interior rendering", href: "/services/interior-rendering" },
    video && { label: "Cinematic 3D walkthrough", href: "/services/3d-walkthroughs" },
  ].filter(Boolean) as Project["scope"];

  const parts = [
    exteriors > 0 ? "exterior renders" : "",
    interiors > 0 ? "interior renders" : "",
    video ? "a cinematic walkthrough" : "",
  ].filter(Boolean);
  const list =
    parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}` : parts[0];

  const intro =
    notes[slug] ??
    `Pixarch produced the 3D visualization for ${p.name}, including ${list}. The work gave the development a complete and consistent set of visuals for its sales and marketing material.`;

  return {
    slug,
    name: p.name,
    summary: `3D visualization for ${p.name}: ${list}.`,
    description: [
      intro,
      "Every view was built from a single 3D model, so the facade, the interiors and the film all agree with one another. That consistency is what lets a buyer trust what they are looking at, whether they see the project on a billboard, in a brochure or on their phone.",
    ],
    scope,
    images,
    cover: images[0],
    video,
    metaTitle: `${p.name} | 3D Rendering Project | Pixarch`,
    metaDescription: `See Pixarch's 3D visualization for ${p.name}: ${list} produced for real estate marketing.`,
  };
}

export const projects: Project[] = order.filter((s) => media.projects[s]).map(build);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
