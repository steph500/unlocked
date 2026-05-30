import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Unlocked Nairobi Edition",
    short_name: "Unlocked",
    description: "Real spots. Local tips. Raw Nairobi.",
    start_url: "/",
    display: "standalone",
    background_color: "#050607",
    theme_color: "#c8ff2f",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
