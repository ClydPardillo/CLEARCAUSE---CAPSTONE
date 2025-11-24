# ClearCause Payment System Setup & Testing Guide

**Date:** November 23, 2025
**Sprint Goal:** Complete GCash payment system for capstone presentation (1-2 weeks)

---

## Phase 1: PayMongo Webhook Configuration

### Step 1: Get Webhook Secret (TEAMMATE TASK)

**Person Responsible:** Team member with PayMongo dashboard access

**Instructions:**
1. Log in to PayMongo Dashboard: https://dashboard.paymongo.com/
2. Navigate to **Developers** > **Webhooks**
3. Look for existing webhook OR create a new one:
   - **Webhook URL:** `https://tepzdudbazbmydjugvwg.supabase.co/functions/v1/webhook-paymongo`
   - **Events to listen for:**
     - `payment.paid`
     - `payment.failed`
     - `source.chargeable`
4. After creating/finding the webhook, click on it to view details
5. **Copy the Webhook Signing Secret** (starts with `whsec_...`)
6. Share this secret securely with the dev team

**Security Note:** Never commit this secret to git or share it publicly!

---

### Step 2: Configure Webhook Secret in Supabase

Once you have the webhook secret from PayMongo:

```bash
# Set the webhook secret in Supabase
supabase secrets set PAYMONGO_WEBHOOK_SECRET=whsec_your_actual_secret_here

# Verify it's set
supabase secrets list
```

---

### Step 3: Verify Edge Function Deployment

Check that webhook handling is properly deployed:

```bash
# Check deployed functions
supabase functions list

# Redeploy webhook function if needed (should be v19+)
supabase functions deploy webhook-paymongo
```

**Expected Result:** Webhook function version should be v19 or higher (has signature verification enabled)

---

## Phase 2: Comprehensive Payment Testing Checklist

### Pre-Testing Setup

- [ ] Webhook secret configured in Supabase
- [ ] PayMongo webhook URL configured in dashboard
- [ ] Dev server running (`npm run dev`)
- [ ] Test donor account created
- [ ] Test campaign available (with active status)

---

### Test Case 1: Successful GCash Payment Flow

**Objective:** Verify complete end-to-end payment with GCash

**Steps:**
1. [ ] Log in as a donor (HopeGiver role)
2. [ ] Navigate to an active campaign
3. [ ] Click "Donate Now" button
4. [ ] Enter donation amount (e.g., ₱100)
5. [ ] Select GCash as payment method
6. [ ] Click "Proceed to Payment"
7. [ ] Verify PayMongo checkout page opens
8. [ ] Complete GCash test payment (use PayMongo test credentials)
9. [ ] Wait for redirect back to ClearCause

**Expected Results:**
- [ ] Payment session created in `payment_sessions` table
- [ ] Donation record created with status = 'pending'
- [ ] After webhook: Donation status updated to 'completed'
- [ ] Campaign `current_amount` increased by donation amount
- [ ] Campaign `donors_count` incremented by 1
- [ ] Notification created for donor (payment confirmation)
- [ ] Notification created for charity (new donation)
- [ ] Webhook event logged in `webhook_events` table
- [ ] Receipt PDF downloadable from donor dashboard

**Database Verification Queries:**
```sql
-- Check payment session
SELECT * FROM payment_sessions
WHERE user_id = 'your_donor_id'
ORDER BY created_at DESC LIMIT 1;

-- Check donation record
SELECT * FROM donations
WHERE donor_id = 'your_donor_id'
ORDER BY created_at DESC LIMIT 1;

-- Check campaign amount updated
SELECT current_amount, donors_count
FROM campaigns
WHERE id = 'campaign_id';

-- Check notifications created
SELECT * FROM notifications
WHERE user_id IN ('donor_id', 'charity_id')
ORDER BY created_at DESC LIMIT 5;

-- Check webhook event
SELECT * FROM webhook_events
ORDER BY created_at DESC LIMIT 1;
```

