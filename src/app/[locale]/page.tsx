import { setRequestLocale } from "next-intl/server";
import { PageClient } from "@/components/PageClient";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PageClient />;
}
