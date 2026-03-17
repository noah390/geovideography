
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { COUNTRIES } from "@/lib/countries-data";
import { Button } from "@/components/ui/button";
import { MapPin, Info } from "lucide-react";

// Mock coordinates for markers (Country centroids)
const MOCK_COORD_MAP = COUNTRIES.map((c, i) => ({
  ...c,
  lat: [20, -25, -10, 56, 9, 37, 35, 26, 46, 51, 20, 41][i % 12],
  lng: [0, 133, -50, -106, 8, -95, 104, 30, 2, 10, 78, 12][i % 12],
}));

interface LeafletMapProps {
  onDrillDown: (level: string, label: string, data: any) => void;
  selectedCountry: any;
}

// Component to handle map view changes
function MapController({ selectedCountry }: { selectedCountry: any }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCountry) {
      map.flyTo([selectedCountry.lat, selectedCountry.lng], 6, {
        duration: 2,
      });
    } else {
      map.flyTo([20, 0], 3, {
        duration: 2,
      });
    }
  }, [selectedCountry, map]);
  return null;
}

export default function LeafletMap({ onDrillDown, selectedCountry }: LeafletMapProps) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load GeoJSON", err));
  }, []);

  const createFlagIcon = (url: string) => {
    return L.icon({
      iconUrl: url,
      iconSize: [40, 26],
      iconAnchor: [20, 13],
      popupAnchor: [0, -13],
      className: "rounded-sm border-2 border-primary/30 scifi-glow",
    });
  };

  const geoJsonStyle = {
    color: "#00f2ff",
    weight: 1,
    fillColor: "#00f2ff",
    fillOpacity: 0.05,
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        const l = e.target;
        l.setStyle({
          fillOpacity: 0.2,
          weight: 2,
        });
      },
      mouseout: (e: any) => {
        const l = e.target;
        l.setStyle({
          fillOpacity: 0.05,
          weight: 1,
        });
      },
      click: (e: any) => {
        const countryName = feature.properties.ADMIN;
        const country = MOCK_COORD_MAP.find(c => c.name === countryName);
        if (country) {
          onDrillDown("country", country.name, country);
        }
      }
    });
  };

  return (
    <div className="h-full w-full relative group">
      <MapContainer
        center={[20, 0]}
        zoom={3}
        style={{ height: "100%", width: "100%", background: "#00050a" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="sci-fi-map-tiles"
        />
        
        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={geoJsonStyle} 
            onEachFeature={onEachFeature}
          />
        )}

        {MOCK_COORD_MAP.map((country) => (
          <Marker
            key={country.code}
            position={[country.lat, country.lng]}
            icon={createFlagIcon(country.flagUrl)}
          >
            <Popup className="scifi-popup">
              <div className="p-3 space-y-3 bg-card border border-primary/20 rounded-sm min-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="relative h-6 w-9 rounded-sm overflow-hidden border border-white/20">
                    <img src={country.flagUrl} alt="flag" className="object-cover h-full w-full" />
                  </div>
                  <h3 className="font-headline font-black text-xs uppercase tracking-tighter text-foreground">{country.name}</h3>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed italic line-clamp-2">
                  {country.history}
                </p>
                <Button 
                  size="sm" 
                  className="w-full h-8 text-[9px] font-black uppercase tracking-widest rounded-none bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30"
                  onClick={() => onDrillDown("country", country.name, country)}
                >
                  <Info className="h-3 w-3 mr-2" /> View Archives
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController selectedCountry={selectedCountry} />
      </MapContainer>
      
      <style jsx global>{`
        .sci-fi-map-tiles {
          filter: invert(100%) hue-rotate(180deg) brightness(0.6) contrast(1.2);
        }
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-tip {
          background: #00f2ff !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
      `}</style>
    </div>
  );
}