---

### Test Case 2: Failed Payment Handling

**Objective:** Verify system handles payment failures gracefully

**Steps:**
1. [ ] Initiate donation flow
2. [ ] On PayMongo checkout page, trigger payment failure
   - Use invalid test credentials
   - OR click "Cancel" to abandon payment
3. [ ] Return to ClearCause

**Expected Results:**
- [ ] Donation status remains 'pending' or updates to 'failed'
- [ ] Campaign amounts NOT incremented
- [ ] User notified of payment failure (if applicable)
- [ ] Webhook event logged with failure details
- [ ] No duplicate records created

---

### Test Case 3: Multiple Donations from Same Donor

**Objective:** Ensure donors_count increments correctly

**Steps:**
1. [ ] Complete 1st donation as Donor A → Success
2. [ ] Check `donors_count` increments to 1
3. [ ] Complete 2nd donation as Donor A → Success
4. [ ] Check `donors_count` STAYS at 1 (unique donors)
5. [ ] Complete donation as Donor B → Success
6. [ ] Check `donors_count` increments to 2

**Expected Results:**
- [ ] `donors_count` tracks UNIQUE donors, not total donations
- [ ] `current_amount` increases with each donation

---

### Test Case 4: Webhook Signature Verification

**Objective:** Ensure only authentic PayMongo webhooks are processed

**Steps:**
1. [ ] Send a test webhook with invalid signature:
   ```bash
   curl -X POST https://tepzdudbazbmydjugvwg.supabase.co/functions/v1/webhook-paymongo \
     -H "Content-Type: application/json" \
     -H "paymongo-signature: invalid_signature" \
     -d '{"data": {"type": "event"}}'
   ```
2. [ ] Check Edge Function logs

**Expected Results:**
- [ ] Request rejected with 401 Unauthorized
- [ ] Error message: "Invalid webhook signature"
- [ ] No database changes made
- [ ] Event logged as rejected in `webhook_events`

---

### Test Case 5: Concurrent Donations

**Objective:** Test race conditions and database integrity

**Steps:**
1. [ ] Have 2 donors initiate donations simultaneously
2. [ ] Complete both payments at roughly the same time
3. [ ] Wait for webhooks to process

**Expected Results:**
- [ ] Both donations recorded correctly
- [ ] Campaign amounts accurate (sum of both)
- [ ] `donors_count` = 2
- [ ] No deadlocks or transaction conflicts
- [ ] All notifications created

---

### Test Case 6: Receipt Generation

**Objective:** Verify PDF receipts are generated correctly

**Steps:**
1. [ ] Complete a successful donation
2. [ ] Go to Donor Dashboard → Donation History
3. [ ] Click "Download Receipt" for latest donation

**Expected Results:**
- [ ] PDF downloads without errors
- [ ] Receipt contains:
  - [ ] Donation ID and date
  - [ ] Donor name and email
  - [ ] Campaign name
  - [ ] Amount donated
  - [ ] Payment method (GCash)
  - [ ] Receipt number
  - [ ] ClearCause branding

---

### Test Case 7: Edge Cases

**Objective:** Test boundary conditions

| Test | Steps | Expected Result |
|------|-------|-----------------|
| **Minimum donation** | Donate ₱1 | Payment processes OR validation error if minimum > ₱1 |
| **Large donation** | Donate ₱100,000 | Payment processes successfully |
| **Campaign goal exceeded** | Donate amount that exceeds campaign goal | Payment accepted, campaign shows "Goal Exceeded" |
| **Inactive campaign** | Try to donate to paused/completed campaign | Donation blocked at UI level |
| **Webhook replay** | Manually replay same webhook twice | 2nd webhook ignored (idempotency) |

---

## Phase 3: Critical Security Fixes

### Issue Summary from Database Advisories

