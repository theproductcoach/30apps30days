import OpenFoodFacts from "openfoodfacts-nodejs";

// @ts-ignore - Library types are incomplete
const client = new OpenFoodFacts();

export async function POST(request: Request) {
  try {
    const { barcode } = await request.json();

    // Get product data from Open Food Facts
    const product = await client.getProduct(barcode);

    if (!product || !product.product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    // Extract relevant product information
    const {
      product_name: name,
      brands: brand,
      image_url: imageUrl,
      quantity,
      categories,
      ingredients_text: ingredients,
      nutriments,
    } = product.product;

    return Response.json({
      name,
      brand,
      imageUrl,
      quantity,
      categories,
      ingredients,
      nutriments,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json(
      { error: 'Failed to fetch product information' },
      { status: 500 }
    );
  }
}