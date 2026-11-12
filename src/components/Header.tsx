"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logo } from "@/data/media";
type NavLink = { label: string; href: string; note?: string; type?: string; parent?: string };

const mainNav = [
  { label: "Services", href: "/services", children: "services" as const },
  { label: "Projects", href: "/projects" },
  { label: "Locations", href: "/locations", children: "locations" as const },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

type Props = { serviceLinks: NavLink[]; locationLinks: NavLink[] };

export default function Header({ serviceLinks, locationLinks }: Props) {
  const countries = locationLinks.filter((l) => l.type === "country");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setSection(null);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow] duration-500 ${
        solid ? "bg-ink shadow-[0_1px_0_rgba(255,255,255,0.08)]" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link href="/" aria-label="Pixarch home" className="relative z-10 shrink-0">
          <Image
            src={logo.light.src}
            alt="Pixarch, since 2005"
            width={logo.light.w}
            height={logo.light.h}
            priority
            className="h-9 w-auto lg:h-10"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative block py-7 text-[0.74rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-gold ${
                    isActive(item.href) ? "text-gold" : ""
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children === "services" ? (
                      <ul className="grid w-[34rem] grid-cols-2 gap-x-6 gap-y-1 bg-ink p-6 shadow-2xl ring-1 ring-white/10">
                        {serviceLinks.map((s) => (
                          <li key={s.href}>
                            <Link href={s.href} className="block rounded-sm p-3 transition-colors hover:bg-white/5">
                              <span className="block text-sm font-semibold">{s.label}</span>
                              <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-white/55">
                                {s.note}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="grid w-[40rem] grid-cols-3 gap-6 bg-ink p-6 shadow-2xl ring-1 ring-white/10">
                        {countries.map((c) => (
                          <div key={c.href}>
                            <Link href={c.href} className="text-sm font-semibold hover:text-gold">
                              {c.label}
                            </Link>
                            <ul className="mt-2 space-y-1.5">
                              {locationLinks
                                .filter((l) => l.parent && c.href.endsWith(`/${l.parent}`))
                                .map((city) => (
                                  <li key={city.href}>
                                    <Link href={city.href} className="text-sm text-white/60 hover:text-gold">
                                      {city.label}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-light hidden !min-h-[2.75rem] !px-5 sm:inline-flex">
            Enquire
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 flex h-12 w-12 items-center justify-center lg:hidden"
          >
            <span className="relative block h-4 w-7">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto overscroll-contain bg-ink lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x pb-16 pt-4">
          <ul className="divide-y divide-white/10">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={section === item.children}
                      onClick={() => setSection(section === item.children ? null : item.children!)}
                      className="display flex w-full items-center justify-between py-5 text-left text-3xl"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`text-xl text-gold transition-transform duration-300 ${
                          section === item.children ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                    {section === item.children && (
                      <ul className="grid grid-cols-1 gap-1 pb-5">
                        <li>
                          <Link href={item.href} className="block py-2 text-sm font-semibold text-gold">
                            All {item.label.toLowerCase()}
                          </Link>
                        </li>
                        {(item.children === "services" ? serviceLinks : locationLinks).map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="block py-2 text-base text-white/80">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="display block py-5 text-3xl">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-light mt-8 w-full">
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
