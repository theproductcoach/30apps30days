import { supabase, PantryItem } from './supabase';
import type { User } from '@supabase/supabase-js';

interface OpenFoodFactsProduct {
  product_name?: string;
  image_url?: string;
  brands?: string;
  quantity?: string;
  categories?: string;
}

async function fetchProductInfo(barcode: string): Promise<OpenFoodFactsProduct | null> {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await response.json();
    
    if (data.status === 0) {
      console.log('Product not found in Open Food Facts database');
      return null;
    }

    return {
      product_name: data.product?.product_name,
      image_url: data.product?.image_url,
      brands: data.product?.brands,
      quantity: data.product?.quantity,
      categories: data.product?.categories
    };
  } catch (error) {
    console.error('Error fetching product info:', error);
    return null;
  }
}

export async function saveToDatabase(barcode: string, imageUrl?: string, user?: User) {
  try {
    let userId: string;

    if (user) {
      userId = user.id;
    } else {
      // Try to get the current user if not provided
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      userId = currentUser.id;
    }

    // Fetch product info from Open Food Facts
    const productInfo = await fetchProductInfo(barcode);

    const { data, error } = await supabase
      .from('pantry_items')
      .insert([
        {
          user_id: userId,
          barcode,
          image_url: imageUrl || productInfo?.image_url,
          product_name: productInfo?.product_name,
          brand: productInfo?.brands,
          quantity: productInfo?.quantity,
          categories: productInfo?.categories
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