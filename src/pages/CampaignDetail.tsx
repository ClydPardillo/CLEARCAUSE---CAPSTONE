import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  Check, 
  Share2, 
  Heart, 
  Facebook, 
  Twitter, 
  Copy, 
  Droplet, 
  Home, 
  Utensils, 
  BookOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MilestoneTracker from '@/components/ui/campaign/MilestoneTracker';
import ImpactDashboard from '@/components/ui/campaign/ImpactDashboard';
import AuditTrail from '@/components/ui/campaign/AuditTrail';

const SAMPLE_CAMPAIGN = {
  id: "1",
  title: "Build Clean Water Wells in Rural Villages",
  imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  bannerUrl: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  charity: "Water For All Foundation",
  description: "Help us build 10 clean water wells that will provide safe drinking water to over 5,000 people in rural communities. Access to clean water is a fundamental human right, yet millions still lack this basic necessity. Your donation will help us construct durable wells that will serve these communities for decades to come.\n\nThis project focuses on rural villages where residents currently walk miles each day to collect water from contaminated sources, leading to waterborne diseases and other health issues. By building these wells, we not only provide clean water but also give back time to families, allowing children to attend school and adults to focus on productive activities.\n\nOur implementation partner has over 15 years of experience in well construction and community water management training. Each well location has been carefully selected based on hydrogeological surveys to ensure sustainability.",
  raised: 850000,
  goal: 1000000,
  daysLeft: 15,
  verified: true,
  category: "Clean Water",
  donors: 432,
  location: "Multiple Rural Communities, Central Philippines",
  charityLogo: "https://randomuser.me/api/portraits/men/32.jpg",
  transparency: 98,
  efficiency: 95,
};

const MILESTONES = [
  {
    id: "1",
    title: "Site Selection and Community Engagement",
    description: "Complete hydrogeological surveys, select optimal well locations, and conduct community meetings to ensure local buy-in and support.",
    status: "released" as const,
    date: "January 15, 2024",
    amount: 200000,
    evidence: "Completed surveys for all 10 sites, with community meeting attendance logs and signed MOUs from village leaders attached.",
  },
  {
    id: "2",
    title: "Initial Construction - First 3 Wells",
    description: "Begin construction of the first 3 wells, including drilling, casing installation, and platform construction.",
    status: "verified" as const,
    date: "March 1, 2024",
    amount: 300000,
    evidence: "Construction completed on wells 1-3. Photo documentation and engineering certification provided as verification.",
  },
  {
    id: "3",
    title: "Mid-Project Extension - 4 More Wells",
    description: "Construction of wells 4-7, following the same quality standards and community involvement processes.",
    status: "pending" as const,
    date: "April 30, 2024",
    amount: 400000,
    evidence: "Construction in progress. Preliminary photos submitted showing work on wells 4 and 5.",
  },
  {
    id: "4",
    title: "Final Construction & Water Quality Testing",
    description: "Complete the final 3 wells, conduct comprehensive water quality testing on all wells, and train community members on maintenance.",
    status: "upcoming" as const,
    date: "June 15, 2024",
    amount: 100000,
  },
];

const IMPACT_METRICS = [
  {
    id: "1",
    title: "People with Clean Water",
    value: "2,175",
    icon: <Droplet className="h-6 w-6 text-clearcause-primary" />,
    trend: 15,
  },
  {
    id: "2",
    title: "Wells Completed",
    value: "3",
    icon: <Home className="h-6 w-6 text-clearcause-primary" />,
    trend: 0,
  },
  {
    id: "3",
    title: "Villages Served",
    value: "3",
    icon: <Users className="h-6 w-6 text-clearcause-primary" />,
    trend: 0,
  },
  {
    id: "4",
    title: "Water Quality (Purity)",
    value: "98%",
    icon: <Droplet className="h-6 w-6 text-clearcause-primary" />,
    trend: 2,
  },
];

const RECENT_ACTIVITIES = [
  {
    id: "1",
    title: "Well #3 Construction Completed",
    timestamp: "2 days ago",
    description: "Construction team has finished the third well installation in Barangay San Isidro. Water quality testing shows 98% purity levels.",
  },
  {
    id: "2",
    title: "Community Training Session",
    timestamp: "1 week ago",
    description: "30 community members trained in basic well maintenance and water safety protocols to ensure long-term sustainability.",
  },
  {
    id: "3",
    title: "Well #4 Construction Started",
    timestamp: "1 week ago",
    description: "Ground broken for fourth well in Barangay Mabini. Expected completion in 2 weeks if weather permits.",
  },
];

