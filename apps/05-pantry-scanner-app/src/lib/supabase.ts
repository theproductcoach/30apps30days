import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './database.types';

// Remove the URL and key from here since they're automatically picked up from env
export const supabase = createClientComponentClient<Database>();

export interface PantryItem {
  id: string;
  user_id: string;
  barcode: string;
  image_url?: string;
  created_at: string;
  product_name?: string;
  brand?: string;
  quantity?: string;
  categories?: string;
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Database helper functions
export async function checkSupabaseConnection() {
  console.log('Testing Supabase connection...');
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error('No active session');
      return { ok: false, error: 'Please sign in to access your pantry.' };
    }
    return { ok: true, error: null, userId: session.user.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Supabase connection test exception:', errorMessage);
    return { ok: false, error: 'Failed to verify connection.' };
  }
} 