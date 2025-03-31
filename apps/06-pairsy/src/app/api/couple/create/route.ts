import { NextResponse } from "next/server";

/**
 * Mock API route for couple profile creation
 * This is a simplified version that always succeeds
 */
export async function POST(req: Request) {
  try {
    // Get form data from request
    const formData = await req.json();
    const { email, couple_name, partner1_name, partner2_name, bio, interests } = formData;

    console.log("Creating mock couple profile:", couple_name);

    // Create a mock profile response
    const mockProfile = {
      id: `profile-${Date.now()}`,
      email,
      couple_name,
      partner1_name,
      partner2_name,
      bio: bio || null,
      interests: interests || [],
      created_at: new Date().toISOString()
    };

    return NextResponse.json(
      { message: "Couple profile created successfully", profile: mockProfile },
      { status: 201 }
    );

  } catch (err) {
    console.error("Error in mock couple create route:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 