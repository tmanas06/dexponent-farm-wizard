
import React from 'react';
import { useFarmWizard } from '@/contexts/FarmWizardContext';
import { VERIFIER_REQUIREMENTS } from '@/lib/farm-wizard-constants';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const VerifiersStep: React.FC = () => {
  const { farmData, updateFarmData } = useFarmWizard();

  const handleVerifierSelect = (verifierId: string) => {
    // Find the selected verifier requirement
    const verifier = VERIFIER_REQUIREMENTS.find(v => v.id === verifierId);
    
    // Update farm data with selected verifier and its minimum stake
    updateFarmData({ 
      verifierRequirements: verifierId,
      minStakeAmount: verifier ? verifier.minStake : 1000
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">Verifier Requirements</h2>
      <p className="text-gray-600 mb-6">
        Set requirements for verifiers who will validate transactions in your farm.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {VERIFIER_REQUIREMENTS.map((verifier) => {
          const isSelected = farmData.verifierRequirements === verifier.id;
          
          return (
            <Card 
              key={verifier.id}
              className={cn(
                "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
                isSelected 
                  ? "border-2 border-dex-purple bg-dex-purple bg-opacity-5" 
                  : "border border-gray-200"
              )}
              onClick={() => handleVerifierSelect(verifier.id)}
            >
              <div>
                <h3 className="font-semibold text-lg">{verifier.name}</h3>
                <p className="text-sm text-gray-600 my-3">{verifier.description}</p>
                
                <div className="space-y-2 mt-4 pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Minimum Stake:</span>
                    <span className="font-medium">${formatNumber(verifier.minStake)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Reward Rate:</span>
                    <span className="font-medium">{verifier.rewardRate}%</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {farmData.verifierRequirements && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="min-stake-amount">Minimum Stake Amount ($)</Label>
              <Input
                id="min-stake-amount"
                type="number"
                value={farmData.minStakeAmount || ''}
                onChange={(e) => updateFarmData({ minStakeAmount: parseFloat(e.target.value) })}
                className="w-full"
                min="0"
              />
              <p className="text-xs text-gray-500">
                The minimum amount that verifiers must stake to participate in your farm.
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-yellow-50 p-4 rounded-md">
            <h4 className="text-yellow-800 font-medium mb-1">Important Note</h4>
            <p className="text-sm text-yellow-700">
              Higher minimum stake requirements can increase security but may reduce the number of verifiers.
              Balance security needs with verifier participation when setting this value.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VerifiersStep;
