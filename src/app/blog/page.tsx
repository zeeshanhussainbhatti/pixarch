import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Breadcrumbs, EnquirySection, JsonLd, PostCard } from "@/components/ui";
import { formatDate, posts, readingTime } from "@/data/posts";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMeta({
  title: "Insights on 3D Rendering & Real Estate Marketing | Pixarch Blog",
  description:
    "Articles from Pixarch on 3D rendering, walkthroughs, virtual tours, property branding and real estate marketing in Pakistan and the Gulf.",
  path: "/blog",
});

export default function BlogPage() {
  const [lead, ...rest] = posts;
  return (
    <>
      <section className="on-dark bg-ink pb-16 pt-36 text-white md:pb-20 md:pt-44">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Insights", href: "/blog" }]} />
          <p className="eyebrow mt-8">Insights</p>
          <h1 className="display mt-4 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-7xl">
            Ideas on rendering and real estate marketing
          </h1>
          <p className="mt-6 max-w-2xl text-white/75 md:text-lg">
            Practical thinking for developers and marketers, from what makes a render look real to where
            property buyers actually spend their time online.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <Link href={`/blog/${lead.slug}`} className="img-zoom relative block aspect-[16/10] overflow-hidden bg-stone" tabIndex={-1} aria-hidden="true">
                {lead.image && (
                  <Image src={lead.image.src} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                )}
              </Link>
              <div>
                <p className="eyebrow">Latest article</p>
                <h2 className="display mt-3 text-4xl md:text-5xl">
                  <Link href={`/blog/${lead.slug}`} className="hover:text-bronze">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  <time dateTime={lead.date}>{formatDate(lead.date)}</time> · {readingTime(lead.words)} min read
                </p>
                <p className="mt-4 leading-relaxed text-muted md:text-lg">{lead.description}</p>
                <Link href={`/blog/${lead.slug}`} className="link-arrow mt-6">
                  Read article <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </Reveal>

          <h2 className="sr-only">All articles</h2>
          <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
          })),
        }}
      />
    </>
  );
}
