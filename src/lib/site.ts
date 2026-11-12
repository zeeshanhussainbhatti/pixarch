export const site = {
  name: "Pixarch",
  legalName: "Pixarch",
  url: "https://www.pixarch.net",
  tagline: "The Boutique Real Estate Creative Agency",
  description:
    "Pixarch is a boutique real estate creative agency producing photorealistic 3D rendering, cinematic walkthroughs, 360 virtual tours, branding and digital marketing for property developers in Pakistan, the UAE and Saudi Arabia.",
  founded: 2005,
  email: "info@pixarch.net",
  phones: [
    { label: "Pakistan (mobile & WhatsApp)", display: "+92 324 8233065", href: "tel:+923248233065" },
    { label: "Pakistan (office)", display: "+92 21 35856275", href: "tel:+922135856275" },
    { label: "Saudi Arabia", display: "+966 55 982 6130", href: "tel:+966559826130" },
  ],
  whatsapp: "923248233065",
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/pixarch3d/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/pixarch" },
    { name: "YouTube", href: "https://www.youtube.com/@Pixarchnet" },
    { name: "Facebook", href: "https://www.facebook.com/Pixarch/" },
  ],
  stats: [
    { value: "20+", label: "Years of experience" },
    { value: "100+", label: "Artists & specialists" },
    { value: "30+", label: "Creative services" },
    { value: "200+", label: "Brand partnerships" },
  ],
} as const;

export function whatsappLink(message?: string) {
  const text = message ?? "Hello Pixarch, I would like to discuss a project.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}
