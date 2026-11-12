import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ClientStrip, EnquirySection, JsonLd, PageHero, SectionHead, Stats } from "@/components/ui";
import { media } from "@/data/media";
import { services } from "@/data/services";
import { countries } from "@/data/locations";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Pixarch | Architectural Visualization Studio Since 2005",
  description:
    "Pixarch is a boutique real estate creative agency founded in 2005. Meet the studio behind two decades of 3D rendering, film and branding for developers.",
  path: "/about",
});

const offer = [
  "3D animation",
  "Still images",
  "VR experiences",
  "Product rendering",
  "Concept creation",
  "Brand identity",
  "Web development",
  "360-degree marketing",
  "Research & analysis",
  "Strategy & consulting",
];

const values = [
  {
    title: "A drive for excellence",
    text: "We set out to deliver work that does more than meet the brief. Each project is an opportunity to raise the standard of what architectural visualization can look like.",
  },
  {
    title: "Your timeline matters",
    text: "Architectural projects carry pressing deadlines, whether for a launch, a competition or an approval. From the first brief to final delivery, we plan around your dates.",
  },
  {
    title: "Great work comes from great teams",
    text: "We are a team-focused studio of architects, designers and visualizers. That mix of skills is what gives every project both accuracy and atmosphere.",
  },
  {
    title: "A client-centred approach",
    text: "Open communication, structured feedback and collaboration make you part of the creative process from the first preview to the final frame.",
  },
];

export default function AboutPage() {
  const [a, b, c] = media.about;
  return (
    <>
      <PageHero
        eyebrow="About Pixarch"
        title="From concept to story, since 2005"
        lead="We work alongside property developers, marketers, architects and sales teams, helping them bring their vision to life with visuals that connect with buyers from the very first look."
        image={c ?? media.exterior[0]}
        crumbs={[{ label: "About", href: "/about" }]}
      />

      <section className="border-b border-line bg-paper">
        <div className="container-x py-6 md:py-10">
          <Stats />
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow">Who we are</p>
            <h2 className="display mt-3 text-4xl md:text-5xl lg:text-6xl">A creative studio built around real estate</h2>
            <div className="mt-6 space-y-5 leading-relaxed text-muted md:text-lg">
              <p>
                Pixarch is a creative content studio producing digital assets for luxury residential,
                commercial and cultural projects. Our strength lies in combining artistry with practical
                problem-solving, so every project balances an efficient workflow with a creative approach to
                visual communication.
              </p>
              <p>
                The studio began in {site.founded} with a simple idea: turn architectural drawings into images
                people can believe in. Two decades later that idea covers{" "}
                <Link href="/services/exterior-rendering" className="font-semibold text-ink underline decoration-bronze underline-offset-4">
                  exterior
                </Link>{" "}
                and{" "}
                <Link href="/services/interior-rendering" className="font-semibold text-ink underline decoration-bronze underline-offset-4">
                  interior rendering
                </Link>
                ,{" "}
                <Link href="/services/3d-walkthroughs" className="font-semibold text-ink underline decoration-bronze underline-offset-4">
                  cinematic walkthroughs
                </Link>
                ,{" "}
                <Link href="/services/360-virtual-tours" className="font-semibold text-ink underline decoration-bronze underline-offset-4">
                  virtual tours
                </Link>
                , branding and digital marketing.
              </p>
            </div>
          </Reveal>
          {a && (
            <Reveal delay={120} className="img-zoom relative aspect-[4/3] overflow-hidden bg-stone">
              <Image src={a.src} alt={a.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-stone/60 py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {b && (
            <Reveal className="img-zoom relative aspect-[4/3] overflow-hidden bg-stone">
              <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </Reveal>
          )}
          <Reveal delay={120}>
            <p className="eyebrow">The experience</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">Detail you can trust at every scale</h2>
            <div className="mt-6 space-y-5 leading-relaxed text-muted md:text-lg">
              <p>
                Every image and film we create is shaped around your project&apos;s story, guiding buyers
                naturally through the space and helping them picture it as their own. Nothing is treated as a
                placeholder or a rough draft.
              </p>
              <p>
                By modelling every space in detail, we keep quality consistent across renders, walkthroughs
                and tours, whether it is a full floor plan or a single standout room. Our interiors are
                crafted with the accuracy that makes viewers pause and ask whether they are looking at a
                photograph.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Why Pixarch" title="What clients can expect from us" />
          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 90} className="h-full bg-paper p-8 md:p-10">
                <h3 className="display text-3xl">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark bg-ink py-20 text-white md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">What we offer</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">A full creative offer for property</h2>
            <p className="mt-5 leading-relaxed text-white/65">
              Explore each discipline in detail on our{" "}
              <Link href="/services" className="font-semibold text-gold underline underline-offset-4">
                services page
              </Link>
              .
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {offer.map((o) => (
                <li key={o} className="border-b border-white/15 py-4 text-lg">
                  {o}
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="btn btn-outline !min-h-[2.75rem] !px-4">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ClientStrip />

      <section className="bg-paper py-20 md:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Around the world"
            title="From Pakistan to international markets"
            text="We bring the same level of detail and craftsmanship to every project, wherever it is being built."
          />
          <ul className="mt-10 flex flex-wrap gap-3">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link href={`/locations/${c.slug}`} className="btn btn-outline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/projects" className="btn btn-dark mt-10">
            Discover our portfolio
          </Link>
        </div>
      </section>

      <EnquirySection title="Ready to bring your vision to life?" context="About" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Pixarch",
          url: absoluteUrl("/about"),
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
