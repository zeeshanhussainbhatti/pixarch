import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import {
  EnquirySection,
  FaqSection,
  JsonLd,
  PageHero,
  ProjectCard,
  SectionHead,
  ServiceCard,
  Stats,
} from "@/components/ui";
import { citiesOf, getLocation, locations } from "@/data/locations";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) return {};
  return pageMeta({ title: l.metaTitle, description: l.metaDescription, path: `/locations/${l.slug}`, image: l.hero });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) notFound();

  const parent = l.parent ? getLocation(l.parent) : undefined;
  const cities = citiesOf(l.slug);
  const siblings = l.parent ? citiesOf(l.parent).filter((c) => c.slug !== l.slug) : [];
  const others = locations.filter((x) => x.type === "country" && x.slug !== l.slug && x.slug !== l.parent);
  const path = `/locations/${l.slug}`;
  const crumbs = [
    { label: "Locations", href: "/locations" },
    ...(parent ? [{ label: parent.name, href: `/locations/${parent.slug}` }] : []),
    { label: l.name, href: path },
  ];

  return (
    <>
      <PageHero eyebrow={l.eyebrow} title={l.h1} image={l.hero} crumbs={crumbs}>
        <Link href="#enquire" className="btn btn-light">
          Get a quote
        </Link>
        {l.phone && (
          <a href={l.phone.href} className="btn btn-outline">
            Call {l.phone.display}
          </a>
        )}
      </PageHero>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="display text-3xl leading-snug md:text-4xl">{l.lead}</p>
          </Reveal>
          <Reveal delay={120} className="space-y-5 leading-relaxed text-muted md:text-lg">
            {l.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </Reveal>
        </div>
        <div className="container-x mt-16">
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {l.points.map((f, i) => (
            <Reveal key={f.title} delay={i * 90} className="h-full bg-paper p-8">
              <h2 className="display text-3xl">{f.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.text}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <section className="bg-stone/60 py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Services"
            title={`What we deliver in ${l.name}`}
            text="Every service is available on its own or as part of a complete launch package."
          />
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 90}>
                <ServiceCard href={`/services/${s.slug}`} name={s.name} text={s.short} image={s.hero} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Our work" title="Visualization from the Pixarch studio" text="Select any image to view it full screen." />
          <div className="mt-12">
            <Gallery images={l.gallery} />
          </div>
        </div>
      </section>

      <section className="on-dark bg-ink py-12 text-white md:py-16">
        <div className="container-x">
          <Stats dark />
        </div>
      </section>

      {(cities.length > 0 || siblings.length > 0 || parent) && (
        <section className="bg-stone/60 py-20 md:py-24">
          <div className="container-x">
            <SectionHead
              eyebrow="Nearby"
              title={cities.length > 0 ? `Cities we serve in ${l.name}` : `More in ${parent?.name ?? "the region"}`}
            />
            <ul className="mt-10 flex flex-wrap gap-3">
              {parent && (
                <li>
                  <Link href={`/locations/${parent.slug}`} className="btn btn-dark">
                    {parent.name}
                  </Link>
                </li>
              )}
              {[...cities, ...siblings].map((c) => (
                <li key={c.slug}>
                  <Link href={`/locations/${c.slug}`} className="btn btn-outline">
                    3D rendering in {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHead eyebrow="Projects" title="Recent work" />
            <Link href="/projects" className="link-arrow shrink-0 self-start md:self-end">
              All projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProjectCard href={`/projects/${p.slug}`} name={p.name} summary={p.summary} image={p.cover} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={l.faqs} title={`Working with Pixarch in ${l.name}`} />

      <section className="border-t border-line bg-paper py-14">
        <div className="container-x flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <span className="eyebrow">Other markets</span>
          {others.map((o) => (
            <Link key={o.slug} href={`/locations/${o.slug}`} className="font-semibold hover:text-bronze">
              {o.name}
            </Link>
          ))}
        </div>
      </section>

      <EnquirySection title={`Start your project in ${l.name}`} context={`Location: ${l.name}`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `3D rendering and architectural visualization in ${l.name}`,
          description: l.metaDescription,
          url: absoluteUrl(path),
          image: absoluteUrl(l.hero.src),
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": l.type === "city" ? "City" : "Country", name: l.name },
        }}
      />
    </>
  );
}
