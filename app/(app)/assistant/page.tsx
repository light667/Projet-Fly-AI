"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, FileText, Printer, Copy, RefreshCw, MessageSquare, Check, BrainCircuit } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface Message {
  role: "assistant" | "user";
  text: string;
}

export default function AssistantPage() {
  const { lang, t } = useLanguage();
  const [pseudo, setPseudo] = useState("David");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // A4 Document Preview State
  const [activeDocument, setActiveDocument] = useState<string | null>(null);
  const [docType, setDocType] = useState<"cv" | "cl" | null>(null);
  const [copied, setCopied] = useState(false);
  
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedPseudo = localStorage.getItem("userPseudo");
      if (savedPseudo) setPseudo(savedPseudo);
      
      setMessages([
        {
          role: "assistant",
          text: t.assistant.greeting.replace("{pseudo}", savedPseudo || "David")
        }
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, [t.assistant.greeting]);

  useEffect(() => {
    bottomScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendQueryToAI = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Append user message
    const newMessages = [...messages, { role: "user" as const, text: textToSend }];
    setMessages(newMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      
      if (data.text) {
        setMessages((prev) => [...prev, { role: "assistant", text: data.text }]);
        
        // Detect if the result looks like a document to display in the A4 Board
        if (data.text.includes("#") || data.text.includes("CV") || data.text.includes("Motivation") || data.text.length > 500) {
          setActiveDocument(data.text);
          if (textToSend.toLowerCase().includes("cv")) {
            setDocType("cv");
          } else {
            setDocType("cl");
          }
        }
      } else {
        throw new Error(data.error || "No response received");
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: lang === "fr" 
            ? "Désolé, une erreur technique est survenue lors de la connexion à Fly AI. Vérifiez votre clé d'API."
            : "Apologies, a technical issue occurred while reaching Fly AI. Please verify your API Key setup."
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendQueryToAI(input);
  };

  const triggerQuickDoc = (type: "cv" | "cl") => {
    const prompt = type === "cv"
      ? `Bonjour Fly AI, rédige-moi un CV académique d'élite entièrement structuré en Markdown. Mon niveau d'étude actuel est ${localStorage.getItem("userLevel") || "Licence 3"}, et je vise une bourse en ${localStorage.getItem("userDestination") || "Europe"}.`
      : `Bonjour Fly AI, rédige-moi une Lettre de Motivation percutante pour postuler à une grande bourse internationale (par exemple, la bourse Eiffel ou Mastercard Foundation). Mon pseudo est ${pseudo}.`;
    
    sendQueryToAI(prompt);
  };

  const copyDocToClipboard = () => {
    if (!activeDocument) return;
    navigator.clipboard.writeText(activeDocument);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-heading font-bold text-foreground tracking-tight flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-accent" />
          <span>{t.assistant.title}</span>
        </h2>
        <p className="text-xs text-muted-foreground">
          {t.assistant.subtitle}
        </p>
      </div>

      {/* Main chat interface grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Active chat log */}
        <div className="glassmorphism rounded-3xl flex flex-col h-[400px] overflow-hidden">
          {/* Scroll container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                {/* Profile indicator */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                  msg.role === "assistant" 
                    ? "bg-gradient-to-tr from-primary to-accent text-background" 
                    : "bg-white/10 text-white"
                }`}>
                  {msg.role === "assistant" ? "AI" : "ME"}
                </div>

                <div className={`p-4 rounded-2xl leading-relaxed whitespace-pre-line ${
                  msg.role === "user" 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white/5 border border-white/5 text-slate-100 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent text-background flex items-center justify-center text-[10px] font-bold animate-spin" />
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-muted-foreground text-xs italic flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                  <span>Fly AI prépare votre dossier...</span>
                </div>
              </div>
            )}
            <div ref={bottomScrollRef} />
          </div>

          {/* Quick Triggers Rail */}
          <div className="px-6 py-3 border-t border-white/5 bg-[#0e1423]/50 flex gap-2 flex-wrap sm:flex-nowrap">
            <button
              id="btn-quick-cv"
              onClick={() => triggerQuickDoc("cv")}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-[11px] font-heading font-medium text-foreground flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5 text-primary" />
              <span>{t.assistant.actions.cv}</span>
            </button>
            <button
              id="btn-quick-cl"
              onClick={() => triggerQuickDoc("cl")}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-[11px] font-heading font-medium text-foreground flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>{t.assistant.actions.cl}</span>
            </button>
          </div>

          {/* Input text send line */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/5 flex gap-2">
            <input
              type="text"
              placeholder={t.assistant.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-md"
            />
            <button
              id="btn-send-message"
              type="submit"
              disabled={isSending || !input.trim()}
              className="w-12 h-12 rounded-xl bg-primary hover:bg-blue-600 text-white flex items-center justify-center shadow-[0_2px_10px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Dynamic A4 Document Mock-up panel */}
        <AnimatePresence>
          {activeDocument && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-3"
            >
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-accent flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  <span>
                    {docType === "cv" 
                      ? "CURRICULUM VITAE ACADÉMIQUE D'ÉLITE" 
                      : "LETTRE DE MOTIVATION PROFESSIONNELLE"}
                  </span>
                </span>
                <div className="flex gap-2">
                  <button
                    id="btn-doc-copy"
                    onClick={copyDocToClipboard}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-muted-foreground hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                  <button
                    id="btn-doc-print"
                    onClick={() => {
                      if (typeof window !== "undefined") window.print();
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-muted-foreground hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Imprimer / PDF</span>
                  </button>
                </div>
              </div>

              {/* Royal Standard Mockup A4 paper sheet background styling */}
              <div className="p-8 sm:p-12 bg-white text-slate-800 rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] border-4 border-slate-300 relative font-serif max-h-[600px] overflow-y-auto selection:bg-amber-100">
                {/* Official seal decoration inside watermarks */}
                <div className="absolute top-8 right-8 text-neutral-300 select-none pointer-events-none">
                  <div className="text-right uppercase text-[9px] tracking-widest font-sans font-bold text-neutral-400">
                    Officiel • Certifié
                  </div>
                  <div className="text-[8px] font-sans text-neutral-400">
                    ID: FLY-SCHOL-{pseudo.toUpperCase().slice(0, 4)}
                  </div>
                </div>

                <div className="space-y-6 prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed">
                  {/* Clean rendered text */}
                  <div className="whitespace-pre-line font-serif text-slate-900 leading-relaxed font-normal">
                    {activeDocument}
                  </div>
                </div>

                {/* Footnotes and security credentials */}
                <div className="border-t border-neutral-200 pt-6 mt-12 text-[10px] text-center text-neutral-400 font-sans tracking-tight">
                  {"Document généré de manière sécurisée par l'intelligence artificielle Fly AI"}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
