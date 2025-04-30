
import React, { useState, useEffect } from 'react';
import { useFarmWizard } from '@/contexts/FarmWizardContext';
import { ASSETS } from '@/lib/farm-wizard-constants';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const AssetsStep: React.FC = () => {
  const { farmData, updateFarmData } = useFarmWizard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAssets, setFilteredAssets] = useState(ASSETS);
  
  // Format price with thousands separator
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Filter assets based on search term
  useEffect(() => {
    const filtered = ASSETS.filter((asset) => 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAssets(filtered);
  }, [searchTerm]);

  // Handle asset selection
  const toggleAssetSelection = (assetId: string) => {
    const currentAssets = [...(farmData.collateralAssets || [])];
    
    if (currentAssets.includes(assetId)) {
      // Remove asset if already selected
      updateFarmData({ 
        collateralAssets: currentAssets.filter(id => id !== assetId)
      });
    } else {
      // Add asset if not selected
      updateFarmData({ 
        collateralAssets: [...currentAssets, assetId]
      });
    }
  };

  // Check if an asset is selected
  const isAssetSelected = (assetId: string) => {
    return farmData.collateralAssets?.includes(assetId) || false;
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">Select Collateral Assets</h2>
      <p className="text-gray-600 mb-6">
        Choose the assets that will be supported as collateral in your farm.
      </p>
      
      <div className="mb-6">
        <Input
          placeholder="Search assets by name or symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4"
        />
        
        {farmData.collateralAssets && farmData.collateralAssets.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-gray-700 mt-1">Selected:</span>
            {farmData.collateralAssets.map(assetId => {
              const asset = ASSETS.find(a => a.id === assetId);
              return asset ? (
                <Badge 
                  key={asset.id}
                  variant="secondary"
                  className="pl-2 pr-1 py-1 flex items-center gap-1 text-sm bg-dex-purple bg-opacity-10 text-dex-purple"
                >
                  <span>{asset.symbol}</span>
                  <button 
                    className="ml-1 rounded-full w-4 h-4 flex items-center justify-center hover:bg-dex-purple hover:bg-opacity-20 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleAssetSelection(asset.id);
                    }}
                  >
                    ×
                  </button>
                </Badge>
              ) : null;
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssets.map((asset) => {
          const isSelected = isAssetSelected(asset.id);
          
          return (
            <Card 
              key={asset.id}
              className={cn(
                "p-4 cursor-pointer transition-all duration-200",
                isSelected 
                  ? "border-2 border-dex-purple bg-dex-purple bg-opacity-5" 
                  : "border border-gray-200 hover:border-gray-300"
              )}
              onClick={() => toggleAssetSelection(asset.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img 
                      src={asset.logoUrl} 
                      alt={asset.name} 
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        // Fallback if image doesn't load
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/32x32/6E59A5/FFF?text=" + asset.symbol.charAt(0);
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{asset.name}</h3>
                    <div className="text-sm text-gray-500">{asset.symbol}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-medium">{formatPrice(asset.currentPrice || 0)}</div>
                    <div className={cn(
                      "text-xs",
                      (asset.priceChange24h || 0) >= 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {(asset.priceChange24h || 0) >= 0 ? '+' : ''}{asset.priceChange24h}%
                    </div>
                  </div>
                  
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleAssetSelection(asset.id)}
                    className="data-[state=checked]:bg-dex-purple data-[state=checked]:border-dex-purple"
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {filteredAssets.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No assets found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default AssetsStep;
