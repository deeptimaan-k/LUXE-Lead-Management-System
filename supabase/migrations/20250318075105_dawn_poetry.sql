/*
  # Create leads table for capturing customer information

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `interest` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated users to read all leads
    - Add policy for anonymous users to insert leads
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  interest text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous users to insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);