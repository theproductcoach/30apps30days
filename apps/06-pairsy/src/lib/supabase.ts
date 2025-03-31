import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Fallback values should be replaced with environment variables
const FALLBACK_SUPABASE_URL = '';
const FALLBACK_SUPABASE_ANON_KEY = '';

// Try to get from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Create an admin client for server operations
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Only create admin client on the server
export const createAdminClient = () => {
  if (typeof window !== 'undefined') {
    console.error('Admin client should only be used on the server');
    return null;
  }
  
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase URL or service role key');
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