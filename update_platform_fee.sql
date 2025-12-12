-- Fix configured platform fee to 0.5% (was 1.5%)
-- This resolves the 10 peso calculation discrepancy
UPDATE public.platform_settings
SET value = '0.5'
WHERE key = 'platform_fee_percentage';
