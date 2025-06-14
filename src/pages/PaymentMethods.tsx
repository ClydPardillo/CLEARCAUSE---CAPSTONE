
import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

interface PaymentMethodsProps {
  amount: number;
  onPaymentSelect: (method: string, details: any) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ amount, onPaymentSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const paymentMethods = [
    {
      id: 'gcash',
      name: 'GCash',
      description: 'Pay using your GCash mobile wallet',
      icon: Smartphone,
      popular: true,
      fee: '₱5',
      processingTime: 'Instant'
    },
    {
      id: 'paymaya',
      name: 'PayMaya',
      description: 'Pay using your PayMaya digital wallet',
      icon: Smartphone,
      popular: true,
      fee: '₱5',
      processingTime: 'Instant'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, JCB accepted',
      icon: CreditCard,
      popular: false,
      fee: '3.5%',
      processingTime: 'Instant'
    },
    {
      id: 'bank_transfer',
      name: 'Online Bank Transfer',
      description: 'InstaPay/PESONet supported banks',
      icon: Building2,
      popular: false,
      fee: '₱15',
      processingTime: '1-2 hours'
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleProceedPayment = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (!method) return;

    const paymentData = {
      method: selectedMethod,
      amount,
      ...(selectedMethod === 'card' ? { cardDetails } : {})
    };

    onPaymentSelect(selectedMethod, paymentData);
  };

  const calculateFee = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (!method) return 0;

    if (method.fee.includes('%')) {
      const percentage = parseFloat(method.fee.replace('%', ''));
      return Math.round(amount * (percentage / 100));
    } else {
      return parseInt(method.fee.replace('₱', ''));
    }
  };

  const totalAmount = selectedMethod ? amount + calculateFee(selectedMethod) : amount;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Payment Method</h2>
        <p className="text-gray-600">Select your preferred payment option</p>
      </div>

      <RadioGroup value={selectedMethod} onValueChange={handleMethodSelect}>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <Label key={method.id} htmlFor={method.id} className="cursor-pointer">
              <Card className={`transition-all hover:shadow-md ${
                selectedMethod === method.id ? 'border-clearcause-primary bg-clearcause-primary/5' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <method.icon className="h-8 w-8 text-clearcause-primary" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{method.name}</h3>
                        {method.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>Fee: {method.fee}</span>
                        <span>Processing: {method.processingTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Label>
          ))}
        </div>
      </RadioGroup>

      {/* Card Details Form */}
      {selectedMethod === 'card' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Card Details
            </CardTitle>
            <CardDescription>Your card information is encrypted and secure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cardDetails.cvc}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cvc: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input
                id="card-name"
                placeholder="Juan Dela Cruz"
                value={cardDetails.name}
                onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Summary */}
      {selectedMethod && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Donation Amount</span>
                <span>₱{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Processing Fee</span>
                <span>₱{calculateFee(selectedMethod).toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₱{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button 
        className="w-full" 
        size="lg"
        disabled={!selectedMethod}
        onClick={handleProceedPayment}
      >
        {selectedMethod ? `Pay ₱${totalAmount.toLocaleString()}` : 'Select Payment Method'}
      </Button>

      <div className="text-center text-xs text-gray-500">
        <p>Your payment is protected by 256-bit SSL encryption</p>
      </div>
    </div>
  );
};

export default PaymentMethods;