const CampaignDetail: React.FC = () => {
  const { campaignId } = useParams();
  const [donationAmount, setDonationAmount] = useState(1000);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  
  const progressPercentage = Math.min((SAMPLE_CAMPAIGN.raised / SAMPLE_CAMPAIGN.goal) * 100, 100);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Here you could show a toast notification that the link was copied
    setShareMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Banner Image */}
        <div className="h-64 md:h-80 lg:h-96 w-full overflow-hidden relative">
          <img 
            src={SAMPLE_CAMPAIGN.bannerUrl} 
            alt={SAMPLE_CAMPAIGN.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Campaign Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign Title Section */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-clearcause-muted text-clearcause-primary text-xs font-medium px-2.5 py-1 rounded-full mr-2">
                    {SAMPLE_CAMPAIGN.category}
                  </span>
                  {SAMPLE_CAMPAIGN.verified && (
                    <div className="verified-badge">
                      <Check size={14} />
                      <span>Verified Campaign</span>
                    </div>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{SAMPLE_CAMPAIGN.title}</h1>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img src={SAMPLE_CAMPAIGN.charityLogo} alt={SAMPLE_CAMPAIGN.charity} className="h-full w-full object-cover" />
                    </div>
                    <Link to={`/charities/1`} className="ml-2 text-sm font-medium text-gray-900 hover:text-clearcause-primary">
                      {SAMPLE_CAMPAIGN.charity}
                    </Link>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    <span>{SAMPLE_CAMPAIGN.daysLeft} days left</span>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="bg-white rounded-xl shadow-md">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    <button
                      onClick={() => setActiveTab('about')}
                      className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                        activeTab === 'about'
                          ? 'border-clearcause-primary text-clearcause-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      About
                    </button>
                    <button
                      onClick={() => setActiveTab('updates')}
                      className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                        activeTab === 'updates'
                          ? 'border-clearcause-primary text-clearcause-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Impact Dashboard
                    </button>
                    <button
                      onClick={() => setActiveTab('milestones')}
                      className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                        activeTab === 'milestones'
                          ? 'border-clearcause-primary text-clearcause-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Milestones
                    </button>
                    <button
                      onClick={() => setActiveTab('audit')}
                      className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                        activeTab === 'audit'
                          ? 'border-clearcause-primary text-clearcause-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Audit Trail
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'about' && (
                    <div className="prose max-w-none">
                      <p className="text-base text-gray-700 whitespace-pre-line">{SAMPLE_CAMPAIGN.description}</p>
                      <h3 className="font-semibold text-lg mt-6 mb-3">Project Location</h3>
                      <p>{SAMPLE_CAMPAIGN.location}</p>
                    </div>
                  )}

                  {activeTab === 'updates' && (
                    <ImpactDashboard metrics={IMPACT_METRICS} recentActivities={RECENT_ACTIVITIES} />
                  )}

                  {activeTab === 'milestones' && (
                    <MilestoneTracker milestones={MILESTONES} />
                  )}

                  {activeTab === 'audit' && (
                    <AuditTrail campaignId={campaignId || ''} />
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Donation Box */}
            <div className="lg:col-span-1 space-y-6">
              {/* Donation Progress */}
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold">PHP {SAMPLE_CAMPAIGN.raised.toLocaleString()}</span>
                    <span className="text-gray-500">of PHP {SAMPLE_CAMPAIGN.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-clearcause-primary h-2.5 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{progressPercentage.toFixed(0)}% Funded</span>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      <span>{SAMPLE_CAMPAIGN.donors} donors</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="donation-amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Donation Amount
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[500, 1000, 2500].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount)}
                        className={`rounded-md py-2 text-sm font-medium transition-colors ${
                          donationAmount === amount
                            ? 'bg-clearcause-primary text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        ₱{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">₱</span>
                    </div>
                    <input
                      type="number"
                      name="donation-amount"
                      id="donation-amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(Number(e.target.value))}
                      className="block w-full rounded-md border-gray-300 pl-8 pr-12 focus:border-clearcause-primary focus:ring-clearcause-primary sm:text-sm"
                      placeholder="0.00"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">PHP</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-clearcause-accent hover:bg-clearcause-accent/90 mb-4">
                  Donate Now
                </Button>

                <div className="flex justify-center space-x-4">
                  <div className="relative">
                    <button 
                      onClick={() => setShareMenuOpen(!shareMenuOpen)}
                      className="flex items-center text-sm text-gray-500 hover:text-clearcause-primary p-1"
                    >
                      <Share2 size={16} className="mr-1" />
                      <span>Share</span>
                    </button>
                    
                    {shareMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                        <button 
                          onClick={handleCopyLink}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Copy size={14} className="mr-2" />
                          <span>Copy Link</span>
                        </button>
                        <a 
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Facebook size={14} className="mr-2" />
                          <span>Facebook</span>
                        </a>
                        <a 
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(SAMPLE_CAMPAIGN.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Twitter size={14} className="mr-2" />
                          <span>Twitter</span>
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <button className="flex items-center text-sm text-gray-500 hover:text-clearcause-primary p-1">
                    <Heart size={16} className="mr-1" />
                    <span>Save</span>
                  </button>
                </div>
                
                {/* Charity Card */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-start mb-4">
                    <div className="mr-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img src={SAMPLE_CAMPAIGN.charityLogo} alt={SAMPLE_CAMPAIGN.charity} className="h-full w-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{SAMPLE_CAMPAIGN.charity}</h3>
                      <Link to="/charities/1" className="text-sm text-clearcause-primary">
                        View Profile
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Transparency Score:</span>
                      <span className="font-medium">{SAMPLE_CAMPAIGN.transparency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Efficiency Rating:</span>
                      <span className="font-medium">{SAMPLE_CAMPAIGN.efficiency}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CampaignDetail;
