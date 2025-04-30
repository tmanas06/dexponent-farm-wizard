
import React from 'react';
import { useFarmWizard } from '@/contexts/FarmWizardContext';
import { STRATEGIES } from '@/lib/farm-wizard-constants';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const StrategyStep: React.FC = () => {
  const { farmData, updateFarmData } = useFarmWizard();

  // Get the selected strategy details
  const selectedStrategy = STRATEGIES.find(s => s.id === farmData.strategyType);
  
  const handleStrategySelect = (strategyId: string) => {
    // Find the selected strategy
    const strategy = STRATEGIES.find(s => s.id === strategyId);
    
    // Update farm data with the selected strategy and a default target APY (middle of the range)
    updateFarmData({ 
      strategyType: strategyId,
      targetApy: strategy ? (strategy.expectedApy.min + strategy.expectedApy.max) / 2 : 0
    });
  };

  const getRiskColorClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">Select Strategy Type</h2>
      <p className="text-gray-600 mb-6">
        Choose the investment strategy that best aligns with your farm's goals.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {STRATEGIES.map((strategy) => (
          <Card 
            key={strategy.id}
            className={cn(
              "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
              farmData.strategyType === strategy.id 
                ? "border-2 border-dex-purple bg-dex-purple bg-opacity-5" 
                : "border border-gray-200"
            )}
            onClick={() => handleStrategySelect(strategy.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{strategy.name}</h3>
              <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getRiskColorClass(strategy.riskLevel))}>
                {strategy.riskLevel.charAt(0).toUpperCase() + strategy.riskLevel.slice(1)} Risk
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>
            
            <div className="mt-auto text-sm">
              <span className="text-gray-500">Expected APY: </span>
              <span className="font-medium">{strategy.expectedApy.min}% - {strategy.expectedApy.max}%</span>
            </div>
          </Card>
        ))}
      </div>

      {selectedStrategy && (
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="target-apy" className="mb-2 block">
                Target APY: <span className="text-dex-purple font-semibold">{farmData.targetApy?.toFixed(1)}%</span>
              </Label>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">{selectedStrategy.expectedApy.min}%</span>
                <Slider
                  id="target-apy"
                  min={selectedStrategy.expectedApy.min}
                  max={selectedStrategy.expectedApy.max}
                  step={0.1}
                  value={[farmData.targetApy || selectedStrategy.expectedApy.min]}
                  onValueChange={(value) => updateFarmData({ targetApy: value[0] })}
                  className="flex-1"
                />
                <span className="text-xs text-gray-500">{selectedStrategy.expectedApy.max}%</span>
              </div>
            </div>
            
            <div className="mt-4 bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Setting realistic target APYs improves farm attractiveness to verifiers and investors.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default StrategyStep;
