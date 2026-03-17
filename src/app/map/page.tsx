"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Loader2, Map as MapIcon, Info, ChevronRight, Activity, TreeDeciduous, HeartPulse, Building2, Bus, Road } from "lucide-react";
import { Loader } from "@googlemaps/js-api-loader";
import { COUNTRIES } from "@/lib/countries-data";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { getStreetIntelligence, GetStreetIntelligenceOutput } from "@/ai/flows/get-street-intelligence";
import { cn } from "@/lib/utils";

// Mock data extension for map coords
const MOCK_MAP_DATA = COUNTRIES.map(c => ({
  ...c,
  lat: Math.random() * 120 - 60,
  lng: Math.random() * 240 - 120,
}));

export default function GlobalGridMap() {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [drillDown, setDrillDown] = useState<"country" | "street" | null>(null);
  const [streetIntel, setStreetIntel] = useState<GetStreetIntelligenceOutput | null>(null);
  const [isIntelLoading, setIsIntelLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with real key
      version: "weekly",
    });

    loader.load().then((google) => {
      if (!mapRef.current) return;
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 20, lng: 0 },
        zoom: 3,
        styles: sciFiMapStyles,
        disableDefaultUI: true,
      });

      MOCK_MAP_DATA.forEach((country) => {
        const marker = new google.maps.Marker({
          position: { lat: country.lat, lng: country.lng },
          map,
          title: country.name,
          icon: {
            url: country.flagUrl,
            scaledSize: new google.maps.Size(30, 20),
          },
        });

        marker.addListener("click", () => {
          setSelectedCountry(country);
          setDrillDown("country");
          map.panTo({ lat: country.lat, lng: country.lng });
          map.setZoom(5);
        });
      });
    });
  }, []);

  const handleStreetDrillDown = async () => {
    setIsIntelLoading(true);
    setDrillDown("street");
    try {
      // Use the new getStreetIntelligence flow with actual context
      const intel = await getStreetIntelligence({
        streetName: "Central Boulevard",
        lgaName: selectedCountry?.name || "Global Grid",
      });
      setStreetIntel(intel);
    } catch (e) {
      console.error(e);
    } finally {
      setIsIntelLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      <Navbar />
      
      <div className="flex-1 relative flex">
        {/* Map Container */}
        <div ref={mapRef} className="flex-1 h-full w-full" />

        {/* Intelligence Sidebar */}
        <aside className={cn(
          "absolute top-4 right-4 bottom-4 w-96 bg-card/80 backdrop-blur-xl border border-primary/20 shadow-2xl transition-transform duration-500 z-50 rounded-sm overflow-hidden flex flex-col",
          selectedCountry ? "translate-x-0" : "translate-x-[calc(100%+20px)]"
        )}>
          {selectedCountry && (
            <>
              <div className="p-6 bg-primary/10 border-b border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-12 rounded-sm overflow-hidden border border-white/20">
                    <img src={selectedCountry.flagUrl} alt="flag" className="object-cover h-full w-full" />
                  </div>
                  <h2 className="font-headline font-black text-lg tracking-tighter uppercase">{selectedCountry.name}</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedCountry(null)} className="h-8 w-8 text-primary">
                  ×
                </Button>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-6 space-y-6">
                  {drillDown === "country" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary/40 p-3 rounded-sm border border-white/5">
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Population</p>
                          <p className="text-sm font-black text-primary">{selectedCountry.population.toLocaleString()}</p>
                        </div>
                        <div className="bg-secondary/40 p-3 rounded-sm border border-white/5">
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Capital</p>
                          <p className="text-sm font-black text-primary">{selectedCountry.capital}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
                          <Info className="h-4 w-4" />
                          <h3 className="text-xs font-headline font-black uppercase tracking-widest">Archival History</h3>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono leading-relaxed italic">
                          {selectedCountry.history}
                        </p>
                      </div>

                      <Separator className="bg-primary/20" />

                      <div className="space-y-4">
                        <h3 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.3em]">Grid Navigation</h3>
                        <Button onClick={handleStreetDrillDown} className="w-full justify-between h-12 bg-primary/20 border border-primary/40 hover:bg-primary/30 text-primary font-black uppercase tracking-tighter rounded-sm group">
                          Extract Street Intelligence <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {drillDown === "street" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                      <Button variant="link" onClick={() => setDrillDown("country")} className="p-0 h-auto text-[10px] font-mono text-primary uppercase tracking-widest">
                        ← Back to Country
                      </Button>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-primary/20 flex items-center justify-center rounded-sm">
                            <Activity className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-sm font-headline font-black uppercase tracking-tighter">Street Telemetry</h3>
                            <p className="text-[8px] font-mono text-muted-foreground uppercase">LOC: CENTRAL BOULEVARD GRID</p>
                          </div>
                        </div>

                        {isIntelLoading ? (
                          <div className="py-12 flex flex-col items-center justify-center space-y-4">
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                            <p className="text-[10px] font-mono uppercase tracking-widest animate-pulse">Scanning Maps Database...</p>
                          </div>
                        ) : streetIntel && (
                          <div className="space-y-6">
                            {!streetIntel.isDataAvailable ? (
                              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-sm">
                                <p className="text-[10px] font-mono font-bold text-destructive uppercase tracking-widest">
                                  {streetIntel.status}
                                </p>
                              </div>
                            ) : (
                              <>
                                <DashboardCard 
                                  icon={Bus} 
                                  label="Transit Access" 
                                  value={`${streetIntel.busStops} STOPS`} 
                                  desc="Verified bus stop infrastructure on this segment."
                                />
                                <DashboardCard 
                                  icon={Road} 
                                  label="Surface Health" 
                                  value={streetIntel.roadHealth.toUpperCase()} 
                                  desc="Structural pavement assessment via neural scan."
                                />
                                <div className="p-4 bg-primary/5 border border-primary/20 rounded-sm space-y-2">
                                   <div className="flex items-center gap-2 text-accent">
                                     <Building2 className="h-3 w-3" />
                                     <span className="text-[10px] font-mono font-black uppercase tracking-widest">Grid Status</span>
                                   </div>
                                   <p className="text-[10px] text-muted-foreground leading-relaxed font-mono">
                                     {streetIntel.status}
                                   </p>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </aside>

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 p-4 bg-card/80 backdrop-blur-md border border-primary/20 rounded-sm z-40 hidden md:block">
          <div className="flex items-center gap-2 text-primary font-mono text-[10px] font-black uppercase tracking-[0.2em]">
            <MapIcon className="h-4 w-4" /> Global Intelligence Grid Active
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon: Icon, label, value, desc }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-mono font-black text-muted-foreground uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-xs font-headline font-black text-primary scifi-text-glow">{value}</span>
      </div>
      <Progress value={75} className="h-1 bg-primary/10" />
      <p className="text-[9px] text-muted-foreground leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

const sciFiMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#00050a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#00050a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#00f2ff" }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#00f2ff" }, { weight: 1 }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000b1a" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#004060" }] },
  { featureType: "road", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];
