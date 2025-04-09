
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CampaignCardProps {
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

const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  title,
  imageUrl,
  charity,
  description,
  raised,
  goal,
  daysLeft,
  verified,
  category,
}) => {
  const progressPercentage = Math.min((raised / goal) * 100, 100);
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border overflow-hidden h-full flex flex-col">
      <Link to={`/campaigns/${id}`}>
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full">
              {category}
            </span>
          </div>
          {verified && (
            <div className="absolute top-3 right-3">
              <div className="verified-badge">
                <Check size={14} /> 
                <span>Verified</span>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/campaigns/${id}`} className="block">
          <h3 className="text-lg font-semibold line-clamp-2 hover:text-clearcause-primary transition-colors mb-1">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2 hover:text-gray-900">
          by {charity}
        </p>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
          {description}
        </p>
        
        <div className="mt-auto space-y-3">
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-clearcause-primary h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="font-semibold">PHP {raised.toLocaleString()}</span>
            <span className="text-gray-500">of PHP {goal.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between border-t border-gray-100 pt-3">
            {daysLeft > 0 ? (
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                <span>{daysLeft} days left</span>
              </div>
            ) : (
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span>Campaign ended</span>
              </div>
            )}
          </div>

          <Button className="w-full bg-clearcause-accent hover:bg-clearcause-accent/90">
            Donate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
