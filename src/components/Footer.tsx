import Image from "next/image";
import Link from "next/link";
import { logo } from "@/data/media";
import { site } from "@/lib/site";
import { serviceLinks, locationLinks } from "@/lib/nav";
import { categories } from "@/data/posts";

const blogLinks = [
  { label: "All articles", href: "/blog" },
  ...categories.map((c) => ({ label: c.name, href: `/blog/category/${c.slug}` })),
];

const company = [
  { label: "About Pixarch", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow on-dark">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-gold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
        <div>
          <Link href="/" aria-label="Pixarch home">
            <Image
              src={logo.light.src}
              alt="Pixarch, since 2005"
              width={logo.light.w}
              height={logo.light.h}
              className="h-11 w-auto"
            />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            The boutique real estate creative agency. 3D rendering, walkthroughs, virtual tours, branding and
            digital marketing for property developers since {site.founded}.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="text-white/80 hover:text-gold">
                {site.email}
              </a>
            </li>
            {site.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="text-white/80 hover:text-gold">
                  {p.display}
                </a>
                <span className="ml-2 text-xs text-white/40">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <Column title="Services" links={serviceLinks} />
        <Column title="Locations" links={locationLinks} />
        <Column title="Blog" links={blogLinks} />
        <Column title="Company" links={company} />
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© Pixarch. All rights reserved. Est. {site.founded}.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase tracking-[0.18em] hover:text-gold"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
