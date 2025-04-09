
import React from 'react';
import CampaignCard from './CampaignCard';

interface Campaign {
  id: string;
  title: string;
  imageUrl: string;
  charity: string;
  description: string;
  raised: number;
  goal: number;
  daysLeft: number;
  verified: boolean;
  category: string;
}

interface CampaignGridProps {
  campaigns: Campaign[];
}

const CampaignGrid: React.FC<CampaignGridProps> = ({ campaigns }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          id={campaign.id}
          title={campaign.title}
          imageUrl={campaign.imageUrl}
          charity={campaign.charity}
          description={campaign.description}
          raised={campaign.raised}
          goal={campaign.goal}
          daysLeft={campaign.daysLeft}
          verified={campaign.verified}
          category={campaign.category}
        />
      ))}
    </div>
  );
};

export default CampaignGrid;
