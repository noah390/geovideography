
"use client";

import Image from "next/image";
import { Country } from "@/lib/countries-data";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MapPin, 
  Users, 
  Globe2, 
  Building2, 
  ScrollText, 
  Map as MapIcon, 
  Landmark, 
  Flag 
} from "lucide-react";

interface CountryDetailsDialogProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CountryDetailsDialog({ country, isOpen, onClose }: CountryDetailsDialogProps) {
  if (!country) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden max-h-[90vh] flex flex-col bg-background border-none shadow-2xl">
        <DialogTitle className="sr-only">{country.name} Details</DialogTitle>
        
        <div className="relative h-64 w-full shrink-0">
          <Image
            src={country.flagUrl}
            alt={`${country.name} flag`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-8 flex items-end gap-4">
            <div className="bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20 shadow-xl overflow-hidden hidden sm:block">
              <div className="relative h-12 w-20">
                <Image src={country.flagUrl} alt="mini-flag" fill className="object-cover" />
              </div>
            </div>
            <h2 className="text-4xl font-black text-white font-headline tracking-tight drop-shadow-lg">
              {country.name}
            </h2>
          </div>
        </div>
        
        <ScrollArea className="flex-1 w-full bg-background">
          <div className="p-8 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <StatItem 
                  icon={Building2} 
                  label="Capital City" 
                  value={country.capital} 
                />
                <StatItem 
                  icon={Globe2} 
                  label="Continent" 
                  value={country.continent} 
                />
                <StatItem 
                  icon={MapPin} 
                  label="Geographic Region" 
                  value={country.subregion} 
                />
                <StatItem 
                  icon={Users} 
                  label="Total Population" 
                  value={country.population.toLocaleString()} 
                />
              </div>
              
              <div className="space-y-6 bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <h4 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Flag className="h-4 w-4" /> Administrative Info
                </h4>
                <StatItem 
                  icon={MapIcon} 
                  label="States / Provinces" 
                  value={country.statesCount.toString()} 
                />
                <StatItem 
                  icon={Landmark} 
                  label={country.name === "Nigeria" ? "Local Government Areas (LGAs)" : "Districts / Municipalities"} 
                  value={country.lgasCount.toString()} 
                />
              </div>
            </div>
            
            <Separator className="opacity-50" />

            <div className="space-y-6 pb-4">
              <div className="flex items-center gap-3 text-primary">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <ScrollText className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black font-headline tracking-tight">The Story of {country.name}</h3>
              </div>
              
              <div className="prose prose-blue dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed font-medium whitespace-pre-wrap">
                  {country.history}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-6 pt-4 border-t flex justify-end shrink-0 bg-background/95 backdrop-blur-sm">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            Done Exploring
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2.5 bg-secondary text-primary rounded-xl shrink-0 shadow-sm border border-border/50">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-0.5">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">{label}</p>
        <p className="font-bold text-lg text-foreground leading-tight">{value}</p>
      </div>
    </div>
  );
}
