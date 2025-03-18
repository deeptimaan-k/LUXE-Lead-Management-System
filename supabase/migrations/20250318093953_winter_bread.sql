/*
  # Lead Management System Schema

  1. New Tables
    - `lead_scores`
      - `id` (uuid, primary key)
      - `name` (text)
      - `score` (integer)
      - `created_at` (timestamptz)

    - `lead_statuses`
      - `id` (uuid, primary key)
      - `lead_id` (uuid, references leads)
      - `status` (text)
      - `notes` (text)
      - `updated_at` (timestamptz)
      - `updated_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create lead scores reference table
CREATE TABLE IF NOT EXISTS lead_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create lead statuses table
CREATE TABLE IF NOT EXISTS lead_statuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'new',
  notes text,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE lead_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_statuses ENABLE ROW LEVEL SECURITY;

-- Add initial lead scores
INSERT INTO lead_scores (name, score) VALUES
  ('Diamond', 100),
  ('Gold', 75),
  ('Silver', 50),
  ('Bronze', 25);

-- Create policies
CREATE POLICY "Allow authenticated users to view lead scores"
  ON lead_scores
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to view lead statuses"
  ON lead_statuses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update lead statuses"
  ON lead_statuses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update their own status updates"
  ON lead_statuses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = updated_by)
  WITH CHECK (auth.uid() = updated_by);