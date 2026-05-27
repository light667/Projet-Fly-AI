"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Briefcase, Calendar, Award, ExternalLink, X, Compass, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  region: string;
  level: string;
  criteria: string;
  tags: string[];
}

export default function ExplorerPage() {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("Tous");
  const [selectedLevel, setSelectedLevel] = useState("Tous");
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scholarshipsDatabase: Scholarship[] = [
    {
      id: "eiffel",
      name: "Bourse d'Excellence Master Eiffel",
      provider: "Gouvernement Français (Campus France)",
      amount: "1,181€ / mois + frais de voyage",
      deadline: "10 Janvier 2027",
      region: "Europe",
      level: "Master / PhD",
      criteria: "Réservé aux étudiants étrangers de moins de 30 ans avec un dossier académique remarquable. Candidature présentée impérativement par un établissement français d'enseignement supérieur.",
      tags: ["France", "Campus France", "Excellence"]
    },
    {
      id: "mastercard",
      name: "Mastercard Foundation Scholarships",
      provider: "Mastercard Foundation",
      amount: "Scolarité complète + logement + billet d'avion",
      deadline: "31 Janvier 2027",
      region: "Global",
      level: "Licence / Master",
      criteria: "Destiné aux jeunes d'Afrique Subsaharienne ayant fait preuve d'un engagement communautaire exemplaire, de qualités de leadership et d'un besoin financier avéré.",
      tags: ["Inclusif", "Afrique", "Leadership"]
    },
    {
      id: "daad",
      name: "Bourse d'Études EPOS du DAAD",
      provider: "Office Allemand d'Échanges Universitaires",
      amount: "934€ / mois + vol + aide au logement",
      deadline: "15 Décembre 2026",
      region: "Europe",
      level: "Master / PhD",
      criteria: "Professionnels issus de pays en développement avec au moins deux ans d'expérience professionnelle dans leur domaine. Niveau d'anglais ou d'allemand standard certifié requis (TOEFL/IELTS).",
      tags: ["Allemagne", "Professionnels", "DAAD"]
    },
    {
      id: "commonwealth",
      name: "Bourses du Commonwealth du Royaume-Uni",
      provider: "Gouvernement du Royaume-Uni",
      amount: "Couverture totale des frais + stipend mensuel",
      deadline: "20 Novembre 2026",
      region: "Europe",
      level: "Master / PhD",
      criteria: "Ressortissants de pays du Commonwealth (dont de nombreux pays d'Afrique). Résultats académiques de premier ordre (au moins Mention Bien ou équivalent Bachelor 2:1).",
      tags: ["UK", "Commonwealth", "Prestigieuse"]
    },
    {
      id: "gates-cambridge",
      name: "Gates Cambridge Scholarships",
      provider: "Fondation Bill & Melinda Gates (Université de Cambridge)",
      amount: "Frais académiques + 20,000£ / an d'allocation",
      deadline: "05 Décembre 2026",
      region: "Europe",
      level: "Master / PhD",
      criteria: "Étudiants d'excellence internationale hors Royaume-Uni. Aptitudes intellectuelles hors du commun, leadership et engagement à améliorer la vie d'autrui.",
      tags: ["Cambridge", "USA/Global", "Recherche"]
    },
    {
      id: "mext",
      name: "Bourse d'Études MEXT (Gouvernement du Japon)",
      provider: "Ministère de l'Éducation du Japon",
      amount: "Frais de scolarité + Vol aller-retour + 143,000¥ / mois",
      deadline: "15 Juillet 2026",
      region: "Asie",
      level: "Licence / Master / PhD",
      criteria: "Ouvert aux étudiants africains. Sélection rigoureuse via l'Ambassade du Japon dans votre pays, comprenant des épreuves écrites et orales de langue.",
      tags: ["Japon", "Asie", "Ambassade"]
    }
  ];

  const fetchScholarships = (searchQuery: string, zone: string, level: string) => {
    setIsLoading(true);
    // Mimic real API latency
    setTimeout(() => {
      let result = [...scholarshipsDatabase];

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        result = result.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.provider.toLowerCase().includes(q) ||
            item.criteria.toLowerCase().includes(q)
        );
      }

      if (zone !== "Tous") {
        result = result.filter((item) => item.region === zone);
      }

      if (level !== "Tous") {
        result = result.filter((item) => item.level.includes(level));
      }

      setScholarships(result);
      setIsLoading(false);
    }, 200);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchScholarships(query, selectedZone, selectedLevel);
    }, 0);
    return () => clearTimeout(timer);
  }, [selectedZone, selectedLevel]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchScholarships(query, selectedZone, selectedLevel);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-heading font-bold text-foreground tracking-tight flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary" />
          <span>{t.explorer.title}</span>
        </h2>
        <p className="text-xs text-muted-foreground">
          {t.explorer.subtitle}
        </p>
      </div>

      {/* Styled Search and Filters */}
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t.explorer.searchPlaceholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              fetchScholarships(e.target.value, selectedZone, selectedLevel);
            }}
            className="w-full h-13 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-md transition-all"
          />
        </div>

        {/* Categories / Region Selection Slider */}
        <div className="space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground ml-1 block">
            {lang === "fr" ? "Zones d'études recherchées" : "Target Regions"}
          </span>
          <div className="flex flex-wrap gap-2">
            {["Tous", "Europe", "Amérique", "Asie", "Global"].map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`px-4 py-1.5 rounded-full border text-xs font-heading font-medium transition-all cursor-pointer ${
                  selectedZone === zone
                    ? "bg-primary text-white border-primary shadow-[0_2px_8px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10"
                }`}
              >
                {zone === "Tous" ? t.explorer.allZones : zone}
              </button>
            ))}
          </div>
        </div>

        {/* Academic Level selection */}
        <div className="space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground ml-1 block">
            {lang === "fr" ? "Niveaux visés" : "Academic Levels"}
          </span>
          <div className="flex flex-wrap gap-2">
            {["Tous", "Licence", "Master", "PhD"].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-1.5 rounded-full border text-xs font-heading font-medium transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? "bg-accent text-background border-accent shadow-[0_2px_8px_rgba(251,191,36,0.3)]"
                    : "bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10"
                }`}
              >
                {lvl === "Tous" ? t.explorer.allLevels : lvl}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Render matching List */}
      {isLoading ? (
        <div className="py-16 text-center text-sm text-muted-foreground animate-pulse flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2" />
          <span>Chargement des bourses d'excellence...</span>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 text-muted-foreground bg-white/5 border border-white/10 rounded-2xl">
          <p className="mb-2 font-medium">{t.explorer.empty}</p>
          <p className="text-xs">{"Essayez d'autres mots-clés ou modifiez les filtres de pays/niveau."}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {scholarships.map((item) => (
            <motion.div
              layout
              id={`scholarship-row-${item.id}`}
              key={item.id}
              onClick={() => setSelectedScholarship(item)}
              className="p-5 bg-card/60 hover:bg-card border border-white/5 rounded-2xl hover:border-primary/25 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap text-[10px] font-semibold uppercase font-mono tracking-wider">
                  <span className="px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/20">
                    {item.region}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/20">
                    {item.level}
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{item.provider}</p>
                </div>
              </div>

              <div className="flex sm:flex-col justify-between items-center sm:items-end gap-2 text-right">
                <span className="text-sm font-sans font-extrabold text-accent">{item.amount}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {item.deadline}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Scholarship Detail Drawer Overlay */}
      <AnimatePresence>
        {selectedScholarship && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-[#06080e]/95 backdrop-blur-md"
              onClick={() => setSelectedScholarship(null)}
            />
            
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="w-full max-w-lg bg-[#141a2a] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 relative z-10 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider">
                    <span className="px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/20">
                      {selectedScholarship.region}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/20">
                      {selectedScholarship.level}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mt-2 leading-tight">
                    {selectedScholarship.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{selectedScholarship.provider}</p>
                </div>
                <button
                  id="btn-close-detail"
                  onClick={() => setSelectedScholarship(null)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{"Critères d'Éligibilité"}</h4>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 text-sm text-foreground leading-relaxed font-sans">
                    {selectedScholarship.criteria}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm bg-white/5 p-4 rounded-xl border border-white/5">
                  <div>
                    <span className="text-xs text-muted-foreground block">{"Zone / Pays d'étude"}</span>
                    <span className="font-medium text-foreground flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-4 w-4 text-primary" /> {selectedScholarship.region}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">{"Niveau d'admission"}</span>
                    <span className="font-medium text-foreground flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="h-4 w-4 text-accent" /> {selectedScholarship.level}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">Allocation de Bourse</span>
                    <span className="font-heading font-black text-base text-accent">{selectedScholarship.amount}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">Date Limite de dépôt</span>
                    <span className="text-xs font-sans font-medium text-white flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3.5 w-3.5 text-red-400" /> {selectedScholarship.deadline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Apply CTA */}
              <div className="pt-2 flex gap-3">
                <button
                  id="btn-detail-dismiss"
                  onClick={() => setSelectedScholarship(null)}
                  className="flex-1 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-heading font-semibold text-foreground cursor-pointer transition-all"
                >
                  {lang === "fr" ? "Fermer" : "Close"}
                </button>
                <a
                  id="btn-detail-apply"
                  href="https://www.campusfrance.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-12 rounded-xl bg-primary hover:bg-blue-600 text-xs font-heading font-bold text-white cursor-pointer shadow-[0_4px_12px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 transition-all"
                >
                  <span>{t.explorer.apply}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
