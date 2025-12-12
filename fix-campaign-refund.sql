-- ============================================================================
-- Fix Campaign Refund - Update to Correct Campaign ID
-- ============================================================================
-- This script updates a mistakenly created refund request to use the correct campaign
-- New Campaign ID: 2f2145ef-2043-461d-80e9-44f43aa320db
-- ============================================================================

-- Step 1: Find the most recent campaign-level refund request
DO $$
DECLARE
  v_refund_request_id UUID;
  v_old_campaign_id UUID;
  v_new_campaign_id UUID := '2f2145ef-2043-461d-80e9-44f43aa320db';
  v_charity_id UUID;
BEGIN
  -- Get the most recent campaign-level refund request
  SELECT id, campaign_id
  INTO v_refund_request_id, v_old_campaign_id
  FROM milestone_refund_requests
  WHERE trigger_type IN ('campaign_expiration', 'campaign_cancellation')
    AND milestone_id IS NULL
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_refund_request_id IS NULL THEN
    RAISE NOTICE 'No campaign-level refund request found!';
    RETURN;
  END IF;

  RAISE NOTICE 'Found refund request: %', v_refund_request_id;
  RAISE NOTICE 'Old campaign ID: %', v_old_campaign_id;
  RAISE NOTICE 'New campaign ID: %', v_new_campaign_id;

  -- Get charity_id from new campaign
  SELECT charity_id INTO v_charity_id
  FROM campaigns
  WHERE id = v_new_campaign_id;

  IF v_charity_id IS NULL THEN
    RAISE EXCEPTION 'Campaign % not found!', v_new_campaign_id;
  END IF;

  -- Step 2: Update the refund request to point to correct campaign
  UPDATE milestone_refund_requests
  SET
    campaign_id = v_new_campaign_id,
    charity_id = v_charity_id,
    updated_at = NOW()
  WHERE id = v_refund_request_id;

  RAISE NOTICE 'Updated refund request to use new campaign';

  -- Step 3: Reset the old campaign's refund flags
  UPDATE campaigns
  SET
    expiration_refund_initiated = FALSE,
    expiration_refund_completed = FALSE,
    grace_period_ends_at = NULL,
    updated_at = NOW()
  WHERE id = v_old_campaign_id;

  RAISE NOTICE 'Reset old campaign refund flags';

  -- Step 4: Set the new campaign's refund flags
  UPDATE campaigns
  SET
    expiration_refund_initiated = TRUE,
    grace_period_ends_at = (
      SELECT grace_period_ends_at
      FROM milestone_refund_requests
      WHERE id = v_refund_request_id
    ),
    updated_at = NOW()
  WHERE id = v_new_campaign_id;

  RAISE NOTICE 'Set new campaign refund flags';

  -- Step 5: Show summary
  RAISE NOTICE '====================================';
  RAISE NOTICE 'SUCCESS! Campaign ID updated from % to %', v_old_campaign_id, v_new_campaign_id;
  RAISE NOTICE 'Refund Request ID: %', v_refund_request_id;
  RAISE NOTICE 'Charity ID: %', v_charity_id;
  RAISE NOTICE '====================================';

END $$;

-- Verify the changes
SELECT
  'Refund Request' as record_type,
  id,
  campaign_id,
  charity_id,
  trigger_type,
  total_amount,
  total_donors_count,
  status,
  decision_deadline
FROM milestone_refund_requests
WHERE trigger_type IN ('campaign_expiration', 'campaign_cancellation')
  AND milestone_id IS NULL
ORDER BY created_at DESC
LIMIT 1;

-- Show the campaign details
SELECT
  'Campaign' as record_type,
  id,
  title,
  status,
  expiration_refund_initiated,
  grace_period_ends_at,
  current_amount,
  goal_amount
FROM campaigns
WHERE id = '2f2145ef-2043-461d-80e9-44f43aa320db';
