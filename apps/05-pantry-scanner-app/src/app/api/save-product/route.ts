import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { saveToDatabase } from '@/lib/database';

// Initialize Supabase client with service role key for admin access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization header' },
        { status: 401 }
      );
    }

    // Extract the token
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the JWT and get the user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { barcode, imageUrl } = body;

    if (!barcode) {
      return NextResponse.json(
        { error: 'Barcode is required' },
        { status: 400 }
      );
    }

    // Save to database with authenticated user
    const result = await saveToDatabase(barcode, imageUrl, user);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in save-product route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 