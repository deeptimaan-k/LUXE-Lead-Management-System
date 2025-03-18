/*
  # Add Lead Score Assignment Trigger

  1. Changes
    - Add function to assign lead scores based on interest
    - Create trigger to automatically assign scores on lead creation/update
    - Add default status creation trigger for new leads

  2. Security
    - Functions run with security definer to ensure proper permissions
*/

-- Function to assign lead score based on interest
CREATE OR REPLACE FUNCTION assign_lead_score()
RETURNS TRIGGER AS $$
DECLARE
  score_id uuid;
BEGIN
  -- Assign score based on interest
  CASE 
    WHEN NEW.interest = 'Bracelets' THEN
      SELECT id INTO score_id FROM lead_scores WHERE name = 'Gold' LIMIT 1;
    WHEN NEW.interest = 'Rings' THEN
      SELECT id INTO score_id FROM lead_scores WHERE name = 'Diamond' LIMIT 1;
    WHEN NEW.interest = 'Necklaces' THEN
      SELECT id INTO score_id FROM lead_scores WHERE name = 'Silver' LIMIT 1;
    ELSE
      SELECT id INTO score_id FROM lead_scores WHERE name = 'Bronze' LIMIT 1;
  END CASE;

  -- Update the lead with the assigned score
  NEW.score_id := score_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create initial lead status
CREATE OR REPLACE FUNCTION create_initial_lead_status()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO lead_statuses (lead_id, status)
  VALUES (NEW.id, 'new');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for lead score assignment
DROP TRIGGER IF EXISTS assign_lead_score_trigger ON leads;
CREATE TRIGGER assign_lead_score_trigger
  BEFORE INSERT OR UPDATE OF interest ON leads
  FOR EACH ROW
  EXECUTE FUNCTION assign_lead_score();

-- Create trigger for initial status
DROP TRIGGER IF EXISTS create_lead_status_trigger ON leads;
CREATE TRIGGER create_lead_status_trigger
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION create_initial_lead_status();