**CRITICAL (1):**
- ✅ Security Definer View: `campaign_review_stats` (ERROR level)

**HIGH PRIORITY (18):**
- ✅ Missing `search_path` in 17 functions (WARN level)
- ✅ Leaked password protection disabled (WARN level)

**MEDIUM PRIORITY (for post-launch):**
- ⚠️ 57+ RLS policies with auth performance issues
- ⚠️ 8 unindexed foreign keys
- ⚠️ 25 unused indexes
- ⚠️ Multiple permissive policies

---

### Fix 1: Security Definer View (CRITICAL)

**Issue:** View `campaign_review_stats` defined with SECURITY DEFINER
**Risk:** Executes with creator's permissions instead of querying user's permissions

**Fix Applied:**
```sql
-- Migration to be created
DROP VIEW IF EXISTS public.campaign_review_stats;

CREATE VIEW public.campaign_review_stats
SECURITY INVOKER  -- Changed from SECURITY DEFINER
AS
SELECT
  campaign_id,
  COUNT(*) as total_reviews,
  AVG(rating) as average_rating,
  COUNT(*) FILTER (WHERE status = 'approved') as approved_count
FROM campaign_reviews
GROUP BY campaign_id;
```

---

### Fix 2: Function Search Path (HIGH PRIORITY)

**Issue:** 17 functions missing `search_path` parameter
**Risk:** Search path injection attacks

**Functions to fix:**
1. `increment_campaign_amount` ⚠️ (Payment-critical)
2. `decrement_campaign_amount` ⚠️ (Payment-critical)
3. `update_campaign_rating_stats`
4. `update_charity_transparency_score`
5. `update_campaign_donors_count` ⚠️ (Payment-critical)
6. `create_notification`
7. `get_unread_notification_count`
8. `mark_notification_read`
9. `mark_all_notifications_read`
10. `get_user_profile_safe`
11. `ensure_user_profile`
12. `update_campaigns_search_vector`
13. `search_campaigns`
14. `update_updated_at_column`
15. `handle_new_user`
16. `create_profile_for_user`
17. `create_missing_profile`

**Fix Template:**
```sql
-- Example for increment_campaign_amount
CREATE OR REPLACE FUNCTION public.increment_campaign_amount(
  campaign_id_input uuid,
  amount_input numeric,
  donor_id_input uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp  -- ADD THIS LINE
AS $$
BEGIN
  -- Function body remains the same
  ...
END;
$$;
```

---

### Fix 3: Leaked Password Protection (HIGH PRIORITY)

**Issue:** HaveIBeenPwned password leak protection disabled
**Fix Location:** Supabase Dashboard

**Steps:**
1. Go to https://supabase.com/dashboard/project/tepzdudbazbmydjugvwg
2. Navigate to **Authentication** > **Policies**
3. Find **Password Protection** settings
4. Enable "Check against leaked password databases"
5. Save changes

---

## Phase 4: Demo Preparation

### Demo Accounts to Create

| Role | Email | Purpose |
|------|-------|---------|
| Admin | `admin@clearcause.demo` | Platform management |
| Charity | `charity@clearcause.demo` | Campaign creator |
| Donor | `donor1@clearcause.demo` | Primary donor |
| Donor | `donor2@clearcause.demo` | Secondary donor |

---

### Demo Campaign Requirements

**Campaign Name:** "Building Hope: New Classrooms for Rural Schools"
**Goal:** ₱50,000
**Milestones:**
1. **Planning & Permits** (₱10,000) - Status: Completed
2. **Foundation Work** (₱15,000) - Status: In Progress
3. **Construction** (₱20,000) - Status: Pending
4. **Final Touches** (₱5,000) - Status: Pending

**Sample Donations to Seed:**
- Donor 1: ₱5,000 (with receipt)
- Donor 2: ₱3,000 (with receipt)
- Current progress: ₱8,000 / ₱50,000 (16%)

---

