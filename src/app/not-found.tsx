import Link from "next/link";

export const metadata = { title: "Page not found | Pixarch", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="on-dark flex min-h-svh items-center bg-ink text-white">
      <div className="container-x py-40">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-4 text-5xl md:text-7xl">This page has moved or no longer exists</h1>
        <p className="mt-6 max-w-xl text-white/70">
          Try one of the links below, or head back to the homepage.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-light">Home</Link>
          <Link href="/services" className="btn btn-outline">Services</Link>
          <Link href="/projects" className="btn btn-outline">Projects</Link>
          <Link href="/contact" className="btn btn-outline">Contact</Link>
        </div>
      </div>
    </section>
  );
}
