import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import Reveal from "@/components/Reveal";
import {
  ClientStrip,
  EnquirySection,
  FaqSection,
  JsonLd,
  PostCard,
  ProjectCard,
  SectionHead,
  ServiceCard,
  Stats,
} from "@/components/ui";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { countries, citiesOf } from "@/data/locations";
import { posts } from "@/data/posts";
import { media } from "@/data/media";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "3D Rendering & Architectural Visualization in Pakistan | Pixarch",
  description:
    "See your project before it is built. Pixarch delivers photorealistic 3D rendering, walkthroughs, virtual tours and branding for developers and architects.",
  path: "/",
});

const steps = [
  {
    title: "Brief",
    text: "We study your drawings, your buyer and your launch date, then agree the views, films and collateral the project needs.",
  },
  {
    title: "Build",
    text: "The development is modelled once, accurately, and that single model feeds every still, film and tour.",
  },
  {
    title: "Refine",
    text: "Light, materials and atmosphere are developed with your team through structured preview rounds.",
  },
  {
    title: "Launch",
    text: "Final assets are delivered for print, digital and the sales office, with campaign support if you need it.",
  },
];

const faqs = [
  {
    q: "What does Pixarch do?",
    a: "Pixarch is a boutique real estate creative agency. We produce photorealistic 3D exterior and interior renders, cinematic walkthroughs, 360 virtual tours, branding and digital marketing for property developers and architects.",
  },
  {
    q: "Why are 3D renders important for off-plan property sales?",
    a: "Off-plan buyers are asked to commit to something that does not exist yet. Photorealistic renders show the finished building, its interiors and its views, which builds the confidence buyers and investors need to reserve early.",
  },
  {
    q: "Which countries do you work in?",
    a: "We work with developers in Pakistan, the United Arab Emirates and Saudi Arabia, and with clients in the United Kingdom and the United States.",
  },
  {
    q: "How do we start a project with Pixarch?",
    a: "Send us your drawings and launch date by email or WhatsApp. We will arrange a call, confirm the scope and come back with a schedule and a quote.",
  },
];

