-- ============================================================
-- UPDATE EXISTING REVIEWS TO APPROVED
-- Copy this and run it in Supabase SQL Editor
-- ============================================================
-- This updates all existing 'pending' reviews to 'approved'
-- so they become visible immediately
-- ============================================================

-- Update all pending reviews to approved
UPDATE public.campaign_reviews
SET status = 'approved'
WHERE status = 'pending';

-- Show how many reviews were updated
SELECT
  'Reviews updated successfully!' as message,
  COUNT(*) as reviews_updated
FROM public.campaign_reviews
WHERE status = 'approved';
