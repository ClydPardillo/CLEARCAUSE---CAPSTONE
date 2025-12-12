-- ============================================================
-- INSTANT REVIEW PUBLISHING - DATABASE UPDATE
-- Copy this entire file and run it in Supabase SQL Editor
-- ============================================================
-- Updates RLS policies to allow instant review publishing
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

-- Verify the policies were updated
SELECT
  'Campaign review policies updated successfully!' as message,
  COUNT(*) as policy_count
FROM pg_policies
WHERE tablename = 'campaign_reviews'
AND policyname IN ('Donors can update their own reviews', 'Donors can delete their own reviews');
