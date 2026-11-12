import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import LoopVideo from "@/components/LoopVideo";
import Reveal from "@/components/Reveal";
import { EnquirySection, JsonLd, PageHero, SectionHead } from "@/components/ui";
import { getProject, projects } from "@/data/projects";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMeta({ title: p.metaTitle, description: p.metaDescription, path: `/projects/${p.slug}`, image: p.cover });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const exteriors = p.images.filter((img) => img.kind === "exterior");
  const interiors = p.images.filter((img) => img.kind === "interior");
  const path = `/projects/${p.slug}`;

  return (
    <>
      <PageHero
        eyebrow="Project"
        title={p.name}
        lead={p.summary}
        image={p.cover}
        crumbs={[
          { label: "Projects", href: "/projects" },
          { label: p.name, href: path },
        ]}
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">About the work</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">Visualizing {p.name}</h2>
            <div className="mt-6 space-y-5 leading-relaxed text-muted md:text-lg">
              {p.description.map((d) => (
                <p key={d.slice(0, 40)}>{d}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-line p-8">
              <h2 className="eyebrow">Scope of work</h2>
              <ul className="mt-5 divide-y divide-line">
                {p.scope.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="flex items-center justify-between py-4 font-semibold hover:text-bronze">
                      {s.label} <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="#enquire" className="btn btn-dark mt-6 w-full">
                Plan a similar project
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {p.video && (
        <section className="on-dark bg-ink py-16 text-white md:py-24">
          <div className="container-x">
            <Reveal className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">Walkthrough</p>
                <h2 className="display mt-3 text-4xl md:text-5xl">{p.name} in motion</h2>
              </div>
              <Link href="/services/3d-walkthroughs" className="link-arrow self-start md:self-end">
                About 3D walkthroughs <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
            <div className="relative aspect-video overflow-hidden bg-coal">
              <LoopVideo src={p.video.src} poster={p.video.poster} label={`${p.name} cinematic 3D walkthrough clip`} />
            </div>
          </div>
        </section>
      )}

      {exteriors.length > 0 && (
        <section className="bg-stone/60 py-20 md:py-28">
          <div className="container-x">
            <SectionHead eyebrow="Exterior" title="Exterior renders" />
            <div className="mt-12">
              <Gallery images={exteriors} columns={2} />
            </div>
          </div>
        </section>
      )}

      {interiors.length > 0 && (
        <section className="bg-paper py-20 md:py-28">
          <div className="container-x">
            <SectionHead eyebrow="Interior" title="Interior renders" />
            <div className="mt-12">
              <Gallery images={interiors} columns={2} />
            </div>
          </div>
        </section>
      )}

      <nav aria-label="More projects" className="grid border-y border-line md:grid-cols-2">
        {[
          { label: "Previous project", item: prev },
          { label: "Next project", item: next },
        ].map(({ label, item }) => (
          <Link
            key={label}
            href={`/projects/${item.slug}`}
            className="img-zoom group relative flex min-h-64 items-end overflow-hidden bg-ink p-8 text-white md:p-12"
          >
            <Image src={item.cover.src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-50" />
            <span className="relative">
              <span className="eyebrow on-dark">{label}</span>
              <span className="display mt-2 block text-4xl group-hover:text-gold">{item.name}</span>
            </span>
          </Link>
        ))}
      </nav>

      <EnquirySection context={`Project: ${p.name}`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${p.name} 3D visualization`,
          description: p.metaDescription,
          url: absoluteUrl(path),
          creator: { "@id": `${site.url}/#organization` },
          image: p.images.slice(0, 6).map((img) => absoluteUrl(img.src)),
        }}
      />
    </>
  );
}
