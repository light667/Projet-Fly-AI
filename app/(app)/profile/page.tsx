"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Award, Globe, LogOut, CheckCircle2, ShieldCheck, Languages, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function ProfilePage() {
  const router = useRouter();
  const { lang, setLang, t } = useLanguage();

  const [pseudo, setPseudo] = useState("David");
  const [email, setEmail] = useState("david@excellence.com");
  const [level, setLevel] = useState("Licence 3 / Bachelor");
  const [destination, setDestination] = useState("Europe");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPseudo(localStorage.getItem("userPseudo") || "David");
      setEmail(localStorage.getItem("userEmail") || "david@excellence.com");
      setLevel(localStorage.getItem("userLevel") || "Licence 3 / Bachelor");
      setDestination(localStorage.getItem("userDestination") || "Europe");
      
      const savedScore = localStorage.getItem("assessmentScore");
      setScore(savedScore ? parseInt(savedScore, 10) : 70);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth");
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-heading font-bold text-foreground tracking-tight flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <span>{t.profile.title}</span>
        </h2>
        <p className="text-xs text-muted-foreground">
          {t.profile.subtitle}
        </p>
      </div>

      {/* Profile Header Box */}
      <div className="glassmorphism p-6 rounded-3xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
        {/* Styled CSS SVG Golden Avatar Shield */}
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-accent shadow-[0_4px_15px_rgba(59,130,246,0.3)] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-12 h-12 text-background fill-current">
            <path d="M50 15 L80 30 V60 C80 75, 50 85, 50 85 C 50 85, 20 75, 20 60 V30 Z" />
          </svg>
          <span className="absolute bottom-1 right-1 bg-emerald-400 p-1 rounded-full border border-[#141a2a]">
            <CheckCircle2 className="h-2.5 w-2.5 text-[#0b0f19] fill-[#0b0f19]" />
          </span>
        </div>

        <div className="space-y-2 flex-1 text-center sm:text-left">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/20 text-[10px] text-accent font-semibold font-mono tracking-wide">
              {t.profile.unlimited}
            </span>
            <h3 className="font-heading font-extrabold text-xl text-foreground mt-2">
              {pseudo}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
              <Mail className="h-3 w-3" /> {email}
            </p>
          </div>
        </div>
      </div>

      {/* Academic metrics list */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
          {t.profile.academicDetails}
        </h4>

        <div className="p-5 bg-card/60 border border-white/5 rounded-2xl space-y-4">
          <div className="flex justify-between items-center text-sm pb-3 border-b border-white/5">
            <span className="text-muted-foreground flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>{lang === "fr" ? "Niveau d'études" : "Study Level"}</span>
            </span>
            <span className="font-medium text-foreground">{level}</span>
          </div>

          <div className="flex justify-between items-center text-sm pb-3 border-b border-white/5">
            <span className="text-muted-foreground flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" />
              <span>{lang === "fr" ? "Destination ciblée" : "Desired Destination"}</span>
            </span>
            <span className="font-medium text-foreground">{destination}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>{lang === "fr" ? "Score de résilience du dossier" : "Profile Evaluation Index"}</span>
            </span>
            <span className="font-heading font-black text-emerald-400">{score}%</span>
          </div>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
          {lang === "fr" ? "Préférences linguistiques" : "System Languages"}
        </h4>
        <div className="p-4 bg-card/60 border border-white/5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Languages className="h-4 w-4 text-accent" />
            <span>{lang === "fr" ? "Langue active : Français" : "Active Language: English"}</span>
          </div>
          <button
            id="profile-lang-switcher"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-foreground font-medium transition-colors cursor-pointer"
          >
            {lang === "fr" ? "Switch to English" : "Passer en Français"}
          </button>
        </div>
      </div>

      {/* Log Out option */}
      <div className="pt-2">
        <button
          id="btn-logout"
          onClick={handleLogout}
          className="w-full h-11 rounded-xl bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-xs font-heading font-bold text-red-400 hover:text-red-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>{t.profile.logout}</span>
        </button>
      </div>
    </div>
  );
}
