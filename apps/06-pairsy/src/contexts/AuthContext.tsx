"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Simplified types without actual Supabase deps
type User = {
  id: string;
  email: string;
};

type Session = {
  user: User;
};

type AuthError = {
  message: string;
};

type AuthResult = {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: AuthError | null;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "dummy-user-id",
    email: "user@example.com",
  });
  const [session, setSession] = useState<Session | null>({
    user: { id: "dummy-user-id", email: "user@example.com" },
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock sign up function - always succeeds
  const signUp = async (
    email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: string
  ): Promise<AuthResult> => {
    setIsLoading(true);

    // Create a fake user
    const mockUser = {
      id: `user-${Date.now()}`,
      email,
    };

    setUser(mockUser);
    setSession({ user: mockUser });
    setIsLoading(false);

    return {
      data: {
        user: mockUser,
        session: { user: mockUser },
      },
      error: null,
    };
  };

  // Mock sign in function - always succeeds
  const signIn = async (
    email: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: string
  ): Promise<AuthResult> => {
    setIsLoading(true);

    // Create a fake user
    const mockUser = {
      id: `user-${Date.now()}`,
      email,
    };

    setUser(mockUser);
    setSession({ user: mockUser });
    setIsLoading(false);

    return {
      data: {
        user: mockUser,
        session: { user: mockUser },
      },
      error: null,
    };
  };

  // Mock sign out
  const signOut = async () => {
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
