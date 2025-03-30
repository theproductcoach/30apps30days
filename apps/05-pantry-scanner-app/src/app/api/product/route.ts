import { NextResponse } from 'next/server';
import OFF from 'openfoodfacts-nodejs';

// Initialize the Open Food Facts client
const client = new OFF();

export async function POST(request: Request) {
  try {
    // Get the barcode from the request body
    const { barcode } = await request.json();

    if (!barcode) {
      return NextResponse.json(
        { error: 'Barcode is required' },
        { status: 400 }
      );
    }

    // Fetch product data from Open Food Facts
    const result = await client.getProduct(barcode);

    // If product not found
    if (!result || !result.product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Extract relevant product data
    const product = {
      name: result.product.product_name || 'Unknown Product',
      brand: result.product.brands || 'Unknown Brand',
      imageUrl: result.product.image_url || null,
      quantity: result.product.quantity || null,
      categories: result.product.categories || null,
      ingredients: result.product.ingredients_text || null,
      nutriments: result.product.nutriments || null,
    };

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product data' },
      { status: 500 }
    );
  }
} 