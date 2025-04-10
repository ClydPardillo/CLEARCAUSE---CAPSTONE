
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import CharityLayout from '@/components/layout/CharityLayout';

const PostImpactUpdate: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample campaign data - in a real app would be fetched based on campaignId
  const [campaign] = useState({
    id: campaignId || '1',
    title: 'Clean Water Project',
  });
  
  // State for form
  const [updateText, setUpdateText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Remove selected image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };
  
  // Submit the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!updateText.trim()) {
      toast({
        title: "Error",
        description: "Please enter an update message.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Update Posted",
        description: "Your impact update has been posted successfully.",
      });
      setIsSubmitting(false);
      navigate(`/charity/campaigns/${campaignId}/milestones`);
    }, 1500);
  };

  return (
    <CharityLayout title="Post Impact Update">
      {/* Back Button */}
      <Link 
        to={`/charity/campaigns/${campaignId}/milestones`} 
        className="inline-flex items-center mb-6 text-sm font-medium text-gray-600 hover:text-clearcause-primary"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Campaign
      </Link>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-medium">Updating Campaign: {campaign.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Share progress and impact with donors. Updates appear on the campaign's public page.
          </p>
        </CardContent>
      </Card>
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium text-gray-800 mb-4">Update Message</h3>
            <Textarea
              placeholder="Share what's happening with the project, recent achievements, or how donor funds are making a difference..."
              className="min-h-[150px]"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              {updateText.length}/500 characters
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium text-gray-800 mb-4">Add an Image (Optional)</h3>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
                <div className="text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-clearcause-primary">
                        Upload an image
                      </span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      Accepted file types: PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-64 rounded-md mx-auto"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Link to={`/charity/campaigns/${campaignId}/milestones`}>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting || !updateText.trim()}>
            {isSubmitting ? 'Posting...' : 'Post Update'}
          </Button>
        </div>
      </form>
    </CharityLayout>
  );
};

export default PostImpactUpdate;
