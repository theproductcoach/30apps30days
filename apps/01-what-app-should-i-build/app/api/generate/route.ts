import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { headers } from 'next/headers';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a new Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Create a new ratelimiter that allows 10 requests per 10 minutes
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 m'),
  analytics: true,
});

const getVibePrompt = (vibe: number) => {
  switch (vibe) {
    case 0:
      return "Generate a practical, real-world app idea that solves a common problem.";
    case 1:
      return "Generate a creative and imaginative app idea that offers a unique solution.";
    case 2:
      return "Generate a wild, experimental app idea that pushes technological boundaries.";
    case 3:
      return "Generate a bizarre, over-the-top app idea that defies conventional thinking.";
    default:
      return "Generate a creative and imaginative app idea that offers a unique solution.";
  }
};

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'anonymous';
    
    // Check rate limit
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        }
      );
    }

    const { vibe = 1 } = await request.json();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an app idea generator. ${getVibePrompt(vibe)} Format your response exactly like this example: "fitness|helps you track daily workouts" or "shopping|finds the best local deals". The type must be a single word, and the purpose must start with a verb. Use British spelling. Do not include any other text or formatting.`
        },
        {
          role: "user",
          content: "Generate an app idea"
        }
      ],
      temperature: 0.9,
      max_tokens: 50,
    });

    const response = completion.choices[0].message.content?.trim();
    
    if (!response) {
      throw new Error('Empty response from OpenAI');
    }

    const parts = response.split('|');
    if (parts.length !== 2) {
      console.error('Invalid format received:', response);
      throw new Error('Response not in type|purpose format');
    }

    const [type, purpose] = parts;
    if (!type?.trim() || !purpose?.trim()) {
      console.error('Missing type or purpose:', { type, purpose });
      throw new Error('Missing type or purpose in response');
    }

    return NextResponse.json({
      type: type.trim(),
      purpose: purpose.trim()
    });
  } catch (error) {
    console.error('Error generating idea:', error);
    return NextResponse.json(
      { error: 'Failed to generate app idea. Please try again.' },
      { status: 500 }
    );
  }
} 