import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface ProfileImageUploadProps {
  currentImageUrl?: string | null;
  onImageUpload: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  fallbackText: string;
  imageType: 'avatar' | 'logo';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImageUrl,
  onImageUpload,
  fallbackText,
  imageType,
  className = '',
  size = 'md'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a JPEG, PNG, or WebP image.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Image size cannot exceed 2MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      const result = await onImageUpload(file);

      if (result.success) {
        toast({
          title: "Success",
          description: `${imageType === 'avatar' ? 'Profile picture' : 'Logo'} updated successfully.`,
        });
      } else {
        setPreviewUrl(null);
        toast({
          title: "Upload failed",
          description: result.error || "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setPreviewUrl(null);
      toast({
        title: "Upload failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearPreview = () => {
    setPreviewUrl(null);
  };

  const displayImageUrl = previewUrl || currentImageUrl;

  return (
    <Card className={`${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className={`${sizeClasses[size]} border-2 border-gray-200`}>
              <AvatarImage
                src={displayImageUrl || ''}
                alt={imageType === 'avatar' ? 'Profile picture' : 'Organization logo'}
              />
              <AvatarFallback className="text-lg font-semibold bg-gray-100">
                {fallbackText}
              </AvatarFallback>
            </Avatar>

            {previewUrl && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={clearPreview}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="text-center">
            <h3 className="font-medium text-gray-900">
              {imageType === 'avatar' ? 'Profile Picture' : 'Organization Logo'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Upload a {imageType === 'avatar' ? 'photo' : 'logo'} to personalize your profile
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleUploadClick}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
              {isUploading ? 'Uploading...' : 'Change'}
            </Button>

            {displayImageUrl && (
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(displayImageUrl, '_blank')}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                View
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-400 text-center">
            <p>Supported formats: JPEG, PNG, WebP</p>
            <p>Maximum size: 2MB</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileImageUpload;