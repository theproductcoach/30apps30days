// Mock types for the application without real database connection

/**
 * Simplified type definitions for the mock data structures
 * These replace the actual Supabase types since we removed authentication
 */

export type Couple = {
  id: string;
  created_at?: string;
  email?: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  bio?: string | null;
  interests?: string[];
  avatar_url?: string | null;
};

// Simplified mock Database type
export interface Database {
  public: {
    Tables: {
      couples: {
        Row: Couple;
        Insert: Partial<Couple> & { id: string; email: string };
        Update: Partial<Couple>;
      }
    }
  }
} 