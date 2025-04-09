
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const DonateSuccess: React.FC = () => {
  // In a real app, we would get these from the query parameters or from state
  const donationAmount = 1000;
  const campaignId = "1";
  const campaignTitle = "Build Clean Water Wells in Rural Villages";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-clearcause-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center p-8">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-clearcause-success/20 p-3">
                <CheckCircle className="h-12 w-12 text-clearcause-success" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Thank You for Your Donation!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Your ₱{donationAmount.toLocaleString()} contribution will make a real difference.
            </p>
            
            <div className="bg-clearcause-muted rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold mb-3">Donation Summary</h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Campaign:</span>
                  <span className="font-medium">{campaignTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₱{donationAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-sm text-gray-600">
                  A receipt has been emailed to your registered email address.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to={`/campaigns/${campaignId}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  Return to Campaign
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              
              <Button
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share This Campaign
              </Button>
            </div>
            
            <div className="text-center">
              <h3 className="font-medium mb-2">Next Steps</h3>
              <p className="text-sm text-gray-600 mb-4">
                We'll keep you updated on how your donation is making an impact. You can track the progress of this campaign at any time.
              </p>
              <Link to="/dashboard" className="text-clearcause-primary hover:text-clearcause-secondary text-sm font-medium">
                Go to your donation dashboard →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DonateSuccess;
