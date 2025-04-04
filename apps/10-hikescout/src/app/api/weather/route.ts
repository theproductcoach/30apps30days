import { NextResponse } from 'next/server';

async function getCoordinates(location: string) {
  try {
    // Clean up the location string
    const cleanLocation = location
      .replace(/near/gi, '')
      .replace(/\bin\b/gi, '')
      .replace(/\bat\b/gi, '')
      .trim();

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cleanLocation
      )}&count=1&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding service error');
    }

    const data = await response.json();
    if (data.results?.[0]) {
      return {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
        name: data.results[0].name,
      };
    }
    throw new Error(`Location not found: ${cleanLocation}`);
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

async function getWeather(latitude: number, longitude: number) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
    );
    
    if (!response.ok) {
      throw new Error('Weather service error');
    }

    const data = await response.json();
    
    // Convert weather code to description
    const weatherDescriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail',
    };

    const weatherCode = data.current.weather_code;
    const description = weatherDescriptions[weatherCode] || 'Unknown weather';

    return {
      temperature: Math.round(data.current.temperature_2m),
      description,
    };
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    if (!location) {
      return NextResponse.json(
        { error: 'Location parameter is required' },
        { status: 400 }
      );
    }

    const coordinates = await getCoordinates(location);
    const weather = await getWeather(coordinates.latitude, coordinates.longitude);

    return NextResponse.json({
      ...weather,
      resolvedLocation: coordinates.name,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 