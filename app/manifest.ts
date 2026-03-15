import type { MetadataRoute } from "next";
import { SITE_NAME, DEFAULT_DESCRIPTION, BASE_URL } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Phase Align",
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f7f4",
    theme_color: "#0c0c0c",
    orientation: "portrait-primary",
    icons: [
      { src: "/icon/32", sizes: "32x32", type: "image/png", purpose: "any" },
      { src: "/icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon/192", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["shopping", "health", "lifestyle"],
  };
}
