import Reveal from "@/components/Reveal";
import { EnquirySection, JsonLd, PageHero, ProjectCard, SectionHead, ServiceCard } from "@/components/ui";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMeta({
  title: "3D Rendering Portfolio | Real Estate Projects | Pixarch",
  description:
    "Browse Pixarch's portfolio of real estate projects: exterior renders, interior renders and cinematic walkthroughs produced for property developers.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects that turned concepts into impact"
        lead="A selection of developments where Pixarch produced the renders, walkthrough films and launch visuals."
        image={projects[0].images[1] ?? projects[0].cover}
        crumbs={[{ label: "Projects", href: "/projects" }]}
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Selected work" title="Explore our projects" />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <ProjectCard href={`/projects/${p.slug}`} name={p.name} summary={p.summary} image={p.cover} tall />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone/60 py-20 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Browse by service" title="See the work by discipline" />
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 90}>
                <ServiceCard href={`/services/${s.slug}`} name={s.name} text={s.short} image={s.hero} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EnquirySection context="Projects" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Pixarch projects",
          url: absoluteUrl("/projects"),
          hasPart: projects.map((p) => ({
            "@type": "CreativeWork",
            name: p.name,
            url: absoluteUrl(`/projects/${p.slug}`),
          })),
        }}
      />
    </>
  );
}
