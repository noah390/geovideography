"use client";

import { useState, useMemo } from "react";
import { useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { Navbar } from "@/components/layout/Navbar";
import { FlagCard } from "@/components/flags/FlagCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Globe2, Loader2 } from "lucide-react";
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
  const firestore = useFirestore();

  const countriesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, "countries");
  }, [firestore]);

  const { data: countries, isLoading } = useCollection(countriesQuery);

  const filteredCountries = useMemo(() => {
    if (!countries) return [];
    return countries.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesContinent = continent === "All" || c.continent === continent;
      return matchesSearch && matchesContinent;
    });
  }, [search, continent, countries]);

  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
      <Navbar />
      
      <header className="py-12 md:py-20 px-4 container mx-auto text-center md:text-left">
        <div className="max-w-3xl space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest mx-auto md:mx-0">
            <Globe2 className="h-3 w-3" />
            <span>Real-time Global Database</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-black text-foreground tracking-tighter">
            Explore the <span className="text-primary">World</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-lg md:text-xl font-medium max-w-xl mx-auto md:mx-0">
            Discover the visual identity and historical journey of nations across the globe, synced in real-time.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 sticky top-[64px] z-40 bg-background/95 backdrop-blur-md py-4 md:py-6 mb-8 md:mb-12 border-b border-border/50">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 md:h-5 md:w-5" />
            <Input
              placeholder="Search by country name..."
              className="pl-11 md:pl-12 h-12 md:h-14 bg-card border-none shadow-sm focus:ring-primary text-sm md:text-lg font-medium rounded-xl md:rounded-2xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-12 md:h-14 px-6 md:px-8 gap-3 bg-card border-none shadow-sm font-bold rounded-xl md:rounded-2xl w-full sm:w-auto">
                <Filter className="h-4 w-4 md:h-5 md:w-5" />
                <span className="truncate">{continent === "All" ? "All Continents" : continent}</span>
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 md:py-32 space-y-4">
            <Loader2 className="h-10 w-10 md:h-12 md:h-12 text-primary animate-spin" />
            <p className="text-muted-foreground text-sm md:text-base font-bold animate-pulse">Syncing world data...</p>
          </div>
        ) : filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredCountries.map((country) => (
              <FlagCard
                key={country.id}
                country={country as any}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 md:py-32 space-y-6 px-4">
            <div className="bg-secondary/50 w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-border">
              <Search className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-headline font-black">No matches found</h3>
              <p className="text-muted-foreground text-sm md:text-lg max-w-md mx-auto">Try adjusting your filters or search terms to explore different parts of the world.</p>
            </div>
            <Button variant="outline" size="lg" className="rounded-xl font-bold px-8 h-12" onClick={() => { setSearch(""); setContinent("All"); }}>
              Clear All Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
