
"use client";

import Image from "next/image";
import { Country } from "@/lib/countries-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

interface FlagCardProps {
  country: Country;
  onClick: (country: Country) => void;
}

export function FlagCard({ country, onClick }: FlagCardProps) {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      onClick={() => onClick(country)}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <Image
          src={country.flagUrl}
          alt={`${country.name} flag`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">
            {country.name}
          </h3>
          <p className="text-sm text-muted-foreground">{country.continent}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="secondary" className="font-mono text-[10px] uppercase">
            {country.code}
          </Badge>
          <Info className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardContent>
    </Card>
  );
}
