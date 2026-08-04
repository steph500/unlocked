"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

type GoogleAnalyticsProps = {
  measurementId: string;
};

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    // The landing pageview is sent by the init script below. Sending it again
    // here would double-count, so the first run is skipped and this effect only
    // reports client-side navigations.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!measurementId || typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    const query = window.location.search;
    window.gtag("config", measurementId, {
      page_path: `${pathname}${query}`
    });
  }, [measurementId, pathname]);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          // Sends the landing pageview. Previously this was suppressed and the
          // effect above was expected to send it, but both scripts load
          // afterInteractive so the effect ran first, found window.gtag
          // undefined, bailed, and never ran again — every visitor who landed
          // and left was invisible.
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
