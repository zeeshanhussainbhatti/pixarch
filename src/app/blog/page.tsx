import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  Breadcrumbs,
  CategoryLabel,
  CategoryNav,
  EnquirySection,
  JsonLd,
  PostCard,
  PostMeta,
  PostRow,
} from "@/components/ui";
import { categories, posts, postsIn } from "@/data/posts";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMeta({
  title: "Insights on 3D Rendering & Real Estate Marketing | Pixarch Blog",
  description:
    "Articles from Pixarch on 3D rendering, walkthroughs, virtual tours, property branding and real estate marketing in Pakistan and the Gulf.",
  path: "/blog",
});

export default function BlogPage() {
  const [lead, ...others] = posts;
  const recent = others.slice(0, 4);

  return (
    <>
      <section className="on-dark bg-ink pb-14 pt-36 text-white md:pb-16 md:pt-44">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow">Pixarch Blog</p>
              <h1 className="display mt-4 text-[2.6rem] sm:text-6xl lg:text-7xl">
                Ideas on rendering and real estate marketing
              </h1>
            </div>
            <p className="text-white/70 md:text-lg lg:pb-3">
              Practical thinking for developers and marketers, written by the Pixarch studio. {posts.length}{" "}
              articles across {categories.length} topics.
            </p>
          </div>
          <div className="mt-10 border-t border-white/15 pt-8">
            <CategoryNav />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-paper py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <article className="group">
              <Link href={`/blog/${lead.slug}`} className="img-zoom block overflow-hidden bg-stone" tabIndex={-1} aria-hidden="true">
                <div className="relative aspect-video">
                  <Image
                    src={lead.image.src}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-0 top-0 bg-ink px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">
                    Latest
                  </span>
                </div>
              </Link>
              <div className="mt-7">
                <CategoryLabel slug={lead.category} />
                <h2 className="display mt-3 text-4xl leading-[1.05] md:text-5xl lg:text-[3.4rem]">
                  <Link href={`/blog/${lead.slug}`} className="transition-colors group-hover:text-bronze">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-5 max-w-2xl leading-relaxed text-muted md:text-lg">{lead.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <PostMeta post={lead} />
                  <Link href={`/blog/${lead.slug}`} className="link-arrow">
                    Read article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="eyebrow border-b border-line pb-4">Recently published</h2>
            <ul className="divide-y divide-line">
              {recent.map((p) => (
                <li key={p.slug} className="py-6">
                  <PostRow post={p} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* By topic */}
      {categories.map((c, ci) => {
        const list = postsIn(c.slug);
        if (!list.length) return null;
        return (
          <section
            key={c.slug}
            id={c.slug}
            className={`py-16 md:py-24 ${ci % 2 === 0 ? "bg-stone/60" : "bg-paper"}`}
          >
            <div className="container-x">
              <Reveal className="flex flex-col justify-between gap-6 border-b border-line pb-8 md:flex-row md:items-end">
                <div className="max-w-2xl">
                  <p className="eyebrow">
                    Topic {String(ci + 1).padStart(2, "0")} · {list.length} {list.length === 1 ? "article" : "articles"}
                  </p>
                  <h2 className="display mt-3 text-4xl md:text-5xl">
                    <Link href={`/blog/category/${c.slug}`} className="hover:text-bronze">
                      {c.name}
                    </Link>
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted">{c.description}</p>
                </div>
                <Link href={`/blog/category/${c.slug}`} className="link-arrow shrink-0 self-start md:self-end">
                  View topic <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.slice(0, 3).map((p, i) => (
                  <Reveal key={p.slug} delay={i * 90} className="h-full">
                    <PostCard post={p} />
                  </Reveal>
                ))}
              </div>
              {list.length > 3 && (
                <ul className="mt-10 grid gap-x-12 border-t border-line sm:grid-cols-2">
                  {list.slice(3).map((p) => (
                    <li key={p.slug} className="border-b border-line py-6">
                      <PostRow post={p} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      <EnquirySection context="Blog" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Pixarch Insights",
          url: absoluteUrl("/blog"),
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.date,
            image: absoluteUrl(p.image.src),
          })),
        }}
      />
    </>
  );
}
