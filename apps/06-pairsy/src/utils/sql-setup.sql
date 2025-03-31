-- Drop existing couples table if it exists
DROP TABLE IF EXISTS public.couples;

-- Create couples table
CREATE TABLE public.couples (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  email TEXT NOT NULL,
  couple_name TEXT,
  partner1_name TEXT,
  partner2_name TEXT,
  bio TEXT,
  interests TEXT[] DEFAULT '{}'::TEXT[],
  avatar_url TEXT
);

-- Add foreign key constraint - we'll make it deferrable to avoid timing issues
ALTER TABLE public.couples ADD CONSTRAINT couples_id_fkey 
  FOREIGN KEY (id) REFERENCES auth.users(id) 
  ON DELETE CASCADE 
  DEFERRABLE INITIALLY DEFERRED;

-- Enable RLS
ALTER TABLE public.couples ENABLE ROW LEVEL SECURITY;

-- Allow inserts with the user's ID
CREATE POLICY "Users can insert their own data"
ON public.couples
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Allow users to read their own rows
CREATE POLICY "Users can read their own data"
ON public.couples
FOR SELECT
USING (auth.uid() = id);

-- Allow users to update their own rows
CREATE POLICY "Users can update their own data"
ON public.couples
FOR UPDATE
USING (auth.uid() = id);

-- Allow anyone to insert for now (for debugging)
CREATE POLICY "Allow all inserts temporarily" 
ON public.couples
FOR INSERT
WITH CHECK (true);

-- Function to create a couple (bypasses RLS)
CREATE OR REPLACE FUNCTION public.insert_new_couple(
  p_id UUID,
  p_email TEXT,
  p_couple_name TEXT DEFAULT NULL,
  p_partner1_name TEXT DEFAULT NULL,
  p_partner2_name TEXT DEFAULT NULL,
  p_bio TEXT DEFAULT NULL,
  p_interests TEXT[] DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result RECORD;
BEGIN
  -- Insert the record and capture the result
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
$$;

-- Grant execute permission to authenticated users and service_role
GRANT EXECUTE ON FUNCTION public.insert_new_couple TO authenticated;
GRANT EXECUTE ON FUNCTION public.insert_new_couple TO service_role;
GRANT EXECUTE ON FUNCTION public.insert_new_couple TO anon;

-- Test trigger function that creates a couples record when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_couple() 
RETURNS TRIGGER
SECURITY DEFINER  -- Important: this makes the function run with owner privileges
AS $$
BEGIN
  INSERT INTO public.couples (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ language plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created_for_couple ON auth.users;

-- Create trigger to run when new users are created
CREATE TRIGGER on_auth_user_created_for_couple
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_couple(); 