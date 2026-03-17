"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { COUNTRIES, Country } from "@/lib/countries-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Search, BrainCircuit, Cpu, RefreshCw, Flag, Database } from "lucide-react";

export default function Home() {
  const [randomCountry, setRandomCountry] = useState<Country | null>(null);

  useEffect(() => {
    pickRandomCountry();
  }, []);

  function pickRandomCountry() {
    const idx = Math.floor(Math.random() * COUNTRIES.length);
    setRandomCountry(COUNTRIES[idx]);
  }

  return (
    <div className="min-h-screen bg-background pb-20 relative">
      <div className="absolute inset-0 scifi-grid opacity-20 pointer-events-none" />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-40 md:pb-48">
        <div className="container mx-auto px-4 relative z-10 text-center space-y-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-primary/10 text-primary font-mono font-bold text-[10px] uppercase tracking-[0.4em] border border-primary/30 mb-4 animate-pulse">
            <Cpu className="h-3 w-3" />
            <span>System Online: Global Intelligence Alpha-01</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter text-foreground leading-[0.9] animate-in fade-in slide-in-from-top-4 duration-1000">
            DECODING THE <br/><span className="text-primary scifi-text-glow">GLOBAL GRID</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-mono uppercase tracking-widest animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Interface with {COUNTRIES.length} sovereign datasets. Extraction of visual identity and historical lore initiated.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-in fade-in zoom-in-95 duration-1000 delay-300">
            <Link href="/browse">
              <Button size="lg" className="h-16 px-12 text-lg font-black rounded-sm tracking-tighter uppercase scifi-glow hover:scale-105 transition-all">
                Access Archive
              </Button>
            </Link>
            <Link href="/quiz">
              <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-black rounded-sm group border-primary/30 hover:bg-primary/10 transition-all uppercase tracking-tighter">
                Neural Quiz <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl -z-10 opacity-5 pointer-events-none animate-spin-slow">
          <Cpu className="w-full h-full text-primary" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Database} 
            title="Archival Extraction" 
            description="High-fidelity historical records and administrative telemetry for all detected nations."
            color="text-primary"
          />
          <FeatureCard 
            icon={BrainCircuit} 
            title="Neural Training" 
            description="Advanced cognitive assessment modules designed to optimize global recognition speed."
            color="text-accent"
          />
          <FeatureCard 
            icon={Flag} 
            title="Visual Protocols" 
            description="Deep analysis of national symbology through the lens of digital-era historiography."
            color="text-blue-400"
          />
        </div>
      </section>

      {/* Random Flag Spotlight */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-secondary/20 rounded-sm p-12 md:p-20 relative overflow-hidden border border-primary/20 shadow-2xl">
          <div className="absolute inset-0 scifi-grid opacity-10" />
          <div className="scanline" />
          
          <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <div className="space-y-4 font-mono">
                <h2 className="text-3xl md:text-4xl font-headline font-black tracking-tight uppercase">System <span className="text-primary">Spotlight</span></h2>
                <p className="text-sm text-muted-foreground font-bold tracking-widest max-w-md">
                  RANDOM SELECTION IDENTIFIED. ANALYZING CHROMATIC PATTERNS AND REGIONAL DATA.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button onClick={pickRandomCountry} variant="outline" className="gap-3 h-12 px-6 border-primary/50 text-primary hover:bg-primary/10 transition-all font-bold rounded-sm uppercase tracking-tighter text-xs">
                  <RefreshCw className="h-4 w-4" /> RE-RANDOMIZE
                </Button>
                {randomCountry && (
                  <Link href={`/countries/${randomCountry.code}`}>
                    <Button variant="secondary" className="h-12 px-6 font-bold rounded-sm uppercase tracking-tighter text-xs">
                      VIEW FULL REPORT
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="flex-1 flex justify-center">
              {randomCountry && (
                <Link 
                  href={`/countries/${randomCountry.code}`}
                  className="group relative cursor-pointer"
                >
                  <div className="absolute -inset-10 bg-primary/20 blur-[80px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative aspect-[3/2] w-72 md:w-96 shadow-[0_0_50px_rgba(0,255,255,0.2)] rounded-sm overflow-hidden border-2 border-primary/30 transition-all duration-500 group-hover:scale-105 group-hover:border-primary">
                    <Image
                      src={randomCountry.flagUrl}
                      alt={randomCountry.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="mt-8 text-center space-y-1">
                    <h3 className="text-3xl font-headline font-black text-primary tracking-widest uppercase scifi-text-glow">{randomCountry.name}</h3>
                    <p className="text-muted-foreground font-mono font-black tracking-[0.4em] text-[10px] uppercase">LOC: {randomCountry.continent}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-4 pt-16 border-t border-primary/10 mt-24 text-center pb-12 font-mono">
        <p className="text-muted-foreground text-[10px] font-bold tracking-[0.5em] uppercase opacity-50">
          &copy; {new Date().getFullYear()} GEOVIDEOGRAPHY &bull; CORE SYSTEM VER 4.0.0
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }: any) {
  return (
    <div className="cyber-card p-10 space-y-6 group cursor-default">
      <div className={`h-12 w-12 rounded-sm bg-secondary flex items-center justify-center ${color} group-hover:scifi-glow transition-all`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-headline font-black tracking-widest uppercase">{title}</h3>
        <p className="text-sm text-muted-foreground font-medium leading-relaxed font-mono opacity-80">{description}</p>
      </div>
    </div>
  );
}
