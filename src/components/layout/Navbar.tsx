
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BrainCircuit, Home, Zap, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Terminal", href: "/", icon: Home },
  { name: "Global Map", href: "/map", icon: MapIcon },
  { name: "Database", href: "/browse", icon: Search },
  { name: "Intel", href: "/quiz", icon: BrainCircuit },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl border-b border-primary/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 rounded-sm p-1.5 transition-all group-hover:bg-primary/40 group-hover:scifi-glow">
            <svg
              viewBox="0 0 24 24"
              className="text-primary h-4 w-4 sm:h-5 sm:w-5 animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8.5C16.8 6.5 14.5 5 12 5 8.1 5 5 8.1 5 12 5 15.9 8.1 19 12 19 15.9 19 19 12V12H12" />
              <circle cx="12" cy="12" r="0.5" fill="currentColor" />
            </svg>
          </div>
          <span className="font-headline font-black text-sm sm:text-lg md:text-xl tracking-widest text-primary scifi-text-glow truncate max-w-[120px] sm:max-w-none">
            GEOVIDEOGRAPHY
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4 font-mono">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-2 sm:px-4 py-2 rounded-sm text-[10px] sm:text-xs font-bold transition-all border border-transparent",
                pathname === item.href
                  ? "text-primary bg-primary/10 border-primary/30 shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-3 w-3" />
              <span className="hidden xs:inline uppercase tracking-tighter">{item.name}</span>
            </Link>
          ))}
          <div className="hidden xs:block h-4 w-[1px] bg-border mx-1 sm:mx-2" />
          <Zap className="hidden xs:block h-4 w-4 text-accent animate-bounce" />
        </div>
      </div>
    </nav>
  );
}
