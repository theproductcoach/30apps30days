import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface HealthResponse {
  timestamp: string;
  status: string;
  message: string;
}

/**
 * Simple health check endpoint that always returns healthy
 * The authentication functionality has been removed
 */
export async function GET(): Promise<NextResponse<HealthResponse>> {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    status: 'healthy',
    message: 'Authentication has been removed from the application'
  });
} 