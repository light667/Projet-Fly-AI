import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Brain,
  Target,
  FileText,
  TrendingUp,
  Globe,
  Smartphone,
  Zap,
  Shield,
  ArrowRight,
  Mail,
  Linkedin,
  Check,
} from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Fly AI — L'IA qui propulse les étudiants africains vers les bourses" },
      {
        name: "description",
        content:
          "Fly AI est la plateforme IA mobile-first qui aide les étudiants africains à trouver des bourses, améliorer leurs candidatures et décrocher leur avenir académique.",
      },
      { property: "og:title", content: "Fly AI — Propulsez votre avenir académique" },
      { property: "og:description", content: "IA dédiée aux bourses pour étudiants africains." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const FORMSPREE = "https://formspree.io/f/xkoeqaar";

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Why />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav className="max-w-6xl mx-auto glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="Fly AI" className="h-9 w-9 rounded-xl shadow-glow" />
          <span className="font-display font-bold text-lg">Fly AI</span>
        </a>
        <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Fonctionnalités</a>
          <a href="#how" className="hover:text-foreground transition">Comment ça marche</a>
          <a href="#why" className="hover:text-foreground transition">Pourquoi Fly AI</a>
          <a href="#contact" className="hover:text-foreground transition">Contact</a>
        </div>
        <a
          href="#contact"
          className="gradient-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 transition shadow-glow"
        >
          Nous contacter
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-24 px-4 bg-hero-glow">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-8 animate-fade-up">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          <span>Plateforme IA pour les bourses académiques africaines</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Propulsez votre avenir <br />
          avec <span className="gradient-text">Fly AI</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          L'intelligence artificielle qui aide les étudiants africains à trouver les bonnes bourses,
          construire des candidatures gagnantes et décrocher leur place dans les meilleures universités.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a href="#contact" className="gradient-primary text-primary-foreground font-medium px-6 py-3.5 rounded-xl hover:opacity-90 transition shadow-glow inline-flex items-center justify-center gap-2">
            Rejoindre l'aventure <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#features" className="glass font-medium px-6 py-3.5 rounded-xl hover:bg-muted/50 transition">
            Découvrir la plateforme
          </a>
        </div>

        <div className="relative mx-auto max-w-sm animate-float">
          <div className="absolute inset-0 gradient-primary blur-3xl opacity-40 rounded-full" />
          <img src={logo} alt="Fly AI logo" className="relative w-48 h-48 mx-auto rounded-[2rem] animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "1000+", label: "Bourses référencées" },
    { value: "54", label: "Pays africains ciblés" },
    { value: "24/7", label: "Assistant IA disponible" },
    { value: "100%", label: "Mobile-first" },
  ];
  return (
    <section className="px-4 py-16 border-y border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Target, title: "Bourses adaptées", desc: "Des recommandations personnalisées selon votre profil académique, vos langues et vos ambitions." },
    { icon: Brain, title: "Score IA personnalisé", desc: "Évaluez la force de votre dossier et identifiez les axes d'amélioration en temps réel." },
    { icon: FileText, title: "Lettres de motivation", desc: "Générez des lettres percutantes, adaptées à chaque bourse, en quelques secondes." },
    { icon: TrendingUp, title: "Suivi des candidatures", desc: "Gardez le contrôle sur vos deadlines, statuts et prochaines étapes." },
    { icon: Sparkles, title: "Assistant IA 24/7", desc: "Un coach intelligent qui répond à vos questions sur les bourses, visas et procédures." },
    { icon: Smartphone, title: "Expérience premium", desc: "Une app pensée mobile-first, fluide, rapide, optimisée pour les connexions africaines." },
  ];
  return (
    <section id="features" className="px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-sm text-secondary font-medium mb-3 uppercase tracking-wider">Fonctionnalités</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Tout ce qu'il faut pour <span className="gradient-text">décrocher votre bourse</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fly AI combine intelligence artificielle de pointe et expertise des bourses pour vous accompagner à chaque étape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.title} className="glass rounded-2xl p-6 shadow-card hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:shadow-glow transition">
                <it.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Créez votre profil", desc: "Renseignez votre parcours académique, vos langues et vos objectifs en quelques minutes." },
    { n: "02", title: "Obtenez votre score IA", desc: "Notre intelligence artificielle analyse votre profil et révèle votre potentiel réel." },
    { n: "03", title: "Recevez des bourses", desc: "Découvrez les opportunités les plus compatibles, classées par pertinence et urgence." },
    { n: "04", title: "Candidatez avec l'IA", desc: "Générez vos lettres, suivez vos candidatures et décrochez votre place." },
  ];
  return (
    <section id="how" className="px-4 py-24 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-sm text-secondary font-medium mb-3 uppercase tracking-wider">Comment ça marche</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            De votre profil à votre <span className="gradient-text">bourse rêvée</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="relative glass rounded-2xl p-6">
              <div className="font-display text-5xl font-bold gradient-text mb-4">{s.n}</div>
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const points = [
    { icon: Globe, title: "Pensé pour l'Afrique", desc: "Optimisé pour les connexions lentes, conçu pour les étudiants du continent." },
    { icon: Zap, title: "Rapide et fluide", desc: "Une expérience premium, sans friction, sur mobile comme sur desktop." },
    { icon: Shield, title: "Données protégées", desc: "Vos informations restent confidentielles et sécurisées à chaque étape." },
  ];
  return (
    <section id="why" className="px-4 py-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-sm text-secondary font-medium mb-3 uppercase tracking-wider">Pourquoi Fly AI</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Une mission claire : <span className="gradient-text">démocratiser l'accès aux bourses</span>
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Chaque année, des milliers d'étudiants africains brillants passent à côté de bourses faute d'information,
            d'accompagnement ou d'outils adaptés. Fly AI change la donne.
          </p>
          <ul className="space-y-3">
            {["Bourses internationales en un clic", "Coaching IA personnalisé", "Accompagnement de A à Z"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          {points.map((p) => (
            <div key={p.title} className="glass rounded-2xl p-6 flex gap-4 hover:translate-x-1 transition">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                <p.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-4 py-24 bg-hero-glow">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm text-secondary font-medium mb-3 uppercase tracking-wider">Contact</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Travaillons <span className="gradient-text">ensemble</span>
          </h2>
          <p className="text-muted-foreground">
            Partenariat, collaboration, presse, ou simplement curieux : écrivez-nous.
          </p>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-8 space-y-4 shadow-card">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              required name="name" placeholder="Votre nom" maxLength={100}
              className="bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
            <input
              required type="email" name="email" placeholder="Votre email" maxLength={255}
              className="bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
          </div>
          <input
            name="subject" placeholder="Sujet" maxLength={150}
            className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
          <textarea
            required name="message" placeholder="Votre message..." rows={5} maxLength={2000}
            className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
          />
          <button
            type="submit" disabled={status === "loading"}
            className="w-full gradient-primary text-primary-foreground font-medium px-6 py-3.5 rounded-xl hover:opacity-90 transition shadow-glow inline-flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {status === "loading" ? "Envoi..." : status === "sent" ? "Message envoyé ✓" : "Envoyer le message"}
            {status === "idle" && <ArrowRight className="h-4 w-4" />}
          </button>
          {status === "error" && (
            <p className="text-sm text-destructive text-center">Erreur lors de l'envoi. Réessayez ou écrivez-nous directement.</p>
          )}
        </form>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a href="mailto:nethaniahdjossou@gmail.com" className="glass rounded-xl px-5 py-3 inline-flex items-center gap-2 text-sm hover:bg-muted/40 transition">
            <Mail className="h-4 w-4 text-secondary" /> nethaniahdjossou@gmail.com
          </a>
          <a href="https://www.linkedin.com/company/flyai-org/" target="_blank" rel="noreferrer" className="glass rounded-xl px-5 py-3 inline-flex items-center gap-2 text-sm hover:bg-muted/40 transition">
            <Linkedin className="h-4 w-4 text-secondary" /> LinkedIn Fly AI
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 py-12 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Fly AI" className="h-8 w-8 rounded-lg" />
          <div>
            <div className="font-display font-bold">Fly AI</div>
            <div className="text-xs text-muted-foreground">Propulsez votre avenir académique</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Fly AI. Tous droits réservés.
        </div>
        <div className="flex items-center gap-3">
          <a href="mailto:nethaniahdjossou@gmail.com" className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-muted/40 transition">
            <Mail className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com/company/flyai-org/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-muted/40 transition">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
