
import React from 'react';
import { cn } from '@/lib/utils';
import { STEPS } from '@/lib/farm-wizard-constants';
import { Check } from 'lucide-react';
import { useFarmWizard } from '@/contexts/FarmWizardContext';
import { useIsMobile } from '@/hooks/use-mobile';

const StepIndicator: React.FC = () => {
  const { currentStep, goToStep } = useFarmWizard();
  const isMobile = useIsMobile();

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div 
                className={cn(
                  "flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer",
                  isCompleted ? "bg-dex-purple text-white" : 
                    isActive ? "bg-dex-purple bg-opacity-20 border-2 border-dex-purple text-dex-purple" : 
                    "bg-gray-100 text-gray-400 border-2 border-gray-200",
                  isMobile ? "w-8 h-8 text-xs" : "w-10 h-10"
                )}
                onClick={() => isCompleted && goToStep(index)}
              >
                {isCompleted ? (
                  <Check className={cn(isMobile ? "w-4 h-4" : "w-5 h-5")} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Connecting Line (except for the last step) */}
              {index < STEPS.length - 1 && (
                <div className="flex-1 mx-2">
                  <div 
                    className={cn(
                      "h-1 rounded-full",
                      index < currentStep ? "bg-dex-purple" : "bg-gray-200"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Labels - Hidden on mobile */}
      {!isMobile && (
        <div className="flex items-center justify-between mt-2">
          {STEPS.map((step, index) => (
            <div 
              key={`label-${step.id}`}
              className={cn(
                "text-xs font-medium transition-colors duration-300",
                index === currentStep ? "text-dex-purple" : 
                index < currentStep ? "text-dex-purple text-opacity-70" : "text-gray-400",
                "w-10 text-center"
              )}
              style={{ 
                marginLeft: index === 0 ? '0' : '', 
                marginRight: index === STEPS.length - 1 ? '0' : '',
                width: `${100 / STEPS.length}%`
              }}
            >
              {step.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepIndicator;
