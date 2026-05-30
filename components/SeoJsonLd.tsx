import type { JSX } from "react";

type SeoJsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function SeoJsonLd({ data }: SeoJsonLdProps): JSX.Element {
  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}
