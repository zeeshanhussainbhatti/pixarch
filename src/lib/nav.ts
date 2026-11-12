import { services } from "@/data/services";
import { locations } from "@/data/locations";

export const serviceLinks = services.map((s) => ({
  label: s.navLabel,
  href: `/services/${s.slug}`,
  note: s.short,
}));

export const locationLinks = locations.map((l) => ({
  label: l.name,
  href: `/locations/${l.slug}`,
  type: l.type,
  parent: l.parent,
}));

