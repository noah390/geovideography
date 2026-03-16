
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
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 space-y-12">
        <header className="space-y-6">
          <Link href={`/countries/${country.code.toLowerCase()}`}>
            <Button variant="ghost" className="gap-2 -ml-4 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to {country.name}
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <MapIcon className="h-5 w-5" />
                <span className="tracking-widest uppercase text-xs">States & Provinces</span>
              </div>
              <h1 className="text-5xl font-black font-headline tracking-tighter">
                Discover <span className="text-primary">{country.name}&apos;s</span> Regions
              </h1>
              <p className="text-muted-foreground text-xl font-medium max-w-2xl">
                Explore the internal divisions of {country.name}, each with its own unique identity and historical path.
              </p>
            </div>
            
            <div className="flex gap-4">
               <div className="bg-card p-4 rounded-2xl border shadow-sm flex items-center gap-3">
                 <div className="bg-primary/10 p-2 rounded-lg">
                   <Flag className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Total States</p>
                   <p className="text-xl font-black">{country.statesCount}</p>
                 </div>
               </div>
            </div>
          </div>
        </header>

        {states.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {states.map((state) => (
              <Card key={state.name} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 group rounded-[2rem] bg-card">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={state.flagUrl}
                    alt={`${state.name} flag`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-black text-white font-headline tracking-tight">{state.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Landmark className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Regional History</span>
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {state.history}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-6 bg-secondary/30 rounded-[3rem] border border-dashed">
            <div className="bg-background w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <MapIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black font-headline">Regional data pending</h3>
              <p className="text-muted-foreground font-medium max-w-md mx-auto">
                We are currently cataloging the state-level data and flags for {country.name}. Check back soon!
              </p>
            </div>
            <Link href={`/countries/${country.code.toLowerCase()}`}>
              <Button variant="outline" className="rounded-xl font-bold">
                Return to Overview
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
