import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type RecipeRequest = {
  protein: string;
  carb: string;
  vegetables: string[];
  cuisine: string;
  time: number;
};

type IngredientCategory = 'proteins' | 'carbs' | 'vegetables' | 'other';

export async function generateRecipe(request: RecipeRequest) {
  const prompt = `You are a helpful and creative AI chef.

The user has selected the following preferences for a meal:
- Protein: ${request.protein}
- Carb: ${request.carb}
- Vegetables: ${request.vegetables.join(', ')}
- Cuisine: ${request.cuisine}
- Time to cook: ${request.time} minutes

Using this information:
1. Suggest one complete recipe that includes the selected ingredients and matches the cuisine and time constraints.
2. Keep it relatively simple and suitable for a home cook.
3. Provide a short description of the dish.
4. Output a step-by-step recipe with clear instructions.
5. Generate a shopping list of ingredients, grouped into:
   - Proteins
   - Carbs
   - Vegetables
   - Other (spices, sauces, etc.)

Format your response exactly like this:
[Recipe Name]

[Description]

Shopping List:
Proteins:
- [protein items]

Carbs:
- [carb items]

Vegetables:
- [vegetable items]

Other:
- [other items]

Instructions:
1. [First step]
2. [Next steps...]

Respond only with the recipe in this format, no extra commentary.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: 1000,
  });

  const response = completion.choices[0]?.message?.content;
  if (!response) {
    throw new Error('Failed to generate recipe');
  }

  // Parse the response into structured data
  const sections = response.split('\n\n');
  const name = sections[0]?.trim();
  const description = sections[1]?.trim();
  
  // Initialize ingredients object
  const ingredients = {
    proteins: [] as string[],
    carbs: [] as string[],
    vegetables: [] as string[],
    other: [] as string[],
  };

  // Find the shopping list section and parse it
  const shoppingListStart = response.indexOf('Shopping List:');
  if (shoppingListStart !== -1) {
    const shoppingListEnd = response.indexOf('Instructions:', shoppingListStart);
    const shoppingList = response.slice(shoppingListStart, shoppingListEnd);
    
    let currentCategory: IngredientCategory | '' = '';
    shoppingList.split('\n').forEach(line => {
      line = line.trim();
      
      if (line === 'Shopping List:') return;
      
      // Check for category headers
      if (line.toLowerCase() === 'proteins:') currentCategory = 'proteins';
      else if (line.toLowerCase() === 'carbs:') currentCategory = 'carbs';
      else if (line.toLowerCase() === 'vegetables:') currentCategory = 'vegetables';
      else if (line.toLowerCase() === 'other:') currentCategory = 'other';
      // Parse ingredients
      else if (line.startsWith('-') && currentCategory) {
        const item = line.slice(1).trim();
        if (item) {
          ingredients[currentCategory].push(item);
        }
      }
    });
  }

  // Parse instructions
  const instructions: string[] = [];
  const instructionsStart = response.indexOf('Instructions:');
  if (instructionsStart !== -1) {
    const instructionsText = response.slice(instructionsStart);
    instructionsText.split('\n').forEach(line => {
      line = line.trim();
      if (line === 'Instructions:') return;
      
      // Match lines that start with a number followed by a dot
      if (/^\d+\./.test(line)) {
        // Remove the number and dot from the beginning
        const instruction = line.replace(/^\d+\.\s*/, '').trim();
        if (instruction) {
          instructions.push(instruction);
        }
      }
    });
  }

  return {
    name,
    description,
    ingredients,
    instructions,
  };
} 