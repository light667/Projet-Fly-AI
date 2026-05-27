# 🚀 FLY AI — MASTER PROMPT V2
## Plateforme IA mobile-first pour les bourses académiques africaines

---

# OBJECTIF GLOBAL

Construire une plateforme moderne nommée Fly AI.

Fly AI est une application IA mobile-first destinée aux étudiants africains.
La plateforme aide les utilisateurs à :
- trouver des bourses adaptées à leur profil,
- améliorer leurs candidatures,
- obtenir un score IA personnalisé,
- générer des lettres de motivation,
- suivre leurs candidatures.

L'application doit être conçue dès le départ comme :
- une Progressive Web App moderne,
- une future application Android/iOS,
- un produit premium,
- une expérience immersive.

Le produit ne doit PAS ressembler à un site vitrine classique.

L'expérience utilisateur doit immédiatement donner l'impression d'utiliser une vraie application mobile premium.

Inspirations UX/UI :
- ChatGPT
- Duolingo
- Revolut
- Notion
- Discord
- Linear
- Spotify
- LinkedIn mobile

---

# OBJECTIFS STRATÉGIQUES

## Objectifs produit

Créer une plateforme :
- rapide,
- élégante,
- moderne,
- fluide,
- émotionnellement engageante,
- adaptée aux connexions lentes africaines.

## Objectifs techniques

Créer une architecture :
- scalable,
- propre,
- maintenable,
- API-first,
- mobile-first,
- facilement portable vers Android plus tard.

## Objectifs business

Le produit doit être :
- prêt pour le TCR 2026,
- prêt à impressionner un jury,
- prêt à accueillir des utilisateurs réels,
- monétisable.

---

# ARCHITECTURE GÉNÉRALE

## STACK PRINCIPALE

### Frontend
- Next.js 14 App Router
- TypeScript strict
- Tailwind CSS
- Framer Motion
- shadcn/ui
- Zustand
- React Query
- React Hook Form
- Zod

### Backend
- Next.js API Routes
- Supabase PostgreSQL
- Prisma ORM
- Supabase Auth
- Supabase Storage

### IA
- Claude API
- Embeddings OpenAI
- pgvector

### Déploiement
- Vercel
- PWA activée
- Analytics
- Sentry

---

# STRATÉGIE WEB + MOBILE

## Vision produit

La plateforme doit être conçue dès le départ comme une application hybride.

Le web doit déjà ressembler à une application Android premium.

La future migration vers Android doit être simple.

Le frontend doit être compatible avec :
- Capacitor,
- TWA,
- React Native futur.

---

# FLOW UTILISATEUR PRINCIPAL

L'application doit suivre ce flow :

Splash Screen
↓
Onboarding
↓
Authentification
↓
Dashboard principal
↓
Fonctionnalités IA

Aucune landing page marketing ne doit bloquer l'accès principal à l'application.

---

# SPLASH SCREEN

Créer un splash screen moderne.

Contenu :
- logo Fly AI animé,
- animation fluide,
- fond premium,
- effet moderne.

Durée maximale :
- 1.5s à 3s.

Le splash screen doit donner immédiatement une impression :
- premium,
- moderne,
- technologique.

---

# ONBOARDING

## Objectif

Créer un onboarding émotionnel et engageant.

Le flow doit être rapide.

Maximum :
- 3 à 5 écrans.

Inspirations :
- Duolingo,
- Revolut,
- Spotify,
- TikTok onboarding.

## Structure

### Écran 1
Présentation du produit.

### Écran 2
Explication du score IA.

### Écran 3
Explication des recommandations de bourses.

### Écran 4
Explication de l'assistant IA.

### Écran 5
Call to action.

---

# AUTHENTIFICATION

Fonctionnalités :
- connexion email,
- connexion Google,
- création de compte,
- reset password.

UX :
- simple,
- rapide,
- moderne,
- mobile-first.

---

# STRUCTURE DE L'APPLICATION

## Navigation mobile

Utiliser une bottom navigation moderne.

Maximum 5 onglets.

Onglets :
- Home,
- Explorer,
- Assistant IA,
- Candidatures,
- Profil.

## Navigation desktop

Utiliser une sidebar moderne.

---

# DESIGN SYSTEM

## Style général

Le design doit être :
- futuriste,
- propre,
- minimaliste,
- premium,
- africain moderne.

