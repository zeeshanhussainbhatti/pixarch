import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { Breadcrumbs, JsonLd, SectionHead } from "@/components/ui";
import { countries } from "@/data/locations";
import { services } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl, site, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Pixarch | Get a 3D Rendering Quote",
  description:
    "Talk to Pixarch about 3D rendering, walkthroughs, virtual tours or branding for your project. Call, email or message us on WhatsApp for a tailored quote.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="on-dark bg-ink pb-16 pt-36 text-white md:pb-24 md:pt-44">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
          <p className="eyebrow mt-8">Contact</p>
          <h1 className="display mt-4 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-7xl">
            Your queries, our priority
          </h1>
          <p className="mt-6 max-w-2xl text-white/75 md:text-lg">
            Ready to take the next step? Whether you have a question or a full brief to discuss, the Pixarch
            team is a message away.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <Reveal>
            <h2 className="display text-4xl md:text-5xl">Speak to the team</h2>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              <div className="py-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Email</dt>
                <dd className="mt-1 text-xl">
                  <a href={`mailto:${site.email}`} className="hover:text-bronze">
                    {site.email}
                  </a>
                </dd>
              </div>
              {site.phones.map((p) => (
                <div key={p.href} className="py-5">
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{p.label}</dt>
                  <dd className="mt-1 text-xl">
                    <a href={p.href} className="hover:text-bronze">
                      {p.display}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-8">
              Chat on WhatsApp
            </a>
            <h2 className="eyebrow mt-12">Follow us</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-bronze">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-line bg-white/60 p-6 md:p-10">
              <h2 className="display text-3xl md:text-4xl">Get a quote</h2>
              <p className="mb-8 mt-3 text-muted">
                Tell us a little about your project and we will come back with a scope, a schedule and a
                tailored quote.
              </p>
              <EnquiryForm context="Contact" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-stone/60 py-16 md:py-24">
        <div className="container-x grid gap-12 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Where we work" title="Markets we serve" />
            <ul className="mt-8 flex flex-wrap gap-3">
              {countries.map((c) => (
                <li key={c.slug}>
                  <Link href={`/locations/${c.slug}`} className="btn btn-outline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="What we do" title="Services" />
            <ul className="mt-8 flex flex-wrap gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="btn btn-outline">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Pixarch",
          url: absoluteUrl("/contact"),
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