### Presentation Flow (5-7 minutes)

1. **Introduction** (30s)
   - Problem: Lack of transparency in charitable donations
   - Solution: ClearCause platform with milestone-based verification

2. **User Journey Demo** (3 minutes)
   - **Donor perspective:**
     - Browse campaigns
     - Select campaign
     - Make GCash donation (₱500)
     - Show payment processing
     - View receipt PDF
   - **Charity perspective:**
     - View new donation notification
     - Submit milestone proof
   - **Admin perspective:**
     - Verify milestone
     - Approve fund disbursement

3. **Technical Highlights** (2 minutes)
   - Real-time notifications (Supabase Realtime)
   - Secure payment processing (PayMongo + webhooks)
   - Role-based access control (RLS policies)
   - Milestone verification workflow

4. **Impact Metrics** (1 minute)
   - Dashboard showing:
     - Total campaigns created
     - Total donations processed
     - Transparency score metrics
     - Donor trust indicators

5. **Q&A** (remaining time)

---

## Monitoring & Debugging

### Edge Function Logs

```bash
# View webhook logs
supabase functions logs webhook-paymongo

# Debug webhook status
curl https://tepzdudbazbmydjugvwg.supabase.co/functions/v1/debug-webhook-status
```

### Database Queries for Troubleshooting

```sql
-- Check recent payment sessions
SELECT
  ps.*,
  d.status as donation_status,
  d.amount as donation_amount
FROM payment_sessions ps
LEFT JOIN donations d ON ps.donation_id = d.id
ORDER BY ps.created_at DESC
LIMIT 10;

-- Check failed payments
SELECT * FROM donations
WHERE status = 'failed'
ORDER BY created_at DESC;

-- Check webhook processing
SELECT
  event_type,
  processed,
  error_message,
  created_at
FROM webhook_events
ORDER BY created_at DESC
LIMIT 20;

-- Check campaign statistics
SELECT
  c.title,
  c.current_amount,
  c.goal_amount,
  c.donors_count,
  COUNT(d.id) as total_donations,
  SUM(d.amount) as total_amount_sum
FROM campaigns c
LEFT JOIN donations d ON c.id = d.campaign_id
WHERE c.status = 'active'
GROUP BY c.id
ORDER BY c.created_at DESC;
```

---

## Success Criteria

### Payment System Ready for Demo When:

- [x] Webhook secret configured
- [ ] All 7 test cases pass
- [ ] 3 critical security fixes applied
- [ ] Demo accounts created
- [ ] Sample campaign with donations seeded
- [ ] Receipt PDF generation tested
- [ ] Presentation flow rehearsed
- [ ] Backup plan prepared (in case of live demo issues)

---

## Known Limitations (Acceptable for Capstone)

1. **Email Notifications:** Not implemented (use in-app notifications only)
2. **Payment Methods:** Only GCash available (PayMaya/Cards commented out)
3. **Fund Disbursement:** Manual admin approval (automated transfer not implemented)
4. **Production Mode:** Running in sandbox/test mode only
5. **Performance Optimizations:** Bundle size large, RLS policies not optimized

**Note:** These are documented technical debt items for future development, not blockers for presentation.

---

## Emergency Contacts

| Issue Type | Contact |
|------------|---------|
| PayMongo Access | [Teammate with PayMongo account] |
| Database Issues | Clyd Pardillo |
| Frontend Bugs | Rimar Navaja |
| Edge Functions | Jumel Anthony Labe |
| Documentation | Therese Andrei C. Arcenal |

---

## Next Steps After Testing

1. Document any bugs found during testing
2. Create bug fixes branch for critical issues
3. Final code review with team
4. Practice presentation 2-3 times
5. Prepare backup video demo (in case internet fails)
6. Screenshot key metrics for presentation slides

---

**Last Updated:** November 23, 2025
**Status:** Testing Phase - Awaiting webhook secret configuration
