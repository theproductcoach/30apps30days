import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadPantryImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
  const filePath = `pantry-items/${fileName}`;

  const { data, error } = await supabase.storage
    .from('meal-planner')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: publicUrl } = supabase.storage
    .from('meal-planner')
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}

export type PantryItem = {
  id?: string;
  name: string;
  image_url: string;
  category: string;
  expires_at?: string | null;
  created_at?: string;
};

export type UserPreference = {
  id?: string;
  user_id?: string;
  likes_asian: boolean;
  dislikes_pork: boolean;
  vegetarian: boolean;
};

export type MealPlan = {
  id?: string;
  user_id?: string;
  week_start: string;
  plan_data: Record<string, any>;
  created_at?: string;
};

export async function addPantryItem(item: PantryItem) {
  const { data, error } = await supabase
    .from('mealplanner_pantry_item')
    .insert([item])
    .select();

  if (error) {
    throw error;
  }

  return data[0];
}

export async function getPantryItems() {
  const { data, error } = await supabase
    .from('mealplanner_pantry_item')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function saveUserPreferences(prefs: UserPreference) {
  const { data, error } = await supabase
    .from('mealplanner_userprefs')
    .upsert([prefs])
    .select();

  if (error) {
    throw error;
  }

  return data[0];
}

export async function getUserPreferences() {
  const { data, error } = await supabase
    .from('mealplanner_userprefs')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveMealPlan(plan: MealPlan) {
  const { data, error } = await supabase
    .from('mealplanner_meal_plan')
    .upsert([plan])
    .select();

  if (error) {
    throw error;
  }

  return data[0];
}

export async function getMealPlans() {
  const { data, error } = await supabase
    .from('mealplanner_meal_plan')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
} 