import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Img } from "@/data/media";
import { media } from "@/data/media";
import type { Faq } from "@/data/services";
import type { Post } from "@/data/posts";
import { formatDate, readingTime } from "@/data/posts";
import { absoluteUrl, site, whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";
import EnquiryForm from "./EnquiryForm";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items, dark = true }: { items: Crumb[]; dark?: boolean }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${
            dark ? "text-white/60" : "text-muted"
          }`}
        >
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className={dark ? "text-white" : "text-ink"}>
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-gold">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: absoluteUrl(c.href),
          })),
        }}
      />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: Img;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative isolate flex min-h-[70svh] items-end overflow-hidden bg-ink text-white">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
      <div className="container-x pb-14 pt-36 md:pb-20">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="display mt-4 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-7xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{lead}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  align = "left",
  as: Tag = "h2",
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  children?: ReactNode;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className="display mt-3 text-4xl md:text-5xl lg:text-[3.4rem]">{title}</Tag>
      {text && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{text}</p>}
      {children}
    </Reveal>
  );
}

export function Stats({ dark = false }: { dark?: boolean }) {
  return (
    <dl className={`grid grid-cols-2 lg:grid-cols-4 ${dark ? "text-white" : "text-ink"}`}>
      {site.stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col-reverse px-2 py-6 md:px-8 ${i > 0 ? "lg:border-l" : ""} ${
            i % 2 === 1 ? "border-l" : ""
          } ${dark ? "border-white/15" : "border-line"}`}
        >
          <dt className={`mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/60" : "text-muted"}`}>
            {s.label}
          </dt>
          <dd className="display text-5xl md:text-6xl">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ClientStrip() {
  const logos = media.clients;
  if (!logos.length) return null;
  const row = [...logos, ...logos];
  return (
    <section aria-label="Clients" className="on-dark overflow-hidden bg-coal py-12 text-white">
      <p className="eyebrow container-x text-center">Trusted by developers across Pakistan, the UAE and Saudi Arabia</p>
      <div className="relative mt-8 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="marquee flex w-max items-center gap-14 pr-14">
          {row.map((l, i) => (
            <li key={`${l.src}-${i}`} aria-hidden={i >= logos.length} className="shrink-0">
              <Image
                src={l.src}
                alt={i < logos.length ? l.alt : ""}
                width={l.w}
                height={l.h}
                sizes="176px"
                className="h-20 w-auto max-w-[11rem] object-contain opacity-90"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <SectionHead eyebrow="FAQ" title={title} />
        <Reveal>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  <h3 className="text-left">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-2xl leading-none text-bronze transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </section>
  );
}

export function EnquirySection({
  title = "Let’s bring your project to life",
  text = "Share your drawings and launch date. Our team will come back with a scope, a schedule and a quote tailored to your project.",
  context,
}: {
  title?: string;
  text?: string;
  context?: string;
}) {
  return (
    <section id="enquire" className="on-dark bg-ink py-20 text-white md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">Get a quote</p>
          <h2 className="display mt-3 text-4xl md:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-6 max-w-lg leading-relaxed text-white/70">{text}</p>
          <ul className="mt-10 space-y-4 text-sm">
            <li>
              <span className="block text-xs uppercase tracking-[0.18em] text-white/45">Email</span>
              <a href={`mailto:${site.email}`} className="text-lg hover:text-gold">
                {site.email}
              </a>
            </li>
            {site.phones.map((p) => (
              <li key={p.href}>
                <span className="block text-xs uppercase tracking-[0.18em] text-white/45">{p.label}</span>
                <a href={p.href} className="text-lg hover:text-gold">
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-arrow mt-10">
            Chat on WhatsApp <span aria-hidden="true">→</span>
          </a>
        </Reveal>
        <Reveal delay={120}>
          <EnquiryForm dark context={context} />
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceCard({
  href,
  name,
  text,
  image,
  index,
}: {
  href: string;
  name: string;
  text: string;
  image: Img;
  index: number;
}) {
  return (
    <Link href={href} className="img-zoom group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-5 flex items-baseline gap-4">
        <span className="text-xs font-semibold tracking-[0.2em] text-bronze">{String(index).padStart(2, "0")}</span>
        <div>
          <h3 className="display text-3xl transition-colors group-hover:text-bronze">{name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
        </div>
      </div>
    </Link>
  );
}

export function ProjectCard({
  href,
  name,
  summary,
  image,
  tall = false,
}: {
  href: string;
  name: string;
  summary: string;
  image: Img;
  tall?: boolean;
}) {
  return (
    <Link href={href} className="img-zoom group relative block overflow-hidden bg-ink text-white">
      <div className={`relative ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="display text-3xl">{name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/70">{summary}</p>
        <span className="mt-3 inline-block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
          View project →
        </span>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/blog/${post.slug}`} className="img-zoom block overflow-hidden bg-stone" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[16/10]">
          {post.image && (
            <Image
              src={post.image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
      </Link>
      <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingTime(post.words)} min read
      </p>
      <h3 className="display mt-2 text-2xl leading-tight md:text-[1.7rem]">
        <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-bronze">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.description}</p>
    </article>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pixarch on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/25 transition-transform duration-300 hover:scale-105"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24ZM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13-.16.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48Z" />
      </svg>
    </a>
  );
}
