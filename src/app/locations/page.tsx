import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ClientStrip, EnquirySection, JsonLd, PageHero, SectionHead } from "@/components/ui";
import { citiesOf, countries, locations } from "@/data/locations";
import { media } from "@/data/media";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMeta({
  title: "Locations | 3D Rendering in Pakistan, UAE, KSA, UK & USA | Pixarch",
  description:
    "Pixarch delivers architectural visualization across Pakistan, the UAE, Saudi Arabia, the UK and the USA. Find 3D rendering services for your market.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Architectural visualization that travels beyond borders"
        lead="Pixarch began in Pakistan, but our work does not stop there. We partner with developers, architects and real estate brands across five markets."
        image={media.intl[1] ?? media.exterior[0]}
        crumbs={[{ label: "Locations", href: "/locations" }]}
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Where we work"
            title="One standard, adapted to each market"
            text="Whether it is a residential launch in Lahore, a master-planned community in Riyadh or a waterfront tower in Dubai, we bring the same level of detail and adjust the approach to the buyers, regulations and expectations of each region."
          />
          <div className="mt-16 space-y-16 md:space-y-24">
            {countries.map((c, i) => (
              <article key={c.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <Link href={`/locations/${c.slug}`} className="img-zoom relative block aspect-[16/10] overflow-hidden bg-stone">
                    <Image src={c.hero.src} alt={c.hero.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  </Link>
                </Reveal>
                <Reveal delay={120}>
                  <h2 className="display text-4xl md:text-5xl">
                    <Link href={`/locations/${c.slug}`} className="hover:text-bronze">
                      {c.name}
                    </Link>
                  </h2>
                  <p className="mt-5 leading-relaxed text-muted md:text-lg">{c.lead}</p>
                  {citiesOf(c.slug).length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {citiesOf(c.slug).map((city) => (
                        <li key={city.slug}>
                          <Link
                            href={`/locations/${city.slug}`}
                            className="inline-block border border-line px-4 py-2 text-sm transition-colors hover:border-ink"
                          >
                            {city.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link href={`/locations/${c.slug}`} className="link-arrow mt-8">
                    {c.name} <span aria-hidden="true">→</span>
                  </Link>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClientStrip />
      <EnquirySection context="Locations" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: locations.map((l, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: l.name,
            url: absoluteUrl(`/locations/${l.slug}`),
          })),
        }}
      />
    </>
  );
}
