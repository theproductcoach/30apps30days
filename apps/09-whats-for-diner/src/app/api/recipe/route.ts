import { NextResponse } from 'next/server';
import { generateRecipe } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const recipe = await generateRecipe(body);
    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipe' },
      { status: 500 }
    );
  }
} 