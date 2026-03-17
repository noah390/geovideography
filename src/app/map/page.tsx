
"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Loader2, 
  ChevronRight, 
  Activity, 
  Bus, 
  Route, 
  Globe, 
  Navigation,
  MapPin,
  Home,
  AlertTriangle
} from "lucide-react";
import { COUNTRIES } from "@/lib/countries-data";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { getStreetIntelligence, GetStreetIntelligenceOutput } from "@/ai/flows/get-street-intelligence";
import { cn } from "@/lib/utils";

// Dynamic import for LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-background space-y-4">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
      <p className="font-mono text-xs uppercase tracking-widest animate-pulse">Initializing Global Grid...</p>
    </div>
  ),
});

type NavLevel = "world" | "country" | "lga" | "town" | "street";

interface Breadcrumb {
  level: NavLevel;
  label: string;
  data?: any;
}

export default function GlobalGridMap() {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([{ level: "world", label: "World" }]);
  const [currentLevel, setCurrentLevel] = useState<NavLevel>("world");
  const [selectedData, setSelectedData] = useState<any>(null);
  const [streetIntel, setStreetIntel] = useState<GetStreetIntelligenceOutput | null>(null);
  const [isIntelLoading, setIsIntelLoading] = useState(false);

  const handleDrillDown = async (level: NavLevel, label: string, data: any) => {
    const newBreadcrumbs = [...breadcrumbs];
    const levelIndex = newBreadcrumbs.findIndex(b => b.level === level);
    
    if (levelIndex !== -1) {
      newBreadcrumbs.splice(levelIndex);
    }
    newBreadcrumbs.push({ level, label, data });
    
    setBreadcrumbs(newBreadcrumbs);
    setCurrentLevel(level);
    setSelectedData(data);

    if (level === "street") {
      setIsIntelLoading(true);
      try {
        const intel = await getStreetIntelligence({
          streetName: label,
          lgaName: breadcrumbs.find(b => b.level === "lga")?.label || "Unknown LGA",
        });
        setStreetIntel(intel);
      } catch (e) {
        console.error(e);
      } finally {
        setIsIntelLoading(false);
      }
    }
  };

  const navigateToLevel = (index: number) => {
    const target = breadcrumbs[index];
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
    setCurrentLevel(target.level);
    setSelectedData(target.data || null);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden font-mono">
      <Navbar />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-card/40 backdrop-blur-md border-b border-primary/20 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {breadcrumbs.map((crumb, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            {idx > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateToLevel(idx)}
              className={cn(
                "h-8 px-2 text-[10px] uppercase tracking-widest font-black rounded-sm",
                idx === breadcrumbs.length - 1 ? "text-primary bg-primary/10 border border-primary/30" : "text-muted-foreground hover:text-primary"
              )}
            >
              {crumb.level === "world" ? <Globe className="h-3 w-3 mr-1" /> : crumb.level === "country" ? <Navigation className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
              {crumb.label}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex-1 relative flex">
        {/* Map Container */}
        <LeafletMap 
          onDrillDown={handleDrillDown} 
          selectedCountry={currentLevel === "country" ? selectedData : null} 
        />

        {/* Intelligence Sidebar */}
        <aside className={cn(
          "absolute top-4 right-4 bottom-4 w-80 md:w-96 bg-card/80 backdrop-blur-xl border border-primary/20 shadow-2xl transition-transform duration-500 z-50 rounded-sm overflow-hidden flex flex-col",
          currentLevel !== "world" ? "translate-x-0" : "translate-x-[calc(100%+20px)]"
        )}>
          {selectedData && (
            <>
              <div className="p-6 bg-primary/10 border-b border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedData.flagUrl && (
                    <div className="relative h-6 w-9 rounded-sm overflow-hidden border border-white/20">
                      <img src={selectedData.flagUrl} alt="flag" className="object-cover h-full w-full" />
                    </div>
                  )}
                  <h2 className="font-headline font-black text-sm tracking-tighter uppercase truncate max-w-[150px]">{selectedData.name || selectedData.label}</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigateToLevel(0)} className="h-8 w-8 text-primary">
                  ×
                </Button>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-6 space-y-6">
                  {currentLevel === "country" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                      <div className="bg-secondary/40 p-4 rounded-sm border border-white/5 space-y-2">
                         <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">Administrative Grid</h3>
                         <div className="grid gap-2">
                           <Button 
                             onClick={() => handleDrillDown("lga", "Central District", {})}
                             variant="outline" 
                             className="w-full justify-start h-10 text-[10px] uppercase border-primary/20 hover:bg-primary/10 rounded-none"
                           >
                             <Home className="h-3 w-3 mr-2 text-primary" /> View LGAs
                           </Button>
                         </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                          {selectedData.history}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentLevel === "lga" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                      <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">Towns & Estates</h3>
                      <div className="grid gap-2">
                        {["Neon Heights", "Silicon Valley", "Cyber Port"].map(town => (
                          <Button 
                            key={town}
                            onClick={() => handleDrillDown("town", town, {})}
                            className="w-full justify-between h-10 text-[10px] bg-secondary/40 border border-white/5 hover:bg-primary/20 rounded-none"
                          >
                            {town} <ChevronRight className="h-3 w-3" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentLevel === "town" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                      <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">Street Telemetry Grid</h3>
                      <div className="grid gap-2">
                        {["Main Circuit", "Data Way", "Logic Lane"].map(street => (
                          <Button 
                            key={street}
                            onClick={() => handleDrillDown("street", street, {})}
                            className="w-full justify-between h-10 text-[10px] bg-primary/10 border border-primary/30 hover:bg-primary/20 rounded-none"
                          >
                            {street} <Activity className="h-3 w-3" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentLevel === "street" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                      {isIntelLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center space-y-4">
                          <Loader2 className="h-8 w-8 text-primary animate-spin" />
                          <p className="text-[10px] uppercase tracking-widest animate-pulse">Scanning Grid...</p>
                        </div>
                      ) : streetIntel ? (
                        <div className="space-y-6">
                           <DashboardCard 
                             icon={Bus} 
                             label="Transit Access" 
                             value={streetIntel.isDataAvailable ? `${streetIntel.busStops} STOPS` : "N/A"} 
                             desc="Verified transit nodes."
                           />
                           <DashboardCard 
                             icon={Route} 
                             label="Surface Health" 
                             value={streetIntel.isDataAvailable ? streetIntel.roadHealth.toUpperCase() : "UNKNOWN"} 
                             desc="Structural pavement scan."
                           />
                           <div className="p-4 bg-primary/5 border border-primary/20 rounded-sm">
                             <p className="text-[9px] text-muted-foreground leading-relaxed uppercase">
                               SYSTEM NOTE: {streetIntel.status}
                             </p>
                           </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] uppercase font-bold text-center">
                          Extraction Protocol Failed
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </aside>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 p-3 bg-card/80 backdrop-blur-md border border-primary/20 rounded-sm z-40 hidden md:block">
          <div className="flex items-center gap-2 text-primary font-mono text-[9px] font-black uppercase tracking-[0.2em]">
            <Activity className="h-3 w-3 animate-pulse" /> GLOBAL GRID ACTIVE: {currentLevel.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon: Icon, label, value, desc }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-3 w-3 text-primary" />
          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-[10px] font-black text-primary scifi-text-glow">{value}</span>
      </div>
      <Progress value={85} className="h-0.5 bg-primary/10" />
      <p className="text-[8px] text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
