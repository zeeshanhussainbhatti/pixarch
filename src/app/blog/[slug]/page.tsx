import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, EnquirySection, JsonLd, PostCard, SectionHead } from "@/components/ui";
import { formatDate, getPost, posts, readingTime } from "@/data/posts";
import { services } from "@/data/services";
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

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const i = posts.findIndex((p) => p.slug === post.slug);
  const more = [1, 2, 3].map((n) => posts[(i + n) % posts.length]);
  const path = `/blog/${post.slug}`;

  return (
    <>
      <article>
        <header className="on-dark bg-ink pb-14 pt-36 text-white md:pb-20 md:pt-44">
          <div className="container-x max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Insights", href: "/blog" },
                { label: post.title, href: path },
              ]}
            />
            <h1 className="display mt-8 text-4xl sm:text-5xl lg:text-6xl">{post.title}</h1>
            <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/60">
              By Pixarch · <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingTime(post.words)} min read
            </p>
          </div>
        </header>

        {post.image && (
          <div className="bg-gradient-to-b from-ink from-50% to-paper to-50%">
            <div className="container-x max-w-5xl">
              <Image
                src={post.image.src}
                alt={post.title}
                width={post.image.w}
                height={post.image.h}
                priority
                sizes="(min-width: 1024px) 60rem, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        )}

        <div className="bg-paper py-14 md:py-20">
          <div className="container-x grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div className="prose-px min-w-0 max-w-[44rem]" dangerouslySetInnerHTML={{ __html: post.html }} />
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-line p-6">
                <h2 className="eyebrow">Our services</h2>
                <ul className="mt-4 divide-y divide-line text-sm">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="block py-3 font-semibold hover:text-bronze">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn btn-dark mt-5 w-full">
                  Get a quote
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="bg-stone/60 py-20 md:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Keep reading" title="More from Pixarch" />
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
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
          mainEntityOfPage: absoluteUrl(path),
          image: post.image ? [absoluteUrl(post.image.src)] : undefined,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
