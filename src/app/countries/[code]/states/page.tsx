"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { COUNTRIES } from "@/lib/countries-data";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Map as MapIcon, Flag, Landmark } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ code: string }>;
}

export default function StatesPage({ params }: PageProps) {
  const { code } = use(params);
  const country = COUNTRIES.find((c) => c.code.toLowerCase() === code.toLowerCase());

  if (!country) {
    notFound();
  }

  const states = country.states || [];

  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-12 space-y-8 md:space-y-12">
        <header className="space-y-4 md:space-y-6">
          <Link href={`/countries/${country.code.toLowerCase()}`}>
            <Button variant="ghost" className="gap-2 -ml-2 sm:-ml-4 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
              <ArrowLeft className="h-4 w-4" /> Back to {country.name}
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold">
                <MapIcon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="tracking-widest uppercase text-[10px] md:text-xs">States & Provinces</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-headline tracking-tighter">
                Discover <span className="text-primary">{country.name}&apos;s</span> Regions
              </h1>
              <p className="text-muted-foreground text-sm sm:text-xl font-medium max-w-2xl mx-auto md:mx-0">
                Explore the internal divisions of {country.name}, each with its own unique identity and historical path.
              </p>
            </div>
            
            <div className="flex justify-center md:block">
               <div className="bg-card p-3 md:p-4 rounded-xl md:rounded-2xl border shadow-sm flex items-center gap-3">
                 <div className="bg-primary/10 p-2 rounded-lg">
                   <Flag className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                 </div>
                 <div>
                   <p className="text-[8px] md:text-[10px] font-black text-muted-foreground uppercase tracking-wider">Total States</p>
                   <p className="text-lg md:text-xl font-black">{country.statesCount}</p>
                 </div>
               </div>
            </div>
          </div>
        </header>

        {states.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {states.map((state) => (
              <Card key={state.name} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 group rounded-[1.5rem] md:rounded-[2rem] bg-card">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={state.flagUrl}
                    alt={`${state.name} flag`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                    <h3 className="text-xl md:text-2xl font-black text-white font-headline tracking-tight">{state.name}</h3>
                  </div>
                </div>
                <CardContent className="p-5 md:p-6 space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Landmark className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Regional History</span>
                  </div>
                  <p className="text-muted-foreground text-xs md:text-base font-medium leading-relaxed">
                    {state.history}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 md:py-32 space-y-6 bg-secondary/30 rounded-[1.5rem] md:rounded-[3rem] border border-dashed px-4">
            <div className="bg-background w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <MapIcon className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-black font-headline">Regional data pending</h3>
              <p className="text-muted-foreground text-sm md:text-base font-medium max-w-md mx-auto">
                We are currently cataloging the state-level data and flags for {country.name}. Check back soon!
              </p>
            </div>
            <Link href={`/countries/${country.code.toLowerCase()}`}>
              <Button variant="outline" className="rounded-xl font-bold h-10 md:h-12 px-6">
                Return to Overview
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
