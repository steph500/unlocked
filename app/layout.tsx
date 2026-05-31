import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";
import { siteDescription, siteImage, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: [
    "Unlocked",
    "Nairobi",
    "Kenya",
    "nyama choma",
    "mutura",
    "matatu",
    "street culture",
    "local tips",
    "hidden gems"
  ],
  applicationName: siteName,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: "Unlocked Nairobi Edition"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [siteImage]
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      }
    : undefined
};

export const viewport: Viewport = {
  themeColor: "#050607",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body>
        {measurementId ? <GoogleAnalytics measurementId={measurementId} /> : null}
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  );
}
