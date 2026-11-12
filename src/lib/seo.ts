import type { Metadata } from "next";
import { site } from "./site";

type Args = {
  title: string;
  description: string;
  path: string;
  image?: { src: string; w: number; h: number } | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string | null;
};

/** Builds consistent title, description, canonical and social tags for a page. */
export function pageMeta({ title, description, path, image, type = "website", publishedTime, modifiedTime }: Args): Metadata {
  const images = image
    ? [{ url: image.src, width: image.w, height: image.h, alt: title }]
    : [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Pixarch architectural visualization" }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type,
      locale: "en_US",
      images,
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime, authors: [site.name] }
        : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}
