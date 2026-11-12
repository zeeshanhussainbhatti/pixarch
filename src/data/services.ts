import { media, type Img } from "./media";

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  navLabel: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  body: string[];
  features: { title: string; text: string }[];
  deliverables: string[];
  process: { title: string; text: string }[];
  faqs: Faq[];
  hero: Img;
  gallery: Img[];
  galleryTitle: string;
  related: string[];
  videoSlugs?: string[];
};

export const services: Service[] = [
  {
    slug: "exterior-rendering",
    name: "Exterior Rendering",
    navLabel: "Exterior Rendering",
    short:
      "Photorealistic facades, streetscapes and aerials that give a development presence before a single wall goes up.",
    metaTitle: "3D Exterior Rendering Services in Pakistan | Pixarch",
    metaDescription:
      "Photorealistic 3D exterior rendering for towers, villas and master plans. Pixarch helps developers and architects in Pakistan, the UAE and KSA sell off-plan.",
    eyebrow: "3D Exterior Rendering",
    h1: "Exterior rendering that sells the building before it is built",
    lead: "The exterior is the first thing a buyer or investor sees, and it decides whether they keep looking. Pixarch produces photorealistic 3D exterior renders that show the facade, the landscape and the street exactly as they will stand on handover.",
    body: [
      "We work from your architectural drawings, material schedules and site plans, then build an accurate 3D model of the development and its surroundings. Light, weather, planting, people and traffic are added with one goal: a picture the market believes.",
      "The same model feeds everything else your launch needs. Hero stills for hoardings and brochures, aerials for master plans, dusk shots for social media and camera paths for a cinematic walkthrough all come from a single source, so every image of the project agrees with every other.",
    ],
    features: [
      {
        title: "Precision in every pixel",
        text: "Materials, glazing, lighting and landscaping are modelled to the drawings, so what buyers see is what gets built.",
      },
      {
        title: "Designed to turn heads",
        text: "Composition, time of day and atmosphere are chosen for the campaign, not left to a default camera.",
      },
      {
        title: "Built for every format",
        text: "High-resolution output for billboards, print and digital, with consistent colour across all of them.",
      },
    ],
    deliverables: [
      "Hero facade stills",
      "Street-level and podium views",
      "Aerial and master plan renders",
      "Day, dusk and night variations",
      "Landscape and amenity deck views",
      "Billboard-resolution output",
    ],
    process: [
      { title: "Brief and drawings", text: "We collect CAD or BIM files, material references and the campaign goals." },
      { title: "Model and camera", text: "The building is modelled and camera angles are agreed on clay previews." },
      { title: "Light and material", text: "Texturing, lighting and landscape are developed and reviewed with your team." },
      { title: "Final render", text: "High-resolution stills are rendered, graded and delivered in every format you need." },
    ],
    faqs: [
      {
        q: "What do you need from us to start an exterior render?",
        a: "Architectural drawings (CAD, Revit or SketchUp), elevations, a site plan and any material or landscape references. If the design is still developing, we can start from concept sketches and refine as drawings are finalised.",
      },
      {
        q: "How long does a 3D exterior render take?",
        a: "Timing depends on the size of the development and the number of views. We agree a schedule at the brief stage, share clay previews early for camera approval and build review rounds into the timeline so launch dates are protected.",
      },
      {
        q: "Can the same model be used for a walkthrough or virtual tour?",
        a: "Yes. The 3D model built for exterior stills is the foundation for cinematic walkthroughs and 360 virtual tours, which keeps every asset consistent and avoids paying for the same modelling twice.",
      },
      {
        q: "Do you produce day and night versions of the same view?",
        a: "Yes. Daytime views explain the architecture clearly, while dusk and night views add mood and show the lighting design. Many launches use both.",
      },
    ],
    hero: media.exterior[0],
    gallery: media.exterior,
    galleryTitle: "Exterior rendering portfolio",
    related: ["interior-rendering", "3d-walkthroughs", "360-virtual-tours"],
  },
  {
    slug: "interior-rendering",
    name: "Interior Rendering",
    navLabel: "Interior Rendering",
    short:
      "Interiors with real warmth, light and material detail, so buyers can picture daily life inside the space.",
    metaTitle: "3D Interior Rendering Services in Pakistan | Pixarch",
    metaDescription:
      "Photorealistic 3D interior rendering for apartments, villas, lobbies and amenities. Help buyers picture the finished space long before handover.",
    eyebrow: "3D Interior Rendering",
    h1: "Interior rendering that makes a floor plan feel like home",
    lead: "A floor plan shows dimensions. It does not show how a space will live. Pixarch creates 3D interior renders that capture mood, light and material detail, turning flat layouts into rooms buyers can connect with.",
    body: [
      "Every interior is modelled to the approved layout and styled for the buyer it is meant for, from compact studios to penthouses, lobbies, gyms, pools and prayer halls. Furniture, fabrics, lighting and views from the window are all considered, because those details are what make an image feel real.",
      "Developers use our interiors in sales galleries, brochures and digital campaigns, and many extend them into 360 virtual tours so buyers can look around each unit type on their phone.",
    ],
    features: [
      {
        title: "Every detail, perfectly placed",
        text: "From furniture layout to natural light, each element is set to bring out the character of the room.",
      },
      {
        title: "A space you can almost step into",
        text: "Texture, warmth and flow are rendered so clients respond to the space, not just the size.",
      },
      {
        title: "Styled for your buyer",
        text: "Each unit type is dressed for its audience, whether that is a first-time family or a luxury investor.",
      },
    ],
    deliverables: [
      "Living, dining and kitchen views",
      "Bedrooms and bathrooms",
      "Lobbies and reception areas",
      "Gym, pool and spa amenities",
      "Retail and commercial interiors",
      "Furnished unit-type sets",
    ],
    process: [
      { title: "Layouts and references", text: "We review floor plans, finishes and the interior direction for each unit type." },
      { title: "Model and styling", text: "Rooms are modelled and furnished, with camera angles agreed on draft views." },
      { title: "Light and material", text: "Surfaces, fabrics and lighting are refined until the space feels lived in." },
      { title: "Final render", text: "Final images are rendered, colour graded and supplied for print and digital use." },
    ],
    faqs: [
      {
        q: "Can you render interiors before the interior design is final?",
        a: "Yes. We can work from a mood board and finish schedule, propose furniture and styling, and update the scene as selections are confirmed.",
      },
      {
        q: "Do you render amenities as well as apartments?",
        a: "Yes. Lobbies, gyms, swimming pools, spas, prayer halls, business centres, restaurants and parking are all part of our regular interior work.",
      },
      {
        q: "Can interior renders be turned into a 360 tour?",
        a: "They can. Once a room is modelled it can be rendered as a 360 panorama and linked into an interactive virtual tour, which is the most efficient way to produce both.",
      },
      {
        q: "What makes an interior render look real?",
        a: "Accurate natural light, correct scale, believable materials and small imperfections such as a creased throw or a book on a table. These details are what stop an image looking like a computer drawing.",
      },
    ],
    hero: media.interior[2],
    gallery: media.interior,
    galleryTitle: "Interior rendering portfolio",
    related: ["exterior-rendering", "360-virtual-tours", "3d-walkthroughs"],
  },
  {
    slug: "3d-walkthroughs",
    name: "3D Walkthroughs",
    navLabel: "3D Walkthroughs",
    short:
      "Cinematic walkthrough films that take buyers from the main gate to the rooftop, long before handover.",
    metaTitle: "3D Architectural Walkthrough Services in Pakistan | Pixarch",
    metaDescription:
      "Cinematic 3D walkthrough animation for real estate. Take buyers through your project before construction with film-quality camera work, lighting and sound.",
    eyebrow: "Cinematic 3D Walkthroughs",
    h1: "3D walkthroughs that put your project in motion",
    lead: "A still image tells part of the story. A walkthrough tells all of it. Pixarch produces cinematic 3D walkthrough films that guide viewers through every room, corridor and outdoor space, showing scale and flow in a way static visuals cannot.",
    body: [
      "Each film is planned like a short commercial. We storyboard the route, set the pace, and combine camera movement, lighting, people and sound so the viewer feels the place rather than just seeing it.",
      "For launches aimed at overseas buyers, the walkthrough often does the job of a show apartment. It runs in the sales office, on social media, in ads and on your website from the first day of the campaign.",
    ],
    features: [
      {
        title: "A story in motion",
        text: "Camera, light and sound are directed to turn a simple tour into a memorable experience.",
      },
      {
        title: "See it before it is built",
        text: "Layouts, finishes and views are shown with lifelike detail, removing the guesswork for buyers.",
      },
      {
        title: "One film, many cuts",
        text: "A full-length film plus short edits for social media, TV commercials and digital screens.",
      },
    ],
    deliverables: [
      "Full-length walkthrough film",
      "Storyboard and script",
      "Social media and TVC cuts",
      "Aerial and fly-through sequences",
      "Music, sound design and voice-over",
      "Sales-office screen versions",
    ],
    process: [
      { title: "Storyboard", text: "We plan the route, key moments and duration around the story of the project." },
      { title: "Previsualisation", text: "A draft animation confirms camera moves and timing before final rendering." },
      { title: "Production", text: "Scenes are lit, populated and rendered frame by frame at film quality." },
      { title: "Edit and sound", text: "Footage is edited, graded and finished with music, sound and titles." },
    ],
    faqs: [
      {
        q: "How long should a real estate walkthrough be?",
        a: "Most launch films run between one and three minutes, with shorter cuts of 15 to 30 seconds for social media and advertising. We recommend a length based on how much of the project needs to be shown.",
      },
      {
        q: "Is a walkthrough better than a show apartment?",
        a: "They do different jobs. A walkthrough starts working on day one, shows every unit type and reaches overseas buyers. A show apartment helps close local buyers later in the project. Many developers use both.",
      },
      {
        q: "Can you produce a TV commercial from the walkthrough?",
        a: "Yes. We regularly deliver TVC and digital ad edits from the same footage, formatted for each platform.",
      },
      {
        q: "What do you need to start?",
        a: "Architectural drawings, the interior direction for the key spaces, your brand guidelines and the main selling points you want the film to communicate.",
      },
    ],
    hero: media.exterior[6],
    gallery: [...media.exterior.slice(2, 8), ...media.interior.slice(8, 14)],
    galleryTitle: "Frames from our walkthrough work",
    related: ["360-virtual-tours", "exterior-rendering", "real-estate-digital-marketing"],
    videoSlugs: ["the-rise", "empire-living", "aum-99", "mehran-qaf-sky-tower", "empire-lakeviews", "saars-3"],
  },
  {
    slug: "360-virtual-tours",
    name: "360 Virtual Tours",
    navLabel: "360 Virtual Tours",
    short:
      "Interactive tours that let buyers explore every room at their own pace, from any device, anywhere in the world.",
    metaTitle: "360 Virtual Tour Services for Real Estate in Pakistan | Pixarch",
    metaDescription:
      "Interactive 360 virtual tours built on photorealistic 3D renders. Let local and overseas buyers explore your project on any device, with no extra software.",
    eyebrow: "360 Virtual Tours",
    h1: "360 virtual tours buyers can explore on their own terms",
    lead: "Buyers want control over how they explore a property, not just a fixed video. Pixarch builds interactive 360 virtual tours that let viewers move freely through each space from anywhere in the world.",
    body: [
      "Every tour is built on the same photorealistic 3D scenes as our stills, so the quality holds up when a buyer stops and looks closely. Tours run in the browser on any phone, tablet or laptop, with no app or plugin to install.",
      "A tour can grow with the project. Start with the amenities or a single show unit, then add unit types, floors and updates as the development advances, all under one production team so the look stays consistent.",
    ],
    features: [
      {
        title: "Explore at your own pace",
        text: "Buyers navigate layouts and finishes exactly as they would in person, room by room.",
      },
      {
        title: "Realism that builds confidence",
        text: "Tours are rendered to the same standard as our hero stills, which earns trust quickly.",
      },
      {
        title: "Share it anywhere",
        text: "Embed on your website, present in the sales office or send a direct link on WhatsApp.",
      },
    ],
    deliverables: [
      "Interactive unit-type tours",
      "Amenity and lobby tours",
      "Hotspot navigation and floor plans",
      "Website embed and share links",
      "Sales-presentation integration",
      "Phased updates as the project grows",
    ],
    process: [
      { title: "Scope the tour", text: "We agree which spaces to include and how viewers should move between them." },
      { title: "Build the scenes", text: "Each space is modelled, styled and rendered as a full 360 panorama." },
      { title: "Link and brand", text: "Panoramas are connected with hotspots, floor plans and your branding." },
      { title: "Publish and share", text: "The tour is hosted, tested on devices and delivered with embed and share links." },
    ],
    faqs: [
      {
        q: "Do buyers need special software or a headset?",
        a: "No. Tours open in a normal web browser on any modern phone, tablet or computer. They can also be viewed in a VR headset if you want that experience in your sales office.",
      },
      {
        q: "Can a virtual tour be made before the building exists?",
        a: "Yes. Our tours are built from 3D models, not photography, so they can be produced from drawings well before construction starts.",
      },
      {
        q: "How do overseas buyers use virtual tours?",
        a: "Overseas buyers typically cannot visit a site or show unit. A tour lets them check the layout, finishes and view themselves, which makes them far more comfortable reserving remotely.",
      },
      {
        q: "Can the tour be updated later?",
        a: "Yes. New rooms, unit types and design changes can be added in phases as the project develops.",
      },
    ],
    hero: media.interior[12],
    gallery: [...media.interior.slice(0, 12)],
    galleryTitle: "Spaces built for virtual tours",
    related: ["3d-walkthroughs", "interior-rendering", "real-estate-digital-marketing"],
  },
  {
    slug: "real-estate-branding",
    name: "Branding & Design",
    navLabel: "Branding & Design",
    short:
      "Naming, identity, brochures and launch collateral that make a development credible, premium and recognisable.",
    metaTitle: "Real Estate Branding Agency in Pakistan | Pixarch",
    metaDescription:
      "Real estate branding for property developers: naming, brand identity, brochures, hoardings and launch collateral that make a project credible and memorable.",
    eyebrow: "Real Estate Branding & Design",
    h1: "Real estate branding that gives a project its identity",
    lead: "Every development has a story worth telling, and how you tell it matters as much as how you build it. Pixarch works as a dedicated real estate branding agency, turning a developer's vision into a brand that feels credible, premium and unmistakably theirs.",
    body: [
      "We cover the full path from naming and positioning to logo, colour, typography and tone of voice, then carry that identity through every touchpoint a buyer meets: brochures, fact sheets, hoardings, sales-office graphics, corporate gifts and digital templates.",
      "Because our 3D team sits alongside our designers, the visuals and the brand are developed together. The renders, the brochure and the billboard look like one project, which is what makes a launch feel established from day one.",
    ],
    features: [
      {
        title: "An identity buyers remember",
        text: "Visuals and messaging that stay consistent across every touchpoint and stand out in a crowded market.",
      },
      {
        title: "Built for developers who think big",
        text: "Strategy and design that turn ambitious projects into recognisable brands.",
      },
      {
        title: "Print-ready craft",
        text: "Brochures, boxes and stationery designed with finishes and production in mind.",
      },
    ],
    deliverables: [
      "Project naming and positioning",
      "Logo and brand identity system",
      "Brochures and fact sheets",
      "Hoardings and outdoor media",
      "Sales-office and event graphics",
      "Corporate gifts and stationery",
    ],
    process: [
      { title: "Discover", text: "We study the project, the buyer and the competition to define a clear position." },
      { title: "Define", text: "Name, story and visual direction are developed and presented as concepts." },
      { title: "Design", text: "The chosen route is built into a full identity system and brand guidelines." },
      { title: "Deliver", text: "Collateral is designed, artworked and prepared for print and digital use." },
    ],
    faqs: [
      {
        q: "What is the difference between property branding and developer branding?",
        a: "Property branding gives a single project its own name, look and story. Developer branding builds the reputation of the company behind many projects. Strong launches usually need both to work together.",
      },
      {
        q: "Can you name a new development?",
        a: "Yes. Naming is often our first step, followed by positioning and the visual identity, so the name, the logo and the story are designed as one.",
      },
      {
        q: "Do you design brochures and hoardings as well as logos?",
        a: "Yes. We design the complete launch kit, including brochures, fact sheets, hoardings, billboards, sales-office graphics, corporate gifts and social media templates.",
      },
      {
        q: "Can you work with our existing brand guidelines?",
        a: "Yes. If the developer brand already exists we design the project identity to sit comfortably within it.",
      },
    ],
    hero: media.branding[0],
    gallery: media.branding,
    galleryTitle: "Branding and design portfolio",
    related: ["real-estate-digital-marketing", "exterior-rendering", "3d-walkthroughs"],
  },
  {
    slug: "real-estate-digital-marketing",
    name: "Digital Marketing",
    navLabel: "Digital Marketing",
    short:
      "Campaigns, social media and lead generation that put your project in front of serious buyers.",
    metaTitle: "Real Estate Digital Marketing Agency in Pakistan | Pixarch",
    metaDescription:
      "Real estate digital marketing for developers: social media, paid campaigns and lead generation that turn renders and walkthroughs into enquiries and bookings.",
    eyebrow: "Real Estate Digital Marketing",
    h1: "Digital marketing that turns visibility into sales",
    lead: "Great visuals need the right audience. As a dedicated property marketing agency, Pixarch helps developers put their projects in front of serious buyers through targeted campaigns, social media and digital advertising.",
    body: [
      "Our campaigns are built around the assets we create. Every render, walkthrough and virtual tour becomes a lead-generating tool, placed on the platforms where your buyers actually spend time and measured against enquiries, not impressions.",
      "From pre-launch teasers to sell-out, we plan content for each stage of the project so it stays visible, relevant and top of mind, both for local buyers and for overseas Pakistanis and international investors.",
    ],
    features: [
      {
        title: "Campaigns built to convert",
        text: "Lead generation focused on genuine buyers, turning interest into enquiries with data-driven campaigns.",
      },
      {
        title: "A strategy for every stage",
        text: "From launch to sell-out, your project stays visible and relevant throughout the sales cycle.",
      },
      {
        title: "Creative and media under one roof",
        text: "The team that makes the visuals also plans how they are used, so nothing is lost in translation.",
      },
    ],
    deliverables: [
      "Launch campaign strategy",
      "Social media management",
      "Paid social and search advertising",
      "Lead generation funnels",
      "Website and landing pages",
      "Reporting and optimisation",
    ],
    process: [
      { title: "Audit and plan", text: "We define the buyer, the markets and the channels, then set clear targets." },
      { title: "Create", text: "Campaign creative is produced from your renders, films and brand assets." },
      { title: "Launch", text: "Campaigns go live across the agreed platforms with tracking in place." },
      { title: "Optimise", text: "Results are reviewed and budgets moved towards what generates real enquiries." },
    ],
    faqs: [
      {
        q: "Which platforms work best for real estate in Pakistan?",
        a: "Facebook, Instagram and YouTube each play a different role. Facebook and Instagram are strong for reach and lead forms, while YouTube suits longer walkthrough films. The right mix depends on the project and the buyer.",
      },
      {
        q: "Can you target overseas Pakistanis and international investors?",
        a: "Yes. Campaigns can be targeted by country and city, which is important for projects that rely on buyers in the Gulf, the UK and North America.",
      },
      {
        q: "Do you build websites and landing pages for projects?",
        a: "Yes. We design and build project websites and landing pages that present the visuals properly and capture enquiries.",
      },
      {
        q: "How do you measure success?",
        a: "By qualified enquiries and the cost of generating them. We report on leads and their sources so budget decisions are based on evidence.",
      },
    ],
    hero: media.marketing[2] ?? media.marketing[0],
    gallery: media.marketing,
    galleryTitle: "Campaign and social media work",
    related: ["real-estate-branding", "3d-walkthroughs", "360-virtual-tours"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
