"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Logo } from "@/components/ui/logo";
import { Mail, Lock, User, Globe, Award, Sparkles, Languages } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";

export default function RegisterPage() {
  const router = useRouter();
  const { t, lang, setLang } = useLanguage();
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [level, setLevel] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!pseudo || !email || !password || !confirmPassword) {
      setError(lang === "fr" ? "Veuillez remplir tous les champs obligatoires." : "Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError(lang === "fr" ? "Les mots de passe ne correspondent pas." : "Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError(lang === "fr" ? "Le mot de passe doit contenir au moins 6 caractères." : "Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(result.user, {
        displayName: pseudo,
      });

      const userRef = doc(db, "users", result.user.uid);
      await setDoc(userRef, {
        uid: result.user.uid,
        email,
        pseudo,
        studyLevel: level || "Licence",
        desiredDestination: destination || "France",
        academicScore: 0,
        profileCompletion: 20,
        createdAt: new Date().toISOString(),
      });

      router.push("/home");
    } catch (err: any) {
      const errorMap: { [key: string]: string } = {
        "auth/email-already-in-use": lang === "fr" ? "Cet email est déjà utilisé." : "This email is already in use.",
        "auth/invalid-email": lang === "fr" ? "Email invalide." : "Invalid email address.",
        "auth/weak-password": lang === "fr" ? "Le mot de passe est trop faible." : "The password is too weak.",
      };
      setError(errorMap[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-foreground transition-all duration-300"
        >
          <Languages className="w-3.5 h-3.5 text-accent" />
          <span>{lang === "fr" ? "English" : "Français"}</span>
        </button>
      </div>

      <div className="w-full max-w-lg z-10 my-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glassmorphism p-8 md:p-10 rounded-3xl text-center"
        >
          <Logo className="w-16 h-16 mx-auto mb-6" />
          
          <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight mb-2">
            {t.auth.registerTitle}
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
            {t.auth.registerSubtitle}
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="text-left space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1 block mb-2">
                  {t.auth.pseudo}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="David Mensah"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-md text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1 block mb-2">
                  {t.auth.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="david@excellence.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-md text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1 block mb-2">
                  {lang === "fr" ? "Niveau d'étude" : "Current Level"}
                </label>
                <div className="relative">
                  <Award className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-md text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#151c2c]">
                      {lang === "fr" ? "Sélectionnez..." : "Select..."}
                    </option>
                    <option value="Baccalauréat" className="bg-[#151c2c]">Baccalauréat</option>
                    <option value="Licence 1" className="bg-[#151c2c]">Licence 1</option>
                    <option value="Licence 2" className="bg-[#151c2c]">Licence 2</option>
                    <option value="Licence 3 / Bachelor" className="bg-[#151c2c]">Licence 3 / Bachelor</option>
                    <option value="Master 1" className="bg-[#151c2c]">Master 1</option>
                    <option value="Master 2" className="bg-[#151c2c]">Master 2 / Ingénieur</option>
                    <option value="Doctorat" className="bg-[#151c2c]">Doctorat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1 block mb-2">
                  {lang === "fr" ? "Destination souhaitée" : "Desired Destination"}
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-md text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#151c2c]">
                      {lang === "fr" ? "Sélectionnez..." : "Select..."}
                    </option>
                    <option value="Europe" className="bg-[#151c2c]">Europe (France, Allemagne, Belgique, etc.)</option>
                    <option value="Amérique" className="bg-[#151c2c]">Amérique du Nord (Canada, USA)</option>
                    <option value="Asie" className="bg-[#151c2c]">Asie (Chine, Japon, Corée)</option>
                    <option value="Afrique" className="bg-[#151c2c]">Afrique (Sénégal, Côte d'Ivoire, Maroc)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1 block mb-2">
                {t.auth.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-md text-sm"
                />
              </div>
            </div>

            <button
              id="btn-register"
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-heading font-semibold rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all mt-6 active:scale-[0.98]"
            >
              <span>{t.auth.signUp}</span>
              <Sparkles className="w-4 h-4 text-accent" strokeWidth={2.5} />
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            {t.auth.hasAccount}{" "}
            <Link
              href="/auth"
              className="text-primary hover:underline font-semibold"
            >
              {t.auth.signIn}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