## Couleurs

### Primary
- Bleu nuit
- Bleu électrique

### Accent
- Or
- Vert succès

### Background
- Dark mode moderne

---

# RÈGLES UX OBLIGATOIRES

TOUJOURS :

- Mobile-first
- Responsive parfait
- Animations fluides
- Skeleton loaders
- États de chargement élégants
- Gestes mobiles naturels
- Scroll fluide
- Transitions rapides
- Interface immersive
- Cartes modernes
- Ombres douces
- Typographie premium

JAMAIS :

- Site vitrine classique
- Interface vieillotte
- Navbar lourde sur mobile
- Écrans vides
- Trop de texte
- Pages statiques fades

---

# DASHBOARD PRINCIPAL

Le dashboard doit être immersif.

## Sections principales

### Score IA
Afficher :
- score global,
- progression,
- animation.

### Recommandations
Afficher :
- bourses compatibles,
- pourcentage de compatibilité,
- urgence deadlines.

### Progression profil
Afficher :
- niveau de complétion,
- éléments manquants.

### Actions rapides
Boutons rapides :
- générer lettre,
- explorer bourses,
- améliorer score.

---

# SCORE IA

## Objectif

Le score IA doit être la fonctionnalité signature.

## Critères

Le score doit analyser :
- niveau académique,
- langues,
- expériences,
- projets,
- leadership,
- qualité du dossier.

## Résultat

Afficher :
- score global,
- breakdown détaillé,
- points forts,
- recommandations.

---

# ASSISTANT IA

## Fonctionnalités

L'assistant IA doit pouvoir :
- rédiger des lettres,
- analyser une bourse,
- donner des conseils,
- préparer des entretiens.

## UX

Interface inspirée de ChatGPT.

Support :
- streaming,
- historique,
- pièces jointes,
- génération PDF.

---

# EXPLORATEUR DE BOURSES

## Fonctionnalités

Permettre :
- recherche,
- filtres,
- sauvegarde,
- tri IA.

## Cartes

Chaque carte doit afficher :
- titre,
- pays,
- montant,
- compatibilité,
- deadline.

---

# SUIVI DE CANDIDATURES

Créer un système type Kanban.

Colonnes :
- préparation,
- soumise,
- attente,
- acceptée,
- refusée.

---

# PWA

L'application doit fonctionner comme une vraie app mobile.

Fonctionnalités :
- installable,
- standalone,
- splash natif,
- icône,
- cache minimal,
- offline partiel.

---

# PERFORMANCE

Optimisations obligatoires :
- lazy loading,
- images WebP,
- code splitting,
- suspense,
- skeletons,
- optimisation mobile.

L'application doit être fluide même sur smartphone faible puissance.

---

# ACCESSIBILITÉ

Respecter :
- contrastes,
- aria labels,
- navigation clavier,
- responsive universel.

---

# STRUCTURE DES DOSSIERS

```txt
/app
/components
/lib
/hooks
/services
/store
/styles
/public
/prisma
```

---

# RÈGLES DE CODE

TOUJOURS :

- TypeScript strict
- composants propres
- architecture modulaire
- gestion erreurs
- loading states
- responsive mobile-first
- séparation logique/UI

JAMAIS :

- code spaghetti
- composants énormes
- clés API hardcodées
- console.log production

---

# SEO

Créer :
- metadata,
- OpenGraph,
- Twitter cards,
- sitemap,
- robots.txt.

---

# OBJECTIF FINAL UX

Quand un utilisateur ouvre Fly AI,
il doit immédiatement penser :

“Cette application est sérieuse, moderne, premium et professionnelle.”

Le produit doit inspirer :
- confiance,
- ambition,
- innovation,
- intelligence,
- modernité.

---

# MISSION DE L'AGENT

Tu es un ingénieur fullstack senior.

Tu dois construire Fly AI avec un niveau professionnel.

Chaque décision technique doit viser :
- la qualité,
- l'expérience utilisateur,
- la performance,
- la scalabilité.

Tu dois agir comme :
- un architecte logiciel,
- un expert mobile UX,
- un designer produit,
- un développeur SaaS senior.

Le résultat final doit être :
- prêt à être déployé,
- prêt à impressionner,
- prêt pour des utilisateurs réels,
- prêt pour le TCR 2026.

---

# FIN

Fly AI — construit pour l'Afrique.

