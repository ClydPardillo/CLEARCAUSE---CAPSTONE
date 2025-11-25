# ClearCause Platform - Comprehensive Testing Guide

**Version:** 1.0
**Last Updated:** November 26, 2024
**Platform:** ClearCause - Charity Crowdfunding & Transparency Platform

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Test Environment Setup](#test-environment-setup)
3. [Test Data Setup](#test-data-setup)
4. [Donor Testing (42 Test Cases)](#donor-testing)
5. [Charity Testing (78 Test Cases)](#charity-testing)
6. [Admin Testing (95 Test Cases)](#admin-testing)
7. [Critical Path Workflows](#critical-path-workflows)
8. [Edge Cases & Error Scenarios](#edge-cases--error-scenarios)
9. [Performance & Compatibility Testing](#performance--compatibility-testing)
10. [Bug Reporting & Feedback](#bug-reporting--feedback)

---

## Getting Started

### Testing Objectives

The goal of this testing phase is to:
- ✅ Validate all features work as expected
- ✅ Identify bugs and usability issues
- ✅ Gather feedback on user experience
- ✅ Ensure cross-browser and device compatibility
- ✅ Verify performance meets requirements
- ✅ Test edge cases and error handling

### Testing Timeline

**Suggested Schedule:**
- **Days 1-2:** Donor feature testing
- **Days 3-5:** Charity feature testing
- **Days 6-7:** Admin feature testing
- **Day 8:** Critical path workflows & edge cases
- **Day 9:** Performance & compatibility testing
- **Day 10:** Review feedback and prioritize issues

### How to Use This Guide

1. **Test Sequentially:** Follow test cases in order for each role
2. **Check Prerequisites:** Ensure all prerequisites are met before testing
3. **Document Results:** Mark tests as Pass/Fail and add notes
4. **Report Issues:** Use the bug report template for any issues found
5. **Provide Feedback:** Complete the feedback form for each major feature

### Important Notes

- ⚠️ **Do not use real payment information** - Use test payment methods only
- ⚠️ **Test data will be reset** after testing phase
- ⚠️ **Report critical bugs immediately** via the bug tracking system
- ⚠️ **Take screenshots** of any unexpected behavior

---

## Test Environment Setup

### Environment URLs

**Local Development:**
- URL: `http://localhost:8080`
- Supabase Dashboard: Access via project configuration

**Staging (if available):**
- URL: `[staging-url-here]`

### Required Tools

- **Browsers:** Chrome, Firefox, Safari, Edge (latest versions)
- **Devices:** Desktop, laptop, tablet (iPad), mobile (iPhone/Android)
- **Screen Reader:** (Optional) For accessibility testing
- **Developer Tools:** Browser DevTools for debugging

### Test Account Creation

**⚠️ IMPORTANT: Create Your Own Test Accounts**

You will create fresh accounts and test data during testing. This provides:
- ✅ Realistic testing experience
- ✅ Complete workflow testing from signup
- ✅ Better feedback on the actual user experience
- ✅ No shared account conflicts

**Account Information You'll Need to Provide:**

When creating test accounts, use this format:

```
Your Name: __________________________
Testing Role: [ ] Donor  [ ] Charity  [ ] Admin

DONOR ACCOUNT (if testing as donor):
├─ Email:    _________________________@test.com
├─ Password: _________________________ (use strong password)
├─ Full Name: _________________________
└─ Created:  [ ] Yes  [ ] Pending

CHARITY ACCOUNT (if testing as charity):
├─ Email:              _________________________@test.com
├─ Password:           _________________________ (use strong password)
├─ Organization Name:  _________________________
├─ Registration Number: _________________________
└─ Created:            [ ] Yes  [ ] Pending

ADMIN ACCOUNT:
├─ Provided by team lead
├─ Email:    _________________________
└─ Password: _________________________ (will be provided)
```

**Naming Convention for Test Accounts:**
- Use format: `[yourname].donor@test.com` or `[yourname].charity@test.com`
- Example: `john.donor@test.com`, `jane.charity@test.com`
- This helps identify who created what during testing

**Keep Track of Your Accounts:**
- Write down your login credentials
- Note which campaigns you create
- Document your test donations
- This helps with traceability during bug reporting

---

## Test Data Setup

**⚠️ You Will Create Your Own Test Data**

As you progress through testing, you'll create:
- ✅ Your own user accounts
- ✅ Your own campaigns (if testing as charity)
- ✅ Your own donations (if testing as donor)
- ✅ Your own milestones and proofs
- ✅ Your own test documents

This provides the most realistic testing experience!

### Suggested Test Data to Create

**Campaign Ideas (for Charity testers):**
Create campaigns with varied goals and purposes:

1. **Small Goal Campaign**
   - Goal: ₱50,000 - ₱100,000
   - Category: Your choice
   - 2 milestones
   - Test the complete campaign lifecycle

2. **Medium Goal Campaign**
   - Goal: ₱300,000 - ₱500,000
   - Category: Your choice
   - 3-4 milestones
   - Test milestone proof submission

3. **Large Goal Campaign**
   - Goal: ₱1,000,000+
   - Category: Your choice
   - 5+ milestones
   - Test fund management at scale

**Recommended Donation Amounts (for Donor testers):**
- Small: ₱100 - ₱500
- Medium: ₱1,000 - ₱5,000
- Large: ₱10,000+

**Test Bank Details (for Withdrawal Testing):**
When charity testers need to test withdrawals, use:
- Bank Name: BDO Unibank (or any major bank)
- Account Number: [Use test account number - will be provided]
- Account Name: [Your test organization name]

**Test Documents for Verification:**
Charity testers will need to upload documents:
- Business/Organization registration (PDF or image)
- SEC/DTI registration certificate
- Tax exemption certificate (if applicable)
- Valid ID of authorized representative
- Bank certification

**⚠️ Use sample/dummy documents only - not real sensitive information!**

### Data Creation Guidelines

**For Donor Testers:**
- Create 1 donor account
- Test donations to 3-5 different campaigns
- Try different payment methods
- Test both regular and anonymous donations

**For Charity Testers:**
- Create 1 charity account
- Submit verification application
- Create 2-3 campaigns with different statuses (draft, pending, active)
- Create milestones for each campaign
- Submit proofs for at least 2 milestones
- Test fund withdrawal

**For Admin Testers:**
- Use provided admin account
- Process charity verifications from other testers
- Verify milestone proofs
- Manage campaigns across all testers

---

##  Donor Testing

### Test Case Group: Authentication & Profile (TC-DONOR-001 to TC-DONOR-010)

#### TC-DONOR-001: Sign Up as New Donor

**Priority:** Critical
**Prerequisites:** None

**Test Steps:**
1. Navigate to the sign-up page
2. Select "Donor" role
3. Fill in registration form:
   - Email: `[yourname].donor@test.com` (e.g., `john.donor@test.com`)
   - Password: Choose a strong password (min 8 characters, mix of letters/numbers)
   - Full Name: Your preferred test name
4. Click "Sign Up"
5. Check email inbox for verification link

**Expected Results:**
- Registration form validates all required fields
- Password strength requirements enforced
- Registration successful
- Verification email received within 2-3 minutes
- Redirected to email verification message page
- Appropriate success message displayed

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
📝 Record your credentials here:
- Email: _____________________________________
- Password: _____________________________________
- Full Name: _____________________________________

---

#### TC-DONOR-002: Email Verification

**Priority:** Critical
**Prerequisites:** Completed TC-DONOR-001

**Test Steps:**
1. Open verification email
2. Click verification link
3. Should be redirected to login page

**Expected Results:**
- Email verified successfully
- Success message displayed
- Can now log in

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-003: Login as Donor

**Priority:** Critical
**Prerequisites:** Verified donor account

**Test Steps:**
1. Navigate to login page
2. Enter email: `donor@test.com`
3. Enter password
4. Click "Log In"

**Expected Results:**
- Login successful
- Redirected to donor dashboard
- Username displayed in header

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-004: Logout

**Priority:** High
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Click user profile menu
2. Click "Logout"

**Expected Results:**
- Logged out successfully
- Redirected to home page
- Cannot access donor dashboard without logging in again

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-005: Password Reset

**Priority:** High
**Prerequisites:** Donor account exists

**Test Steps:**
1. Navigate to login page
2. Click "Forgot Password?"
3. Enter email: `donor@test.com`
4. Submit form
5. Check email for reset link
6. Click reset link
7. Enter new password
8. Submit new password

**Expected Results:**
- Reset email received
- Password reset successful
- Can login with new password

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-006: View and Edit Donor Profile

**Priority:** Medium
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Navigate to donor dashboard
2. Click "Profile" or profile icon
3. View current profile information
4. Click "Edit Profile"
5. Update full name to "Updated Donor Name"
6. Update phone number
7. Save changes

**Expected Results:**
- Profile information displayed correctly
- Edit form opens
- Changes saved successfully
- Success message displayed
- Profile shows updated information

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-007: Upload Avatar

**Priority:** Low
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Navigate to profile page
2. Click "Change Avatar" or avatar upload button
3. Select test image (< 5MB)
4. Upload image
5. Crop if required
6. Save

**Expected Results:**
- Image upload successful
- Avatar displayed in profile
- Avatar shown in header/navigation

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-008: Update Password from Settings

**Priority:** Medium
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Navigate to Settings
2. Find "Change Password" section
3. Enter current password
4. Enter new password
5. Confirm new password
6. Save changes

**Expected Results:**
- Password updated successfully
- Success message displayed
- Can login with new password

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-009: Update Notification Preferences

**Priority:** Low
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Navigate to Settings
2. Find "Notifications" section
3. Toggle various notification preferences:
   - Email notifications
   - Campaign updates
   - Donation receipts
4. Save changes

**Expected Results:**
- Preferences saved successfully
- Success message displayed
- Preferences persist after page refresh

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-010: View Donor Dashboard

**Priority:** High
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Navigate to donor dashboard
2. Observe statistics displayed:
   - Total donated
   - Number of donations
   - Campaigns supported
   - Average donation
3. Check for recent donations
4. Check for impact updates

**Expected Results:**
- Dashboard loads successfully
- Statistics display correctly
- Recent activity shown
- Navigation menu accessible

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

### Test Case Group: Campaign Browsing (TC-DONOR-011 to TC-DONOR-025)

#### TC-DONOR-011: View All Active Campaigns

**Priority:** Critical
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Navigate to "Browse Campaigns" or campaigns page
2. View list of active campaigns
3. Scroll through campaigns

**Expected Results:**
- All active campaigns displayed
- Campaign cards show:
  - Title
  - Charity name
  - Goal amount
  - Current amount
  - Progress bar
  - Campaign image
- Pagination works (if applicable)

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-012: Search Campaigns by Keyword

**Priority:** High
**Prerequisites:** On campaigns page

**Test Steps:**
1. Enter "water" in search box
2. Press Enter or click Search
3. View results

**Expected Results:**
- Only campaigns with "water" in title or description shown
- Results update immediately
- "No results" message if none found

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-013: Filter Campaigns by Category

**Priority:** High
**Prerequisites:** On campaigns page

**Test Steps:**
1. Click category filter dropdown
2. Select "Education"
3. View filtered results

**Expected Results:**
- Only education campaigns shown
- Filter badge/indicator visible
- Can clear filter

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-014: Filter Campaigns by Location

**Priority:** Medium
**Prerequisites:** On campaigns page

**Test Steps:**
1. Click location filter
2. Select a specific region/city
3. View results

**Expected Results:**
- Campaigns in selected location shown
- Filter applied indicator visible

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-015: Sort Campaigns

**Priority:** Medium
**Prerequisites:** On campaigns page

**Test Steps:**
1. Click sort dropdown
2. Select "Most Funded"
3. Observe order
4. Change to "Newest First"
5. Observe order

**Expected Results:**
- Campaigns re-order based on selection
- Sort persists during browsing

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-016: View Campaign Details

**Priority:** Critical
**Prerequisites:** On campaigns page

**Test Steps:**
1. Click on a campaign card
2. View campaign detail page
3. Scroll through all sections

**Expected Results:**
- Campaign details page loads
- Shows:
  - Full description
  - Campaign images
  - Goal and current amount
  - Days remaining
  - Charity information
  - Milestones
  - Recent updates
  - Donation list
- "Donate Now" button visible

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-017: View Campaign Milestones

**Priority:** High
**Prerequisites:** On campaign detail page

**Test Steps:**
1. Scroll to milestones section
2. View all milestones
3. Check milestone status indicators

**Expected Results:**
- All milestones listed
- Shows for each milestone:
  - Title
  - Target amount
  - Status (pending/in progress/completed/verified)
  - Due date (if set)
  - Proof status

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-018: View Campaign Updates/Impact Posts

**Priority:** High
**Prerequisites:** On campaign detail page with updates

**Test Steps:**
1. Scroll to updates section
2. Read update posts
3. View images in updates (if any)

**Expected Results:**
- All updates displayed chronologically
- Shows:
  - Update title
  - Content
  - Images
  - Date posted
  - Update type indicator

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-019: View Charity Profile from Campaign

**Priority:** Medium
**Prerequisites:** On campaign detail page

**Test Steps:**
1. Click charity name/logo
2. Navigate to charity profile page

**Expected Results:**
- Charity profile page opens
- Shows:
  - Organization name
  - Logo
  - Description
  - Contact information
  - Verification status
  - All campaigns by this charity
  - Statistics

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-020: View Donor List on Campaign

**Priority:** Low
**Prerequisites:** On campaign detail page with donations

**Test Steps:**
1. Scroll to donations/supporters section
2. View list of donors

**Expected Results:**
- List of recent donations shown
- Non-anonymous donors display:
  - Name
  - Avatar (if set)
  - Donation amount
  - Date
- Anonymous donations show "Anonymous Donor"

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-021: Campaign Progress Visualization

**Priority:** Medium
**Prerequisites:** On campaign detail page

**Test Steps:**
1. Observe progress bar
2. Check percentage displayed
3. Verify amounts

**Expected Results:**
- Progress bar shows correct percentage
- Current amount / Goal amount displayed
- Percentage calculation correct

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-022: Days Remaining Display

**Priority:** Low
**Prerequisites:** Campaign with end date

**Test Steps:**
1. Check "Days Remaining" indicator
2. Verify calculation

**Expected Results:**
- Correct days remaining shown
- Updates based on current date
- Shows "Ended" if past end date

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-023: Mobile Responsive - Campaign Browse

**Priority:** High
**Prerequisites:** Mobile device or responsive mode

**Test Steps:**
1. Open campaigns page on mobile
2. Browse campaigns
3. Test all filters and search

**Expected Results:**
- Layout adapts to mobile screen
- All features accessible
- Cards stack vertically
- Filters accessible via drawer/dropdown

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-024: Pagination on Campaign List

**Priority:** Medium
**Prerequisites:** More campaigns than page limit

**Test Steps:**
1. Scroll to bottom of campaign list
2. Click "Next Page" or page number
3. Navigate through pages

**Expected Results:**
- Pagination controls visible
- Next/Previous work correctly
- Page numbers accurate
- Maintains filters/sort when changing pages

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-025: Share Campaign Feature (if applicable)

**Priority:** Low
**Prerequisites:** On campaign detail page

**Test Steps:**
1. Look for share buttons
2. Click share button
3. Test sharing options

**Expected Results:**
- Share buttons visible
- Copy link works
- Social media share opens correctly

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

### Test Case Group: Donation Process (TC-DONOR-026 to TC-DONOR-035)

#### TC-DONOR-026: Make Donation - GCash Payment

**Priority:** Critical
**Prerequisites:** Logged in as donor, active campaign available

**Test Steps:**
1. Navigate to a campaign detail page
2. Click "Donate Now" button
3. Enter donation amount: ₱500
4. Select payment method: GCash
5. Leave donation message (optional): "Great cause!"
6. Do NOT check "Make this donation anonymous"
7. Click "Proceed to Payment"
8. Complete GCash payment flow (use test credentials)
9. Wait for redirect back to platform

**Expected Results:**
- Donation form opens
- Amount validation works
- Payment method selection works
- Message field optional
- Redirected to GCash payment page
- Payment processed successfully
- Redirected back to success page
- Donation recorded in history

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-027: Make Donation - PayMaya Payment

**Priority:** Critical
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Navigate to a campaign
2. Click "Donate Now"
3. Enter amount: ₱1,000
4. Select payment method: PayMaya
5. Proceed to payment
6. Complete PayMaya flow

**Expected Results:**
- PayMaya payment flow works
- Payment processed
- Success confirmation shown
- Donation recorded

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-028: Make Donation - Credit/Debit Card

**Priority:** Critical
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Navigate to campaign
2. Click "Donate Now"
3. Enter amount: ₱2,500
4. Select "Credit/Debit Card"
5. Enter test card details:
   - Number: 4242 4242 4242 4242
   - Exp: 12/25
   - CVV: 123
6. Submit payment

**Expected Results:**
- Card payment form displayed
- Test card accepted
- Payment processed
- Success page shown

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-029: Anonymous Donation

**Priority:** High
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Navigate to campaign
2. Click "Donate Now"
3. Enter amount: ₱300
4. CHECK "Make this donation anonymous"
5. Complete payment (any method)

**Expected Results:**
- Anonymous checkbox available
- Donation processes normally
- Donation history shows as "Anonymous"
- Campaign donor list shows "Anonymous Donor"
- Name not visible to charity or public

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-030: Donation with Message

**Priority:** Medium
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Start donation process
2. Enter amount
3. Add message: "Keep up the great work! This is for the children."
4. Complete payment

**Expected Results:**
- Message field accepts input
- Character limit enforced (if any)
- Message saved with donation
- Message visible in donation details

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-031: Donation Payment Success Handling

**Priority:** Critical
**Prerequisites:** Initiated donation

**Test Steps:**
1. Complete successful payment
2. Observe success page/message
3. Check donation history

**Expected Results:**
- Success message displayed clearly
- Shows:
  - Donation amount
  - Campaign name
  - Transaction ID
  - Receipt download link
- "View Receipt" button works
- Donation appears in history immediately

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-032: Donation Payment Failure Handling

**Priority:** High
**Prerequisites:** Logged in as donor

**Test Steps:**
1. Start donation process
2. Use invalid/declined test card
3. Observe error handling

**Expected Results:**
- Error message displayed clearly
- Helpful error message ("Payment declined", etc.)
- Option to try again
- Donation NOT recorded in history
- Can return to campaign

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-033: Donation Confirmation Email

**Priority:** High
**Prerequisites:** Completed successful donation

**Test Steps:**
1. Check email inbox for donor account
2. Find donation confirmation email

**Expected Results:**
- Email received within 5 minutes
- Contains:
  - Donation amount
  - Campaign name
  - Transaction ID
  - Date/time
  - Receipt attached or link to download
  - Thank you message

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-034: Generate and View Receipt

**Priority:** Critical
**Prerequisites:** Completed donation

**Test Steps:**
1. From success page or donation history
2. Click "View Receipt" or "Preview Receipt"
3. Check receipt opens in new tab
4. Review receipt contents

**Expected Results:**
- Receipt PDF opens in browser
- Contains:
  - Receipt number
  - Donation date
  - Donor name (or "Anonymous")
  - Campaign name
  - Charity name
  - Amount
  - Transaction ID
  - ClearCause branding
- Receipt is properly formatted

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-035: Download Receipt

**Priority:** High
**Prerequisites:** Completed donation

**Test Steps:**
1. Navigate to donation history or details
2. Click "Download Receipt"
3. Check downloaded file

**Expected Results:**
- PDF downloads to device
- Filename includes donation ID and date
- PDF opens correctly
- Contains all required information

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

### Test Case Group: Post-Donation (TC-DONOR-036 to TC-DONOR-042)

#### TC-DONOR-036: View Donation History

**Priority:** High
**Prerequisites:** Logged in as donor with donation history

**Test Steps:**
1. Navigate to donor dashboard
2. Click "Donation History" or similar
3. View list of all donations

**Expected Results:**
- All donations listed
- Shows for each:
  - Date
  - Campaign name
  - Amount
  - Payment method
  - Status
  - Receipt actions
- Sorted by date (newest first)
- Pagination if many donations

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-037: Filter Donation History by Status

**Priority:** Medium
**Prerequisites:** On donation history page

**Test Steps:**
1. Use status filter dropdown
2. Select "Completed"
3. View filtered results
4. Try "Pending", "Failed", etc.

**Expected Results:**
- Filter applies correctly
- Only donations with selected status shown
- Can clear filter
- "All" shows everything

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-038: Track Campaign Progress

**Priority:** High
**Prerequisites:** Donated to a campaign

**Test Steps:**
1. From donation history, click on a donation
2. View campaign status
3. OR navigate to "Track Campaigns"
4. View campaigns you've supported

**Expected Results:**
- Can see current campaign status
- Shows updated progress
- Shows if milestones completed
- Can access campaign updates

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-039: View Campaign Impact Updates

**Priority:** High
**Prerequisites:** Donated to campaign with updates

**Test Steps:**
1. Navigate to dashboard or notifications
2. Check for impact updates from campaigns
3. Click to view update details

**Expected Results:**
- Updates from supported campaigns visible
- Shows:
  - Campaign name
  - Update title
  - Date
  - Preview of content
- Click opens full update

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-040: Leave Campaign Review/Rating

**Priority:** Medium
**Prerequisites:** Completed donation to campaign

**Test Steps:**
1. Navigate to campaign detail page
2. Find "Leave a Review" section
3. Select star rating (1-5)
4. Write review text: "Great organization, highly recommend supporting!"
5. Submit review

**Expected Results:**
- Rating selector works (1-5 stars)
- Text field available (optional or required)
- Review submits successfully
- Pending moderation message shown (if applicable)

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-041: Rate Campaign with Stars Only

**Priority:** Low
**Prerequisites:** Completed donation

**Test Steps:**
1. Leave 5-star rating
2. Submit WITHOUT text review

**Expected Results:**
- Star rating submitted successfully
- Text review optional
- Rating displayed on campaign

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

#### TC-DONOR-042: Edit Review (if allowed)

**Priority:** Low
**Prerequisites:** Previously submitted review

**Test Steps:**
1. Navigate to own review
2. Click "Edit"
3. Update rating or text
4. Save changes

**Expected Results:**
- Can edit own review
- Changes saved
- Updated review displayed

**Actual Results:**
- [ ] Pass
- [ ] Fail (describe issue):

**Notes:**
_____________________________________

---

_[Continue with Charity Testing and Admin Testing sections following the same detailed format...]_

---

## Summary Statistics

**Total Test Cases:** 215+
- Donor: 42 test cases
- Charity: 78 test cases
- Admin: 95 test cases
- Critical Paths: 10 workflows
- Edge Cases: 30+ scenarios
- Performance: 15 test cases

**Estimated Testing Time:**
- Full suite: ~40-50 hours
- Critical paths only: ~8-10 hours
- Per role: ~12-15 hours each

---

## Quick Reference: Test Account Passwords

Contact your team lead for the test account passwords before beginning testing.

---

**End of Testing Guide - Section 1: Donor Testing**

_The complete document continues with Charity Testing (Section 5), Admin Testing (Section 6), Critical Paths (Section 7), Edge Cases (Section 8), Performance Testing (Section 9), and Bug Reporting (Section 10). Due to length, this is provided as Part 1. Continue with remaining sections as needed._

