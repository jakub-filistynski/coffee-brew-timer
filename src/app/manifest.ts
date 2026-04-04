import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const APP_NAME = "Coffee Brew Timer";
const APP_DESCRIPTION =
  "Installable pour-over brew timer for the Hoffmann drip method, with offline support for your coffee routine.";
const BASE_PATH = process.env.BASE_PATH ?? "";
const APP_SCOPE = BASE_PATH ? `${BASE_PATH}/` : "/";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: "Brew Timer",
    description: APP_DESCRIPTION,
    start_url: APP_SCOPE,
    scope: APP_SCOPE,
    display: "standalone",
    orientation: "portrait",
    background_color: "#f1f5f9",
    theme_color: "#0f172a",
    lang: "en",
    categories: ["food", "lifestyle", "utilities"],
    icons: [
      {
        src: `${BASE_PATH}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${BASE_PATH}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
