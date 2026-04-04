import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Coffee Brew Timer";
const APP_DESCRIPTION =
  "Installable pour-over brew timer for the Hoffmann drip method, with offline support for your coffee routine.";
const BASE_PATH = process.env.BASE_PATH ?? "";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: `${BASE_PATH}/manifest.webmanifest`,
  icons: {
    icon: [
      {
        url: `${BASE_PATH}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: `${BASE_PATH}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: `${BASE_PATH}/icons/icon-192.png`,
    shortcut: `${BASE_PATH}/icons/icon-192.png`,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
