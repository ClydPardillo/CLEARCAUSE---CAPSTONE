
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, X, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import CharityLayout from '@/components/layout/CharityLayout';

const SubmitProofForm: React.FC = () => {
  const { campaignId, milestoneId } = useParams<{ campaignId: string; milestoneId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample milestone data - in a real app would be fetched based on campaignId and milestoneId
  const [milestone] = useState({
    id: milestoneId || '1',
    title: 'Equipment Procurement',
    description: 'Purchase water filters and treatment supplies',
    evidenceRequirement: 'Please upload receipts from suppliers, photos of equipment, and inventory list.',
  });
  
  // Sample campaign data
  const [campaign] = useState({
    id: campaignId || '1',
    title: 'Clean Water Project',
  });
  
  // State for file uploads
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Submit the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one file as proof.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Proof Submitted",
        description: "Your proof has been submitted for verification.",
      });
      setIsSubmitting(false);
      navigate(`/charity/campaigns/${campaignId}/milestones`);
    }, 1500);
  };

  return (
    <CharityLayout title="Submit Milestone Proof">
      {/* Back Button */}
      <Link 
        to={`/charity/campaigns/${campaignId}/milestones`} 
        className="inline-flex items-center mb-6 text-sm font-medium text-gray-600 hover:text-clearcause-primary"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Milestones
      </Link>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-medium">{campaign.title}</h2>
          <p className="text-sm text-gray-500 mt-1">Submitting proof for milestone</p>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium">{milestone.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-800">Required Evidence</h3>
            <p className="text-sm text-gray-600 mt-1">
              {milestone.evidenceRequirement}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium text-gray-800 mb-4">Upload Proof Documents</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mb-4">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-clearcause-primary">
                      Upload files
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Accepted file types: PNG, JPG, PDF, DOC, DOCX up to 10MB each
                  </p>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Or drag and drop files here
                </p>
              </div>
            </div>
            
            {files.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Selected Files</h4>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <File className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium text-gray-800 mb-4">Additional Notes (Optional)</h3>
            <Textarea
              placeholder="Add any context or explanation for the verification team..."
              className="min-h-[100px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Link to={`/charity/campaigns/${campaignId}/milestones`}>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting || files.length === 0}>
            {isSubmitting ? 'Submitting...' : 'Submit Proof for Verification'}
          </Button>
        </div>
      </form>
    </CharityLayout>
  );
};

export default SubmitProofForm;
