"use client";

import { createContext, useContext, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  signInWithGoogle: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// This inner component consumes the session and provides our custom shape
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  const value = {
    user: session?.user || null,
    loading: isPending,
    logout: async () => {
      await authClient.signOut();
      router.push("/");
    },
    signInWithGoogle: async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      });
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
