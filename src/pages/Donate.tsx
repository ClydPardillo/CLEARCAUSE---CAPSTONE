
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SAMPLE_CAMPAIGN = {
  id: "1",
  title: "Build Clean Water Wells in Rural Villages",
  imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  charity: "Water For All Foundation",
  description: "Help us build 10 clean water wells...",
};

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

const Donate: React.FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'onetime' | 'monthly'>('onetime');
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'paymaya' | 'card' | 'bank'>('gcash');
  const [isLoggedIn] = useState<boolean>(false); // In a real app, this would come from auth state
  
  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(parseFloat(e.target.value) || 0);
  };
  
  const handleProceedToPayment = () => {
    // In a real app, this would initiate payment processing
    // For now, we'll just navigate to the success page
    navigate('/donate/success');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-clearcause-background">
        {/* Breadcrumb */}
        <div className="bg-clearcause-muted py-2">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-sm">
              <Link to={`/campaigns/${campaignId}`} className="text-clearcause-primary hover:text-clearcause-secondary flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Campaign
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Campaign Context Header */}
            <div className="bg-clearcause-primary text-white px-6 py-4">
              <h1 className="text-xl font-bold">Donate to</h1>
              <p className="text-white/90 text-lg">{SAMPLE_CAMPAIGN.title}</p>
              <p className="text-white/80 text-sm">{SAMPLE_CAMPAIGN.charity}</p>
            </div>
            
            {/* Login/Signup Notice (if not logged in) */}
            {!isLoggedIn && (
              <div className="bg-clearcause-muted px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <span className="font-medium">Log in or sign up</span> to track your donations and receive updates.
                  </p>
                  <div className="flex gap-2">
                    <Link to={`/login?redirect=/donate/${campaignId}`}>
                      <Button variant="outline" size="sm">Log In</Button>
                    </Link>
                    <Link to={`/signup?redirect=/donate/${campaignId}`}>
                      <Button size="sm">Sign Up</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Donation Form */}
            <div className="p-6 space-y-8">
              {/* Select Amount */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Select Donation Amount</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAmountClick(preset)}
                      className={`rounded-md py-3 px-4 text-center ${
                        amount === preset && customAmount === ''
                          ? 'bg-clearcause-primary text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      ₱{preset.toLocaleString()}
                    </button>
                  ))}
                </div>
                
                <div className="pt-2">
                  <Label htmlFor="custom-amount">Custom Amount (PHP)</Label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">₱</span>
                    </div>
                    <Input
                      type="number"
                      id="custom-amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Enter amount"
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
              
              {/* Select Frequency */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Select Frequency</h2>
                
                <RadioGroup 
                  value={frequency}
                  onValueChange={(value) => setFrequency(value as 'onetime' | 'monthly')}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="onetime" id="onetime" />
                    <Label htmlFor="onetime" className="font-normal">One-time Donation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="monthly"
                      id="monthly"
                      disabled={!isLoggedIn}
                    />
                    <Label
                      htmlFor="monthly"
                      className={`font-normal ${!isLoggedIn ? 'text-gray-400' : ''}`}
                    >
                      Monthly Donation
                      {!isLoggedIn && (
                        <span className="block text-xs text-gray-400">(Login required)</span>
                      )}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Payment Methods */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Select Payment Method</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gcash')}
                    className={`rounded-md py-4 px-3 border-2 flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'gcash'
                        ? 'border-clearcause-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">G</div>
                    <span className="text-sm">GCash</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paymaya')}
                    className={`rounded-md py-4 px-3 border-2 flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'paymaya'
                        ? 'border-clearcause-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Wallet className="h-8 w-8 text-purple-600" />
                    <span className="text-sm">PayMaya</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`rounded-md py-4 px-3 border-2 flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'border-clearcause-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="h-8 w-8 text-gray-600" />
                    <span className="text-sm">Credit Card</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`rounded-md py-4 px-3 border-2 flex flex-col items-center justify-center gap-2 ${
                      paymentMethod === 'bank'
                        ? 'border-clearcause-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center text-gray-600">
                      <span className="font-semibold text-sm">Bank</span>
                    </div>
                    <span className="text-sm">Bank Transfer</span>
                  </button>
                </div>
              </div>
              
              {/* Donation Summary */}
              <div className="bg-clearcause-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">Donation Summary</h3>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Amount:</span>
                  <span className="font-medium">₱{amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Frequency:</span>
                  <span className="font-medium">{frequency === 'onetime' ? 'One-time' : 'Monthly'}</span>
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Payment method:</span>
                  <span className="font-medium">
                    {paymentMethod === 'gcash' && 'GCash'}
                    {paymentMethod === 'paymaya' && 'PayMaya'}
                    {paymentMethod === 'card' && 'Credit Card'}
                    {paymentMethod === 'bank' && 'Bank Transfer'}
                  </span>
                </div>
                <div className="border-t mt-3 pt-3 flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-lg">₱{amount.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Action Button */}
              <Button 
                onClick={handleProceedToPayment}
                className="w-full py-6 bg-clearcause-accent hover:bg-clearcause-accent/90 text-lg"
                disabled={amount <= 0}
              >
                Donate ₱{amount.toLocaleString()} {frequency === 'monthly' ? 'Monthly' : ''}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                By proceeding, you agree to ClearCause's <Link to="/terms" className="text-clearcause-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-clearcause-primary hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
