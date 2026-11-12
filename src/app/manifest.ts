import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pixarch",
    short_name: "Pixarch",
    description: "The boutique real estate creative agency.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c0b",
    theme_color: "#0c0c0b",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
