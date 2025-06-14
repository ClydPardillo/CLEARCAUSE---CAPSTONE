
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import CharityProfile from "./pages/CharityProfile";
import Donate from "./pages/Donate";
import DonateSuccess from "./pages/DonateSuccess";
import DonateError from "./pages/DonateError";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DonorDashboard from "./pages/donor/DonorDashboard";
import DonorDonations from "./pages/donor/DonorDonations";
import DonorProfile from "./pages/donor/DonorProfile";
import DonorSettings from "./pages/donor/DonorSettings";
import CharityApplicationForm from "./pages/CharityApplicationForm";
import CharityDashboard from "./pages/charity/CharityDashboard";
import ManageCampaigns from "./pages/charity/ManageCampaigns";
import CampaignForm from "./pages/charity/CampaignForm";
import ManageMilestones from "./pages/charity/ManageMilestones";
import SubmitProofForm from "./pages/charity/SubmitProofForm";
import PostImpactUpdate from "./pages/charity/PostImpactUpdate";
import VerificationStatus from "./pages/charity/VerificationStatus";
import FundsManagement from "./pages/charity/FundsManagement";
import OrganizationProfile from "./pages/charity/OrganizationProfile";
import CharitySettings from "./pages/charity/CharitySettings";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VerificationQueue from "./pages/admin/VerificationQueue";
import VerificationDetail from "./pages/admin/VerificationDetail";
import FundReleaseManagement from "./pages/admin/FundReleaseManagement";
import CharityManagement from "./pages/admin/CharityManagement";
import CharityApplicationReview from "./pages/admin/CharityApplicationReview";
import DonorManagement from "./pages/admin/DonorManagement";
import CampaignManagement from "./pages/admin/CampaignManagement";
import ScorecardManagement from "./pages/admin/ScorecardManagement";
import PlatformSettings from "./pages/admin/PlatformSettings";
import AuditLogs from "./pages/admin/AuditLogs";
import MilestoneVerification from "./pages/admin/MilestoneVerification";
import PaymentMethods from "./pages/PaymentMethods";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:campaignId" element={<CampaignDetail />} />
          <Route path="/charities/:charityId" element={<CharityProfile />} />
          <Route path="/donate/:campaignId" element={<Donate />} />
          <Route path="/donate/success" element={<DonateSuccess />} />
          <Route path="/donate/error" element={<DonateError />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/charity-application" element={<CharityApplicationForm />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/donations" element={<DonorDonations />} />
          <Route path="/donor/profile" element={<DonorProfile />} />
          <Route path="/donor/settings" element={<DonorSettings />} />
          <Route path="/charity/dashboard" element={<CharityDashboard />} />
          <Route path="/charity/campaigns" element={<ManageCampaigns />} />
          <Route path="/charity/campaigns/new" element={<CampaignForm />} />
          <Route path="/charity/campaigns/edit/:campaignId" element={<CampaignForm />} />
          <Route path="/charity/campaigns/:campaignId/milestones" element={<ManageMilestones />} />
          <Route path="/charity/campaigns/:campaignId/milestones/:milestoneId/submit" element={<SubmitProofForm />} />
          <Route path="/charity/campaigns/:campaignId/update" element={<PostImpactUpdate />} />
          <Route path="/charity/verifications" element={<VerificationStatus />} />
          <Route path="/charity/funds" element={<FundsManagement />} />
          <Route path="/charity/profile" element={<OrganizationProfile />} />
          <Route path="/charity/settings" element={<CharitySettings />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/milestone-verification" element={<MilestoneVerification />} />
          <Route path="/admin/verifications" element={<VerificationQueue />} />
          <Route path="/admin/verifications/:submissionId" element={<VerificationDetail />} />
          <Route path="/admin/payouts" element={<FundReleaseManagement />} />
          <Route path="/admin/charities" element={<CharityManagement />} />
          <Route path="/admin/applications" element={<CharityApplicationReview />} />
          <Route path="/admin/donors" element={<DonorManagement />} />
          <Route path="/admin/campaigns" element={<CampaignManagement />} />
          <Route path="/admin/scorecards" element={<ScorecardManagement />} />
          <Route path="/admin/settings" element={<PlatformSettings />} />
          <Route path="/admin/logs" element={<AuditLogs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
