import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Step {
  id: string;
  label: string;
  description?: string;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  children: ReactNode;
  sidePanel?: ReactNode;
  canProceed?: boolean;
  isLastStep?: boolean;
}

export default function MultiStepForm({
  steps,
  currentStep,
  onStepChange,
  onNext,
  onPrevious,
  onSubmit,
  children,
  sidePanel,
  canProceed = true,
  isLastStep = false,
}: MultiStepFormProps) {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div
                  className={cn(
                    'flex items-center gap-3 cursor-pointer transition-all',
                    index <= currentStep ? 'opacity-100' : 'opacity-40'
                  )}
                  onClick={() => index < currentStep && onStepChange(index)}
                >
                  {/* Step Circle */}
                  <div
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-sm transition-all',
                      index < currentStep
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : index === currentStep
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-background border-border text-muted-foreground'
                    )}
                  >
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>

                  {/* Step Label */}
                  <div className="hidden md:block">
                    <div className={cn('font-semibold text-sm', index === currentStep && 'text-blue-600')}>
                      {step.label}
                    </div>
                    {step.description && <div className="text-xs text-muted-foreground">{step.description}</div>}
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-4',
                      index < currentStep ? 'bg-emerald-600' : 'bg-border'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (Left Side - 2/3) */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </div>

          {/* Side Panel (Right Side - 1/3) */}
          {sidePanel && (
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-card border border-border rounded-lg p-6 shadow-sm">
                {sidePanel}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            size="lg"
            onClick={onPrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>

          {isLastStep ? (
            <Button
              size="lg"
              onClick={onSubmit}
              disabled={!canProceed}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              Submit
              <Check className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={onNext}
              disabled={!canProceed}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
