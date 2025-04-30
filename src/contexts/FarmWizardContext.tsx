
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
import { FarmData } from '@/lib/farm-wizard-types';
import { STEPS } from '@/lib/farm-wizard-constants';

type FarmWizardContextType = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  farmData: Partial<FarmData>;
  updateFarmData: (data: Partial<FarmData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (stepIndex: number) => void;
  isCurrentStepValid: () => boolean;
  resetForm: () => void;
  deployFarm: () => Promise<void>;
  isLoading: boolean;
};

const defaultFarmData: Partial<FarmData> = {
  farmName: '',
  strategyType: '',
  collateralAssets: [],
  targetApy: 0,
  riskProfile: '',
  verifierRequirements: '',
  minStakeAmount: 1000,
  maxFarmSize: 1000000,
  lockupPeriod: 30,
  feeStructure: {
    managementFee: 1.5,
    performanceFee: 10,
  },
};

const FarmWizardContext = createContext<FarmWizardContextType | undefined>(undefined);

export const FarmWizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [farmData, setFarmData] = useState<Partial<FarmData>>(defaultFarmData);
  const [isLoading, setIsLoading] = useState(false);

  const updateFarmData = (data: Partial<FarmData>) => {
    setFarmData(prev => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      if (isCurrentStepValid()) {
        setCurrentStep(prev => prev + 1);
      } else {
        toast.error('Please complete all required fields before proceeding.');
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < STEPS.length) {
      setCurrentStep(stepIndex);
    }
  };

  const isCurrentStepValid = (): boolean => {
    switch (STEPS[currentStep].id) {
      case 'basic-info':
        return !!farmData.farmName;
      case 'strategy':
        return !!farmData.strategyType && farmData.targetApy !== undefined && farmData.targetApy > 0;
      case 'assets':
        return Array.isArray(farmData.collateralAssets) && farmData.collateralAssets.length > 0;
      case 'risk-profile':
        return !!farmData.riskProfile;
      case 'verifiers':
        return !!farmData.verifierRequirements && farmData.minStakeAmount !== undefined && farmData.minStakeAmount > 0;
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const resetForm = () => {
    setFarmData(defaultFarmData);
    setCurrentStep(0);
  };

  const deployFarm = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful deployment
      toast.success('Farm deployed successfully!');
      
      // In a real-world scenario, we would call a blockchain transaction here
      console.log('Farm Data for Deployment:', farmData);
      
      // Reset form after successful deployment
      resetForm();
    } catch (error) {
      console.error('Error deploying farm:', error);
      toast.error('Failed to deploy farm. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FarmWizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        farmData,
        updateFarmData,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        isCurrentStepValid,
        resetForm,
        deployFarm,
        isLoading
      }}
    >
      {children}
    </FarmWizardContext.Provider>
  );
};

export const useFarmWizard = (): FarmWizardContextType => {
  const context = useContext(FarmWizardContext);
  if (!context) {
    throw new Error('useFarmWizard must be used within a FarmWizardProvider');
  }
  return context;
};
