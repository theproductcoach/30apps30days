import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    status: 'checking',
    checks: {}
  };
  
  // Check environment variables
  results.checks.env = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'present' : 'missing',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'present' : 'missing',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'present' : 'missing',
  };
  
  // Create a direct client with env values for testing
  try {
    const directClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
    
    const { error: directError } = await directClient.from('couples').select('count').limit(1);
    results.checks.directClient = {
      status: directError ? 'error' : 'ok',
      error: directError ? directError.message : null
    };
  } catch (error: any) {
    results.checks.directClient = {
      status: 'exception',
      error: error.message
    };
  }
  
  // Try admin client
  try {
    const adminClient = createAdminClient();
    if (adminClient) {
      const { error: adminError } = await adminClient.from('couples').select('count').limit(1);
      results.checks.adminClient = {
        status: adminError ? 'error' : 'ok',
        error: adminError ? adminError.message : null
      };
    } else {
      results.checks.adminClient = {
        status: 'not-created',
        error: 'Admin client creation failed'
      };
    }
  } catch (error: any) {
    results.checks.adminClient = {
      status: 'exception',
      error: error.message
    };
  }
  
  // Overall status
  results.status = 
    !results.checks.directClient?.error && 
    !results.checks.adminClient?.error ? 'healthy' : 'unhealthy';
  
  return NextResponse.json(results);
} 