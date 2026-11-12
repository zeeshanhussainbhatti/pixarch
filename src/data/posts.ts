import raw from "./posts.json";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  modified?: string | null;
  image: { src: string; w: number; h: number } | null;
  words: number;
  html: string;
};

export const posts = raw as Post[];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
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
