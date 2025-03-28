import { supabase, PantryItem } from './supabase';

export async function saveToDatabase(barcode: string, imageUrl?: string) {
  try {
    // Get the current user's ID (you'll need to implement authentication)
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('pantry_items')
      .insert([
        {
          user_id: user.id,
          barcode,
          image_url: imageUrl,
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data as PantryItem;
  } catch (error) {
    console.error('Error saving product:', error);
    throw error;
  }
}

export async function getPantryItems() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('pantry_items')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as PantryItem[];
  } catch (error) {
    console.error('Error fetching pantry items:', error);
    throw error;
  }
} 