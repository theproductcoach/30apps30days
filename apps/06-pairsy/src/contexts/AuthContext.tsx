"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("pairsy_user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setSession({ user: parsedUser });
        } catch (e) {
          // Invalid stored data, clear it
          localStorage.removeItem("pairsy_user");
        }
      }
      setIsLoading(false);
    };

    // Only run in browser environment
    if (typeof window !== "undefined") {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Mock sign up function
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

    // Save to state and localStorage
    setUser(mockUser);
    setSession({ user: mockUser });

    if (typeof window !== "undefined") {
      localStorage.setItem("pairsy_user", JSON.stringify(mockUser));
    }

    setIsLoading(false);

    return {
      data: {
        user: mockUser,
        session: { user: mockUser },
      },
      error: null,
    };
  };

  // Mock sign in function
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

    // Save to state and localStorage
    setUser(mockUser);
    setSession({ user: mockUser });

    if (typeof window !== "undefined") {
      localStorage.setItem("pairsy_user", JSON.stringify(mockUser));
    }

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

    if (typeof window !== "undefined") {
      localStorage.removeItem("pairsy_user");
    }
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
