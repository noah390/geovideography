
import { Navbar } from "@/components/layout/Navbar";
import { COUNTRIES } from "@/lib/countries-data";
import { CountryDetailsView } from "@/components/flags/CountryDetailsView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function CountryPage({ params }: PageProps) {
  const { code } = await params;
  const country = COUNTRIES.find((c) => c.code.toLowerCase() === code.toLowerCase());

  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <CountryDetailsView country={country} />
      </main>
    </div>
  );
}
