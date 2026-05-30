export const siteName = "Unlocked";
export const siteDescription = "Real spots. Local tips. Raw Nairobi.";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }

  return process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://unlocked.selfawaretech.com";
}

export const siteUrl = getSiteUrl();
export const siteImage = "/images/nairobi/kicc-night-skyline.jpg";
