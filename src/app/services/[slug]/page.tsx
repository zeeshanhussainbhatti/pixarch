import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import LoopVideo from "@/components/LoopVideo";
import Reveal from "@/components/Reveal";
import { EnquirySection, FaqSection, JsonLd, PageHero, PostCard, SectionHead, ServiceCard } from "@/components/ui";
import { getService, services } from "@/data/services";
import { getProject } from "@/data/projects";
import { locations } from "@/data/locations";
import { posts } from "@/data/posts";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}`, image: s.hero });
}

const postKeywords: Record<string, RegExp> = {
  "exterior-rendering": /exterior|render|launch/i,
  "interior-rendering": /interior|render look real/i,
  "3d-walkthroughs": /walkthrough|real-time|launch/i,
  "360-virtual-tours": /virtual tour|never physically|remote|overseas/i,
  "real-estate-branding": /brand|brochure/i,
  "real-estate-digital-marketing": /marketing|facebook|buyers/i,
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = s.related.map(getService).filter((r) => r !== undefined);
  const videos = (s.videoSlugs ?? []).map(getProject).filter((p) => p?.video);
  const relatedPosts = posts.filter((p) => postKeywords[s.slug]?.test(p.title)).slice(0, 3);
  const path = `/services/${s.slug}`;

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.h1}
        image={s.hero}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: s.name, href: path },
        ]}
      >
        <Link href="#enquire" className="btn btn-light">
          Get a quote
        </Link>
        <Link href="#portfolio" className="btn btn-outline">
          See the work
        </Link>
      </PageHero>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="display text-3xl leading-snug md:text-4xl">{s.lead}</p>
          </Reveal>
          <Reveal delay={120} className="space-y-5 leading-relaxed text-muted md:text-lg">
            {s.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </Reveal>
        </div>
        <div className="container-x mt-16">
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {s.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 90} className="h-full bg-paper p-8">
              <h2 className="display text-3xl">{f.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.text}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {videos.length > 0 && (
        <section className="on-dark bg-ink py-20 text-white md:py-28">
          <div className="container-x">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">In motion</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">Clips from our walkthrough films</h2>
            </Reveal>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((p) => (
                <li key={p!.slug}>
                  <Link href={`/projects/${p!.slug}`} className="group block">
                    <div className="relative aspect-video overflow-hidden bg-coal">
                      <LoopVideo src={p!.video!.src} poster={p!.video!.poster} label={`${p!.name} 3D walkthrough clip`} />
                    </div>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] group-hover:text-gold">
                      {p!.name} →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="portfolio" className="bg-stone/60 py-20 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Portfolio" title={s.galleryTitle} text="Select any image to view it full screen." />
          <div className="mt-12">
            <Gallery images={s.gallery} />
          </div>
          <div className="mt-10 text-center">
            <Link href="/projects" className="link-arrow">
              Browse full projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHead eyebrow="Deliverables" title="What you receive" />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-4 py-4">
                  <span aria-hidden="true" className="h-px w-6 shrink-0 bg-bronze" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="Process" title="How it comes together" />
            <ol className="mt-8 space-y-7">
              {s.process.map((p, i) => (
                <li key={p.title} className="flex gap-5">
                  <span className="display text-3xl text-bronze">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-stone/60 py-20 md:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Where we work"
            title={`${s.name} by location`}
            text="We deliver this service remotely and in person across the markets below."
          />
          <ul className="mt-10 flex flex-wrap gap-3">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/locations/${l.slug}`}
                  className="inline-block border border-line bg-paper px-5 py-3 text-sm transition-colors hover:border-ink"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection faqs={s.faqs} title={`${s.name}: common questions`} />

      <section className="bg-paper pb-20 md:pb-28">
        <div className="container-x">
          <SectionHead eyebrow="Related services" title="Often combined with" />
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 90}>
                <ServiceCard href={`/services/${r.slug}`} name={r.name} text={r.short} image={r.hero} index={i + 1} />
              </Reveal>
            ))}
          </div>
          {relatedPosts.length > 0 && (
            <>
              <div className="mt-24">
                <SectionHead eyebrow="Insights" title="Further reading" />
              </div>
              <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <EnquirySection title={`Discuss your ${s.name.toLowerCase()} brief`} context={s.name} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          serviceType: s.eyebrow,
          description: s.metaDescription,
          url: absoluteUrl(path),
          image: absoluteUrl(s.hero.src),
          provider: { "@id": `${site.url}/#organization` },
          areaServed: ["Pakistan", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "United States"],
        }}
      />
    </>
  );
}
