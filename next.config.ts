import type { NextConfig } from "next";

/**
 * Permanent redirects from the previous WordPress URL structure, so existing
 * search rankings and backlinks carry over to the new pages.
 */
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      { source: "/exterior-rendering", destination: "/services/exterior-rendering", permanent: true },
      { source: "/interiorrendering", destination: "/services/interior-rendering", permanent: true },
      { source: "/3d-walkthroughs", destination: "/services/3d-walkthroughs", permanent: true },
      { source: "/3d", destination: "/services/3d-walkthroughs", permanent: true },
      { source: "/cgi-filming", destination: "/services/3d-walkthroughs", permanent: true },
      { source: "/360-virtual-tours", destination: "/services/360-virtual-tours", permanent: true },
      { source: "/360-degree-creative-real-estate-services", destination: "/services", permanent: true },
      { source: "/branding-design", destination: "/services/real-estate-branding", permanent: true },
      { source: "/digital-marketing", destination: "/services/real-estate-digital-marketing", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/portfolio", destination: "/projects", permanent: true },
      { source: "/international-projects", destination: "/locations", permanent: true },
      { source: "/ksa", destination: "/locations/saudi-arabia", permanent: true },
      { source: "/the-trillium-tower", destination: "/projects/the-trillium-towers", permanent: true },
      { source: "/home-old", destination: "/", permanent: true },
      { source: "/home-v-old", destination: "/", permanent: true },
      { source: "/coming-soon", destination: "/", permanent: true },
      { source: "/projects/the-rise-2", destination: "/projects/the-rise", permanent: true },
      { source: "/projects/wellington-grand-villas", destination: "/projects", permanent: true },
      { source: "/author/admin", destination: "/blog", permanent: true },
      { source: "/feed", destination: "/blog", permanent: true },
      { source: "/what-makes-a-3d-render-look-real-lighting-materials-and-the-small-details", destination: "/blog/what-makes-a-3d-render-look-real-lighting-materials-and-the-small-details", permanent: true },
      { source: "/3d-walkthrough-vs-show-apartment-which-one-actually-sells-more-units", destination: "/blog/3d-walkthrough-vs-show-apartment-which-one-actually-sells-more-units", permanent: true },
      { source: "/why-karachi-is-building-up-the-rise-of-high-rise-living-in-2026", destination: "/blog/why-karachi-is-building-up-the-rise-of-high-rise-living-in-2026", permanent: true },
      { source: "/interior-design-trends-pakistani-homeowners-are-choosing-in-2026", destination: "/blog/interior-design-trends-pakistani-homeowners-are-choosing-in-2026", permanent: true },
      { source: "/facebook-vs-instagram-vs-youtube-where-pakistani-property-buyers-actually-look", destination: "/blog/facebook-vs-instagram-vs-youtube-where-pakistani-property-buyers-actually-look", permanent: true },
      { source: "/why-real-time-rendering-is-changing-how-pakistani-developers-present-projects", destination: "/blog/why-real-time-rendering-is-changing-how-pakistani-developers-present-projects", permanent: true },
      { source: "/property-branding-vs-developer-branding-whats-the-difference", destination: "/blog/property-branding-vs-developer-branding-whats-the-difference", permanent: true },
      { source: "/daytime-vs-evening-exterior-renders-choosing-the-right-view", destination: "/blog/daytime-vs-evening-exterior-renders-choosing-the-right-view", permanent: true },
      { source: "/the-secret-life-of-a-render-from-blank-screen-to-believable-building", destination: "/blog/the-secret-life-of-a-render-from-blank-screen-to-believable-building", permanent: true },
      { source: "/a-tale-of-two-launches-the-project-with-great-renders-vs-the-one-without", destination: "/blog/a-tale-of-two-launches-the-project-with-great-renders-vs-the-one-without", permanent: true },
      { source: "/understanding-the-roi-of-investing-in-high-quality-architectural-visualization", destination: "/blog/understanding-the-roi-of-investing-in-high-quality-architectural-visualization", permanent: true },
      { source: "/would-you-buy-a-house-youve-never-physically-seen-pakistanis-are-already-doing-it", destination: "/blog/would-you-buy-a-house-youve-never-physically-seen-pakistanis-are-already-doing-it", permanent: true },
      { source: "/what-if-your-brochure-is-the-reason-your-project-isnt-selling", destination: "/blog/what-if-your-brochure-is-the-reason-your-project-isnt-selling", permanent: true },
      { source: "/the-evolution-of-real-estate-marketing-in-pakistan-from-brochures-to-immersive-visuals", destination: "/blog/the-evolution-of-real-estate-marketing-in-pakistan-from-brochures-to-immersive-visuals", permanent: true },
      { source: "/what-smart-buyers-look-for-before-reserving-an-off-plan-unit", destination: "/blog/what-smart-buyers-look-for-before-reserving-an-off-plan-unit", permanent: true },
      { source: "/exterior-rendering-vs-interior-rendering-what-each-one-is-used-for", destination: "/blog/exterior-rendering-vs-interior-rendering-what-each-one-is-used-for", permanent: true },
      { source: "/how-real-estate-marketing-in-pakistan-has-changed-in-the-last-five-years", destination: "/blog/how-real-estate-marketing-in-pakistan-has-changed-in-the-last-five-years", permanent: true },
      { source: "/how-remote-and-international-buyers-are-reshaping-property-marketing", destination: "/blog/how-remote-and-international-buyers-are-reshaping-property-marketing", permanent: true },
      { source: "/how-virtual-tours-are-helping-overseas-pakistanis-invest-in-property-back-home", destination: "/blog/how-virtual-tours-are-helping-overseas-pakistanis-invest-in-property-back-home", permanent: true },
      { source: "/how-3d-rendering-is-changing-real-estate-marketing-in-pakistan", destination: "/blog/how-3d-rendering-is-changing-real-estate-marketing-in-pakistan", permanent: true },
      { source: "/why-3d-renders-are-essential-for-off-the-plan-property-sales", destination: "/blog/why-3d-renders-are-essential-for-off-the-plan-property-sales", permanent: true },
      { source: "/dev/:path*", destination: "/", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
