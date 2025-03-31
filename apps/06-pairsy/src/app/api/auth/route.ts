import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { Database } from '@/types/supabase';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Optional: Add a GET handler that returns the session
export async function GET() {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({
      session: data.session,
      status: 'success'
    });
  } catch (error: any) {
    console.error('Unexpected error in GET /api/auth:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

// Handle POST requests (e.g., sign-in, sign-up)
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { action, email, password } = await request.json();
    
    console.log('Auth request received:', action);
    
    if (action === 'signin') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Error signing in:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      
      return NextResponse.json({ data, status: 'success' });
    }
    
    if (action === 'signup') {
      console.log('Starting signup for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        console.error('Error during signup:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      
      // If successful and we have a user ID, try to create a couple record
      // This is a backup in case the trigger doesn't work
      if (data?.user?.id) {
        try {
          const adminClient = createAdminClient();
          if (adminClient) {
            console.log('Creating couples record with user ID:', data.user.id);
            await adminClient.from('couples').insert([
              { id: data.user.id, email }
            ]);
          }
        } catch (couplesError) {
          console.error('Error creating couples record:', couplesError);
          // We'll continue anyway - it's not critical if this fails
        }
      }
      
      return NextResponse.json({ data, status: 'success' });
    }
    
    if (action === 'resend_verification') {
      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }

      console.log('Resending verification email to:', email);
      
      // Use the service role client for this operation
      const adminClient = createAdminClient();
      if (!adminClient) {
        return NextResponse.json({ error: 'Failed to create admin client' }, { status: 500 });
      }
      
      // Resend the verification email
      const { data, error } = await adminClient.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) {
        console.error('Error resending verification email:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Verification email sent'
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Unexpected error in POST /api/auth:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
} 