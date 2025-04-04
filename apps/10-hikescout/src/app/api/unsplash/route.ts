import { NextResponse } from 'next/server';

const DEFAULT_IMAGE = {
  url: '/hikingimage.png',
  alt: 'Default hiking landscape',
  credit: {
    name: '',
    link: ''
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(DEFAULT_IMAGE);
    }

    const searchQuery = `${query} landscape hiking nature`;
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
      return NextResponse.json(DEFAULT_IMAGE);
    }

    const image = data.results[0];
    return NextResponse.json({
      url: image.urls.regular,
      alt: image.alt_description || `Landscape photo of ${query}`,
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