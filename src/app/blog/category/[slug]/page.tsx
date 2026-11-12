import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Breadcrumbs, CategoryNav, EnquirySection, JsonLd, PostCard } from "@/components/ui";
import { categories, getCategory, postsIn } from "@/data/posts";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return pageMeta({
    title: `${c.name} Articles | Pixarch Insights`,
    description: c.description,
    path: `/blog/category/${c.slug}`,
    image: postsIn(c.slug)[0]?.image,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  const list = postsIn(c.slug);
  const path = `/blog/category/${c.slug}`;

  return (
    <>
      <section className="on-dark bg-ink pb-14 pt-36 text-white md:pb-16 md:pt-44">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Insights", href: "/blog" },
              { label: c.name, href: path },
            ]}
          />
          <p className="eyebrow mt-8">
            Topic · {list.length} {list.length === 1 ? "article" : "articles"}
          </p>
          <h1 className="display mt-4 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-7xl">{c.name}</h1>
          <p className="mt-6 max-w-2xl text-white/75 md:text-lg">{c.description}</p>
          <div className="mt-10 border-t border-white/15 pt-8">
            <CategoryNav active={c.slug} />
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90} className="h-full">
                <PostCard post={p} priority={i < 3} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 border border-line bg-white/50 p-8 md:flex-row md:items-center md:p-10">
            <div>
              <p className="eyebrow">Related service</p>
              <p className="display mt-2 text-3xl md:text-4xl">Put these ideas to work on your project</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={c.service.href} className="btn btn-dark">
                {c.service.label}
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EnquirySection context={`Blog topic: ${c.name}`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${c.name} articles`,
          description: c.description,
          url: absoluteUrl(path),
          hasPart: list.map((p) => ({
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