export default function Home() {
  const featured = projects.slice(0, 6);
  const latest = posts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="on-dark relative isolate flex min-h-svh items-end overflow-hidden bg-ink text-white">
        <Image
          src="/video/hero.webp"
          alt="Photorealistic 3D render of a luxury residential development by Pixarch"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10">
          <HeroVideo desktopSrc="/video/hero-1080.mp4" mobileSrc="/video/hero-720.mp4" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/45" />
        </div>
        <div className="container-x pb-16 pt-40 md:pb-24">
          <p className="hero-rise text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/85">Pixarch · Since {site.founded}</p>
          <h1 className="display hero-rise mt-5 max-w-5xl text-[2.9rem] [animation-delay:120ms] sm:text-7xl lg:text-[6.2rem]">
            The boutique real estate <em className="font-normal italic text-gold">creative agency</em>
          </h1>
          <p className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-white/85 [animation-delay:240ms] md:text-lg">
            Photorealistic 3D rendering, cinematic walkthroughs and launch branding that help developers sell
            the vision before construction begins.
          </p>
          <div className="hero-rise mt-9 flex flex-wrap gap-3 [animation-delay:360ms]">
            <Link href="/projects" className="btn btn-light">
              View our work
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Start a project
            </Link>
          </div>
        </div>
        <span aria-hidden="true" className="absolute bottom-0 right-8 hidden h-24 w-px bg-white/25 md:block">
          <span className="scroll-cue absolute inset-0 bg-gold" />
        </span>
      </section>

      {/* Stats */}
      <section aria-label="Pixarch in numbers" className="border-b border-line bg-paper">
        <div className="container-x py-6 md:py-10">
          <Stats />
        </div>
      </section>

      {/* Intro */}
      <section className="bg-paper py-20 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">3D rendering in Pakistan and beyond</p>
            <h2 className="display mt-3 text-4xl md:text-5xl lg:text-6xl">
              Bringing designs to life, long before they are built
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
            <p>
              Every great development starts with a picture the world can believe in. As a dedicated{" "}
              <Link href="/services" className="font-semibold text-ink underline decoration-bronze underline-offset-4">
                3D rendering company
              </Link>
              , we help developers, architects and real estate brands showcase their projects long before
              construction begins, blending technical precision with creative storytelling.
            </p>
            <p>
              Whether it is a residential tower, a commercial complex or a boutique villa, our work helps you
              sell the vision, not just the blueprint. We partner with teams across{" "}
              <Link href="/locations/pakistan" className="font-semibold text-ink underline decoration-bronze underline-offset-4">
                Pakistan
              </Link>
              , the{" "}
              <Link href="/locations/uae" className="font-semibold text-ink underline decoration-bronze underline-offset-4">
                UAE
              </Link>{" "}
              and{" "}
              <Link href="/locations/saudi-arabia" className="font-semibold text-ink underline decoration-bronze underline-offset-4">
                Saudi Arabia
              </Link>{" "}
              to turn ideas into images that inspire confidence and close deals faster.
            </p>
            <Link href="/about" className="link-arrow !mt-8 text-ink">
              About the studio <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-stone/60 py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHead
              eyebrow="What we do"
              title="One studio for the whole launch"
              text="Visuals, film, brand and campaign produced by one team, so every touchpoint tells the same story."
            />
            <Link href="/services" className="link-arrow shrink-0 self-start md:self-end">
              All services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 90}>
                <ServiceCard href={`/services/${s.slug}`} name={s.name} text={s.short} image={s.hero} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Exterior feature */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal className="img-zoom relative aspect-[4/3] overflow-hidden bg-stone">
            <Image
              src={media.exterior[0].src}
              alt={media.exterior[0].alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Exterior rendering</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">Designed to be seen</h2>
            <p className="mt-5 leading-relaxed text-muted md:text-lg">
              First impressions are everything, and the exterior is where every story begins. Our exterior
              rendering captures light, texture and scale with striking accuracy, giving your project the
              presence it deserves before a single wall goes up.
            </p>
            <Link href="/services/exterior-rendering" className="btn btn-dark mt-8">
              Explore exterior rendering
            </Link>
          </Reveal>
        </div>
        <div className="container-x mt-10 grid items-center gap-10 lg:mt-24 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-stone">
              <Image
                src={media.interior[2].src}
                alt={media.interior[2].alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Interior rendering</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">Where spaces come alive</h2>
            <p className="mt-5 leading-relaxed text-muted md:text-lg">
              A space is not just walls and finishes. It is how someone feels the moment they picture
              themselves in it. Our interiors capture warmth, flow and lifestyle, so buyers and tenants can
              imagine daily life within the space. It is the difference between showing a room and selling a
              feeling.
            </p>
            <Link href="/services/interior-rendering" className="btn btn-dark mt-8">
              Explore interior rendering
            </Link>
          </Reveal>
        </div>
      </section>

      <ClientStrip />

      {/* Projects */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHead
              eyebrow="Selected work"
              title="Projects we have helped bring to market"
              text="A selection of developments where Pixarch produced the renders, films and launch material."
            />
            <Link href="/projects" className="link-arrow shrink-0 self-start md:self-end">
              All projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <ProjectCard href={`/projects/${p.slug}`} name={p.name} summary={p.summary} image={p.cover} tall />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="on-dark bg-ink py-20 text-white md:py-28">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">How we work</p>
            <h2 className="display mt-3 text-4xl md:text-5xl lg:text-6xl">A clear path from drawings to launch</h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="border-t border-white/20 pt-6">
                <span className="text-xs font-semibold tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-3 text-3xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-stone/60 py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Around the world"
            title="Local knowledge in every market we serve"
            text="Pixarch began in Pakistan and now works with developers across the Gulf, the UK and the US."
          />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {countries.map((c) => (
              <li key={c.slug} className="bg-paper p-6 md:p-8">
                <h3 className="display text-3xl">
                  <Link href={`/locations/${c.slug}`} className="hover:text-bronze">
                    {c.name}
                  </Link>
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {citiesOf(c.slug).map((city) => (
                    <li key={city.slug}>
                      <Link href={`/locations/${city.slug}`} className="hover:text-bronze">
                        3D rendering in {city.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={`/locations/${c.slug}`} className="font-semibold text-ink hover:text-bronze">
                      View {c.name} →
                    </Link>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHead eyebrow="Insights" title="Thinking on real estate marketing" />
            <Link href="/blog" className="link-arrow shrink-0 self-start md:self-end">
              All articles <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Questions developers ask us" />
      <EnquirySection context="Home" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${site.url}/#service`,
          name: site.name,
          url: site.url,
          image: `${site.url}/images/og.jpg`,
          description: site.description,
          email: site.email,
          telephone: "+923248233065",
          areaServed: ["Pakistan", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "United States"],
          parentOrganization: { "@id": `${site.url}/#organization` },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Real estate creative services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` },
            })),
          },
        }}
      />
    </>
  );
}
