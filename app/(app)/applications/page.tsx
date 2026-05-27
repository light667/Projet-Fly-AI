"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileCheck, Sparkles, Clock, Calendar, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface Application {
  id: string;
  scholarshipName: string;
  provider: string;
  status: "Draft" | "Reviewing" | "Submitted" | "Approved";
  deadline: string;
  progress: number;
}

export default function ApplicationsPage() {
  const { lang, t } = useLanguage();
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    // Seed initial dynamic high quality mock applications
    const level = localStorage.getItem("userLevel") || "Master";
    const dest = localStorage.getItem("userDestination") || "Europe";

    const defaultApps: Application[] = [
      {
        id: "app-1",
        scholarshipName: `Dossier d'Excellence - Bourse Eiffel (${level})`,
        provider: "Campus France & Ministère des Affaires Étrangères",
        status: "Reviewing",
        deadline: "10 Janvier 2027",
        progress: 80,
      },
      {
        id: "app-2",
        scholarshipName: `Mastercard Foundation Scholar Program`,
        provider: "Fondation Mastercard",
        status: "Draft",
        deadline: "24 Février 2027",
        progress: 45,
      }
    ];
    setApps(defaultApps);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Submitted":
        return "text-primary bg-primary/10 border-primary/20";
      case "Reviewing":
        return "text-accent bg-accent/10 border-accent/20";
      default:
        return "text-muted-foreground bg-white/5 border-white/10";
    }
  };

  const statusLabels = {
    Draft: lang === "fr" ? "Brouillon en rédaction" : "Draft prep",
    Submitted: lang === "fr" ? "Soumis à l'établissement" : "Submitted",
    Reviewing: lang === "fr" ? "En cours d'examen IA" : "Reviewing with IA",
    Approved: lang === "fr" ? "Sélection finale" : "Approved / Selected"
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-heading font-bold text-foreground tracking-tight flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-primary" />
          <span>{lang === "fr" ? "Suivi de candidatures d'élite" : "Elite Scholarship Tracker"}</span>
        </h2>
        <p className="text-xs text-muted-foreground">
          {lang === "fr"
            ? "Pilotez vos dossiers de bourses, ajustés et visés par notre conseiller intelligent."
            : "Monitor your scholarship packages reviewed and authorized by Fly AI coach."}
        </p>
      </div>

      <div className="space-y-4">
        {apps.map((item) => (
          <motion.div
            id={`app-card-${item.id}`}
            key={item.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 bg-card/60 border border-white/5 rounded-2xl space-y-4 hover:border-primary/10 transition-all group"
          >
            {/* Header section with badge */}
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold font-mono uppercase ${getStatusColor(item.status)}`}>
                  {statusLabels[item.status]}
                </span>
                <h3 className="font-heading font-bold text-base text-foreground mt-2 group-hover:text-primary transition-colors">
                  {item.scholarshipName}
                </h3>
                <p className="text-xs text-muted-foreground">{item.provider}</p>
              </div>

              <div className="text-right flex-shrink-0 text-muted-foreground text-[11px] flex items-center gap-1.5 font-sans">
                <Calendar className="h-3 w-3" />
                <span>{item.deadline}</span>
              </div>
            </div>

            {/* Progress Bar meter */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{lang === "fr" ? "Complétude du dossier" : "Completeness score"}</span>
                <span className="font-bold text-foreground">{item.progress}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>

            {/* Application steps checklist preview */}
            <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-[10px] text-muted-foreground italic flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-accent" />
                <span>
                  {lang === "fr"
                    ? "Besoin d'aide pour d'autres documents de ce dossier ? Consultez Fly AI."
                    : "Need standard template materials? Discuss this portfolio with Fly AI."}
                </span>
              </span>
              <button
                id={`btn-manage-app-${item.id}`}
                className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[11px] font-heading font-medium text-foreground flex items-center justify-center gap-1 cursor-pointer transition-all"
              >
                <span>{lang === "fr" ? "Voir les pièces jointes" : "View attachments"}</span>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
