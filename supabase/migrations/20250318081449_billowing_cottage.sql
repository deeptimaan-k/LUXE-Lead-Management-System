/*
  # Update leads table RLS policies

  1. Changes
    - Drop existing RLS policies
    - Add new policy for anonymous users to insert leads with proper security
    - Add policy for authenticated users to view leads
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous users to insert leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated users to view leads" ON leads;

-- Create new policies with proper security
CREATE POLICY "Enable insert access for anonymous users"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);