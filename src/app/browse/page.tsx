
"use client";

import { useState, useMemo } from "react";
import { COUNTRIES, Country } from "@/lib/countries-data";
import { Navbar } from "@/components/layout/Navbar";
import { FlagCard } from "@/components/flags/FlagCard";
import { CountryDetailsDialog } from "@/components/flags/CountryDetailsDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Globe2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CONTINENTS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"] as const;

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState<typeof CONTINENTS[number]>("All");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesContinent = continent === "All" || c.continent === continent;
      return matchesSearch && matchesContinent;
    });
  }, [search, continent]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <header className="py-12 px-4 container mx-auto">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-headline font-bold text-foreground">
            Explore the World
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover {COUNTRIES.length} nations and territories through their vibrant flags and identities.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 sticky top-[65px] z-40 bg-background/95 py-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search countries by name..."
              className="pl-10 h-12 bg-card border-none shadow-sm focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-12 px-6 gap-2 bg-card border-none shadow-sm">
                <Filter className="h-4 w-4" />
                {continent === "All" ? "All Continents" : continent}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {CONTINENTS.map((c) => (
                <DropdownMenuItem 
                  key={c} 
                  onClick={() => setContinent(c)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Globe2 className="h-4 w-4 opacity-70" />
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <main className="container mx-auto px-4">
        {filteredCountries.length > 0 ? (
          <div className="flag-grid">
            {filteredCountries.map((country) => (
              <FlagCard
                key={country.code}
                country={country}
                onClick={setSelectedCountry}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <div className="bg-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-headline font-semibold">No countries found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
            <Button variant="outline" onClick={() => { setSearch(""); setContinent("All"); }}>
              Reset Filters
            </Button>
          </div>
        )}
      </main>

      <CountryDetailsDialog
        country={selectedCountry}
        isOpen={!!selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
}
