# Payment Integration Implementation Plan - ClearCause
## GCash & Philippine Payment Methods Integration

---

## Executive Summary

This document outlines the implementation plan for integrating payment processing into the ClearCause donation platform, with primary focus on GCash payment integration. The platform will support multiple Philippine payment methods through PayMongo or Xendit payment gateways.

**Last Updated:** October 12, 2025
**Status:** Research & Planning Phase

---

## Table of Contents

1. [Current System Analysis](#current-system-analysis)
2. [Payment Gateway Comparison](#payment-gateway-comparison)
3. [Recommended Architecture](#recommended-architecture)
4. [Database Schema Changes](#database-schema-changes)
5. [Implementation Roadmap](#implementation-roadmap)
6. [Technical Specifications](#technical-specifications)
7. [Security Considerations](#security-considerations)
8. [Testing Strategy](#testing-strategy)

---

## Current System Analysis

### Existing Infrastructure

**Stack:**
- Frontend: React + TypeScript + Vite
- Backend: Supabase (PostgreSQL + Edge Functions)
- State Management: React Context (useAuth)
- UI Components: Shadcn/ui + Tailwind CSS

### Current Donation Flow

```
User selects campaign → Donation form →
createDonation() → Mock transaction →
setTimeout(2000ms) → Success page
```

**Issues with Current Implementation:**
1. ❌ Mock payment processing using `setTimeout`
2. ❌ Fake transaction IDs: `TXN_${Date.now()}_${Math.random()}`
3. ❌ No actual payment gateway integration
4. ❌ No webhook handling for payment callbacks
5. ❌ Status changes happen automatically without real payment

**Existing Database Schema:**

```sql
donations table:
- id (uuid)
- user_id (uuid)
- campaign_id (uuid)
- amount (numeric)
- payment_method (text)  ← "gcash", "paymaya", "card", "bank"
- transaction_id (text)   ← Currently mock
- status (enum)           ← "pending", "completed", "failed", "refunded"
- donated_at (timestamptz)
- message (text)
- is_anonymous (boolean)
- updated_at (timestamptz)
```

---

## Payment Gateway Comparison

### Option 1: PayMongo (Recommended ⭐)

**Pros:**
- ✅ Philippine-based company, better local support
- ✅ Extensive documentation and resources
- ✅ Supports GCash, Maya, cards, bank transfers
- ✅ Built-in webhook system
- ✅ Sandbox environment available
- ✅ Active developer community in PH
- ✅ Competitive pricing for nonprofits

**Cons:**
- ⚠️ Requires manual account application
- ⚠️ May have stricter KYC requirements

**Pricing:**
- GCash/Maya: 2.5% + ₱15 per transaction
- Cards: 3.5% + ₱15 per transaction
- Bank transfers: 2.0% + ₱10 per transaction

**API Approach:**
- Uses "Source" resources for e-wallets
- Checkout Sessions API for unified experience
- Webhooks for async payment confirmation

---

## Recommended Architecture

### Architecture Decision: **PayMongo with Supabase Edge Functions**

**Why this approach:**
1. **No separate Node.js backend needed** - Use Supabase Edge Functions
2. **Serverless & scalable** - Pay only for what you use
3. **Secure** - API keys stay server-side
4. **TypeScript support** - Consistent language across stack

### System Architecture Diagram

```
┌─────────────────┐
│   React App     │
│   (Frontend)    │
└────────┬────────┘
         │
         │ 1. Create donation
         ├─────────────────────────────┐
         │                             │
         ▼                             ▼
┌─────────────────────┐      ┌──────────────────┐
│   Supabase DB       │      │  Edge Function   │
│   (donations table) │      │  /create-payment │
└─────────────────────┘      └────────┬─────────┘
                                      │
                                      │ 2. Create PayMongo checkout
                                      │
                                      ▼
                             ┌─────────────────┐
                             │  PayMongo API   │
                             │  (Payment GW)   │
                             └────────┬────────┘
                                      │
                                      │ 3. Redirect URL
         ┌────────────────────────────┘
         │
         ▼
┌─────────────────┐
│   GCash App     │  4. User authorizes payment
│   (Deep Link)   │
└────────┬────────┘
         │
         │ 5. Payment completed
         │
         ▼
┌─────────────────────┐
│  PayMongo Webhook   │
│  Edge Function      │  6. Update donation status
│  /webhook/paymongo  │
└─────────┬───────────┘
          │
          ▼
┌──────────────────┐
│   Supabase DB    │  7. Status → "completed"
│   + Update       │     Campaign amount updated
│   Campaign       │
└──────────────────┘
          │
          │ 8. Redirect to success page
          ▼
┌─────────────────┐
│   Success Page  │
│   (Frontend)    │
└─────────────────┘
```

---

## Database Schema Changes

### New Tables Required

#### 1. `payment_sessions` table

Tracks active payment checkout sessions before completion.

```sql
CREATE TABLE payment_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donation_id UUID NOT NULL REFERENCES donations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Payment Gateway Info
  provider VARCHAR(20) NOT NULL CHECK (provider IN ('paymongo', 'xendit', 'maya')),
  provider_session_id TEXT NOT NULL,  -- PayMongo checkout session ID
  provider_source_id TEXT,            -- PayMongo source ID (for ewallets)

  -- Session Details
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(3) DEFAULT 'PHP',
  payment_method VARCHAR(20) NOT NULL,

  -- URLs
  checkout_url TEXT,                  -- URL to redirect user
  success_url TEXT,
  cancel_url TEXT,

  -- Status
  status VARCHAR(20) DEFAULT 'created' CHECK (
    status IN ('created', 'pending', 'succeeded', 'failed', 'expired', 'cancelled')
  ),

  -- Metadata
  metadata JSONB,

  -- Timestamps
  expires_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payment_sessions_donation ON payment_sessions(donation_id);
CREATE INDEX idx_payment_sessions_user ON payment_sessions(user_id);
CREATE INDEX idx_payment_sessions_provider_id ON payment_sessions(provider_session_id);
CREATE INDEX idx_payment_sessions_status ON payment_sessions(status);
```

#### 2. `webhook_events` table

Logs all webhook events from payment providers for debugging and audit.

```sql
CREATE TABLE webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Provider Info
  provider VARCHAR(20) NOT NULL CHECK (provider IN ('paymongo', 'xendit', 'maya')),
  event_id TEXT UNIQUE NOT NULL,      -- Provider's event ID
  event_type TEXT NOT NULL,           -- e.g., "source.chargeable", "payment.paid"

  -- Related Records
  payment_session_id UUID REFERENCES payment_sessions(id),
  donation_id UUID REFERENCES donations(id),

  -- Event Data
  payload JSONB NOT NULL,             -- Full webhook payload

  -- Processing Status
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  -- Timestamps
  received_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_webhook_events_provider_event ON webhook_events(provider, event_id);
CREATE INDEX idx_webhook_events_session ON webhook_events(payment_session_id);
CREATE INDEX idx_webhook_events_donation ON webhook_events(donation_id);
CREATE INDEX idx_webhook_events_processed ON webhook_events(processed);
CREATE INDEX idx_webhook_events_type ON webhook_events(event_type);
```

#### 3. `recurring_donations` table (Future - Phase 2)

For recurring donation support (not in MVP).

```sql
CREATE TABLE recurring_donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,

  -- Payment Info
  provider VARCHAR(20) NOT NULL,
  subscription_id TEXT NOT NULL,      -- PayMongo subscription ID
  payment_method VARCHAR(20) NOT NULL,

  -- Recurring Details
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  frequency VARCHAR(20) NOT NULL CHECK (
    frequency IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly')
  ),

  -- Schedule
  next_charge_date DATE,
  last_charge_date DATE,

  -- Status
  status VARCHAR(20) DEFAULT 'active' CHECK (
    status IN ('active', 'paused', 'cancelled', 'failed')
  ),

  -- Metadata
  metadata JSONB,

  -- Timestamps
  started_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_recurring_donations_user ON recurring_donations(user_id);
CREATE INDEX idx_recurring_donations_campaign ON recurring_donations(campaign_id);
CREATE INDEX idx_recurring_donations_status ON recurring_donations(status);
CREATE INDEX idx_recurring_donations_next_charge ON recurring_donations(next_charge_date);
```

### Modifications to Existing Tables

#### Update `donations` table

Add provider-specific fields:

```sql
ALTER TABLE donations
ADD COLUMN provider VARCHAR(20),                    -- 'paymongo', 'xendit', etc.
ADD COLUMN provider_payment_id TEXT,                -- Payment intent/charge ID
ADD COLUMN payment_session_id UUID REFERENCES payment_sessions(id),
ADD COLUMN failure_reason TEXT,                     -- Error message if failed
ADD COLUMN metadata JSONB;                          -- Additional payment data

CREATE INDEX idx_donations_provider_payment ON donations(provider_payment_id);
CREATE INDEX idx_donations_payment_session ON donations(payment_session_id);
```

---

## Implementation Roadmap

### Phase 1: Foundation & GCash (Week 1-2)

**Goals:**
- ✅ Set up PayMongo account and get API keys
- ✅ Create Supabase Edge Functions for payment processing
- ✅ Implement GCash payment flow
- ✅ Set up webhook handlers
- ✅ Update database schema

**Deliverables:**
1. PayMongo account setup (sandbox + production)
2. Database migrations for new tables
3. Edge Function: `/create-gcash-payment`
4. Edge Function: `/webhook/paymongo`
5. Updated React donation flow
6. Sandbox testing completed

### Phase 2: Additional Payment Methods (Week 3)

**Goals:**
- ✅ Add PayMaya/Maya support
- ✅ Add Credit Card support
- ✅ Add Bank Transfer support (InstaPay/PESONet)

**Deliverables:**
1. Edge Function: `/create-payment` (unified for all methods)
2. Payment method selection UI improvements
3. Complete payment method testing

### Phase 3: Webhooks & Error Handling (Week 4)

**Goals:**
- ✅ Robust webhook processing
- ✅ Payment failure handling
- ✅ Retry mechanisms
- ✅ Admin notification system

**Deliverables:**
1. Webhook event logging
2. Failed payment retry logic
3. Admin dashboard for payment monitoring
4. Email notifications for failed payments

### Phase 4: Testing & Security (Week 5)

**Goals:**
- ✅ Comprehensive testing in sandbox
- ✅ Security audit
- ✅ Load testing
- ✅ Documentation

**Deliverables:**
1. Test suite for payment flows
2. Security review checklist completed
3. Load testing results
4. API documentation

### Phase 5: Production Launch (Week 6)

**Goals:**
- ✅ Switch to production keys
- ✅ Monitor real transactions
- ✅ Gradual rollout

**Deliverables:**
1. Production deployment
2. Monitoring dashboards
3. Support documentation
4. Launch announcement

### Phase 6: Recurring Donations (Week 7-8) - Optional

**Goals:**
- ✅ Implement recurring donation subscriptions
- ✅ Subscription management UI
- ✅ Automated charge processing

---

## Technical Specifications

### Environment Variables

```env
# PayMongo Configuration
VITE_PAYMONGO_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYMONGO_SECRET_KEY=sk_test_xxxxxxxxxxxxx  # Server-side only
PAYMONGO_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# App URLs
VITE_APP_URL=http://localhost:5173
VITE_API_URL=https://your-project.supabase.co/functions/v1

# Payment Settings
VITE_PAYMENT_MODE=sandbox  # 'sandbox' or 'live'
PAYMENT_SUCCESS_URL=/donate/success
PAYMENT_CANCEL_URL=/donate/error
```

### Supabase Edge Function: `create-gcash-payment`

**Location:** `supabase/functions/create-gcash-payment/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const PAYMONGO_SECRET_KEY = Deno.env.get('PAYMONGO_SECRET_KEY')!;
const PAYMONGO_API_URL = 'https://api.paymongo.com/v1';

interface CreatePaymentRequest {
  donationId: string;
  amount: number;
  userId: string;
}

serve(async (req) => {
  try {
    // 1. Parse request
    const { donationId, amount, userId }: CreatePaymentRequest = await req.json();

    // 2. Validate donation exists and is pending
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: donation, error: donationError } = await supabase
      .from('donations')
      .select('*')
      .eq('id', donationId)
      .eq('user_id', userId)
      .eq('status', 'pending')
      .single();

    if (donationError || !donation) {
      return new Response(
        JSON.stringify({ error: 'Invalid donation' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Create PayMongo Source for GCash
    const amountInCentavos = Math.round(amount * 100); // Convert to centavos

    const sourceResponse = await fetch(`${PAYMONGO_API_URL}/sources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(PAYMONGO_SECRET_KEY + ':')}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            type: 'gcash',
            amount: amountInCentavos,
            currency: 'PHP',
            redirect: {
              success: `${Deno.env.get('VITE_APP_URL')}/donate/success?donation_id=${donationId}`,
              failed: `${Deno.env.get('VITE_APP_URL')}/donate/error?donation_id=${donationId}`,
            },
          },
        },
      }),
    });

    const sourceData = await sourceResponse.json();

    if (!sourceResponse.ok) {
      throw new Error(sourceData.errors?.[0]?.detail || 'Failed to create payment source');
    }

    const source = sourceData.data;

    // 4. Save payment session
    const { data: session, error: sessionError } = await supabase
      .from('payment_sessions')
      .insert({
        donation_id: donationId,
        user_id: userId,
        provider: 'paymongo',
        provider_source_id: source.id,
        amount: amount,
        currency: 'PHP',
        payment_method: 'gcash',
        checkout_url: source.attributes.redirect.checkout_url,
        success_url: source.attributes.redirect.success,
        cancel_url: source.attributes.redirect.failed,
        status: 'created',
        expires_at: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour expiry
        metadata: {
          source_status: source.attributes.status,
        },
      })
      .select()
      .single();

    if (sessionError) {
      console.error('Failed to save payment session:', sessionError);
      // Continue anyway, don't block user
    }

    // 5. Update donation with session reference
    await supabase
      .from('donations')
      .update({
        payment_session_id: session?.id,
        provider: 'paymongo',
        metadata: {
          source_id: source.id,
        },
      })
      .eq('id', donationId);

    // 6. Return checkout URL
    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: source.attributes.redirect.checkout_url,
        sessionId: session?.id,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Payment creation error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to create payment',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
```

### Supabase Edge Function: `webhook-paymongo`

**Location:** `supabase/functions/webhook-paymongo/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const PAYMONGO_WEBHOOK_SECRET = Deno.env.get('PAYMONGO_WEBHOOK_SECRET')!;

serve(async (req) => {
  try {
    // 1. Verify webhook signature (PayMongo security)
    const signature = req.headers.get('paymongo-signature');
    const body = await req.text();

    // TODO: Implement signature verification
    // const isValid = verifyWebhookSignature(body, signature, PAYMONGO_WEBHOOK_SECRET);
    // if (!isValid) {
    //   return new Response('Invalid signature', { status: 401 });
    // }

    const event = JSON.parse(body);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 2. Log webhook event
    const { data: loggedEvent } = await supabase
      .from('webhook_events')
      .insert({
        provider: 'paymongo',
        event_id: event.data.id,
        event_type: event.data.attributes.type,
        payload: event,
        processed: false,
      })
      .select()
      .single();

    // 3. Handle different event types
    const eventType = event.data.attributes.type;
    const resource = event.data.attributes.data;

    switch (eventType) {
      case 'source.chargeable': {
        // Source is ready to be charged (user completed GCash authorization)
        const sourceId = resource.id;

        // Find the donation associated with this source
        const { data: donation } = await supabase
          .from('donations')
          .select('*, payment_sessions(*)')
          .eq('metadata->>source_id', sourceId)
          .single();

        if (!donation) {
          console.error('Donation not found for source:', sourceId);
          break;
        }

        // Create a Payment to actually charge the source
        const paymentResponse = await fetch('https://api.paymongo.com/v1/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(Deno.env.get('PAYMONGO_SECRET_KEY')! + ':')}`,
          },
          body: JSON.stringify({
            data: {
              attributes: {
                amount: Math.round(donation.amount * 100),
                currency: 'PHP',
                source: {
                  id: sourceId,
                  type: 'source',
                },
              },
            },
          }),
        });

        const paymentData = await paymentResponse.json();

        if (paymentResponse.ok) {
          const payment = paymentData.data;

          // Update donation status
          await supabase
            .from('donations')
            .update({
              status: 'completed',
              provider_payment_id: payment.id,
              updated_at: new Date().toISOString(),
            })
            .eq('id', donation.id);

          // Update payment session
          if (donation.payment_session_id) {
            await supabase
              .from('payment_sessions')
              .update({
                status: 'succeeded',
                completed_at: new Date().toISOString(),
                metadata: {
                  payment_id: payment.id,
                  payment_status: payment.attributes.status,
                },
              })
              .eq('id', donation.payment_session_id);
          }

          // Update campaign amount
          await supabase.rpc('increment_campaign_amount', {
            campaign_id: donation.campaign_id,
            amount: donation.amount,
          });

          // Mark webhook as processed
          await supabase
            .from('webhook_events')
            .update({
              processed: true,
              processed_at: new Date().toISOString(),
              donation_id: donation.id,
              payment_session_id: donation.payment_session_id,
            })
            .eq('id', loggedEvent.id);
        }

        break;
      }

      case 'payment.paid': {
        // Direct payment completed (for cards)
        const paymentId = resource.id;

        await supabase
          .from('donations')
          .update({
            status: 'completed',
            updated_at: new Date().toISOString(),
          })
          .eq('provider_payment_id', paymentId);

        // Mark webhook as processed
        await supabase
          .from('webhook_events')
          .update({
            processed: true,
            processed_at: new Date().toISOString(),
          })
          .eq('id', loggedEvent.id);

        break;
      }

      case 'payment.failed': {
        // Payment failed
        const paymentId = resource.id;
        const failureReason = resource.attributes.last_payment_error?.message;

        await supabase
          .from('donations')
          .update({
            status: 'failed',
            failure_reason: failureReason,
            updated_at: new Date().toISOString(),
          })
          .eq('provider_payment_id', paymentId);

        // Mark webhook as processed
        await supabase
          .from('webhook_events')
          .update({
            processed: true,
            processed_at: new Date().toISOString(),
          })
          .eq('id', loggedEvent.id);

        break;
      }

      default:
        console.log('Unhandled event type:', eventType);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
```

### Updated React Donation Service

**Location:** `src/services/donationService.ts`

Add new function for creating payment:

```typescript
/**
 * Create GCash payment session
 */
export const createGCashPayment = async (
  donationId: string,
  amount: number,
  userId: string
): Promise<ApiResponse<{ checkoutUrl: string; sessionId: string }>> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/create-gcash-payment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.auth.session()?.access_token}`,
        },
        body: JSON.stringify({
          donationId,
          amount,
          userId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create payment');
    }

    return createSuccessResponse(data);
  } catch (error) {
    console.error('Create GCash payment error:', error);
    throw error;
  }
};
```

### Updated Donate Page Component

**Location:** `src/pages/Donate.tsx`

Update the `handleProceedToPayment` function:

```typescript
const handleProceedToPayment = async () => {
  // ... existing validation ...

  try {
    setIsSubmitting(true);
    setError(null);

    // 1. Create donation record
    const donationData = {
      campaignId,
      amount,
      paymentMethod,
      message: message.trim() || undefined,
      isAnonymous,
    };

    const donationResult = await donationService.createDonation(donationData, user.id);

    if (!donationResult.success || !donationResult.data) {
      throw new Error(donationResult.error || 'Failed to create donation');
    }

    const donation = donationResult.data;

    // 2. Create payment session based on payment method
    if (paymentMethod === 'gcash') {
      const paymentResult = await donationService.createGCashPayment(
        donation.id,
        amount,
        user.id
      );

      if (paymentResult.success && paymentResult.data?.checkoutUrl) {
        // Redirect to GCash payment page
        window.location.href = paymentResult.data.checkoutUrl;
      } else {
        throw new Error('Failed to create payment session');
      }
    } else {
      // Handle other payment methods
      // TODO: Implement PayMaya, Card, Bank Transfer
      throw new Error('Payment method not yet implemented');
    }

  } catch (err: any) {
    console.error('Donation error:', err);
    setError(err.message || 'An unexpected error occurred. Please try again.');

    navigate('/donate/error', {
      state: {
        error: err.message || 'An unexpected error occurred',
        campaignId,
      },
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Security Considerations

### 1. API Key Management

**CRITICAL - Never expose secret keys in frontend:**

```typescript
// ❌ WRONG - Never do this
const PAYMONGO_SECRET_KEY = 'sk_live_xxxxx';  // In React component

// ✅ CORRECT - Use environment variables in Edge Functions only
const PAYMONGO_SECRET_KEY = Deno.env.get('PAYMONGO_SECRET_KEY');
```

**Best Practices:**
- Store secret keys in Supabase Secrets (Settings → Edge Functions → Secrets)
- Use public keys (`pk_`) in frontend, secret keys (`sk_`) in Edge Functions only
- Never commit `.env` files with real keys to Git
- Use separate keys for sandbox and production

### 2. Webhook Security

**Verify webhook signatures:**

```typescript
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = createHmac('sha256', secret);
  hmac.update(payload);
  const digest = hmac.digest('hex');
  return signature === digest;
}
```

**Additional webhook security:**
- Use HTTPS endpoints only
- Whitelist PayMongo IP addresses (if supported)
- Implement replay attack protection (check timestamp)
- Log all webhook events for audit trail

### 3. Amount Validation

Always validate amounts on both frontend and backend:

```typescript
// Frontend validation
if (amount < 100) {
  setError('Minimum donation amount is ₱100');
  return;
}

// Backend validation (Edge Function)
if (amount < 100 || amount > 1000000) {
  return new Response(
    JSON.stringify({ error: 'Invalid amount' }),
    { status: 400 }
  );
}
```

### 4. CSRF Protection

Use Supabase authentication tokens:

```typescript
headers: {
  'Authorization': `Bearer ${supabase.auth.session()?.access_token}`,
}
```

### 5. Rate Limiting

Implement rate limiting on Edge Functions:

```typescript
// Use Supabase rate limiting or implement custom logic
const MAX_REQUESTS_PER_MINUTE = 10;
```

### 6. PCI DSS Compliance

**For Credit Cards:**
- ✅ Use PayMongo's hosted checkout (they handle PCI compliance)
- ❌ Never store credit card numbers in your database
- ❌ Never handle raw card data in your application

---

## Testing Strategy

### Sandbox Testing

**PayMongo Test Cards:**

```
GCash Test Number: Use any mobile number in sandbox
Test Cards:
  - Success: 4343434343434345
  - Declined: 4571736000000075
  - Insufficient Funds: 4571736000000083
```

**Test Scenarios:**

1. **Successful GCash Payment:**
   - Create donation → Redirect to GCash → Authorize → Webhook → Status updated

2. **Failed Payment:**
   - User cancels on GCash page → Webhook → Status = failed

3. **Expired Session:**
   - Don't complete payment within expiry time → Session expires

4. **Duplicate Webhook:**
   - Ensure idempotency (same webhook delivered twice)

5. **Concurrent Donations:**
   - Multiple donations from same user simultaneously

### Test Checklist

**Before Production:**
- [ ] All payment methods tested in sandbox
- [ ] Webhook events logged correctly
- [ ] Failed payments handled gracefully
- [ ] Success/error pages display correctly
- [ ] Email notifications sent
- [ ] Campaign amounts update correctly
- [ ] Concurrent payments don't cause race conditions
- [ ] Security audit passed
- [ ] Load testing completed
- [ ] Database migrations tested
- [ ] Rollback plan documented

---

## Migration Plan

### Step-by-Step Database Migration

```sql
-- Run in order:

-- 1. Create payment_sessions table
CREATE TABLE payment_sessions (...);

-- 2. Create webhook_events table
CREATE TABLE webhook_events (...);

-- 3. Alter donations table
ALTER TABLE donations ADD COLUMN provider VARCHAR(20);
ALTER TABLE donations ADD COLUMN provider_payment_id TEXT;
ALTER TABLE donations ADD COLUMN payment_session_id UUID REFERENCES payment_sessions(id);
ALTER TABLE donations ADD COLUMN failure_reason TEXT;
ALTER TABLE donations ADD COLUMN metadata JSONB;

-- 4. Create indexes
CREATE INDEX idx_donations_provider_payment ON donations(provider_payment_id);
-- ... (all other indexes from schema section)

-- 5. Create RPC function for campaign amount increment (if not exists)
CREATE OR REPLACE FUNCTION increment_campaign_amount(
  campaign_id UUID,
  amount NUMERIC
)
RETURNS VOID AS $$
BEGIN
  UPDATE campaigns
  SET
    current_amount = current_amount + amount,
    donors_count = donors_count + 1,
    updated_at = NOW()
  WHERE id = campaign_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Monitoring & Maintenance

### Metrics to Track

1. **Payment Success Rate:** `completed / (completed + failed) * 100%`
2. **Average Payment Time:** Time from initiation to completion
3. **Webhook Processing Time:** Time to process webhook events
4. **Failed Payment Reasons:** Group by failure_reason
5. **Payment Method Distribution:** GCash vs Card vs Others

### Alerts to Set Up

- Payment success rate drops below 95%
- Webhook processing fails
- Unusual spike in failed payments
- Payment session expiration rate > 30%

### Regular Maintenance

**Weekly:**
- Review failed payments
- Check webhook event logs for errors
- Monitor payment success rates

**Monthly:**
- Review PayMongo transaction fees
- Analyze payment method preferences
- Update test scenarios

**Quarterly:**
- Security audit
- Performance optimization
- Documentation updates

---

## Next Steps

### Immediate Actions

1. **Sign up for PayMongo:**
   - Go to https://dashboard.paymongo.com/signup
   - Complete business verification
   - Get sandbox API keys

2. **Set up development environment:**
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Initialize Supabase locally
   supabase init

   # Create Edge Functions
   supabase functions new create-gcash-payment
   supabase functions new webhook-paymongo
   ```

3. **Run database migrations:**
   ```bash
   # Create migration file
   supabase migration new add_payment_tables

   # Apply migration
   supabase db push
   ```

4. **Test in sandbox:**
   - Create test donation
   - Complete GCash payment flow
   - Verify webhook processing

### Questions to Resolve

- [ ] Do we want to support recurring donations in Phase 1 or Phase 2?
- [ ] Should we implement payment retries for failed transactions?
- [ ] What email templates do we need for payment notifications?
- [ ] Do we need SMS notifications for payment confirmations?
- [ ] Should we add a payment history page for donors?

---

## Resources

### Documentation

- PayMongo API Docs: https://developers.paymongo.com
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Supabase Auth: https://supabase.com/docs/guides/auth
- React Router: https://reactrouter.com

### Support

- PayMongo Support: support@paymongo.com
- Supabase Discord: https://discord.supabase.com
- ClearCause Dev Team: [Internal contact]

---

**Document Status:** Draft v1.0
**Last Updated:** October 12, 2025
**Next Review:** After PayMongo account setup
