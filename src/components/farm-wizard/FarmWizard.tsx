
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFarmWizard } from '@/contexts/FarmWizardContext';
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
