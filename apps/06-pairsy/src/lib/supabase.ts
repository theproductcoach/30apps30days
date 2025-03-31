import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Hardcoded values to use as fallback
const FALLBACK_SUPABASE_URL = 'https://eikdlfbamtbhxwdahpsl.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpa2RsZmJhbXRiaHh3ZGFocHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzIwODUsImV4cCI6MjA1NjE0ODA4NX0.mZ9H2hw1NKJQ8AM8WiGg0fgiZDVmDp2QmtYYXHQk4f4';

// Try to get from environment variables, fall back to hardcoded values if not available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Create an admin client for server operations
const FALLBACK_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpa2RsZmJhbXRiaHh3ZGFocHNsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDU3MjA4NSwiZXhwIjoyMDU2MTQ4MDg1fQ.7nzuk9JqPjhZ1coX0sOhb2ox99JmX_ISlyP4HDCXI9M';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_SERVICE_KEY;

// Only create admin client on the server
export const createAdminClient = () => {
  if (typeof window !== 'undefined') {
    console.error('Admin client should only be used on the server');
    return null;
  }
  
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    }
  });
};

// Types for our database tables
export type Couple = {
  id: string;
  created_at: string;
  email: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  bio: string | null;
  interests: string[];
  avatar_url: string | null;
}; 