
"use client";

import Image from "next/image";
import Link from "next/link";
import { Country } from "@/lib/countries-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface FlagCardProps {
  country: Country;
}

export function FlagCard({ country }: FlagCardProps) {
  return (
    <Link href={`/countries/${country.code}`}>
      <Card 
        className="group cursor-pointer overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <Image
            src={country.flagUrl}
            alt={`${country.name} flag`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge className="bg-white/90 text-black border-none font-bold backdrop-blur-sm">
              View Story
            </Badge>
          </div>
        </div>
        <CardContent className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-headline font-black text-xl group-hover:text-primary transition-colors">
              {country.name}
            </h3>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{country.continent}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
