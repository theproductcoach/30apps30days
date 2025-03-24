import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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