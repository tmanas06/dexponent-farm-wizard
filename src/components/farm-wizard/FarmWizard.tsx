
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFarmWizard } from '@/contexts/FarmWizardContext';
import { useWallet } from '@/components/context/WalletContext';
import { STEPS } from '@/lib/farm-wizard-constants';
import StepIndicator from './StepIndicator';
import BasicInfoStep from './BasicInfoStep';
import StrategyStep from './StrategyStep';
import AssetsStep from './AssetsStep';
import RiskProfileStep from './RiskProfileStep';
import VerifiersStep from './VerifiersStep';
import ReviewStep from './ReviewStep';

const FarmWizard: React.FC = () => {
  const { 
    currentStep, 
    goToNextStep, 
    goToPreviousStep, 
    isCurrentStepValid 
  } = useFarmWizard();

  const { account, networkId } = useWallet();

  // Only allow farm creation if wallet is connected and on correct network
  const canCreateFarm = account !== null && networkId === 31; // 31 is Rootstock Testnet

  // Render current step content
  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'basic-info':
        return <BasicInfoStep />;
      case 'strategy':
        return <StrategyStep />;
      case 'assets':
        return <AssetsStep />;
      case 'risk-profile':
        return <RiskProfileStep />;
      case 'verifiers':
        return <VerifiersStep />;
      case 'review':
        return <ReviewStep />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {account && (
        <div className="mb-4">
          Connected as: {account.slice(0, 6) + '...' + account.slice(-4)}
        </div>
      )}
      
      {!canCreateFarm && (
        <div className="alert alert-warning mb-4">
          Please connect to Rootstock Testnet to create a farm
        </div>
      )}
      
      <StepIndicator />
      
      <Card className="p-6 mb-4">
        {renderStepContent()}
      </Card>
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        {currentStep < STEPS.length - 1 ? (
          <Button
            onClick={goToNextStep}
            disabled={!isCurrentStepValid()}
            className="bg-dex-purple hover:bg-dex-purple/90"
          >
            Next
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default FarmWizard;
