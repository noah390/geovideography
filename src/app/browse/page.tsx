
"use client";

import { useState, useMemo } from "react";
import { COUNTRIES } from "@/lib/countries-data";
import { Navbar } from "@/components/layout/Navbar";
import { FlagCard } from "@/components/flags/FlagCard";
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
      
      <header className="py-20 px-4 container mx-auto">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <Globe2 className="h-3 w-3" />
            <span>Global Database</span>
          </div>
          <h1 className="text-6xl font-headline font-black text-foreground tracking-tighter">
            Explore the <span className="text-primary">World</span>
          </h1>
          <p className="text-muted-foreground text-xl font-medium max-w-xl">
            Discover the visual identity and historical journey of {COUNTRIES.length} nations across the globe.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 sticky top-[65px] z-40 bg-background/95 backdrop-blur-md py-6 mb-12 border-b border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by country name..."
              className="pl-12 h-14 bg-card border-none shadow-sm focus:ring-primary text-lg font-medium rounded-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-14 px-8 gap-3 bg-card border-none shadow-sm font-bold rounded-2xl">
                <Filter className="h-5 w-5" />
                {continent === "All" ? "All Continents" : continent}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
              {CONTINENTS.map((c) => (
                <DropdownMenuItem 
                  key={c} 
                  onClick={() => setContinent(c)}
                  className="flex items-center gap-3 cursor-pointer py-3 px-4 rounded-lg font-semibold"
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
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-6">
            <div className="bg-secondary/50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-border">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-black">No matches found</h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">Try adjusting your filters or search terms to explore different parts of the world.</p>
            </div>
            <Button variant="outline" size="lg" className="rounded-xl font-bold px-8" onClick={() => { setSearch(""); setContinent("All"); }}>
              Clear All Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
