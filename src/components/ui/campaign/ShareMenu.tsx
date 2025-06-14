
import React from 'react';
import { Share2, Copy, Facebook, Twitter } from 'lucide-react';

interface ShareMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  campaignTitle: string;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ isOpen, onToggle, campaignTitle }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    onToggle();
  };

  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="flex items-center text-sm text-gray-500 hover:text-clearcause-primary p-1"
      >
        <Share2 size={16} className="mr-1" />
        <span>Share</span>
      </button>
      
      {isOpen && (
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
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(campaignTitle)}`}
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
  );
};

export default ShareMenu;
