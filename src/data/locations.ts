import { media, pick, type Img } from "./media";
import type { Faq } from "./services";

export type Location = {
  slug: string;
  name: string;
  type: "country" | "city";
  parent?: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  body: string[];
  points: { title: string; text: string }[];
  faqs: Faq[];
  hero: Img;
  gallery: Img[];
  phone?: { display: string; href: string };
};

const ext = media.exterior;
const int = media.interior;
const intl = media.intl;
const trillium = media.projects["the-trillium-towers"].images;

export const locations: Location[] = [
  {
    slug: "pakistan",
    name: "Pakistan",
    type: "country",
    metaTitle: "3D Rendering Company in Pakistan | Pixarch",
    metaDescription:
      "Pixarch is a 3D rendering company in Pakistan serving developers in Karachi, Lahore and Islamabad with renders, walkthroughs, virtual tours and branding.",
    eyebrow: "Pakistan",
    h1: "3D rendering and real estate marketing in Pakistan",
    lead: "Pakistan is where Pixarch began in 2005, and it is still the heart of our studio. We work with developers, architects and marketing teams across Karachi, Lahore and Islamabad to launch projects with visuals the market believes.",
    body: [
      "Most property in Pakistan is sold off-plan, often to buyers who will never visit the site before they book. That makes the quality of the visuals a commercial decision, not a decorative one. A project that looks finished, credible and consistent across its brochure, billboard and social media earns trust faster than one that does not.",
      "Our team covers the full launch kit under one roof: exterior and interior rendering, cinematic walkthroughs, 360 virtual tours, branding, outdoor media and digital marketing. One brief, one team and one visual standard from the first teaser to sell-out.",
    ],
    points: [
      {
        title: "Built for off-plan sales",
        text: "Visuals designed to answer the questions buyers ask before they reserve: what it looks like, how it lives and what the view is.",
      },
      {
        title: "Ready for overseas buyers",
        text: "Walkthroughs and virtual tours let overseas Pakistanis explore a project from Dubai, Riyadh or Manchester.",
      },
      {
        title: "Local market knowledge",
        text: "Two decades of launches means we understand how projects are marketed and sold in each major city.",
      },
    ],
    faqs: [
      {
        q: "Which cities in Pakistan does Pixarch serve?",
        a: "We work with developers across the country, with most of our projects in Karachi, Lahore and Islamabad. Work is managed remotely and in person, so location is never a barrier.",
      },
      {
        q: "Do you only produce 3D renders?",
        a: "No. Alongside rendering we produce cinematic walkthroughs, 360 virtual tours, branding, brochures, outdoor media and digital marketing campaigns for real estate.",
      },
      {
        q: "Can you help us reach overseas Pakistani buyers?",
        a: "Yes. Virtual tours, walkthrough films and country-targeted digital campaigns are designed for buyers who cannot visit the site in person.",
      },
    ],
    hero: trillium[0],
    gallery: [...pick(intl, [1, 2, 3, 4]), ...pick(ext, [5, 7, 9, 10])],
    phone: { display: "+92 324 8233065", href: "tel:+923248233065" },
  },
  {
    slug: "karachi",
    name: "Karachi",
    type: "city",
    parent: "pakistan",
    metaTitle: "3D Rendering Services in Karachi | Pixarch",
    metaDescription:
      "3D rendering, walkthroughs and real estate branding in Karachi. Pixarch helps developers launch high-rise and beachfront projects with photorealistic visuals.",
    eyebrow: "Karachi, Pakistan",
    h1: "3D rendering services in Karachi",
    lead: "Karachi is building up. With land prices rising and demand for housing growing, high-rise living has become the direction of the city, and every new tower competes for the same buyers. Pixarch helps Karachi developers stand out with visuals that look as good as the finished building.",
    body: [
      "Vertical projects are hard to explain with drawings. Buyers want to know what the tower looks like from the street, what the lobby feels like and what they will see from the fourteenth floor. Our exterior renders, interior sets and cinematic walkthroughs answer those questions before the structure is out of the ground.",
      "For sea-facing and beachfront developments, we pay particular attention to light, water and skyline, because the view is often the product. We then carry the same look into brochures, hoardings and digital campaigns so the whole launch feels like one project.",
    ],
    points: [
      {
        title: "High-rise expertise",
        text: "Towers, podiums and amenity decks rendered with accurate scale, glazing and night lighting.",
      },
      {
        title: "Waterfront and skyline views",
        text: "Sea views and city panoramas built into the scene, so buyers see what they are paying for.",
      },
      {
        title: "Full launch support",
        text: "Branding, outdoor media and digital marketing produced alongside the visuals.",
      },
    ],
    faqs: [
      {
        q: "Do you work with developers in DHA, Clifton and other parts of Karachi?",
        a: "Yes. We work with developers across Karachi on residential towers, mixed-use projects and beachfront developments.",
      },
      {
        q: "Can we meet your team in Karachi?",
        a: "Yes. You can reach our Karachi line on +92 21 35856275 or message us on WhatsApp to arrange a meeting.",
      },
      {
        q: "Can you show the real view from a specific floor?",
        a: "Yes. With the site location and floor heights we can build the surrounding context into the scene and render the outlook from any level.",
      },
    ],
    hero: trillium[2],
    gallery: [...trillium.slice(0, 5), ...pick(trillium, [9, 11, 14])],
    phone: { display: "+92 21 35856275", href: "tel:+922135856275" },
  },
  {
    slug: "lahore",
    name: "Lahore",
    type: "city",
    parent: "pakistan",
    metaTitle: "3D Rendering Services in Lahore | Pixarch",
    metaDescription:
      "3D rendering, walkthroughs and virtual tours in Lahore for housing societies, villas and commercial projects. Photorealistic visuals that help you sell.",
    eyebrow: "Lahore, Pakistan",
    h1: "3D rendering services in Lahore",
    lead: "From gated communities to commercial plazas and apartment buildings, Lahore's property market is broad and highly competitive. Pixarch gives Lahore developers and architects the visuals to launch with confidence.",
    body: [
      "Master-planned communities need to be understood from the air and at eye level. We produce aerial master plan renders that explain the layout of a society, then bring it down to the street with villa facades, parks, commercial areas and entrance gates that feel real.",
      "Inside, we render villas and apartments with the warmth and material detail Lahore buyers expect, and extend them into 360 virtual tours so families can walk through a home together before they visit the site.",
    ],
    points: [
      {
        title: "Master plan visualization",
        text: "Aerial renders that make the scale, layout and amenities of a community easy to understand.",
      },
      {
        title: "Villas and apartments",
        text: "Exterior and interior sets for each house or unit type, styled for the intended buyer.",
      },
      {
        title: "Commercial projects",
        text: "Plazas, malls and offices presented with accurate branding, signage and street life.",
      },
    ],
    faqs: [
      {
        q: "Do you produce master plan renders for housing societies?",
        a: "Yes. Aerial master plan renders and community walkthroughs are a regular part of our work.",
      },
      {
        q: "How do we work with you from Lahore?",
        a: "Briefs, previews and reviews are handled online with scheduled calls, and files are shared securely. You have one point of contact from start to finish.",
      },
      {
        q: "Can you design the brochure and billboards too?",
        a: "Yes. Our branding and design team produces the full launch kit alongside the 3D visuals.",
      },
    ],
    hero: ext[11],
    gallery: [...pick(ext, [12, 13, 14, 17, 21]), ...pick(int, [9, 10, 13])],
    phone: { display: "+92 324 8233065", href: "tel:+923248233065" },
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    type: "city",
    parent: "pakistan",
    metaTitle: "3D Rendering Services in Islamabad | Pixarch",
    metaDescription:
      "3D rendering and architectural visualization in Islamabad and Rawalpindi. Renders, walkthroughs and virtual tours for residential and commercial developments.",
    eyebrow: "Islamabad, Pakistan",
    h1: "3D rendering services in Islamabad",
    lead: "Islamabad's developments are defined by their setting: the hills, the greenery and the planned character of the city. Pixarch produces architectural visualization for Islamabad and Rawalpindi projects that puts that setting to work.",
    body: [
      "We build the landscape and the backdrop into every exterior, so a project is shown where it really stands. Apartment buildings, hillside villas, hotels and commercial centres are rendered with accurate materials and natural light at the time of day that suits them best.",
      "A cinematic walkthrough then links it all together, taking a buyer from the approach road to the lobby and up to the terrace. For investors based abroad, it is often the closest thing to a site visit.",
    ],
    points: [
      {
        title: "Context that sells",
        text: "Hills, greenery and surroundings modelled into the scene rather than added as an afterthought.",
      },
      {
        title: "Residential and hospitality",
        text: "Apartments, villas, hotels and serviced residences presented at a consistent premium standard.",
      },
      {
        title: "Investor-ready films",
        text: "Walkthroughs produced for sales events, investor presentations and digital campaigns.",
      },
    ],
    faqs: [
      {
        q: "Do you cover Rawalpindi as well as Islamabad?",
        a: "Yes. We work with developers across the twin cities and the surrounding region.",
      },
      {
        q: "Can you match the real site surroundings?",
        a: "Yes. Using site photographs, drone footage or map data we recreate the context so the render reflects the actual location.",
      },
      {
        q: "What should we prepare before contacting you?",
        a: "Architectural drawings, the site location, a list of the views you need and your launch date. If some of this is not ready yet, we can advise on what to prioritise.",
      },
    ],
    hero: ext[12],
    gallery: [...pick(ext, [3, 4, 6, 13, 18]), ...pick(int, [1, 4, 6])],
    phone: { display: "+92 324 8233065", href: "tel:+923248233065" },
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    type: "country",
    metaTitle: "3D Rendering Company in the UAE | Pixarch",
    metaDescription:
      "Architectural visualization for UAE developers: photorealistic renders, cinematic walkthroughs and virtual tours for towers, villas and waterfront communities.",
    eyebrow: "United Arab Emirates",
    h1: "Architectural visualization for the UAE",
    lead: "The UAE property market moves quickly, and launches compete on presentation as much as on price. Pixarch delivers architectural rendering, walkthroughs and virtual tours for developers across the Emirates, from waterfront towers to boutique villa communities.",
    body: [
      "Off-plan sales drive the market, and international investors make decisions from thousands of kilometres away. The visuals have to carry the whole proposition: the architecture, the lifestyle, the amenities and the skyline beyond the balcony.",
      "We produce complete launch sets for UAE projects, including hero exteriors, lifestyle imagery, amenity interiors and film, all to a standard that holds its own in one of the world's most competitive launch calendars.",
    ],
    points: [
      {
        title: "Launch-calendar speed",
        text: "Production planned around fixed launch dates, with early previews to keep approvals moving.",
      },
      {
        title: "Lifestyle-led imagery",
        text: "People, light and atmosphere used to sell a way of living, not only a building.",
      },
      {
        title: "International standard",
        text: "Output prepared for global investor audiences across print, digital and event screens.",
      },
    ],
    faqs: [
      {
        q: "Do you work with developers in Dubai and Abu Dhabi?",
        a: "Yes. We work with UAE developers and their marketing teams, with most of our projects in Dubai.",
      },
      {
        q: "Can you deliver to a fixed launch date?",
        a: "Yes. We plan production backwards from the launch date and agree milestones for previews and approvals at the start.",
      },
      {
        q: "Do you produce lifestyle visuals with people?",
        a: "Yes. Lifestyle scenes with people, activity and atmosphere are a core part of our work for the UAE market.",
      },
    ],
    hero: intl[14] ?? ext[0],
    gallery: pick(intl, [10, 11, 12, 13, 15, 16, 17, 18]),
  },
  {
    slug: "dubai",
    name: "Dubai",
    type: "city",
    parent: "uae",
    metaTitle: "3D Rendering Services in Dubai | Pixarch",
    metaDescription:
      "3D rendering and walkthrough animation for Dubai property launches. Photorealistic exteriors, interiors and lifestyle visuals for off-plan developments.",
    eyebrow: "Dubai, UAE",
    h1: "3D rendering services in Dubai",
    lead: "Dubai sets the pace for property marketing. Every launch arrives with film-quality visuals, and buyers have seen the best. Pixarch helps Dubai developers meet that standard with renders, walkthroughs and tours that make a project the one people remember.",
    body: [
      "We work on waterfront towers, villa communities and mixed-use developments, building the skyline, the water and the landscape into each scene. Lifestyle imagery shows residents on the terrace at sunset or walking through landscaped courtyards, because in Dubai the lifestyle is the product.",
      "Interiors are styled to the level international investors expect, then extended into 360 tours and cinematic films for sales galleries, roadshows and digital campaigns.",
    ],
    points: [
      {
        title: "Skyline and waterfront",
        text: "Accurate city context and water rendered with the light Dubai is known for.",
      },
      {
        title: "Roadshow-ready assets",
        text: "Films, stills and tours formatted for sales galleries, events and broker presentations.",
      },
      {
        title: "Villa communities",
        text: "Master plans, street scenes and villa types presented as one coherent community.",
      },
    ],
    faqs: [
      {
        q: "Can you produce content for broker events and roadshows?",
        a: "Yes. We supply films, large-format stills and interactive tours prepared for event screens and presentations.",
      },
      {
        q: "Do you render the Dubai skyline accurately?",
        a: "Yes. The surrounding city is built into the scene based on the project's actual location and orientation.",
      },
      {
        q: "How do we brief you from Dubai?",
        a: "Share your drawings and launch date by email or WhatsApp and we will arrange a call to scope the views, schedule and deliverables.",
      },
    ],
    hero: intl[12] ?? ext[0],
    gallery: pick(intl, [10, 14, 15, 16, 17, 18, 11, 13]),
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    type: "country",
    metaTitle: "3D Rendering Company in Saudi Arabia (KSA) | Pixarch",
    metaDescription:
      "360° creative solutions for real estate in Saudi Arabia: CGI, 3D animation, walkthroughs and marketing for developers building under Vision 2030.",
    eyebrow: "Kingdom of Saudi Arabia",
    h1: "360° creative solutions for real estate in Saudi Arabia",
    lead: "Under Vision 2030, Saudi Arabia's real estate market has grown fast, and Pixarch has grown with it. We support developers, project marketers and architects across the Kingdom with CGI, 3D animation and marketing tools shaped for the local market.",
    body: [
      "Large residential and commercial communities need to be explained long before they are finished. We produce master plan aerials, street-level scenes, interiors and cinematic films that give investors and buyers a clear view of what is coming.",
      "Our visuals reflect how communities in the Kingdom are actually lived in, from architecture and landscape to the people in the scene. That cultural accuracy is what makes a render feel like a real place rather than a generic image.",
    ],
    points: [
      {
        title: "Community-scale projects",
        text: "Master plans, mixed-use districts and residential communities visualised from the air and the street.",
      },
      {
        title: "Culturally accurate scenes",
        text: "Architecture, landscape and people rendered to reflect life in the Kingdom.",
      },
      {
        title: "A dedicated KSA line",
        text: "Speak to our team directly on +966 55 982 6130.",
      },
    ],
    faqs: [
      {
        q: "Do you work with developers in Riyadh, Jeddah and the Eastern Province?",
        a: "Yes. We work with developers and marketing teams across the Kingdom.",
      },
      {
        q: "Can you produce Arabic-language films and collateral?",
        a: "Yes. Films, brochures and campaign material can be produced in Arabic, English or both.",
      },
      {
        q: "What services do you offer in Saudi Arabia?",
        a: "Exterior and interior rendering, cinematic walkthroughs, 360 virtual tours, branding and digital marketing for real estate.",
      },
    ],
    hero: intl[4] ?? ext[0],
    gallery: [...pick(intl, [5, 6, 7, 8, 9]), ...pick(ext, [12, 5, 18])],
    phone: { display: "+966 55 982 6130", href: "tel:+966559826130" },
  },
  {
    slug: "riyadh",
    name: "Riyadh",
    type: "city",
    parent: "saudi-arabia",
    metaTitle: "3D Rendering Services in Riyadh | Pixarch",
    metaDescription:
      "3D rendering, walkthroughs and real estate marketing in Riyadh. Visualization for residential communities, towers and commercial developments.",
    eyebrow: "Riyadh, Saudi Arabia",
    h1: "3D rendering services in Riyadh",
    lead: "Riyadh is one of the fastest-changing cities in the world, with new districts, towers and communities announced every year. Pixarch helps Riyadh developers present those projects clearly to buyers, investors and partners.",
    body: [
      "We visualise master-planned communities, residential compounds, retail destinations and office developments. Each project is shown in its setting with accurate architecture, planting suited to the climate and street life that reflects the city.",
      "Stills, films and interactive tours are delivered as a coordinated set, ready for sales centres, exhibitions and digital campaigns in Arabic and English.",
    ],
    points: [
      {
        title: "Master-planned communities",
        text: "Aerials and eye-level scenes that make large developments easy to understand.",
      },
      {
        title: "Exhibition-ready output",
        text: "Large-format stills and films prepared for sales centres and property exhibitions.",
      },
      {
        title: "Arabic and English",
        text: "Films and collateral delivered in both languages.",
      },
    ],
    faqs: [
      {
        q: "Can you prepare visuals for property exhibitions?",
        a: "Yes. We deliver large-format stills, films and interactive tours formatted for exhibition stands and sales centres.",
      },
      {
        q: "How do we contact your KSA team?",
        a: "Call +966 55 982 6130 or email info@pixarch.net and we will arrange a meeting.",
      },
      {
        q: "Do you handle branding for new communities?",
        a: "Yes. Naming, identity, brochures and outdoor media can be developed alongside the 3D visuals.",
      },
    ],
    hero: intl[5] ?? ext[0],
    gallery: [...pick(intl, [5, 7, 8, 9]), ...pick(ext, [3, 4, 9, 13])],
    phone: { display: "+966 55 982 6130", href: "tel:+966559826130" },
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    type: "country",
    metaTitle: "Architectural Visualization for UK Developers | Pixarch",
    metaDescription:
      "Architectural visualization for UK property developers: CGIs for planning, off-plan sales and investor presentations, produced by Pixarch's 3D studio.",
    eyebrow: "United Kingdom",
    h1: "Architectural visualization for UK developers",
    lead: "The UK is a detail-driven property market, where a CGI may need to satisfy a planning officer, an investor and a buyer at the same time. Pixarch produces visualization for planning applications, off-plan sales and investor presentations.",
    body: [
      "Accuracy comes first. We model from your consultant drawings, respect the materials specified and present the scheme in its real context, so the image can be relied on at every stage.",
      "For sales and marketing, the same model is developed into lifestyle stills, interiors and film. Working with an established offshore studio gives UK teams access to a large production team with clear communication and structured review rounds.",
    ],
    points: [
      {
        title: "Planning and marketing CGIs",
        text: "Accurate views for approvals, developed further into marketing imagery when the scheme is ready.",
      },
      {
        title: "Structured delivery",
        text: "Clear milestones, preview rounds and a single point of contact throughout.",
      },
      {
        title: "Studio capacity",
        text: "A large team that can scale to multi-view and multi-phase schemes.",
      },
    ],
    faqs: [
      {
        q: "How do you work with UK clients remotely?",
        a: "Projects are run online with scheduled calls, shared previews and written feedback rounds, managed by one point of contact.",
      },
      {
        q: "Can you work from Revit or CAD files?",
        a: "Yes. We work from Revit, AutoCAD, SketchUp and other common formats, as well as PDFs where models are not available.",
      },
      {
        q: "Do you produce interiors and films as well as exterior CGIs?",
        a: "Yes. Interiors, cinematic walkthroughs and 360 virtual tours are all available from the same model.",
      },
    ],
    hero: ext[15] ?? ext[0],
    gallery: [...pick(ext, [16, 13, 14, 17, 4]), ...pick(int, [3, 7, 11])],
  },
  {
    slug: "united-states",
    name: "United States",
    type: "country",
    metaTitle: "3D Rendering Services for US Developers | Pixarch",
    metaDescription:
      "3D rendering and walkthrough animation for US real estate developers. Renders for marketing, investor relations and approvals from Pixarch's 3D studio.",
    eyebrow: "United States",
    h1: "3D rendering services for US developers",
    lead: "From urban infill to large residential communities, US developers use visualization to win approvals, raise capital and pre-sell. Pixarch supports those goals with renders, walkthroughs and virtual tours.",
    body: [
      "We produce exterior and interior imagery that explains a scheme to different audiences, whether that is a neighbourhood meeting, an investor deck or a pre-sales campaign. Each view is built from your drawings and shown in its real setting.",
      "With a large in-house team and two decades of experience, we offer the capacity of a major studio with direct communication and a schedule built around your deadlines.",
    ],
    points: [
      {
        title: "Marketing and pre-sales",
        text: "Hero imagery, amenity views and films for launch campaigns and sales centres.",
      },
      {
        title: "Investor relations",
        text: "Clear, credible visuals for pitch decks, offering documents and presentations.",
      },
      {
        title: "Approvals support",
        text: "Accurate context views that help communicate a scheme to stakeholders.",
      },
    ],
    faqs: [
      {
        q: "How do you handle the time difference?",
        a: "We agree fixed check-in times, share previews for review at the end of our day and act on feedback while your team is offline, which keeps projects moving around the clock.",
      },
      {
        q: "What file formats do you accept?",
        a: "Revit, AutoCAD, SketchUp, Rhino and PDF drawings are all fine. We will tell you if anything else is needed.",
      },
      {
        q: "Can you produce a virtual tour for remote buyers?",
        a: "Yes. Interactive 360 tours run in any browser and are well suited to buyers and investors who cannot visit in person.",
      },
    ],
    hero: ext[3] ?? ext[0],
    gallery: [...pick(ext, [7, 9, 10, 13, 18]), ...pick(int, [5, 8, 12])],
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

export const countries = locations.filter((l) => l.type === "country");
export const citiesOf = (slug: string) => locations.filter((l) => l.parent === slug);
