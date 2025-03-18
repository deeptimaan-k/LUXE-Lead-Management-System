/*
  # Fix Lead Scores Relationship

  1. Changes
    - Add score_id column to leads table
    - Create foreign key relationship between leads and lead_scores
    - Update existing leads to have a default score
*/

-- Add score_id column to leads table
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS score_id uuid REFERENCES lead_scores(id);

-- Set default score (Bronze) for existing leads
DO $$
DECLARE
  bronze_score_id uuid;
BEGIN
  SELECT id INTO bronze_score_id FROM lead_scores WHERE name = 'Bronze' LIMIT 1;
  
  UPDATE leads 
  SET score_id = bronze_score_id 
  WHERE score_id IS NULL;
END $$;