
import React from 'react';
import { useFarmWizard } from '@/contexts/FarmWizardContext';
import { 
  ASSETS, 
  STRATEGIES, 
  RISK_PROFILES, 
  VERIFIER_REQUIREMENTS 
} from '@/lib/farm-wizard-constants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ReviewStep: React.FC = () => {
  const { farmData, deployFarm, isLoading } = useFarmWizard();

  // Helper function to get entity name by id
  const getEntityNameById = (id: string | undefined, entities: any[]) => {
    if (!id) return 'Not selected';
    const entity = entities.find(e => e.id === id);
    return entity ? entity.name : 'Unknown';
  };

  // Helper function to format currency
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'Not set';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Get selected assets
  const selectedAssets = (farmData.collateralAssets || [])
    .map(assetId => ASSETS.find(a => a.id === assetId))
    .filter(Boolean);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">Review and Deploy Farm</h2>
      <p className="text-gray-600 mb-6">
        Review all your farm settings before deployment.
      </p>
      
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Farm Summary</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Farm Name</h4>
              <p className="font-medium">{farmData.farmName}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Strategy</h4>
              <p className="font-medium">
                {getEntityNameById(farmData.strategyType, STRATEGIES)}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Target APY</h4>
              <p className="font-medium">{farmData.targetApy?.toFixed(1)}%</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Risk Profile</h4>
              <p className="font-medium">
                {getEntityNameById(farmData.riskProfile, RISK_PROFILES)}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Verifier Requirements</h4>
              <p className="font-medium">
                {getEntityNameById(farmData.verifierRequirements, VERIFIER_REQUIREMENTS)}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Min Stake Amount</h4>
              <p className="font-medium">{formatCurrency(farmData.minStakeAmount)}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Maximum Farm Size</h4>
              <p className="font-medium">{formatCurrency(farmData.maxFarmSize)}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Lockup Period</h4>
              <p className="font-medium">{farmData.lockupPeriod} days</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h4 className="text-sm text-gray-500 mb-2">Fee Structure</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
              <div className="flex justify-between">
                <span>Management Fee:</span>
                <span className="font-medium">{farmData.feeStructure?.managementFee}%</span>
              </div>
              <div className="flex justify-between">
                <span>Performance Fee:</span>
                <span className="font-medium">{farmData.feeStructure?.performanceFee}%</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h4 className="text-sm text-gray-500 mb-2">Collateral Assets</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedAssets.map(asset => (
                asset && (
                  <div 
                    key={asset.id}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    <img 
                      src={asset.logoUrl} 
                      alt={asset.name} 
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/16x16/6E59A5/FFF?text=" + asset.symbol.charAt(0);
                      }}
                    />
                    <span className="text-sm">{asset.symbol}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </Card>
      
      <div className="bg-yellow-50 p-4 rounded-md mb-6">
        <h4 className="text-yellow-800 font-medium mb-1">Deployment Note</h4>
        <p className="text-sm text-yellow-700">
          Once deployed, some farm parameters cannot be changed. Carefully review all settings before proceeding.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={deployFarm}
          disabled={isLoading}
          className="bg-gradient-purple text-white hover:opacity-90 transition-opacity"
          size="lg"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Deploying...
            </span>
          ) : (
            <span className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Deploy Farm
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
