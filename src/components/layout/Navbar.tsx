"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Search, BrainCircuit, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Browse", href: "/browse", icon: Search },
  { name: "Quiz", href: "/quiz", icon: BrainCircuit },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary rounded-lg p-1.5 transition-transform group-hover:scale-110">
            <Globe className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">
            GeoJourney
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-secondary",
                pathname === item.href
                  ? "text-primary bg-secondary shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
