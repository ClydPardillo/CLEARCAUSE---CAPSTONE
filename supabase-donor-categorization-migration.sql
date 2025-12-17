-- Add enums for donor categorization
CREATE TYPE donor_category AS ENUM ('individual', 'organization');
CREATE TYPE organization_type AS ENUM (
  'corporation', 
  'foundation', 
  'ngo', 
  'trust', 
  'government_agency', 
  'educational_institution', 
  'religious_organization', 
  'other'
);

-- Add columns to profiles table
ALTER TABLE profiles 
ADD COLUMN donor_category donor_category DEFAULT 'individual',
ADD COLUMN donor_organization_name TEXT,
ADD COLUMN donor_organization_type organization_type;

-- Create index for faster filtering by category
CREATE INDEX idx_profiles_donor_category ON profiles(donor_category);
