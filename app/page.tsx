"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Logo } from "@/components/ui/logo";

export default function RootPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/home");
      } else {
        // Unauthenticated users see the marketing landing page first
        router.replace("/landing");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-4">
        <Logo className="w-20 h-20 mx-auto" />
        <h2 className="text-xl font-heading font-medium text-muted-foreground animate-pulse">
          Fly AI is loading...
        </h2>
      </div>
    </div>
  );
}
