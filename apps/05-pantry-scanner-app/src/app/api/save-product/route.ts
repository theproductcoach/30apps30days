import { NextResponse } from 'next/server';
import { saveToDatabase } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const { barcode, imageUrl } = await request.json();
    
    if (!barcode) {
      return NextResponse.json(
        { error: 'Barcode is required' },
        { status: 400 }
      );
    }

    const result = await saveToDatabase(barcode, imageUrl);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json(
      { error: 'Failed to save product' },
      { status: 500 }
    );
  }
} 