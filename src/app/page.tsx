
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { COUNTRIES, Country } from "@/lib/countries-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Search, BrainCircuit, Globe2, RefreshCw, Flag } from "lucide-react";

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
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-40 md:pb-48">
        <div className="container mx-auto px-4 relative z-10 text-center space-y-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-[0.2em] border border-primary/20 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Globe2 className="h-4 w-4" />
            <span>Discover the World Through Flags</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter text-foreground leading-[0.95] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Every Flag Tells <br/><span className="text-primary">A Story.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Explore {COUNTRIES.length} nations. Master their colors, discover their history, and test your global knowledge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/browse">
              <Button size="lg" className="h-16 px-12 text-xl font-black rounded-2xl shadow-2xl shadow-primary/30">
                Explore Collection
              </Button>
            </Link>
            <Link href="/quiz">
              <Button size="lg" variant="secondary" className="h-16 px-12 text-xl font-black rounded-2xl group border-2 border-transparent hover:border-primary/20 transition-all">
                AI Flag Quiz <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl -z-10 opacity-[0.02] pointer-events-none">
          <Globe2 className="w-full h-full text-primary" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={Search} 
            title="Deep Research" 
            description="Access full historical contexts and detailed administrative statistics for every nation."
            color="text-primary"
            bg="bg-primary/5"
          />
          <FeatureCard 
            icon={BrainCircuit} 
            title="AI Learning" 
            description="Challenge yourself with dynamic quizzes that adapt to your knowledge level."
            color="text-accent"
            bg="bg-accent/5"
          />
          <FeatureCard 
            icon={Flag} 
            title="Global Identity" 
            description="Browse thousands of years of human history through the lens of national symbols."
            color="text-blue-500"
            bg="bg-blue-500/5"
          />
        </div>
      </section>

      {/* Random Flag Spotlight */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-primary/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-primary/10 shadow-inner">
          <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tight">Daily <span className="text-primary">Spotlight</span></h2>
                <p className="text-xl text-muted-foreground font-medium max-w-md">
                  Expand your global horizon by learning one flag at a time. Do you recognize this nation?
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button onClick={pickRandomCountry} variant="outline" className="gap-3 h-14 px-8 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-bold rounded-2xl">
                  <RefreshCw className="h-5 w-5" /> Spin Again
                </Button>
                {randomCountry && (
                  <Link href={`/countries/${randomCountry.code}`}>
                    <Button variant="secondary" className="h-14 px-8 font-bold rounded-2xl">
                      View Full Story
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
                  <div className="absolute -inset-8 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative aspect-[3/2] w-72 md:w-[28rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden border-[12px] border-white transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                    <Image
                      src={randomCountry.flagUrl}
                      alt={randomCountry.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-10 text-center space-y-2">
                    <h3 className="text-4xl font-headline font-black text-primary tracking-tighter">{randomCountry.name}</h3>
                    <p className="text-muted-foreground uppercase font-black tracking-[0.3em] text-xs">{randomCountry.continent}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-4 pt-16 border-t mt-24 text-center pb-12">
        <p className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} GeoJourney &bull; Exploring our world
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color, bg }: any) {
  return (
    <Card className="border-none shadow-xl bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 rounded-[2.5rem] overflow-hidden group">
      <CardContent className="p-10 space-y-6">
        <div className={`h-16 w-16 rounded-[1.5rem] ${bg} flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-headline font-black tracking-tight">{title}</h3>
          <p className="text-muted-foreground font-medium leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
