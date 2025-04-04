import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getVibeContext(vibe: string): string {
  const vibeContexts = {
    "Chill & Scenic": "a relaxed and scenic hike with plenty of opportunities to take in beautiful views, suitable for a laid-back day out",
    "Epic Views": "a hike that prioritizes reaching stunning viewpoints and panoramic vistas, potentially including peaks or elevated positions",
    "Adventure & Challenge": "a more challenging and adventurous hike that might include some scrambling, steeper sections, or interesting terrain features",
    "Forest Bathing": "a peaceful woodland walk focused on tranquility and nature immersion, perfect for mindfulness and relaxation",
  };
  
  return vibeContexts[vibe as keyof typeof vibeContexts] || "a suitable hike matching your preferences";
}

export async function POST(request: NextRequest) {
  try {
    const { startLocation, duration, distance, terrain, foodPreference, vibe } = await request.json();

    const vibeContext = getVibeContext(vibe);
    const prompt = `Generate a hiking trip recommendation from ${startLocation} with the following preferences:
- Hike duration: ${duration}
- Distance willing to travel from ${startLocation}: ${distance}
- Preferred terrain: ${terrain}
- Food/coffee preferences: ${foodPreference}
- Desired vibe: ${vibe}

Please recommend ${vibeContext}.

Please provide a response in JSON format with the following structure:
{
  "name": "Name of the hike",
  "location": "Specific location and starting point",
  "transport": "Detailed transport instructions from ${startLocation}",
  "description": "Description of the hike and surroundings, emphasizing aspects that match the desired ${vibe} vibe",
  "difficulty": "Easy/Moderate/Hard",
  "foodStops": "Recommended food and drink stops",
  "returnOptions": "Return transport options to ${startLocation}",
  "tips": "Specific recommendations for what to bring and prepare for this hike, considering the terrain, typical weather conditions, and the ${vibe} experience"
}`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable hiking guide who knows hiking routes worldwide. Provide detailed, practical recommendations that include transport links, food options, and specific tips for preparation and safety. Ensure the recommendations match the requested vibe and atmosphere of the hike."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }

    const hikeRecommendation = JSON.parse(responseContent);

    return NextResponse.json(hikeRecommendation);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate hike recommendation' },
      { status: 500 }
    );
  }
} 