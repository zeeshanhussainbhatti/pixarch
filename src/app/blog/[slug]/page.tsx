import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/ReadingProgress";
import { Breadcrumbs, CategoryLabel, EnquirySection, JsonLd, PostCard, SectionHead } from "@/components/ui";
import {
  figuresFor,
  formatDate,
  getCategory,
  getPost,
  posts,
  postsIn,
  readingTime,
  splitArticle,
} from "@/data/posts";
import type { Img } from "@/data/media";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

function clip(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "").replace(/[,;:.]$/, "")}…`;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta({
    title: p.title.length <= 50 ? `${p.title} | Pixarch` : p.title,
    description: clip(p.description, 158),
    path: `/blog/${p.slug}`,
    image: p.image,
    type: "article",
    publishedTime: p.date,
    modifiedTime: p.modified,
  });
}

function Figure({ image, label, href }: { image: Img; label: string; href: string }) {
  return (
    <figure className="my-12">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.w}
        height={image.h}
        sizes="(min-width: 1024px) 46rem, 100vw"
        className="h-auto w-full"
      />
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 text-xs text-muted">
        <span>From the Pixarch portfolio</span>
        <Link href={href} className="font-semibold uppercase tracking-[0.14em] text-bronze hover:text-ink">
          {label} →
        </Link>
      </figcaption>
    </figure>
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const { intro, sections } = splitArticle(post.html);
  const figures = figuresFor(post);
  const figureAfter = [Math.min(1, sections.length - 1), Math.min(3, sections.length - 1)];
  const ctaAfter = Math.max(0, Math.floor(sections.length / 2) - 1);

  const i = posts.findIndex((p) => p.slug === post.slug);
  const newer = i > 0 ? posts[i - 1] : undefined;
  const older = i < posts.length - 1 ? posts[i + 1] : undefined;
  const sameTopic = postsIn(post.category).filter((p) => p.slug !== post.slug);
  const related = [...sameTopic, ...posts.filter((p) => p.category !== post.category && p.slug !== post.slug)].slice(0, 3);

  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const share = [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
    { name: "Email", href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}` },
  ];

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <article>
        <header className="on-dark bg-ink pb-24 pt-36 text-white md:pb-32 md:pt-44">
          <div className="container-x max-w-5xl">
            <Breadcrumbs
              items={[
                { label: "Insights", href: "/blog" },
                ...(category ? [{ label: category.name, href: `/blog/category/${category.slug}` }] : []),
                { label: "Article", href: path },
              ]}
            />
            <div className="mt-10">
              <CategoryLabel slug={post.category} light />
            </div>
            <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-[4rem]">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">{post.description}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-sm">
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="display flex h-10 w-10 items-center justify-center rounded-full bg-gold text-xl text-ink"
                >
                  P
                </span>
                <span>
                  <span className="block font-semibold">Pixarch Studio</span>
                  <span className="block text-xs text-white/55">Architectural visualization since {site.founded}</span>
                </span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true" className="mx-2">·</span>
                {readingTime(post.words)} min read
              </span>
            </div>
          </div>
        </header>

        <div className="bg-paper">
          <div className="container-x max-w-5xl">
            <figure className="-mt-16 md:-mt-20">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={post.image.w}
                height={post.image.h}
                priority
                sizes="(min-width: 1024px) 60rem, 100vw"
                className="h-auto w-full shadow-[0_30px_80px_-40px_rgba(12,12,11,0.6)]"
              />
              <figcaption className="mt-3 text-xs text-muted">Visual from the Pixarch portfolio.</figcaption>
            </figure>
          </div>
        </div>

        <div id="article-body" className="bg-paper pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="container-x grid max-w-6xl gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              {sections.length > 1 && (
                <nav aria-label="In this article" className="border border-line bg-white/50 p-6">
                  <h2 className="eyebrow">In this article</h2>
                  <ol className="mt-4 space-y-3 text-sm">
                    {sections.map((s, n) => (
                      <li key={s.id} className="flex gap-3">
                        <span className="text-xs font-semibold text-bronze">{String(n + 1).padStart(2, "0")}</span>
                        <a href={`#${s.id}`} className="leading-snug text-muted transition-colors hover:text-ink">
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="mt-6 hidden lg:block">
                <h2 className="eyebrow">Share</h2>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                  {share.map((s) => (
                    <li key={s.name}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-bronze">
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="min-w-0 max-w-[46rem]">
              <div className="prose-px prose-lead" dangerouslySetInnerHTML={{ __html: intro }} />

              {sections.map((s, n) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="display mt-14 flex items-baseline gap-4 text-3xl leading-tight md:text-[2.4rem]">
                    <span className="font-sans text-xs font-bold tracking-[0.2em] text-bronze">
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h2>
                  <div className="prose-px mt-5" dangerouslySetInnerHTML={{ __html: s.html }} />

                  {figureAfter[0] === n && figures.images[0] && (
                    <Figure image={figures.images[0]} label={figures.label} href={figures.href} />
                  )}
                  {figureAfter[1] === n && figureAfter[1] !== figureAfter[0] && figures.images[1] && (
                    <Figure image={figures.images[1]} label={figures.label} href={figures.href} />
                  )}
                  {ctaAfter === n && sections.length > 3 && (
                    <aside className="on-dark my-12 bg-ink p-8 text-white md:p-10">
                      <p className="eyebrow">Planning a launch?</p>
                      <p className="display mt-3 text-3xl md:text-4xl">
                        See how Pixarch can visualize your project before it is built.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/contact" className="btn btn-light">
                          Get a quote
                        </Link>
                        <Link href="/projects" className="btn btn-outline">
                          View our work
                        </Link>
                      </div>
                    </aside>
                  )}
                </section>
              ))}

              <footer className="mt-16 border-t border-line pt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow">Filed under</span>
                  {category && (
                    <Link
                      href={`/blog/category/${category.slug}`}
                      className="border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-ink"
                    >
                      {category.name}
                    </Link>
                  )}
                  {category && (
                    <Link
                      href={category.service.href}
                      className="border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-ink"
                    >
                      {category.service.label}
                    </Link>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold lg:hidden">
                  <span className="eyebrow">Share</span>
                  {share.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-bronze">
                      {s.name}
                    </a>
                  ))}
                </div>

                <div className="mt-10 flex gap-5 border border-line bg-white/50 p-6 md:p-8">
                  <span
                    aria-hidden="true"
                    className="display flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-2xl text-gold"
                  >
                    P
                  </span>
                  <div>
                    <p className="font-semibold">Written by Pixarch Studio</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Pixarch is a boutique real estate creative agency producing 3D rendering, walkthroughs,
                      virtual tours, branding and digital marketing for property developers since {site.founded}.
                    </p>
                    <Link href="/about" className="link-arrow mt-4">
                      About the studio <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </article>

      {(newer || older) && (
        <nav aria-label="More articles" className="grid border-y border-line bg-paper md:grid-cols-2">
          {[
            { label: "← Newer article", item: newer },
            { label: "Older article →", item: older },
          ].map(({ label, item }, n) =>
            item ? (
              <Link
                key={label}
                href={`/blog/${item.slug}`}
                className={`group block p-8 transition-colors hover:bg-stone/60 md:p-12 ${
                  n === 1 ? "border-t border-line md:border-l md:border-t-0 md:text-right" : ""
                }`}
              >
                <span className="eyebrow">{label}</span>
                <span className="display mt-3 block text-2xl leading-tight group-hover:text-bronze md:text-3xl">
                  {item.title}
                </span>
              </Link>
            ) : (
              <span key={label} className="hidden md:block" />
            ),
          )}
        </nav>
      )}

      <section className="bg-stone/60 py-16 md:py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead eyebrow="Keep reading" title="Related articles" />
            <Link href="/blog" className="link-arrow shrink-0 self-start md:self-end">
              All articles <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <EnquirySection context={`Article: ${post.title}`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.modified ?? post.date,
          wordCount: post.words,
          articleSection: category?.name,
          mainEntityOfPage: url,
          image: [absoluteUrl(post.image.src)],
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
