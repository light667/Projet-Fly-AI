"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { useLanguage } from "@/hooks/use-language";
import { Logo } from "@/components/ui/logo";
import { Languages, Crown, User, HelpCircle } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [currentTab, setCurrentTab] = useState("home");
  const [pseudo, setPseudo] = useState("David");

  useEffect(() => {
    // Authenticate navigation guard
    const savedPseudo = localStorage.getItem("userPseudo");
    if (!savedPseudo) {
      router.push("/auth");
    } else {
      setPseudo(savedPseudo);
    }
  }, [router]);

  useEffect(() => {
    // Sync BottomNav active state from pathname
    if (pathname) {
      const cleanPath = pathname.replace("/", "");
      if (cleanPath === "home" || cleanPath === "explorer" || cleanPath === "assistant" || cleanPath === "profile") {
        setCurrentTab(cleanPath);
      }
    }
  }, [pathname]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    router.push(`/${tab}`);
  };

  return (
    <div className="min-h-screen pb-24 bg-background text-foreground relative flex flex-col">
      {/* Dynamic ambient blur spots */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Styled Top Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 h-16">
        <div className="max-w-4xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/home")}>
            <Logo className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight bg-gradient-to-r from-white via-slate-100 to-accent bg-clip-text text-transparent">
                FLY AI
              </span>
              <span className="text-[9px] text-muted-foreground font-sans uppercase tracking-widest font-semibold">
                Elite African Academy
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* VIP Scholar Label */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] text-accent font-semibold">
              <Crown className="w-3 h-3" />
              <span>ELITE SCHOLAR</span>
            </div>

            {/* Global English/Français Trigger */}
            <button
              id="header-lang-switcher"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-foreground transition-all duration-300 cursor-pointer"
            >
              <Languages className="w-3 h-3 text-accent" />
              <span>{lang === "fr" ? "EN" : "FR"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Primary Workspace Scroll Region */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 z-10">
        {children}
      </main>

      {/* Standardized Bottom Navigation Dock */}
      <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />
    </div>
  );
}
