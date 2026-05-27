export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      explorer: "Explorer",
      assistant: "Assistant IA",
      applications: "Mes Candidatures",
      profile: "Mon Profil",
      settings: "Paramètres"
    },
    auth: {
      loginTitle: "Rejoignez l'élite",
      loginSubtitle: "Connectez-vous pour propulser votre carrière académique.",
      registerTitle: "Créez votre profil d'excellence",
      registerSubtitle: "Fly AI vous aide à décrocher les plus grandes bourses d'études mondiales.",
      pseudo: "Pseudo / Nom complet",
      studyLevel: "Niveau d'étude actuel",
      desiredDestination: "Destination souhaitée",
      email: "Adresse e-mail",
      password: "Mot de passe",
      signIn: "Se connecter",
      signUp: "S'inscrire",
      noAccount: "Vous n'avez pas de compte ?",
      hasAccount: "Vous avez déjà un compte ?"
    },
    home: {
      welcome: "Bienvenue,",
      scoreTitle: "Votre Score d'Établissement & Éligibilité académique",
      scoreDesc: "Optimisez vos chances de bourses à l'aide de notre simulateur d'évaluation.",
      recalculate: "Simuler mon dossier d'excellence",
      recommendedScholarships: "Vos bourses hautement recommandées",
      emptyScholarships: "Remplissez votre dossier d'évaluation pour voir vos bourses recommandées personnalisées.",
      stats: {
        score: "Score d'Élite",
        evalStatus: "Statut d'évaluation",
        ready: "Prêt à soumettre",
        incomplete: "Dossier incomplet"
      }
    },
    explorer: {
      title: "Explorateur de bourses",
      subtitle: "Parcourez des bourses d'élite sélectionnées pour les talents africains.",
      searchPlaceholder: "Rechercher par université, pays ou mot-clé...",
      allZones: "Toutes les destinations",
      allLevels: "Tous les niveaux",
      empty: "Aucune bourse trouvée pour cette recherche.",
      emptySub: "Essayez d'autres mots-clés ou modifiez les filtres de pays/niveau.",
      eligibility: "Critères d'Éligibilité",
      admissionLevel: "Niveau d'admission",
      studyZone: "Zone / Pays d'étude",
      apply: "Postuler (Site officiel)"
    },
    assistant: {
      title: "Conseiller de candidature IA",
      subtitle: "Générez d'élégants CV académiques et lettres de motivation optimisés pour DAAD, Mastercard et Eiffel.",
      greeting: "Bonjour {pseudo} ! Je suis Fly AI, votre coach académique d'élite. Quel document souhaitez-vous préparer aujourd'hui ? Je peux générer pour vous une Lettre de Motivation professionnelle ou un CV structuré.",
      placeholder: "Décrivez vos ambitions ou posez une question...",
      send: "Envoyer",
      actions: {
        cv: "Générer un CV académique d'élite",
        cl: "Générer une Lettre de Motivation"
      },
      documentSecured: "Document généré de manière sécurisée par l'intelligence artificielle Fly AI"
    },
    profile: {
      title: "Profil d'excellence",
      subtitle: "Gérez vos informations de parcours et vos documents.",
      level: "Abonnement",
      academicDetails: "Détails Académiques",
      logout: "Se déconnecter",
      unlimited: "Plan Illimité / Membre Élite"
    }
  },
  en: {
    nav: {
      home: "Home",
      explorer: "Explore",
      assistant: "AI Assistant",
      applications: "Applications",
      profile: "Profile",
      settings: "Settings"
    },
    auth: {
      loginTitle: "Join the Elite",
      loginSubtitle: "Log in to accelerate your academic career.",
      registerTitle: "Create your profile of excellence",
      registerSubtitle: "Fly AI helps you secure the world's most prestigious scholarships.",
      pseudo: "Username / Full Name",
      studyLevel: "Current Study Level",
      desiredDestination: "Desired Destination",
      email: "Email Address",
      password: "Password",
      signIn: "Sign In",
      signUp: "Register",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?"
    },
    home: {
      welcome: "Welcome,",
      scoreTitle: "Your Eligibility & Profile Strength Score",
      scoreDesc: "Evaluate and enhance your scholarship profile using our simulation model.",
      recalculate: "Evaluate my Academic Profile",
      recommendedScholarships: "Highly recommended scholarships for you",
      emptyScholarships: "Complete your evaluation files to see custom recommended scholarships.",
      stats: {
        score: "Elite Score",
        evalStatus: "Evaluation status",
        ready: "Ready for submission",
        incomplete: "Incomplete Profile"
      }
    },
    explorer: {
      title: "Scholarship Explorer",
      subtitle: "Browse elite scholarships curated for outstanding African talent.",
      searchPlaceholder: "Search by university, country, or keyword...",
      allZones: "All Destinations",
      allLevels: "All Levels",
      empty: "No scholarships found matching this query.",
      emptySub: "Try using different keywords or filter combinations.",
      eligibility: "Eligibility Requirements",
      admissionLevel: "Admission Level",
      studyZone: "Study Zone / Country",
      apply: "Apply (Official Website)"
    },
    assistant: {
      title: "AI Academic Coach",
      subtitle: "Generate elegant academic CVs and motivation letters tailored for DAAD, Mastercard Foundation, and Eiffel.",
      greeting: "Hello {pseudo}! I am Fly AI, your elite academic advisor. What document would you like to build today? I can format a beautiful professional Curriculum Vitae or a tailored Motivation Letter.",
      placeholder: "Type details about your background or ask a question...",
      send: "Send",
      actions: {
        cv: "Generate Elite Academic CV",
        cl: "Generate Motivation Letter"
      },
      documentSecured: "Document securely compiled by Fly AI Intelligence"
    },
    profile: {
      title: "Academic Excellence Profile",
      subtitle: "Manage your academic progress and generated materials.",
      level: "Membership Level",
      academicDetails: "Academic Credentials",
      logout: "Sign Out",
      unlimited: "Unlimited Plan / Elite Scholar"
    }
  }
};

export type Language = "fr" | "en";
