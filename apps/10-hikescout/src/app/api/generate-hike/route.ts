import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { startLocation, duration, distance, terrain, foodPreference } = await request.json();

    const prompt = `Generate a hiking trip recommendation from ${startLocation} with the following preferences:
- Hike duration: ${duration}
- Distance willing to travel from ${startLocation}: ${distance}
- Preferred terrain: ${terrain}
- Food/coffee preferences: ${foodPreference}

Please provide a response in JSON format with the following structure:
{
  "name": "Name of the hike",
  "location": "Specific location and starting point",
  "transport": "Detailed transport instructions from ${startLocation}",
  "description": "Description of the hike and surroundings",
  "difficulty": "Easy/Moderate/Hard",
  "foodStops": "Recommended food and drink stops",
  "returnOptions": "Return transport options to ${startLocation}",
  "tips": "Specific recommendations for what to bring and prepare for this hike, considering the terrain and typical weather conditions"
}`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable hiking guide who knows hiking routes worldwide. Provide detailed, practical recommendations that include transport links, food options, and specific tips for preparation and safety."
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