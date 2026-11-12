import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd, WhatsAppFab } from "@/components/ui";
import { serviceLinks, locationLinks } from "@/lib/nav";
import { site } from "@/lib/site";

const manrope = localFont({
  src: "../fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-latin-wght-normal.woff2", style: "normal", weight: "300 700" },
    { path: "../fonts/cormorant-garamond-latin-wght-italic.woff2", style: "italic", weight: "300 700" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "3D Rendering & Architectural Visualization in Pakistan | Pixarch",
    template: "%s",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Pixarch architectural visualization" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
  width: "device-width",
  initialScale: 1,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/brand/logo-dark.webp`,
  description: site.description,
  foundingDate: String(site.founded),
  email: site.email,
  sameAs: site.socials.map((s) => s.href),
  areaServed: ["Pakistan", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "United States"],
  contactPoint: site.phones.map((p) => ({
    "@type": "ContactPoint",
    telephone: p.href.replace("tel:", ""),
    contactType: "sales",
    availableLanguage: ["English", "Urdu", "Arabic"],
  })),
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <Header
          serviceLinks={serviceLinks}
          locationLinks={locationLinks}
        />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <JsonLd data={organization} />
        <JsonLd data={website} />
      </body>
    </html>
  );
}
