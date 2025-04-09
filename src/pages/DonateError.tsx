import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const DonateError: React.FC = () => {
  const navigate = useNavigate();
  // In a real app, these would come from query params or state
  const campaignId = "1";
  const errorCode = "payment_failed";
  
  const getErrorMessage = () => {
    switch (errorCode) {
      case 'payment_failed':
        return 'Your payment was not processed successfully.';
      case 'connection_error':
        return 'There was a problem connecting to the payment provider.';
      default:
        return 'An unexpected error occurred during the donation process.';
    }
  };
  
  const handleTryAgain = () => {
    navigate(`/donate/${campaignId}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-clearcause-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center p-8">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Donation Unsuccessful</h1>
            <p className="text-xl text-gray-600 mb-8">
              {getErrorMessage()}
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-medium text-amber-800 mb-1">What happened?</h3>
                <p className="text-sm text-amber-700">
                  Don't worry, your payment wasn't completed, so you haven't been charged. 
                  This could be due to insufficient funds, an expired card, or a temporary issue with the payment provider.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleTryAgain}
                className="bg-clearcause-primary hover:bg-clearcause-secondary flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              
              <Link to={`/campaigns/${campaignId}`}>
                <Button variant="outline">
                  Return to Campaign
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-2">
                If you continue to experience issues, our support team is here to assist you.
              </p>
              <Link to="/contact" className="text-clearcause-primary hover:text-clearcause-secondary text-sm font-medium">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DonateError;
