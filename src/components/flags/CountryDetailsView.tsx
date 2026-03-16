
"use client";

import Image from "next/image";
import Link from "next/link";
import { Country } from "@/lib/countries-data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Users, 
  Globe2, 
  Building2, 
  ScrollText, 
  Map as MapIcon, 
  Landmark, 
  Flag,
  ArrowLeft,
  ChevronRight
} from "lucide-react";

interface CountryDetailsViewProps {
  country: Country;
}

export function CountryDetailsView({ country }: CountryDetailsViewProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Navigation */}
      <div className="flex items-center justify-between px-4">
        <Link href="/browse">
          <Button variant="ghost" className="gap-2 -ml-4 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Browse
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-primary font-bold">
          <Flag className="h-5 w-5" />
          <span className="tracking-widest uppercase text-xs">{country.code}</span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white group">
        <Image
          src={country.flagUrl}
          alt={`${country.name} flag`}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-10 space-y-2">
          <h1 className="text-6xl md:text-8xl font-black text-white font-headline tracking-tighter drop-shadow-2xl">
            {country.name}
          </h1>
          <p className="text-white/80 text-xl font-medium flex items-center gap-2">
            <Globe2 className="h-5 w-5" /> {country.continent} &bull; {country.subregion}
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-4">
        {/* Left Column: Stats */}
        <div className="lg:col-span-2 space-y-12">
          {/* Quick Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <StatItem 
              icon={Building2} 
              label="Capital City" 
              value={country.capital} 
            />
            <StatItem 
              icon={Users} 
              label="Total Population" 
              value={country.population.toLocaleString()} 
            />
            <StatItem 
              icon={MapPin} 
              label="Region" 
              value={country.subregion} 
            />
            <StatItem 
              icon={Globe2} 
              label="Continent" 
              value={country.continent} 
            />
          </section>

          <Separator className="opacity-50" />

          {/* History Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <div className="bg-primary/10 p-3 rounded-2xl">
                <ScrollText className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black font-headline tracking-tight">The Story of {country.name}</h2>
            </div>
            
            <div className="prose prose-blue dark:prose-invert max-w-none">
              <p className="text-muted-foreground text-xl leading-relaxed font-medium whitespace-pre-wrap italic">
                {country.history}
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Admin Info */}
        <aside className="space-y-8">
          <div className="bg-card p-8 rounded-[2rem] shadow-lg border border-border/50 space-y-8 sticky top-24">
            <div className="space-y-2">
              <h3 className="text-sm font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <Flag className="h-4 w-4" /> Administrative Structure
              </h3>
              <p className="text-muted-foreground text-sm font-medium">
                Governance divisions within the territory of {country.name}.
              </p>
            </div>

            <Separator className="opacity-50" />

            <div className="space-y-8">
              <Link href={`/countries/${country.code.toLowerCase()}/states`} className="block group">
                <StatItem 
                  icon={MapIcon} 
                  label="States / Provinces" 
                  value={country.statesCount.toString()} 
                  variant="compact"
                  interactive
                />
              </Link>
              <StatItem 
                icon={Landmark} 
                label={country.name === "Nigeria" ? "Local Government Areas (LGAs)" : "Districts / Municipalities"} 
                value={country.lgasCount.toString()} 
                variant="compact"
              />
            </div>

            <div className="pt-4">
              <Link href="/browse">
                <Button className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-primary/20">
                  Explore More Nations
                </Button>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer Padding */}
      <div className="h-20" />
    </div>
  );
}

function StatItem({ 
  icon: Icon, 
  label, 
  value, 
  variant = "default",
  interactive = false
}: { 
  icon: any, 
  label: string, 
  value: string,
  variant?: "default" | "compact",
  interactive?: boolean
}) {
  return (
    <div className={cn(
      "flex items-start gap-5 transition-all",
      interactive && "group-hover:translate-x-1"
    )}>
      <div className={cn(
        "p-4 rounded-2xl shrink-0 shadow-sm border border-primary/10",
        variant === 'compact' ? 'bg-secondary/50' : 'bg-primary/5',
        interactive && "group-hover:bg-primary/10 group-hover:border-primary/20"
      )}>
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-1 flex-1">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
        <div className="flex items-center justify-between">
          <p className={`${variant === 'compact' ? 'text-2xl' : 'text-3xl'} font-black text-foreground leading-tight tracking-tight`}>{value}</p>
          {interactive && <ChevronRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />}
        </div>
      </div>
    </div>
  );
}
