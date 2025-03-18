/*
  # Fix RLS Policy for Leads Table

  1. Changes
    - Drop existing RLS policies
    - Create new policy for anonymous users to insert leads
    - Create new policy for authenticated users to view leads
    - Ensure RLS is enabled
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert access for anonymous users" ON leads;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON leads;

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create new policies with proper security
CREATE POLICY "Enable insert access for anonymous users"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);