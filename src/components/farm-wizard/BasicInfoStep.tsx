
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFarmWizard } from '@/contexts/FarmWizardContext';
import { Card } from '@/components/ui/card';

const BasicInfoStep: React.FC = () => {
  const { farmData, updateFarmData } = useFarmWizard();

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">Basic Farm Information</h2>
      <p className="text-gray-600 mb-6">
        Set the core parameters for your new farm.
      </p>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="farm-name">Farm Name</Label>
            <Input
              id="farm-name"
              placeholder="Enter a name for your farm"
              value={farmData.farmName || ''}
              onChange={(e) => updateFarmData({ farmName: e.target.value })}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max-farm-size">Maximum Farm Size (USD)</Label>
              <Input
                id="max-farm-size"
                type="number"
                placeholder="Maximum size of your farm"
                value={farmData.maxFarmSize || ''}
                onChange={(e) => updateFarmData({ maxFarmSize: parseFloat(e.target.value) })}
                className="w-full"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lockup-period">Lockup Period (days)</Label>
              <Input
                id="lockup-period"
                type="number"
                placeholder="Lockup period in days"
                value={farmData.lockupPeriod || ''}
                onChange={(e) => updateFarmData({ lockupPeriod: parseInt(e.target.value) })}
                className="w-full"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="management-fee">Management Fee (%)</Label>
              <Input
                id="management-fee"
                type="number"
                placeholder="Management fee percentage"
                value={farmData.feeStructure?.managementFee || ''}
                onChange={(e) => 
                  updateFarmData({ 
                    feeStructure: { 
                      ...farmData.feeStructure, 
                      managementFee: parseFloat(e.target.value) 
                    } 
                  })
                }
                className="w-full"
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="performance-fee">Performance Fee (%)</Label>
              <Input
                id="performance-fee"
                type="number"
                placeholder="Performance fee percentage"
                value={farmData.feeStructure?.performanceFee || ''}
                onChange={(e) => 
                  updateFarmData({ 
                    feeStructure: { 
                      ...farmData.feeStructure, 
                      performanceFee: parseFloat(e.target.value) 
                    } 
                  })
                }
                className="w-full"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BasicInfoStep;
