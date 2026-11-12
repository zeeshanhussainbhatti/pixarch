import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ClientStrip, EnquirySection, JsonLd, PageHero, SectionHead } from "@/components/ui";
import { services } from "@/data/services";
import { countries } from "@/data/locations";
import { media } from "@/data/media";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMeta({
  title: "Real Estate 3D Rendering, Film & Branding Services | Pixarch",
  description:
    "Explore Pixarch's services for property developers: exterior and interior rendering, 3D walkthroughs, 360 virtual tours, branding and digital marketing.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything a property launch needs, from one studio"
        lead="Renders, films, virtual tours, brand identity and campaigns produced by one team to one visual standard."
        image={media.exterior[5]}
        crumbs={[{ label: "Services", href: "/services" }]}
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="What we offer"
            title="Six services, one consistent story"
            text="Each service works on its own. Together, they give a development the same look and message everywhere a buyer meets it."
          />
          <div className="mt-16 space-y-20 md:space-y-28">
            {services.map((s, i) => (
              <article key={s.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <Link href={`/services/${s.slug}`} className="img-zoom relative block aspect-[4/3] overflow-hidden bg-stone">
                    <Image
                      src={s.hero.src}
                      alt={s.hero.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </Link>
                </Reveal>
                <Reveal delay={120}>
                  <p className="text-xs font-semibold tracking-[0.2em] text-bronze">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="display mt-3 text-4xl md:text-5xl">
                    <Link href={`/services/${s.slug}`} className="hover:text-bronze">
                      {s.name}
                    </Link>
                  </h2>
                  <p className="mt-5 leading-relaxed text-muted md:text-lg">{s.lead}</p>
                  <ul className="mt-6 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                    {s.deliverables.slice(0, 4).map((d) => (
                      <li key={d} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-bronze" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${s.slug}`} className="btn btn-dark mt-8">
                    {s.name}
                  </Link>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClientStrip />

      <section className="bg-stone/60 py-20 md:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Where we work" title="Services available across five markets" />
          <ul className="mt-10 flex flex-wrap gap-3">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link href={`/locations/${c.slug}`} className="btn btn-outline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquirySection context="Services" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: absoluteUrl(`/services/${s.slug}`),
          })),
        }}
      />
    </>
  );
}
