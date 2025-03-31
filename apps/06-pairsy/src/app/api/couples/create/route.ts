import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase"; // Fixed import path

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, couple_name, partner1_name, partner2_name, bio, interests } = body;

    console.log("API route: Attempting to create couple profile");

    // Await cookies properly
    const cookieStore = await cookies();
    const token = cookieStore.get('sb-eikdlfbamtbhxwdahpsl-auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Use the admin Supabase client
    const supabaseAdmin = createAdminClient();
    
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Failed to initialize admin client" }, { status: 500 });
    }

    const { error } = await supabaseAdmin.from("couples").insert({
      id,
      email,
      couple_name,
      partner1_name,
      partner2_name,
      bio,
      interests,
    });

    if (error) {
      console.error("Error inserting couple:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Couple created successfully" }, { status: 200 });

  } catch (err) {
    console.error("Unexpected error in create couple route:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
