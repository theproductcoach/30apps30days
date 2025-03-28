import OpenAI from 'openai';
import { PantryItem, UserPreference } from './supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type RecipeFilter = {
  maxCookingTime?: number; // minutes
  cuisine?: string;
  protein?: string;
  carbs?: string;
};

export async function generateDinnerIdeas(
  pantryItems: PantryItem[],
  preferences: UserPreference | null,
  filters: RecipeFilter = {}
) {
  const pantryItemsList = pantryItems.map(item => item.name).join(', ');
  
  const prefsText = preferences
    ? `
      User preferences:
      - ${preferences.likes_asian ? 'Likes Asian cuisine' : 'No special preference for Asian cuisine'}
      - ${preferences.dislikes_pork ? 'Dislikes pork' : 'No special dislike for pork'}
      - ${preferences.vegetarian ? 'Is vegetarian' : 'Is not vegetarian'}
    `
    : 'No specific food preferences.';
    
  const filtersText = Object.entries(filters)
    .filter(([_, value]) => value)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');
    
  const prompt = `
    Generate 3 dinner recipe ideas based on the following information:
    
    Available pantry items: ${pantryItemsList || 'No specific items provided'}
    
    ${prefsText}
    
    ${filtersText ? `Additional filters:\n${filtersText}` : ''}
    
    For each recipe, provide:
    1. Recipe name
    2. Brief description
    3. Ingredients needed (indicate which are NOT in the user's pantry)
    4. Estimated cooking time
    5. Brief instructions
    
    Format as JSON with an array of recipe objects.
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No response from API');
    }
    
    return JSON.parse(responseContent);
  } catch (error) {
    console.error('Error generating dinner ideas:', error);
    throw error;
  }
} 