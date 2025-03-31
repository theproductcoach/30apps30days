import { NextResponse } from "next/server";

/**
 * Mock API route for creating a couple 
 * This is a simplified version that always succeeds
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, couple_name, partner1_name, partner2_name, bio, interests } = body;

    console.log("Mock API: Creating couple profile for", couple_name);

    // Create a mock response with the data provided
    const mockCouple = {
      id: id || `couple-${Date.now()}`,
      email,
      couple_name,
      partner1_name,
      partner2_name, 
      bio: bio || null,
      interests: interests || [],
      created_at: new Date().toISOString()
    };

    return NextResponse.json({ 
      message: "Couple created successfully",
      couple: mockCouple
    }, { status: 200 });

  } catch (err) {
    console.error("Error in mock couple create route:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
