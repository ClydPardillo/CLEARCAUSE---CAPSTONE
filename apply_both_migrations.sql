-- ============================================================
-- COMBINED MIGRATIONS - DATABASE UPDATE
-- Copy this entire file and run it in Supabase SQL Editor
-- ============================================================
-- This file applies two migrations:
-- 1. Charity Feedback System (new table)
-- 2. Instant Review Publishing (updated RLS policies)
-- ============================================================

-- ============================================================
-- MIGRATION 1: CHARITY FEEDBACK SYSTEM
-- ============================================================

-- Create charity_feedback table
CREATE TABLE IF NOT EXISTS public.charity_feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  charity_id UUID NOT NULL REFERENCES public.charities(id) ON DELETE CASCADE,
  donor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(charity_id, donor_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_charity_feedback_charity_id ON public.charity_feedback(charity_id);
CREATE INDEX IF NOT EXISTS idx_charity_feedback_donor_id ON public.charity_feedback(donor_id);
CREATE INDEX IF NOT EXISTS idx_charity_feedback_rating ON public.charity_feedback(rating);
CREATE INDEX IF NOT EXISTS idx_charity_feedback_created_at ON public.charity_feedback(created_at DESC);

-- Add trigger for updated_at timestamp
CREATE TRIGGER update_charity_feedback_updated_at
  BEFORE UPDATE ON public.charity_feedback
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.charity_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can view all charity feedback (no moderation)
CREATE POLICY "Anyone can view charity feedback"
  ON public.charity_feedback
  FOR SELECT
  USING (true);

-- RLS Policy: Authenticated users can insert feedback
CREATE POLICY "Authenticated users can insert charity feedback"
  ON public.charity_feedback
  FOR INSERT
  WITH CHECK (auth.uid() = donor_id AND auth.uid() IS NOT NULL);

-- RLS Policy: Donors can update their own feedback
CREATE POLICY "Donors can update their own feedback"
  ON public.charity_feedback
  FOR UPDATE
  USING (auth.uid() = donor_id);

-- RLS Policy: Donors can delete their own feedback
CREATE POLICY "Donors can delete their own feedback"
  ON public.charity_feedback
  FOR DELETE
  USING (auth.uid() = donor_id);

-- RLS Policy: Admins can delete any feedback (emergency only)
CREATE POLICY "Admins can delete any charity feedback"
  ON public.charity_feedback
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add comments for documentation
COMMENT ON TABLE public.charity_feedback IS 'Stores donor feedback and ratings for charity organizations';
COMMENT ON COLUMN public.charity_feedback.rating IS 'Rating from 1-5 stars';
COMMENT ON COLUMN public.charity_feedback.comment IS 'Optional text feedback from donor';
COMMENT ON COLUMN public.charity_feedback.charity_id IS 'Reference to the charity being reviewed';
COMMENT ON COLUMN public.charity_feedback.donor_id IS 'Reference to the donor who submitted feedback';

-- ============================================================
-- MIGRATION 2: INSTANT REVIEW PUBLISHING
-- ============================================================

-- Drop old policies that required 'pending' status
DROP POLICY IF EXISTS "Donors can update their own pending reviews" ON public.campaign_reviews;
DROP POLICY IF EXISTS "Donors can delete their own pending reviews" ON public.campaign_reviews;

-- Create new policies that allow donors to manage their own reviews (any status)
CREATE POLICY "Donors can update their own reviews"
  ON public.campaign_reviews
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id AND status = 'approved');

CREATE POLICY "Donors can delete their own reviews"
  ON public.campaign_reviews
  FOR DELETE
  USING (auth.uid() = user_id);

-- Update comments to reflect instant publishing
COMMENT ON COLUMN public.campaign_reviews.status IS 'Review status (approved by default, admins can moderate if needed)';

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Verify charity_feedback table was created
SELECT
  'charity_feedback table created successfully!' as message,
  COUNT(*) as current_feedback_count
FROM public.charity_feedback;

-- Verify campaign_reviews policies updated
SELECT
  'campaign_reviews policies updated successfully!' as message,
  COUNT(*) as policy_count
FROM pg_policies
WHERE tablename = 'campaign_reviews';
