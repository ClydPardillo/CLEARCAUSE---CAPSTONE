
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CharityApplicationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [documents, setDocuments] = useState({
    secCertificate: null,
    birCertificate: null,
    otherDoc: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: keyof typeof documents) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prev => ({
        ...prev,
        [docType]: e.target.files ? e.target.files[0] : null
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Navigate to success page or show success message
      alert('Application submitted successfully! Our team will review your application and get back to you.');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10 bg-clearcause-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Apply to Fundraise on ClearCause</h1>
                <p className="text-gray-600 mt-2">
                  Please complete this application to register your organization. Our team will review your submission and contact you within 3-5 business days.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Organizational Info Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">Organization Information</h2>
                  
                  <div>
                    <label htmlFor="org-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Organization Name*
                    </label>
                    <Input id="org-name" name="org-name" type="text" required />
                  </div>
                  
                  <div>
                    <label htmlFor="reg-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Number (SEC/BIR)*
                    </label>
                    <Input id="reg-number" name="reg-number" type="text" required />
                  </div>
                  
                  <div>
                    <label htmlFor="org-type" className="block text-sm font-medium text-gray-700 mb-1">
                      Organization Type*
                    </label>
                    <select 
                      id="org-type" 
                      name="org-type" 
                      required
                      className="block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-clearcause-primary focus:border-clearcause-primary sm:text-sm"
                    >
                      <option value="">Select Organization Type</option>
                      <option value="non-profit">Non-profit Organization</option>
                      <option value="foundation">Foundation</option>
                      <option value="community">Community Group</option>
                      <option value="social-enterprise">Social Enterprise</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                {/* Contact Person Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">Contact Person</h2>
                  
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <Input id="contact-name" name="contact-name" type="text" required />
                  </div>
                  
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <Input id="contact-email" name="contact-email" type="email" required />
                  </div>
                  
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <Input id="contact-phone" name="contact-phone" type="tel" required />
                  </div>
                </div>
                
                {/* Organization Address */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">Organization Address</h2>
                  
                  <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address*
                    </label>
                    <Input id="street" name="street" type="text" required />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City*
                      </label>
                      <Input id="city" name="city" type="text" required />
                    </div>
                    
                    <div>
                      <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                        Province/Region*
                      </label>
                      <Input id="province" name="province" type="text" required />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code*
                    </label>
                    <Input id="postal" name="postal" type="text" required />
                  </div>
                </div>
                
                {/* Mission/Purpose */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">Organization Mission</h2>
                  
                  <div>
                    <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-1">
                      Describe your organization's mission and purpose*
                    </label>
                    <Textarea 
                      id="mission" 
                      name="mission" 
                      rows={4} 
                      required 
                      className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-clearcause-primary focus:border-clearcause-primary sm:text-sm"
                    />
                  </div>
                </div>
                
                {/* Account Credentials */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">Account Credentials</h2>
                  
                  <div>
                    <label htmlFor="account-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Email* (used for login)
                    </label>
                    <Input id="account-email" name="account-email" type="email" required />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password*
                    </label>
                    <Input id="password" name="password" type="password" required minLength={8} />
                    <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters long</p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password*
                    </label>
                    <Input id="confirm-password" name="confirm-password" type="password" required minLength={8} />
                  </div>
                </div>
                
                {/* Document Upload */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">Verification Documents</h2>
                  <p className="text-sm text-gray-600">Please upload the following documents to verify your organization's legitimacy</p>
                  
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEC Registration Certificate*
                      </label>
                      <div className="flex items-center">
                        <label className="block w-full">
                          <span className="sr-only">Choose SEC Certificate</span>
                          <input 
                            type="file" 
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-clearcause-primary file:text-white hover:file:bg-clearcause-primary/90"
                            onChange={(e) => handleFileChange(e, 'secCertificate')}
                            required
                          />
                        </label>
                      </div>
                      {documents.secCertificate && (
                        <div className="mt-2 flex items-center text-sm text-green-600">
                          <Check className="h-4 w-4 mr-1" /> File selected: {documents.secCertificate.name}
                        </div>
                      )}
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        BIR Certificate of Registration*
                      </label>
                      <div className="flex items-center">
                        <label className="block w-full">
                          <span className="sr-only">Choose BIR Certificate</span>
                          <input 
                            type="file" 
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-clearcause-primary file:text-white hover:file:bg-clearcause-primary/90"
                            onChange={(e) => handleFileChange(e, 'birCertificate')}
                            required
                          />
                        </label>
                      </div>
                      {documents.birCertificate && (
                        <div className="mt-2 flex items-center text-sm text-green-600">
                          <Check className="h-4 w-4 mr-1" /> File selected: {documents.birCertificate.name}
                        </div>
                      )}
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Supporting Document (Optional)
                      </label>
                      <div className="flex items-center">
                        <label className="block w-full">
                          <span className="sr-only">Choose Additional Document</span>
                          <input 
                            type="file" 
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-clearcause-primary file:text-white hover:file:bg-clearcause-primary/90"
                            onChange={(e) => handleFileChange(e, 'otherDoc')}
                          />
                        </label>
                      </div>
                      {documents.otherDoc && (
                        <div className="mt-2 flex items-center text-sm text-green-600">
                          <Check className="h-4 w-4 mr-1" /> File selected: {documents.otherDoc.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        required
                        className="h-4 w-4 text-clearcause-primary focus:ring-clearcause-primary border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-600">
                        I agree to the{' '}
                        <Link to="/terms" className="text-clearcause-primary hover:text-clearcause-secondary">
                          Terms and Conditions
                        </Link>{' '}
                        and consent to the verification of the provided information.
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-clearcause-accent hover:bg-clearcause-accent/90 py-2 px-8 text-lg"
                    disabled={isSubmitting || !agreeTerms}
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                  </Button>
                </div>
                
                {/* Review Process Note */}
                <div className="bg-clearcause-muted p-4 rounded-md text-sm">
                  <p className="text-gray-700">
                    <strong>What happens next?</strong> After submission, our team will review your application within 3-5 business days. 
                    You'll receive an email confirmation once your charity account is approved and activated.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CharityApplicationForm;
