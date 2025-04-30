
import React from 'react';
import { useFarmWizard } from '@/contexts/FarmWizardContext';
import { RISK_PROFILES } from '@/lib/farm-wizard-constants';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const RiskProfileStep: React.FC = () => {
  const { farmData, updateFarmData } = useFarmWizard();

  const handleProfileSelect = (profileId: string) => {
    updateFarmData({ riskProfile: profileId });
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">Risk Profile</h2>
      <p className="text-gray-600 mb-6">
        Select the risk profile that best matches your farm's investment strategy.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {RISK_PROFILES.map((profile) => {
          const isSelected = farmData.riskProfile === profile.id;
          
          return (
            <Card 
              key={profile.id}
              className={cn(
                "p-5 cursor-pointer transition-all duration-200 hover:shadow-md",
                isSelected 
                  ? "border-2 border-dex-purple bg-dex-purple bg-opacity-5" 
                  : "border border-gray-200"
              )}
              onClick={() => handleProfileSelect(profile.id)}
            >
              <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
              <p className="text-gray-600 mb-4 text-sm">{profile.description}</p>
              
              <div className="space-y-4 mt-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium">Sharpe Ratio</span>
                    <span className={cn(
                      "font-semibold",
                      profile.sharpeRatio >= 2 ? "text-green-600" : 
                      profile.sharpeRatio >= 1.5 ? "text-yellow-600" : 
                      "text-red-600"
                    )}>
                      {profile.sharpeRatio.toFixed(1)}
                    </span>
                  </div>
                  <Progress 
                    value={profile.sharpeRatio * 25} 
                    className="h-2"
                    indicatorClassName={cn(
                      profile.sharpeRatio >= 2 ? "bg-green-500" : 
                      profile.sharpeRatio >= 1.5 ? "bg-yellow-500" : 
                      "bg-red-500"
                    )}
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium">Volatility</span>
                    <span className={cn(
                      "font-semibold",
                      profile.volatility <= 10 ? "text-green-600" : 
                      profile.volatility <= 20 ? "text-yellow-600" : 
                      "text-red-600"
                    )}>
                      {profile.volatility}%
                    </span>
                  </div>
                  <Progress 
                    value={profile.volatility * 2} 
                    className="h-2"
                    indicatorClassName={cn(
                      profile.volatility <= 10 ? "bg-green-500" : 
                      profile.volatility <= 20 ? "bg-yellow-500" : 
                      "bg-red-500"
                    )}
                  />
                </div>
              </div>
              
              {isSelected && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-dex-purple">
                    <span className="font-medium">Recommended for:</span> {
                      profile.id === 'conservative' ? 'Stable returns with lower risk' :
                      profile.id === 'moderate' ? 'Balanced risk/reward profile' :
                      'Maximum returns with higher volatility'
                    }
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      
      {farmData.riskProfile && (
        <div className="mt-6 bg-blue-50 p-4 rounded-md">
          <h4 className="text-blue-800 font-medium mb-2">Risk Profile Impact</h4>
          <p className="text-sm text-blue-700">
            The selected risk profile will influence farm parameters such as leverage limits,
            liquidation thresholds, and asset weight limits. This helps enforce the desired
            risk/reward strategy for the farm.
          </p>
        </div>
      )}
    </div>
  );
};

export default RiskProfileStep;
