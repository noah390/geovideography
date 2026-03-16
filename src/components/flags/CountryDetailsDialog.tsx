"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Country } from "@/lib/countries-data";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Users, Globe2, Building2, ScrollText, Loader2 } from "lucide-react";
import { getCountryHistory } from "@/ai/flows/get-country-history";

interface CountryDetailsDialogProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CountryDetailsDialog({ country, isOpen, onClose }: CountryDetailsDialogProps) {
  const [history, setHistory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (country && isOpen) {
      setIsLoading(true);
      setHistory(null);
      getCountryHistory({ countryName: country.name })
        .then((res) => setHistory(res.history))
        .catch((err) => {
          console.error("Failed to fetch history:", err);
          setHistory("Could not load historical context at this time.");
        })
        .finally(() => setIsLoading(false));
    }
  }, [country, isOpen]);

  if (!country) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="relative h-56 w-full shrink-0">
          <Image
            src={country.flagUrl}
            alt={`${country.name} flag`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h2 className="text-3xl font-bold text-white font-headline">
              {country.name}
            </h2>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Capital</p>
                  <p className="font-medium">{country.capital}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Globe2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Continent</p>
                  <p className="font-medium">{country.continent}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Region</p>
                  <p className="font-medium text-sm">{country.subregion}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Population</p>
                  <p className="font-medium">{country.population.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <ScrollText className="h-5 w-5" />
                <h3 className="text-lg font-bold font-headline">Historical Journey</h3>
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3 opacity-60">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm font-medium">Researching nation history...</p>
                </div>
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {history || "Historical data for this country is currently unavailable."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-6 pt-2 border-t flex justify-end shrink-0 bg-background">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
