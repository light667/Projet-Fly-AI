"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Logo } from "@/components/ui/logo";
import { Mail, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if profile exists
      const profileRef = doc(db, "users", result.user.uid);
      const profileSnap = await getDoc(profileRef);
      
      if (profileSnap.exists()) {
        router.push("/home");
      } else {
        router.push("/auth/register");
      }
    } catch (err: any) {
      const errorMap: { [key: string]: string } = {
        "auth/invalid-credential": "Email ou mot de passe incorrect.",
        "auth/user-not-found": "Cet email n'existe pas.",
        "auth/wrong-password": "Mot de passe incorrect.",
      };
      setError(errorMap[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if profile exists
      const profileRef = doc(db, "users", result.user.uid);
      const profileSnap = await getDoc(profileRef);
      
      if (profileSnap.exists()) {
        router.push("/home");
      } else {
        router.push("/auth/register");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1424] via-[#1a1f3a] to-[#0d1424] flex flex-col items-center justify-center p-6">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-4">
          <Logo className="w-16 h-16" />
          <h1 className="text-3xl font-heading font-bold text-white text-center">
            Fly AI
          </h1>
          <p className="text-muted-foreground text-center">
            L'Excellence Académique Africaine
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Adresse e-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="vous@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-accent font-semibold text-background hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Connexion..." : "Se connecter"}
            {!loading && <Sparkles className="w-4 h-4" />}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-muted-foreground text-sm">ou</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 px-4 rounded-lg border border-white/10 hover:bg-white/5 font-semibold text-foreground transition-all disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Continuer avec Google"}
        </button>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm">
          Pas de compte ?{" "}
          <Link href="/auth/register" className="text-primary hover:underline font-semibold">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
