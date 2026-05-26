<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

Ce projet est une application Next.js avec authentification Firebase et assistant IA Gemini.

## Prérequis

- Node.js
- Un projet Firebase configuré pour l'authentification Email/Password et Google
- Une clé Gemini API pour l'assistant IA

## Run Locally

1. Installez les dépendances :
   `npm install`
2. Copiez `.env.example` vers `.env.local` et ajoutez vos secrets :
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
   - `GEMINI_API_KEY`
3. Démarrez l'application :
   `npm run dev`

## Notes

- L'authentification est maintenant gérée par Firebase.
- L'IA Gemini utilise `GEMINI_API_KEY` côté serveur.
- Pour la V1 fonctionnelle, il reste à connecter les bourses en temps réel, ajouter Supabase si vous souhaitez utiliser Supabase pour les données et compléter les liens de candidature.
