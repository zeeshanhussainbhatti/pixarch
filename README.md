# Pixarch website

Marketing site for Pixarch, the boutique real estate creative agency. Built with Next.js (App Router), TypeScript and Tailwind CSS. Every page is statically generated.

## Commands

```bash
npm install
npm run dev     # local development on http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/app` | Routes: home, `/services`, `/projects`, `/locations`, `/blog`, `/about`, `/contact`, plus `sitemap.xml` and `robots.txt` |
| `src/data/services.ts` | Service page content (copy, FAQs, deliverables) |
| `src/data/locations.ts` | Country and city page content |
| `src/data/projects.ts` | Project pages, built from `media.json` |
| `src/data/posts.json` | Blog articles migrated from the previous WordPress site |
| `src/data/media.json` | Image manifest (path, size, alt text) |
| `src/lib/site.ts` | Contact details, social links, headline stats |
| `public/images`, `public/video` | Optimised images and compressed video |
| `next.config.ts` | 301 redirects from the old WordPress URLs |

## Editing content

- Contact numbers, email and social links: `src/lib/site.ts`.
- To add a location, add an entry to `src/data/locations.ts`. The page, navigation, footer and sitemap update automatically.
- To add a blog article, add an entry to `src/data/posts.json`.

## Enquiry form

The form composes the visitor's details into a WhatsApp message or an email, so it needs no backend. To capture leads in a CRM or inbox automatically, connect a form service in `src/components/EnquiryForm.tsx`.
