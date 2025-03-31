-- This is for testing only - DO NOT use in production
-- Disables Row Level Security on couples table for debugging
ALTER TABLE public.couples DISABLE ROW LEVEL SECURITY;

-- Drop the foreign key constraint if it's causing issues
ALTER TABLE public.couples DROP CONSTRAINT IF EXISTS couples_id_fkey;

-- Create a temporary table for debugging
CREATE TABLE IF NOT EXISTS public.couples_temp (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT,
  couple_name TEXT,
  partner1_name TEXT,
  partner2_name TEXT,
  bio TEXT,
  interests TEXT[],
  avatar_url TEXT
);

-- Grant necessary permissions on the temporary table
GRANT ALL ON TABLE public.couples_temp TO service_role;
GRANT ALL ON TABLE public.couples_temp TO authenticated;
GRANT ALL ON TABLE public.couples_temp TO anon;

-- Create a function to insert data directly (bypassing all security)
CREATE OR REPLACE FUNCTION public.direct_insert_couple(
  p_id UUID,
  p_email TEXT,
  p_couple_name TEXT DEFAULT NULL,
  p_partner1_name TEXT DEFAULT NULL,
  p_partner2_name TEXT DEFAULT NULL,
  p_bio TEXT DEFAULT NULL,
  p_interests TEXT[] DEFAULT NULL
) RETURNS JSON AS $$
DECLARE
  v_result RECORD;
BEGIN
  -- Always insert into the temp table for troubleshooting
  INSERT INTO public.couples_temp (
    id, email, couple_name, partner1_name, partner2_name, bio, interests
  ) VALUES (
    p_id, p_email, p_couple_name, p_partner1_name, p_partner2_name, p_bio, p_interests
  );
  
  -- Try to insert into the main table
  BEGIN
    INSERT INTO public.couples (
      id, email, couple_name, partner1_name, partner2_name, bio, interests
    ) VALUES (
      p_id, p_email, p_couple_name, p_partner1_name, p_partner2_name, p_bio, p_interests
    )
    RETURNING * INTO v_result;
    
    -- Return success with the data as JSON
    RETURN json_build_object(
      'success', true,
      'id', v_result.id,
      'email', v_result.email,
      'couple_name', v_result.couple_name,
      'partner1_name', v_result.partner1_name,
      'partner2_name', v_result.partner2_name
    );
  EXCEPTION WHEN OTHERS THEN
    -- Return error information as JSON
    RETURN json_build_object(
      'success', false,
      'id', p_id,
      'email', p_email,
      'error', SQLERRM
    );
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.direct_insert_couple TO authenticated;
GRANT EXECUTE ON FUNCTION public.direct_insert_couple TO service_role;
GRANT EXECUTE ON FUNCTION public.direct_insert_couple TO anon; 