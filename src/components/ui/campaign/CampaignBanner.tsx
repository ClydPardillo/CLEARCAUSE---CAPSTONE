
import React from 'react';

interface CampaignBannerProps {
  bannerUrl: string;
  title: string;
}

const CampaignBanner: React.FC<CampaignBannerProps> = ({ bannerUrl, title }) => {
  return (
    <div className="h-64 md:h-80 lg:h-96 w-full overflow-hidden relative">
      <img 
        src={bannerUrl} 
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
};

export default CampaignBanner;
