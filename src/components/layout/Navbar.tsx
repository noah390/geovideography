"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, Search, BrainCircuit, Home, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Terminal", href: "/", icon: Home },
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
            <Cpu className="text-primary h-5 w-5 animate-pulse" />
          </div>
          <span className="font-headline font-black text-xl tracking-widest text-primary scifi-text-glow">
            GEOVIDEOGRAPHY
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4 font-mono">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold transition-all border border-transparent",
                pathname === item.href
                  ? "text-primary bg-primary/10 border-primary/30 shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-3 w-3" />
              <span className="hidden sm:inline uppercase tracking-tighter">{item.name}</span>
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-border mx-2" />
          <Zap className="h-4 w-4 text-accent animate-bounce" />
        </div>
      </div>
    </nav>
  );
}
