import { useState, useEffect } from "react";
import { translations, Language } from "@/lib/i18n";

export function useLanguage() {
  const [lang, setLang] = useState<Language>("fr");

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as Language;
    if (savedLang === "fr" || savedLang === "en") {
      setLang(savedLang);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
    // Dispatch custom event to sync with other hooks/components
    window.dispatchEvent(new Event("language_change"));
  };

  useEffect(() => {
    const handleLangSync = () => {
      const current = localStorage.getItem("app_lang") as Language;
      if (current && current !== lang) {
        setLang(current);
      }
    };

    window.addEventListener("language_change", handleLangSync);
    return () => window.removeEventListener("language_change", handleLangSync);
  }, [lang]);

  const t = translations[lang];

  return {
    lang,
    setLang: changeLanguage,
    t,
  };
}
