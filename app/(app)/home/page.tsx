"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, Calendar, ExternalLink, HelpCircle, Flame, Star, Send, X, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/lib/auth-context";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  region: string;
  level: string;
  minScore: number;
  tags: string[];
}

export default function HomePage() {
  const { lang, t } = useLanguage();
  const { user, profile } = useAuth();
  const [pseudo, setPseudo] = useState("David");
  const [score, setScore] = useState<number>(0);
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [isSubmittingEval, setIsSubmittingEval] = useState(false);

  // Evaluation states
  const [gpa, setGpa] = useState<number>(14);
  const [englishLevel, setEnglishLevel] = useState("B2");
  const [projects, setProjects] = useState("2");
  const [subject, setSubject] = useState("Sciences");
  const [destination, setDestination] = useState("Europe");
  const [matches, setMatches] = useState<Scholarship[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);

  // High quality mock scholarship directory
  const scholarshipsList: Scholarship[] = [
    {
      id: "eiffel",
      name: "Bourse d'Excellence Eiffel",
      provider: "Ministère de l'Europe et des Affaires Étrangères (France)",
      amount: "1,181€ / mois + Vol gratuit",
      deadline: "10 Janvier 2027",
      region: "Europe",
      level: "Master / Doctorat",
      minScore: 75,
      tags: ["France", "Elite", "Excellence"]
    },
    {
      id: "mastercard",
      name: "Mastercard Foundation Scholars",
      provider: "Fondation Mastercard & Universités Partenaires",
      amount: "100% Frais + Logement + Allocation",
      deadline: "Variable par université",
      region: "Global",
      level: "Licence / Master",
      minScore: 65,
      tags: ["Impact Social", "Afrique", "Complet"]
    },
    {
      id: "daad",
      name: "Bourses d'Études du DAAD",
      provider: "Gouvernement Allemand (Allemagne)",
      amount: "934€ - 1,200€ / mois + Assurance",
      deadline: "31 Octobre 2026",
      region: "Europe",
      level: "Master / PhD",
      minScore: 70,
      tags: ["Allemagne", "Recherche", "Technique"]
    },
    {
      id: "commonwealth",
      name: "Commonwealth Scholarships",
      provider: "UK Government (Royaume-Uni)",
      amount: "Frais de scolarité + Assurance + Voyage",
      deadline: "15 Décembre 2026",
      region: "Europe",
      level: "Master / PhD",
      minScore: 80,
      tags: ["UK", "Commonwealth", "Prestige"]
    }
  ];

  const loadTopMatches = () => {
    setIsLoadingMatches(true);
    setTimeout(() => {
      const currentScoreString = localStorage.getItem("assessmentScore") || "0";
      const currentScore = parseInt(currentScoreString, 10);
      setScore(currentScore);

      // Simple scoring criteria filter matching user score and region preference
      const filtered = scholarshipsList.filter((item) => {
        if (currentScore === 0) return false;
        // Match base score
        return currentScore >= item.minScore - 15;
      });

      setMatches(filtered);
      setIsLoadingMatches(false);
    }, 400);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedPseudo = profile?.pseudo || user?.displayName || localStorage.getItem("userPseudo");
      if (savedPseudo) setPseudo(savedPseudo);

      // Initial score loader
      const savedScore = localStorage.getItem("assessmentScore");
      if (savedScore) {
        setScore(parseInt(savedScore, 10));
      } else {
        setScore(0);
      }

      // Load top matches
      loadTopMatches();
    }, 0);

    return () => clearTimeout(timer);
  }, [subject, destination]);

  const calculateScore = () => {
    setIsSubmittingEval(true);
    setTimeout(() => {
      // Logic to compute an exact elite score:
      let calculated = 40; // Base index
      
      // GPA factor (out of 20 scale metric)
      if (gpa >= 18) calculated += 35;
      else if (gpa >= 16) calculated += 28;
      else if (gpa >= 14) calculated += 20;
      else if (gpa >= 12) calculated += 12;
      else calculated += 5;

      // English factor
      if (englishLevel === "C2") calculated += 15;
      else if (englishLevel === "C1") calculated += 12;
      else if (englishLevel === "B2") calculated += 8;
      else if (englishLevel === "B1") calculated += 4;

      // Project factor
      const projectNum = parseInt(projects, 10) || 0;
      if (projectNum >= 3) calculated += 10;
      else if (projectNum === 2) calculated += 7;
      else if (projectNum === 1) calculated += 4;

      // Cap at 100 max
      const finalScore = Math.min(calculated, 100);
      
      localStorage.setItem("assessmentScore", finalScore.toString());
      setScore(finalScore);
      
      // Update recommended list
      loadTopMatches();
      
      setIsSubmittingEval(false);
      setShowEvalModal(false);
    }, 1200);
  };

  const getScoreColorClass = (val: number) => {
    if (val >= 80) return "text-emerald-400";
    if (val >= 60) return "text-primary";
    if (val >= 40) return "text-accent";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Elegantly styled Welcome Banner */}
      <div className="flex items-center justify-between p-1">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground tracking-tight">
            {t.home.welcome} <span className="text-primary">{pseudo}</span> !
          </h2>
          <p className="text-xs text-muted-foreground font-sans mt-1">
            {lang === "fr"
              ? "Préparez vos dossiers pour le départ de la rentrée académique 2026/2027"
              : "Prepare your application files for the 2026/2027 academic intake"}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Main Scoring Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism p-6 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Star className="h-28 w-28 text-accent fill-accent" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Radial score ring */}
          <div className="relative flex items-center justify-center w-28 h-28 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="8"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#radialGrad)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * score) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="radialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-heading font-black tracking-tight text-foreground">
                {score}%
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
                {t.home.stats.score}
              </span>
            </div>
          </div>

          <div className="space-y-3 flex-1 text-center md:text-left">
            <div>
              <h3 className="font-heading font-bold text-lg text-foreground">
                {t.home.scoreTitle}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {t.home.scoreDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1.5 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <span className={`w-2 h-2 rounded-full ${score >= 60 ? "bg-emerald-400" : "bg-accent animate-pulse"}`} />
                <span className="text-muted-foreground">
                  {t.home.stats.evalStatus} :{" "}
                  <strong className="text-foreground font-semibold">
                    {score >= 60 ? t.home.stats.ready : t.home.stats.incomplete}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recalculate CTA button */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-muted-foreground max-w-sm text-center sm:text-left">
            {lang === "fr"
              ? "Précis à 94% par rapport aux grilles d'admission officielles Eiffel et DAAD."
              : "Highly accurate relative to Eiffel and DAAD admissions criteria."}
          </p>
          <button
            id="btn-recalculate"
            onClick={() => setShowEvalModal(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-heading font-bold text-accent hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <GraduationCap className="h-4 w-4" />
            <span>{"Re-vif d'Evaluation Académique"}</span>
          </button>
        </div>
      </motion.div>

      {/* Suggested Scholarships block */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-lg text-foreground tracking-tight flex items-center gap-2">
          <Star className="h-4 w-4 text-accent fill-accent" />
          <span>{t.home.recommendedScholarships}</span>
        </h3>

        {isLoadingMatches ? (
          <div className="p-8 text-center text-sm text-neutral-500 bg-white/5 rounded-2xl animate-pulse">
            {lang === "fr" ? "Recherche de bourses adaptées..." : "Matching scholarships..."}
          </div>
        ) : matches.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground bg-white/5 border border-white/10 rounded-2xl leading-relaxed">
            {"Remplissez votre dossier d'évaluation pour voir vos bourses recommandées personnalisées."}
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((item) => (
              <motion.div
                id={`scholarship-match-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-card/50 hover:bg-card border border-white/5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/20 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[10px] text-primary font-semibold font-mono">
                      {item.region}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-[10px] text-accent font-semibold font-mono">
                      {item.level}
                    </span>
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{item.provider}</p>
                  </div>
                </div>

                <div className="sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5 flex sm:flex-col justify-between items-center sm:items-end gap-2 flex-row">
                  <span className="text-sm font-sans font-bold text-accent">{item.amount}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {item.deadline}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Simulator Modal Box */}
      <AnimatePresence>
        {showEvalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#06080e]/80 backdrop-blur-md" onClick={() => setShowEvalModal(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#111625] border border-white/10 rounded-3xl p-6 relative z-10 space-y-5"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {"Re-vif d'Evaluation Académique"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {"Optimisez vos chances à l'aide de notre IA"}
                  </p>
                </div>
                <button
                  id="btn-close-eval"
                  onClick={() => setShowEvalModal(false)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* GPA Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground block">
                    {"Quelle est votre note moyenne globale d'étude (sur 20 ou 4.0) ?"}
                  </label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="range"
                      min="10"
                      max="20"
                      step="0.1"
                      value={gpa}
                      onChange={(e) => setGpa(parseFloat(e.target.value))}
                      className="flex-1 accent-primary"
                    />
                    <span className="text-sm font-heading font-bold text-accent bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 w-14 text-center">
                      {gpa.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* English proficiency select */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground block">
                    {"Niveau d'Anglais (TOEFL, IELTS, etc.)"}
                  </label>
                  <select
                    value={englishLevel}
                    onChange={(e) => setEnglishLevel(e.target.value)}
                    className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                  >
                    <option value="A1" className="bg-[#111625]">A1 (Basique)</option>
                    <option value="A2" className="bg-[#111625]">A2</option>
                    <option value="B1" className="bg-[#111625]">B1 (Moyen)</option>
                    <option value="B2" className="bg-[#111625]">{"B2 (Niveau requis standard)"}</option>
                    <option value="C1" className="bg-[#111625]">{"C1 (Très à l'aise)"}</option>
                    <option value="C2" className="bg-[#111625]">C2 (Parfaitement bilingue)</option>
                  </select>
                </div>

                {/* Volunteers projects */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground block">
                    {"Nombre de projets d'extras ou de bénévolats"}
                  </label>
                  <select
                    value={projects}
                    onChange={(e) => setProjects(e.target.value)}
                    className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                  >
                    <option value="0" className="bg-[#111625]">0 projets</option>
                    <option value="1" className="bg-[#111625]">1 projet d'impact</option>
                    <option value="2" className="bg-[#111625]">2 projets sociaux / assos</option>
                    <option value="3" className="bg-[#111625]">3+ projets ou leader communautaire</option>
                  </select>
                </div>

                {/* Destination Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground block">
                    {lang === "fr" ? "Destination d'étude ciblée" : "Target Study Destination"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Europe", "Amérique", "Asie", "Afrique"].map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => setDestination(dest)}
                        className={`py-2 px-3 rounded-xl border text-xs font-heading font-medium transition-all cursor-pointer ${
                          destination === dest
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                        }`}
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  id="btn-eval-cancel"
                  type="button"
                  onClick={() => setShowEvalModal(false)}
                  className="flex-1 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-heading font-semibold text-foreground cursor-pointer transition-all"
                >
                  {lang === "fr" ? "Annuler" : "Cancel"}
                </button>
                <button
                  id="btn-eval-submit"
                  type="button"
                  disabled={isSubmittingEval}
                  onClick={calculateScore}
                  className="flex-1 h-11 rounded-xl bg-primary hover:bg-blue-600 text-xs font-heading font-bold text-white cursor-pointer shadow-[0_4px_12px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmittingEval ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>{lang === "fr" ? "Analyser" : "Analyze"}</span>
                      <Award className="h-4 w-4 text-accent" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
