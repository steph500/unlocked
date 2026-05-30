import { redirect } from "next/navigation";
import { cities } from "@/data/cities";
import { isSupportedCity } from "@/lib/data";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.id }));
}

type CityIndexPageProps = {
  params: Promise<{ city: string }>;
};

export default async function CityIndexPage({ params }: CityIndexPageProps) {
  const { city } = await params;

  if (!isSupportedCity(city)) {
    redirect("/");
  }

  redirect(`/${city}/explore`);
}
