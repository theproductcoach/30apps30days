import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface AuthRequestBody {
  action: string;
  email?: string;
  password?: string;
}

/**
 * API route for auth operations
 * This is a simplified mock version that always succeeds
 */
export async function POST(request: Request) {
  try {
    const body = await request.json() as AuthRequestBody;
    const { action, email } = body;
    
    console.log(`Mock auth API called with action: ${action}`);
    
    // Always return success with mock data
    if (action === 'signin') {
      return NextResponse.json({
        data: {
          user: { 
            id: 'mock-user-id',
            email 
          },
          session: {
            access_token: 'mock-token'
          }
        },
        status: 'success'
      });
    }
    
    if (action === 'signup') {
      return NextResponse.json({
        data: {
          user: { 
            id: 'mock-user-id',
            email
          },
          session: null
        },
        status: 'success'
      });
    }
    
    if (action === 'resend_verification') {
      return NextResponse.json({ 
        success: true, 
        message: 'Verification email sent'
      });
    }
    
    // Default response
    return NextResponse.json({ status: 'success' });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('Error in auth API:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 