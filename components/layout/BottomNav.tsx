import React from "react";
import { Home, Compass, Sparkles, User, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  const { t } = useLanguage();

  const navItems = [
    { id: "home", label: t.nav.home, icon: Home },
    { id: "explorer", label: t.nav.explorer, icon: Compass },
    { id: "assistant", label: t.nav.assistant, icon: Sparkles, highlight: true },
    { id: "profile", label: t.nav.profile, icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1424]/90 backdrop-blur-md border-t border-white/5 pb-safe-bottom">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              id={`nav-tab-${item.id}`}
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center w-16 h-full transition-all duration-300 ${
                isActive
                  ? item.highlight
                    ? "text-accent scale-110"
                    : "text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.highlight ? (
                <div className="p-2 rounded-xl bg-gradient-to-tr from-primary to-accent shadow-[0_0_15px_rgba(251,191,36,0.3)] text-background transition-all">
                  <Icon className="h-5 w-5 stroke-[2.5]" />
                </div>
              ) : (
                <div className="relative p-1">
                  <Icon className="h-5 w-5" />
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  )}
                </div>
              )}
              {!item.highlight && (
                <span className="text-[10px] font-sans font-medium mt-1 tracking-tight">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
