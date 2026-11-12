import raw from "./posts.json";
import { media, type Img } from "./media";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  modified?: string | null;
  image: { src: string; w: number; h: number; alt: string };
  category: string;
  words: number;
  html: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  service: { label: string; href: string };
};

export const categories: Category[] = [
  {
    slug: "3d-rendering",
    name: "3D Rendering",
    description:
      "How photorealistic renders are made, what separates a believable image from a fake one, and how to choose the right views for a launch.",
    service: { label: "Exterior rendering", href: "/services/exterior-rendering" },
  },
  {
    slug: "walkthroughs-virtual-tours",
    name: "Walkthroughs & Virtual Tours",
    description:
      "Cinematic walkthrough films and interactive 360 tours, and how they help local and overseas buyers commit before a project is built.",
    service: { label: "3D walkthroughs", href: "/services/3d-walkthroughs" },
  },
  {
    slug: "real-estate-marketing",
    name: "Real Estate Marketing",
    description:
      "Campaigns, channels and return on investment: practical marketing thinking for developers selling off-plan.",
    service: { label: "Digital marketing", href: "/services/real-estate-digital-marketing" },
  },
  {
    slug: "branding",
    name: "Branding",
    description:
      "Naming, identity and collateral for developments, and why a strong brand makes a project easier to sell.",
    service: { label: "Branding & design", href: "/services/real-estate-branding" },
  },
  {
    slug: "market-insights",
    name: "Market Insights",
    description:
      "Trends shaping Pakistani property, from high-rise living in Karachi to what today's buyers expect.",
    service: { label: "Our services", href: "/services" },
  },
];

export const posts = raw as Post[];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function postsIn(category: string) {
  return posts.filter((p) => p.category === category);
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Format an ISO date without relying on the runtime locale or clock. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

export function readingTime(words: number) {
  return Math.max(1, Math.round(words / 220));
}

export type Section = { id: string; title: string; html: string };

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripTags(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/** Splits an article into its introduction and one section per H2 heading. */
export function splitArticle(html: string): { intro: string; sections: Section[] } {
  const parts = html.split(/<h2>([\s\S]*?)<\/h2>/);
  const intro = parts[0].trim();
  const sections: Section[] = [];
  const used = new Set<string>();
  for (let i = 1; i < parts.length; i += 2) {
    const title = stripTags(parts[i]);
    let id = slugify(title) || `section-${i}`;
    while (used.has(id)) id = `${id}-2`;
    used.add(id);
    sections.push({ id, title, html: (parts[i + 1] ?? "").trim() });
  }
  return { intro, sections };
}

const figurePools: Record<string, { images: Img[]; label: string; href: string }> = {
  "3d-rendering": { images: media.exterior, label: "Exterior rendering", href: "/services/exterior-rendering" },
  "walkthroughs-virtual-tours": { images: media.interior, label: "360 virtual tours", href: "/services/360-virtual-tours" },
  "real-estate-marketing": { images: media.marketing, label: "Digital marketing", href: "/services/real-estate-digital-marketing" },
  branding: { images: media.branding, label: "Branding & design", href: "/services/real-estate-branding" },
  "market-insights": { images: media.interior, label: "Interior rendering", href: "/services/interior-rendering" },
};

/** Two portfolio images to illustrate an article, varied from post to post. */
export function figuresFor(post: Post) {
  const pool = figurePools[post.category] ?? figurePools["3d-rendering"];
  const landscape = pool.images.filter((img) => img.w / img.h >= 1.3);
  const list = landscape.length >= 2 ? landscape : pool.images;
  const index = posts.findIndex((p) => p.slug === post.slug);
  const first = list[(index * 2 + 3) % list.length];
  let second = list[(index * 2 + 8) % list.length];
  if (second === first) second = list[(index * 2 + 9) % list.length];
  return { images: [first, second], label: pool.label, href: pool.href };
}
