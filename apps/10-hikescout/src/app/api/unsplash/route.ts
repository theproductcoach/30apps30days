import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const DEFAULT_IMAGE = {
  url: '/hikingimage.png',
  alt: 'Default hiking landscape',
  credit: {
    name: '',
    link: ''
  }
};

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('query');

    if (!query) {
      return NextResponse.json(DEFAULT_IMAGE);
    }

    // Create a more specific search query focused on hiking trails
    const searchQuery = `${query} hiking trail landscape`;
    
    if (!process.env.UNSPLASH_ACCESS_KEY) {
      console.error('Missing Unsplash API key');
      return NextResponse.json(DEFAULT_IMAGE);
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        searchQuery
      )}&orientation=landscape&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }

    const data = await response.json();
    
    if (!data.results?.[0]) {
      // If no results with specific query, try a fallback with just the location
      const fallbackResponse = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&orientation=landscape&per_page=1`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      if (!fallbackResponse.ok || !(await fallbackResponse.json()).results?.[0]) {
        return NextResponse.json(DEFAULT_IMAGE);
      }

      const fallbackData = await fallbackResponse.json();
      const fallbackImage = fallbackData.results[0];
      return NextResponse.json({
        url: fallbackImage.urls.regular,
        alt: fallbackImage.alt_description || `Photo of ${query}`,
        credit: {
          name: fallbackImage.user.name,
          link: fallbackImage.user.links.html
        }
      });
    }

    const image = data.results[0];
    return NextResponse.json({
      url: image.urls.regular,
      alt: image.alt_description || `Hiking trail at ${query}`,
      credit: {
        name: image.user.name,
        link: image.user.links.html
      }
    });
  } catch (error) {
    console.error('Unsplash API error:', error);
    return NextResponse.json(DEFAULT_IMAGE);
  }
} 